module.exports = {
    presets: [
        [
            'next/babel',
            {
                'useBuiltIns': 'usage',
                'corejs': 3,
            },
        ],
        '@babel/preset-env',
        ['@babel/preset-react', {runtime: 'automatic'}],
    ],
};
