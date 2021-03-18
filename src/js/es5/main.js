"use strict";

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}


var currentlyOpenModals = [];

var noModalsOpen = function noModalsOpen() {
  return !currentlyOpenModals.length;
};


var modalTriggers = document.querySelectorAll(".open");
modalTriggers.forEach(function (modalTrigger) {
  modalTrigger.addEventListener("click", function (clickEvent) {
    var trigger = clickEvent.target;
    var modalId = trigger.getAttribute("data-modal-id");
    openModal(modalId);
  });
}); // Otherwise, clicking the content of a modal will propagate the click to the modal wrapper,
// and that will close the entire thing. That's not what we want!

document.querySelectorAll(".modalContainer__modal").forEach(function (modal) {
  modal.addEventListener("click", function (clickEvent) {
    clickEvent.stopPropagation();
  });
});
var modalWrappers = document.querySelectorAll(".modalContainer");
modalWrappers.forEach(function (modalWrapper) {
  modalWrapper.addEventListener("click", function () {
    closeTopmostModal();
  });
});
document.querySelectorAll(".close").forEach(function (closeModalButton) {
  closeModalButton.addEventListener("click", function () {
    closeTopmostModal();
  });
});
//# sourceMappingURL=main.js.map