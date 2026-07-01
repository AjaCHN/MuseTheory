// eslint.config.mjs v0.0.8
import next from 'eslint-config-next';

export default [
  ...next,
  {
    ignores: ['node_modules/', '.next/', 'dist/'],
  },
];
