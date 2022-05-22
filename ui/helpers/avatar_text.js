/*
modification history
--------------------
01a,09aug2020,deepankar created
*/

import { reduce } from 'ramda';
import { capitalizeAll } from 'ramda-extension';

import isEmpty from './isEmpty';

const swatches = [
  '#64a758',
  '#82d998',
  '#c2f698',
  '#f3ef86',
  '#c7d52a',
  '#dfcc20',
  '#f76408',
  '#fe8801',
  '#b3944d',
  '#e3a41c',
  '#405412',
  '#758e71',
  '#cdc4a2',
  '#6a25da',
  '#b81ac7',
  '#7a5da2',
  '#9b7aa8',
  '#bdb3ff',
  '#817986',
  '#a48874',
  '#b6e1f7',
  '#4aa3b5',
  '#6bc7a5',
  '#779a65',
  '#ecfac7'
];

/**
* converts hex color to rgb
* @param hex color
* @returns rgb color
*/
function hexToRgb(hex){
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
}

/**
* compute the brightness of a color (0-255) in the YIQ color space.
*/
function getYiqBrightness(hexColor){
  const rgb = hexToRgb(hexColor);
  return ((rgb.R * 299) + (rgb.G * 587) + (rgb.B * 114)) / 1000;
}

function getHash(str, max){
  return reduce(
    (h, c) => (
      // eslint-disable-next-line no-bitwise
      Math.abs(c.charCodeAt(0) + (h << 6) + (h << 16) - h)
    ),
    0,
    str
  ) % (max - 1);
}

function getColor(str){
  return swatches[getHash(str, swatches.length)];
}

function getContrastColor(hexColor){
  return getYiqBrightness(hexColor) > 128 ? 'rgba(0, 0, 0, .5)' : 'rgba(255,255,255, .5)';
}

function getStyle(name){
  if (isEmpty(name)) return {};
  const bgColor = getColor(name);
  return { backgroundColor: bgColor, color: getContrastColor(bgColor) };
}

function getInitials(name){
  if (isEmpty(name)) return name;

  const words = name.split(' ');

  if (words.length > 1){
    return [words[0][0], words.pop()[0]].join('').toUpperCase();
  }

  return capitalizeAll(name.slice(0, 2));
}

export default { getInitials, getStyle };
