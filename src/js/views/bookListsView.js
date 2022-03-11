import * as constants from '../constants.js';

export const closebookList = function (e) {
  if (
    e.target !== constants.toReadContainer &&
    e.target !== constants.toReadBtn
  ) {
    constants.toReadContainer.style.opacity = '0';
    constants.toReadContainer.style['z-index'] = '-1';
  }
};
