#!/usr/bin/node

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import {
  createCipheriv,
  scryptSync,
  createDecipheriv
} from 'crypto';

const algorithm = 'aes-192-cbc';
const env = process.env.NODE_ENV || 'development';
let iv;
let salt;
let password;
const filename = path.join(`app/credentials/${env}.json.enc`);

// read master key
try {
  password = env === 'development'
    ? readFileSync(path.join('app/credentials/master.key'), 'utf-8')
    : process.env.MASTER_KEY;
} catch (error) {
  console.error(error);
  console.log("Error: 'master.key' not found");
}

// read iv (initial vector)
try {
  iv = readFileSync(path.join(`app/credentials/iv_${env}`));
} catch (err){
  console.error(err);
  console.log(`Error: 'credentials/iv_${env}' not found`);
}

// read salt
try {
  salt = readFileSync(path.join(`app/credentials/salt_${env}`));
} catch (err){
  console.error(err);
  console.log(`Error: 'credentials/salt_${env}' not found`);
}

function encrypt(plainData){
  if (!password || !iv || !salt) return;

  const key = scryptSync(password, salt, 24);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(plainData, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return writeFileSync(filename, encrypted);
}

function decrypt(){
  const encData = readFileSync(filename, { encoding: 'utf-8', flag: 'a+' });

  if (!encData) return encData;
  if (!password || !iv || !salt) return;

  const key = scryptSync(password, salt, 24);
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export { encrypt, decrypt };

// for CLI
if (process.argv[2] === 'encrypt'){
  encrypt(process.argv[3]);
} else if (process.argv[2] === 'decrypt'){
  decrypt();
} else {
  console.warn('USAGE: node crypto.js <encrypt|decrypt> <data>');
}
