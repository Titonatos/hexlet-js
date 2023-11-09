// import _ from 'lodash.js';
// const path = require('path');
import path from './path.js';

const mkfile = (name, meta = {}) => ({
  name,
  meta,
  type: 'file',
});

const mkdir = (name, children = [], meta = {}) => ({
  name,
  children,
  meta,
  type: 'directory',
});

const getChildren = (directory) => directory.children;

const getMeta = (node) => node.meta;

const getName = (node) => node.name;

const isFile = (node) => node.type === 'file';

const isDirectory = (node) => node.type === 'directory';

const map = (callbackFn, tree) => {
  const updatedNode = callbackFn(tree);

  return isDirectory(tree)
    ? { ...updatedNode, children: tree.children.map((n) => map(callbackFn, n)) }
    : updatedNode;
};

const reduce = (callbackFn, tree, acc) => {
  const newAcc = callbackFn(acc, tree);

  if (isFile(tree)) {
    return newAcc;
  }
  return tree.children.reduce((iAcc, n) => reduce(callbackFn, n, iAcc), newAcc);
};

const filter = (callbackFn, tree) => {
  if (!callbackFn(tree)) {
    return null;
  }

  return isDirectory(tree)
    ? { ...tree, children: tree.children.map((n) => filter(callbackFn, n)).filter((v) => v) }
    : tree;
};

const findFilesByName = (tree, string) => {
  const iter = (node, string, ancestry) => {
    const name = getName(tree);
    const currentPath = [];
    currentPath.concat(ancestry).concat(name);

    if(isFile(node)) {
      return getName(node).includes(string) ? path.join(...currentPath): [];
    }

    return getChildren(node).flatMap((child) => iter(child, string, currentPath))
  }

  return iter(tree, string)
};

// const qwe = (str) => { 
//   let arr = []; 
//   arr = arr.concat(str);
//   console.log(arr);
// }

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

findFilesByName(tree, 'co');


// console.log(findFilesByName(tree, 'co'));


// const findFilesByName = (tree, string) => {
//   const iter = (node, string, ancestry) => {
//     const name = getName(tree);
//     const currentPath = [];
//     currentPath.concat(ancestry).concat(name);

//     if(isFile(node)) {
//       return getName(node).includes(string) ? path.join(...currentPath): [];
//     }

//     return getChildren(node).flatMap((child) => iter(child, string, currentPath))
//   }

//   return iter(tree, string)
// };

// export default findFilesByName;