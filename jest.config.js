const ignoreDirs = [
    "dist",
]

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ignoreDirs,
    coveragePathIgnorePatterns: ignoreDirs,
    watchPathIgnorePatterns: ignoreDirs
};
