const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const QuizAttempt = sequelize.define("QuizAttempt", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quizId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  totalQuestions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  userAnswers: {
    type: DataTypes.TEXT, // Stored as a stringified JSON array
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("userAnswers");
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue("userAnswers", JSON.stringify(value));
    },
  },
  timeSpent: {
    type: DataTypes.INTEGER, // in seconds
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt columns
  tableName: "quiz_attempts",
});

module.exports = QuizAttempt;
