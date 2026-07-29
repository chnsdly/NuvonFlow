(function () {
  "use strict";

  const dataNode = document.getElementById("flow-control-atlas-data");

  if (!dataNode) {
    return;
  }

  try {
    const parsed = JSON.parse(dataNode.textContent);
    if (typeof parsed === "string") {
      dataNode.textContent = parsed;
    }
  } catch (error) {
    console.error("Flow Control Atlas data could not be normalized.", error);
    return;
  }

  const core = document.createElement("script");
  core.src = "/js/flow-control-atlas-core.js";
  core.async = false;
  document.head.appendChild(core);
})();
