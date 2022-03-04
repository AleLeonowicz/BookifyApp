import * as constants from '../constants.js';

// When the user clicks on the button, open the modal
export const openModal = function () {
  constants.modal.style.display = 'flex';
};

// When the user clicks on <span> (x), close the modal
export const closeModalBtn = function () {
  constants.modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
export const closeModal = function (e) {
  if (e.target == constants.modal) {
    constants.modal.style.display = 'none';
  }
};
