if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

let currentlyOpenModals = [];

const noModalsOpen = () => !currentlyOpenModals.length;

const openModal = modalId => {
  const modalWrapper = document.getElementById(modalId);
  modalWrapper.classList.remove("modalContainer--hide");
  currentlyOpenModals.push(modalWrapper);
};

const closeTopmostModal = () => {
  if (noModalsOpen()) {
    return;
  }

  const modalWrapper = currentlyOpenModals[currentlyOpenModals.length - 1];
  modalWrapper.classList.add("modalContainer--hide");
  currentlyOpenModals.pop();
};

const modalTriggers = document.querySelectorAll(".open");
modalTriggers.forEach(modalTrigger => {
  modalTrigger.addEventListener("click", clickEvent => {
    const trigger = clickEvent.target;
    const modalId = trigger.getAttribute("data-modal-id");
    openModal(modalId);
  });
});

document.querySelectorAll(".modalContainer__modal").forEach(modal => {
  modal.addEventListener("click", clickEvent => {
    clickEvent.stopPropagation();
  });
});

const modalWrappers = document.querySelectorAll(".modalContainer");
modalWrappers.forEach(modalWrapper => {
  modalWrapper.addEventListener("click", () => {
    closeTopmostModal();
  });
});

document.querySelectorAll(".close").forEach(closeModalButton => {
  closeModalButton.addEventListener("click", () => {
    closeTopmostModal();
  });
});
