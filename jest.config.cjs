/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/types.ts",
    "src/server/index.ts",
    "!src/database/models/User.ts",
    "!src/**/index.ts",
    "!src/server/routers/**/*",
    "!src/loadEnviroment.ts",
    "!src/database/connectToDatabase.ts",
  ],
};
