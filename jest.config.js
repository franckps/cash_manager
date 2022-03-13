module.exports = {
  roots: ["<rootDir>"],
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
};
