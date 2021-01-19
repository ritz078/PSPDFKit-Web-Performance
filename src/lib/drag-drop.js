import dragDrop from "drag-drop";
import { processFiles } from "./utils";

export default function initialize(onSuccess, onFail, shouldPreventLoad) {
  const dropTarget = document.createElement("div");
  dropTarget.classList.add("DropTarget");
  dropTarget.textContent = "Drop your PDF here.";

  document.body.appendChild(dropTarget);

  const dropOverlay = document.createElement("div");
  dropOverlay.classList.add("DropTargetOverlay");

  document.body.appendChild(dropOverlay);

  function handleDragEnter(event) {
    event.preventDefault();
    dropTarget.classList.remove("is-hidden");
  }

  function handleDragLeave(event) {
    event.preventDefault();
    dropTarget.classList.add("is-hidden");
  }

  // Manage the target visibility on drag.
  document.documentElement.addEventListener("dragenter", handleDragEnter);
  dropTarget.addEventListener("dragleave", handleDragLeave);

  dragDrop(dropTarget, files => {
    dropTarget.classList.add("is-hidden");
    if (shouldPreventLoad()) {
      return;
    }

    processFiles(files)
      .then(onSuccess)
      .catch(onFail);
  });

  return {
    node: dropTarget,
    destroy: () => {
      document.documentElement.removeEventListener(
        "dragenter",
        handleDragEnter
      );

      dropTarget.removeEventListener("dragleave", handleDragLeave);
      dropTarget.parentNode.removeChild(dropTarget);
      dropOverlay.parentNode.removeChild(dropOverlay);
    },

    show: () => {
      dropTarget.classList.remove("is-hidden");
      dropOverlay.classList.remove("is-hidden");
    },

    hide: () => {
      dropTarget.classList.add("is-hidden");
      dropOverlay.classList.add("is-hidden");
    }
  };
}
