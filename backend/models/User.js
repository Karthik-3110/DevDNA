const mongoose = require("mongoose");

const topLanguageSchema = new mongoose.Schema(
  {
    name: String,
    percentage: Number,
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    githubUsername: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: String,
    login: String,
    avatar_url: String,
    bio: String,
    followers: Number,
    following: Number,
    repoCount: Number,
    topSkill: String,
    dna: String,
    topLanguages: [topLanguageSchema],
    activityScore: Number,
    contributionCount: Number,
    contributionSource: String,
    hasRealContributionActivity: Boolean,
    activityCalendar: mongoose.Schema.Types.Mixed,
  },
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
