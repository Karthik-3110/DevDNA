const FRONTEND_LANGUAGES = ["JavaScript", "TypeScript", "HTML", "CSS"];
const BACKEND_LANGUAGES = ["Python", "Java", "C++", "Go", "Ruby", "PHP", "C", "Rust", "C#"];
const CONTRIBUTION_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

function countLanguages(repos) {
  const languageCounts = {};

  repos.forEach((repo) => {
    if (!repo.language) {
      return;
    }

    languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
  });

  return languageCounts;
}

function getTopSkill(repos) {
  const languageCounts = countLanguages(repos);
  const sortedLanguages = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]);

  if (sortedLanguages.length === 0) {
    return "Unknown";
  }

  return sortedLanguages[0][0];
}

function getTopLanguages(repos) {
  const languageCounts = countLanguages(repos);
  const total = Object.values(languageCounts).reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return [];
  }

  return Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => {
      return {
        name,
        percentage: Math.round((count / total) * 100),
      };
    });
}

function getDeveloperDNA(repos) {
  let frontendCount = 0;
  let backendCount = 0;

  repos.forEach((repo) => {
    if (FRONTEND_LANGUAGES.includes(repo.language)) {
      frontendCount += 1;
    }

    if (BACKEND_LANGUAGES.includes(repo.language)) {
      backendCount += 1;
    }
  });

  if (frontendCount === 0 && backendCount === 0) {
    return "Full Stack Developer";
  }

  if (frontendCount > backendCount) {
    return "Frontend Developer";
  }

  if (backendCount > frontendCount) {
    return "Backend Developer";
  }

  return "Full Stack Developer";
}

function getActivityScore(user, repos, contributionCount) {
  const repoScore = Math.min(repos.length * 2, 30);
  const followerScore = Math.min(Number(user.followers || 0) / 10, 30);
  const contributionScore = Math.min(Number(contributionCount || 0) / 5, 40);

  return Math.round(repoScore + followerScore + contributionScore);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, amount) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + amount);
  return nextDate;
}

function startOfWeek(date) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() - nextDate.getUTCDay());
  return nextDate;
}

function createEmptyActivityCalendar() {
  const to = new Date();
  to.setUTCHours(23, 59, 59, 999);

  const from = new Date(to);
  from.setUTCMonth(from.getUTCMonth() - 6);
  from.setUTCHours(0, 0, 0, 0);

  const weeks = [];
  let currentDate = startOfWeek(from);

  while (currentDate <= to) {
    const week = {
      firstDay: formatDate(currentDate),
      contributionDays: [],
    };

    for (let weekday = 0; weekday < 7; weekday += 1) {
      const date = addDays(currentDate, weekday);

      week.contributionDays.push({
        date: formatDate(date),
        weekday,
        contributionCount: 0,
        color: CONTRIBUTION_COLORS[0],
        level: 0,
        isInRange: true,
      });
    }

    weeks.push(week);
    currentDate = addDays(currentDate, 7);
  }

  return {
    from: formatDate(from),
    to: formatDate(to),
    totalContributions: 0,
    colorScale: CONTRIBUTION_COLORS,
    isRealData: false,
    source: "unavailable",
    months: [],
    weeks,
  };
}

module.exports = {
  getActivityScore,
  getDeveloperDNA,
  getTopLanguages,
  getTopSkill,
  createEmptyActivityCalendar,
};
