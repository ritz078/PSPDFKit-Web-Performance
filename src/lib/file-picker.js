import { processFiles } from "./utils";

export default function initialize(onSuccess, onFail, shouldPreventLoad) {
  const node = document.createElement("label");
  node.classList.add("FilePicker");
  node.innerHTML = `
      <span>Select File</span>
      <input type="file" class="FilePicker-input" />
    `;

  document.body.appendChild(node);

  function handleChange(event) {
    if (!event.target.files.length || shouldPreventLoad()) {
      event.target.value = null;
      return;
    }

    processFiles([...event.target.files])
      .then(onSuccess)
      .catch(onFail);

    event.target.value = null;
  }

  node.addEventListener("change", handleChange);

  return {
    node,
    destroy: () => {
      node.removeEventListener("change", handleChange);
      node.parentNode.removeChild(node);
    }
  };
}
