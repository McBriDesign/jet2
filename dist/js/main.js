"use strict";

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

var currentlyOpenModals = [];

var noModalsOpen = function noModalsOpen() {
  return !currentlyOpenModals.length;
};

var openModal = function openModal(modalId) {
  var modalWrapper = document.getElementById(modalId);
  modalWrapper.classList.remove("modalContainer--hide");
  currentlyOpenModals.push(modalWrapper);
};

var closeTopmostModal = function closeTopmostModal() {
  if (noModalsOpen()) {
    return;
  }

  var modalWrapper = currentlyOpenModals[currentlyOpenModals.length - 1];
  modalWrapper.classList.add("modalContainer--hide");
  currentlyOpenModals.pop();
};

var modalTriggers = document.querySelectorAll(".open");
modalTriggers.forEach(function (modalTrigger) {
  modalTrigger.addEventListener("click", function (clickEvent) {
    var trigger = clickEvent.target;
    var modalId = trigger.getAttribute("data-modal-id");
    openModal(modalId);
  });
});
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