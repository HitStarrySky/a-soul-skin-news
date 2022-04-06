import { rollup } from 'rollup';
import type { Plugin } from 'rollup';
import vue from '@vitejs/plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import path from 'path';
import { enterPath, buildOutpath } from './utils/path';
import replace from '@rollup/plugin-replace';
import { html } from './plugin/rollup-plugin-html';
import { image } from './plugin/rollup-plugin-images';
const buildVueBunless = () => {
  const plugins = [
    image({
      output: `${buildOutpath}/assets/images`,
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 8192,
      exclude: 'node_modules/**',
      hash: true
    }),
    vue({
      isProduction: true
    }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    commonjs(),
    esbuild({
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      minify: false,
      loaders: {
        '.vue': 'ts'
      }
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BASE_URL': JSON.stringify('/')
    }),
    html({
      template: path.resolve(enterPath, 'source/html/popup.html'),
      style: ['../style/popup.css']
    })
  ] as Plugin[];
  return plugins;
};
const buildTsBunless = () => {
  const plugins = [
    nodeResolve({ extensions: ['ts', 'js', 'json', '.vue'] }),
    commonjs(),
    esbuild({
      sourceMap: false,
      minify: false,
      tsconfig: path.resolve(__dirname, '../tsconfig.json')
    })
  ];
  return plugins;
};
const getBundle = async (input: string, isVUe = false) => {
  return rollup({
    input: input,
    plugins: isVUe ? buildVueBunless() : buildTsBunless()
  });
};
const buildPopup = async () => {
  const popupEnter = path.resolve(enterPath, 'views/popup/index.ts');
  const popupBundles = await getBundle(popupEnter, true);
  await popupBundles.write({
    format: 'umd',
    file: '../dist/popup/popup.js'
  });
};
const buildBackGround = async () => {
  const bgEnter = path.resolve(enterPath, 'script/background.ts');
  const bgBundles = await getBundle(bgEnter);
  await bgBundles.write({
    format: 'umd',
    file: '../dist/background.js'
  });
};
export const buildBundles = () =>
  Promise.all([buildPopup(), buildBackGround()]);
