/* eslint-env node */
/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue2-jest',
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(png|jpe?g|gif|svg)$': '<rootDir>/tests/unit/__mocks__/fileMock.js',
    },
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    testMatch: ['**/tests/unit/**/*.spec.[jt]s'],
    setupFilesAfterEnv: ['<rootDir>/tests/unit/setupTests.js']
}
