// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};

const customConfig = {
  ...config,
  presets: [
    ...config.presets,
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [['relay', { schema: '../server/graphql/schema.graphql' }]],
};

module.exports = customConfig;
