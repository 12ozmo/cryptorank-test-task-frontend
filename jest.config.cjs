// module.exports = async() => ({
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   preset: 'ts-jest',
//   // moduleNameMapper: {
//   //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   //   '^@/components/(.*)$': '<rootDir>/src/components/$1',
//   //   '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
//   //   '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
//   //   '^@/StyledComponents$': '<rootDir>/src/StyledComponents.ts',
//   // },
//   // transform: {
//   //   '^.+\\.[t|j]sx?$': 'ts-jest',
//   //   '^.+\\.tsx?$': 'ts-jest',
//   //   "\\.js$": "<rootDir>/node_modules/babel-jest"
//   // },
//   transform: {
//     "^.+\\.(js|ts)$": "ts-jest",
//   },
//   // testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
//   // testPathIgnorePatterns: ['/node_modules/', '/.next/'],
//   // // transformIgnorePatterns: ['/node_modules/'],
//   // transformIgnorePatterns: [
//   //   "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
//   //   "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
//   //   "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
//   // ],
//   // collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/.next/**'],
// });

// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path to Next.js app to load next.config.js
  dir: './'
})

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  preset: 'ts-jest',
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  //   '^@/components/(.*)$': '<rootDir>/src/components/$1',
  //   '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
  //   '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
  //   '^@/StyledComponents$': '<rootDir>/src/StyledComponents.ts',
  // },
  // transform: {
  //   '^.+\\.[t|j]sx?$': 'ts-jest',
  //   '^.+\\.tsx?$': 'ts-jest',
  //   "\\.js$": "<rootDir>/node_modules/babel-jest"
  // },
  transform: {
    "^.+\\.(js|ts)$": "ts-jest",
  },
  // testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
  // testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  // // transformIgnorePatterns: ['/node_modules/'],
  // transformIgnorePatterns: [
  //   "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
  //   "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
  //   "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
  // ],
  // collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/.next/**'],
}

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    // The regex below is just a guess, you might tweak it
    'node_modules/(?!(react-markdown|rehype-raw|remark-gfm)/)',
  ]
})