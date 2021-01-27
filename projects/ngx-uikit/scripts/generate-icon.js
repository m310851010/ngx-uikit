
const fs = require('fs');
const path = require('path');

async function generateIconFile() {
  const iconsDir = path.resolve(__dirname, '../src/icons');

  const iconNames = [];
  const iconExportNames = [];

  const callback = function (data, error) {
    if (error || data.isDir){
      error && console.error(error);
      return;
    }

    const svgName = path.basename(data.path, path.extname(data.path));
    let viewBox = svgName.match(/viewBox[ =]*"([\d ]+)"/);
    viewBox = viewBox && viewBox.length ? viewBox[1] : '0 0 20 20';

    const cameName = svgName.replace(/[\-_](\w)/gi, function(all, letter){
      return letter? letter.toUpperCase() : '';
    });
    const iconExportName = 'NkIcon' + cameName.substring(0, 1).toUpperCase() + cameName.substring(1);
    iconNames.push(svgName);
    iconExportNames.push(iconExportName);

    const content = fs.readFileSync(data.path, 'utf8');
    const icon = content.replace(/<svg[^>]*>/, '').replace('</svg>', '').trim();
    const iconPath = path.resolve(__dirname, `../src/components/icon/icon-type/${svgName}.ts`);
    console.log(`创建图标"${svgName}"文件=>${iconPath}`);

    fs.writeFileSync(
      iconPath,
      `// 该文件由generate.js生成
// tslint:disable

import {NkIcon} from '../../core/type/nk-types';

export const ${iconExportName}: NkIcon = {
  name: '${svgName}',
  viewBox: '${viewBox}',
  icon: \`${icon}\`
};
`,
      {encoding: 'utf8', flag: 'w+'}
    );
  };

  const filter = function (data) {
    return data.isDir || (data.isFile && /\.svg$/ig.test(data.path));
  };

  listDir(iconsDir, callback, filter);

  const iconNamesPath = path.resolve(__dirname, `../src/components/icon/nk-icon-names.ts`)
  console.log(`创建nk-icon-names.ts文件=>${iconNamesPath}`);

  fs.writeFileSync(
    iconNamesPath,
    `export const nkIconNames = [
  ${iconNames.map(value => `'${value}'`).join(',\n')}
  ];
`,
    {encoding: 'utf8', flag: 'w+'}
  );

  let exportStr = '// 该文件由generate.js生成\n';
  for (let i = 0; i < iconNames.length; i++) {
    exportStr += `export { ${iconExportNames[i]} } from './${iconNames[i]}';\n`
  }


  const publicApiPath = path.resolve(__dirname, `../src/components/icon/icon-type/public_api.ts`)
  console.log(`创建public_api.ts文件=>${iconNamesPath}`);

  fs.writeFileSync(
    publicApiPath,
    exportStr, {encoding: 'utf8', flag: 'w+'});

}

// callback: (data: {isFile: boolean, isDir: boolean, path: string}, error: Error) => void
// filter: (data: {isFile: boolean, isDir: boolean, path: string}) => boolean
// 递归遍历文件夹
function listDir(rootDir, callback, filter) {
  filter = filter || function () {
    return true
  };

  let files;
  try {
    files = fs.readdirSync(rootDir);
  } catch (err) {
    console.error(err);
    console.log('++++')
    return
  }

  files.forEach((filename, index) => {
    let pathname = path.join(rootDir, filename)
    const stats = fs.statSync(pathname);

    const data = {isFile: stats.isFile(), isDir: stats.isDirectory(), path: pathname};
    if (!data.isDir && !data.isFile) {
      return;
    }

    if (!filter(data)) {
      return
    }

    callback(data);
    if (data.isDir) {
      listDir(pathname, callback, filter);
    }
  });
}

generateIconFile();
