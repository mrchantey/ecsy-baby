const ignoreDirs = [
    "dist",
]

module.exports = {
    preset: 'ts-jest',
    // moduleNameMapper: {
    //     "/src/(.*)": "<rootDir>/src/$1"
    // },

    modulePaths: ["<rootDir>/src/"],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ignoreDirs,
    coveragePathIgnorePatterns: ignoreDirs,
    watchPathIgnorePatterns: ignoreDirs
};
