/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/src/testSetup.ts',
  testPathIgnorePatterns : ["/node_modules/", "/.dist/"]
  
};