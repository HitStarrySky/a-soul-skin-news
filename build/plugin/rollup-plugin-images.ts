import { statSync, readFileSync } from 'fs';
import fsExtra from 'fs-extra';
import type { Plugin, PluginContext } from 'rollup';
import { extname, basename, relative, normalize } from 'path';
import { createFilter } from 'rollup-pluginutils';
import hasha from 'hasha';

const mimeMap = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

interface ImageOptions {
  extensions?: RegExp;
  include?: string;
  output?: string;
  limit?: number;
  hash?: boolean;
  exclude?: string;
}

export const image = (imageOptions: ImageOptions): Plugin => {
  const pluginName = 'image';
  const extensions = imageOptions.extensions || /\.(png|jpg|jpeg|gif|svg)$/;
  const filter = createFilter(imageOptions.include, imageOptions.exclude);
  async function load(this: PluginContext, id: string) {
    if (!filter(id)) return null;
    const ext = extname(id);
    if (!extensions.test(ext)) return null;
    if (statSync(id).size <= (imageOptions.limit || 8192)) {
      return `export default "data:${mimeMap[ext]};base64,${readFileSync(
        id,
        'base64'
      )}"`;
    } else {
      const output = relative('./', imageOptions.output) || ''; // 获取方法根据当前工作目录返回从 from 到 to 的相对路径。
      await fsExtra.ensureDir(output);
      let name = basename(id);
      if (imageOptions.hash) {
        const code = readFileSync(id).toString();
        const hash = hasha(code, { algorithm: 'md5' });
        name = `${basename(id, ext)}-${hash}${ext}`;
      }
      const outputFile = `${output}/${name}`;
      await fsExtra.copySync(id, outputFile);
      const importPath = normalize(
        outputFile.replace('..\\dist\\', '../')
      ).replaceAll('\\', '/');
      return `export default "${importPath}"`;
    }
  }
  return {
    name: pluginName,
    load
  };
};
