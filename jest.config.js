module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'apps',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^apps/(.*)$': '<rootDir>/$1',
    '^@app/common$': '<rootDir>/../libs/common/src',
    '^@app/common/(.*)$': '<rootDir>/../libs/common/src/$1',
  },
};
