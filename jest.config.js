module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/ts-jest",
  },
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
};
