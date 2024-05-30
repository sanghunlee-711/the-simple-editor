module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'html'],
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: 'coverage/test-report.html',
                includeFailureMsg: true,
                includeConsoleLog: true,
            },
        ],
    ],
}
