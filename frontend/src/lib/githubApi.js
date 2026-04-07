const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export function mapProfileToCard(profile) {
  return {
    avatar: profile?.avatar_url || "",
    name: profile?.name || profile?.login || "Unknown Developer",
    username: profile?.login || "",
    bio: profile?.bio || "No bio available for this GitHub profile.",
    repos: Number(profile?.repoCount || 0),
    followers: Number(profile?.followers || 0),
    following: Number(profile?.following || 0),
    topSkill: profile?.topSkill || "Unknown",
    engineeringDNA: profile?.dna || "Full Stack Developer",
    topLanguages: Array.isArray(profile?.topLanguages) ? profile.topLanguages : [],
    activityScore: Number(profile?.activityScore || 0),
  };
}

export async function fetchProfile(username) {
  const cleanUsername = String(username || "").trim();

  if (!cleanUsername) {
    throw new Error("Username is required");
  }

  const response = await fetch(`${API_BASE_URL}/api/users/${encodeURIComponent(cleanUsername)}`);

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const error = new Error(payload?.message || "Failed to fetch profile");
    error.response = { status: response.status, data: payload };
    throw error;
  }

  return response.json();
}

export async function fetchProfileCard(username) {
  const profile = await fetchProfile(username);
  return mapProfileToCard(profile);
}
