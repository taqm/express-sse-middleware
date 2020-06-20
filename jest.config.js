module.exports = {
  roots: [
    '<rootDir>/test',
  ],
  testMatch: [
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
