const User = require("../models/User");
const { isDatabaseConnected } = require("../config/db");
const {
  getActivityScore,
  createEmptyActivityCalendar,
  getDeveloperDNA,
  getTopLanguages,
  getTopSkill,
} = require("../utils/analyzer");

const GITHUB_API_URL = "https://api.github.com";
const PLACEHOLDER_TOKENS = new Set(["your_github_token", "token", "tokens", "github_token"]);

function getGitHubToken() {
  const token = String(process.env.GITHUB_TOKEN || "").trim();

  if (!token) {
    return "";
  }

  if (PLACEHOLDER_TOKENS.has(token.toLowerCase())) {
    return "";
  }

  return token;
}

function getGitHubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "dev-match-app",
  };

  const token = getGitHubToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function githubRequest(pathname, searchParams = {}, options = {}) {
  const url = new URL(`${GITHUB_API_URL}${pathname}`);

  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  let response;

  try {
    response = await fetch(url, {
      headers: getGitHubHeaders(),
    });
  } catch (error) {
    error.status = 503;
    error.message = "Could not reach GitHub";
    throw error;
  }

  const usedToken = Boolean(getGitHubToken());

  if (response.status === 401 && usedToken && !options.skipAuthRetry) {
    response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "dev-match-app",
      },
    });
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const error = new Error("GitHub request failed");
    error.status = response.status;
    error.rateLimitReset = response.headers.get("x-ratelimit-reset");
    error.githubMessage = payload?.message || "";
    throw error;
  }

  return response.json();
}

async function fetchGitHubUser(username) {
  return githubRequest(`/users/${username}`);
}

async function fetchGitHubRepos(username) {
  return githubRequest(`/users/${username}/repos`, {
    per_page: 100,
    sort: "updated",
  });
}

function buildProfile(githubUser, repos) {
  const activityCalendar = createEmptyActivityCalendar();
  const topSkill = getTopSkill(repos);
  const dna = getDeveloperDNA(repos);
  const topLanguages = getTopLanguages(repos);

  return {
    name: githubUser.name || githubUser.login || "Unknown Developer",
    login: githubUser.login || "",
    avatar_url: githubUser.avatar_url || "",
    bio: githubUser.bio || "",
    followers: Number(githubUser.followers || 0),
    following: Number(githubUser.following || 0),
    repoCount: Number(githubUser.public_repos || repos.length || 0),
    topSkill,
    dna,
    topLanguages,
    activityScore: getActivityScore(githubUser, repos, 0),
    contributionCount: 0,
    contributionSource: "unavailable",
    hasRealContributionActivity: false,
    activityCalendar,
  };
}

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

async function getStoredUser(username) {
  if (!isDatabaseConnected()) {
    return null;
  }

  try {
    return await User.findOne({ githubUsername: normalizeUsername(username) }).lean();
  } catch (error) {
    console.error("Could not read user:", error.message);
    return null;
  }
}

async function saveUser(username, profile) {
  if (!isDatabaseConnected()) {
    return;
  }

  try {
    await User.findOneAndUpdate(
      { githubUsername: normalizeUsername(username) },
      { githubUsername: normalizeUsername(username), ...profile },
      { upsert: true, new: true },
    );
  } catch (error) {
    console.error("Could not save user:", error.message);
  }
}

async function getUserProfile(request, response) {
  const username = request.params.username ? request.params.username.trim() : "";

  if (!username) {
    return response.status(400).json({
      message: "Username is required",
    });
  }

  try {
    const storedUser = await getStoredUser(username);

    if (storedUser) {
      return response.json(storedUser);
    }

    const [githubUser, repos] = await Promise.all([
      fetchGitHubUser(username),
      fetchGitHubRepos(username),
    ]);
    const profile = buildProfile(githubUser, repos);

    await saveUser(username, profile);

    return response.json(profile);
  } catch (error) {
    console.error("Failed to load GitHub profile:", error.githubMessage || error.message);

    if (error.status === 404) {
      return response.status(404).json({
        message: "User not found",
      });
    }

    if (error.status === 401) {
      return response.status(502).json({
        message: "GitHub authentication failed. Update or remove GITHUB_TOKEN in backend/.env.",
      });
    }

    if (error.status === 403 || error.status === 429) {
      const resetTime = error.rateLimitReset
        ? new Date(Number(error.rateLimitReset) * 1000).toLocaleTimeString()
        : null;

      return response.status(429).json({
        message: resetTime ? `GitHub rate limit reached. Try again after ${resetTime}.` : "GitHub rate limit reached.",
      });
    }

    if (error.status === 503) {
      return response.status(503).json({
        message: "Could not reach GitHub. Check your internet connection and try again.",
      });
    }

    return response.status(500).json({
      message: "Failed to fetch GitHub profile",
    });
  }
}

module.exports = {
  getUserProfile,
};
