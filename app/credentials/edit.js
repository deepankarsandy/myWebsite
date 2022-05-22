#!/usr/bin/node

import { readFileSync, writeFileSync, rm } from 'fs';
import path from 'path';
import childProcess from 'child_process';

import { encrypt, decrypt } from './crypto.js';

const env = process.env.NODE_ENV || 'development';
const filename = path.join(`app/credentials/${env}.json`);
const editor = process.env.EDITOR || 'vi';

writeFileSync(filename, decrypt());

const child = childProcess.spawn(editor, [filename], { stdio: 'inherit' });

child.on('exit', () => {
  encrypt(readFileSync(filename));
  rm(filename, {}, () => console.log('tmp file deleted'));
});
