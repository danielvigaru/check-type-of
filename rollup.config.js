import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'lib/index.umd.js',
            format: 'umd',
            name: 'CheckType',
        },
        {
            file: 'lib/index.mjs',
            format: 'es',
        },
    ],
    plugins: [typescript(), terser()],
};
