(function () {
  "use strict";

  const root = document.querySelector("[data-atlas-root]");
  const dataNode = document.getElementById("flow-control-atlas-data");

  if (!root || !dataNode) {
    return;
  }

  let model;

  try {
    model = JSON.parse(dataNode.textContent);
  } catch (error) {
    console.error("Flow Control Atlas data could not be loaded.", error);
    return;
  }

  const language = root.dataset.language === "zh" ? "zh" : "en";
  const ui = model.ui[language] || model.ui.en;
  const stateKey = "nuvon-flow-control-atlas:state";
  const rfqKey = "nuvon-flow-control-atlas:rfq";

  const localize = (value) => {
    if (value == null) return "";
    if (Array.isArray(value)) return value.map(localize);
    if (typeof value === "object") return value[language] || value.en || "";
    return String(value);
  };

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const appendList = (parent, items) => {
    const list = element("ul", "atlas__list");
    items.filter(Boolean).forEach((item) => {
      list.appendChild(element("li", "", item));
    });
    parent.appendChild(list);
    return list;
  };

  const unique = (items) => [...new Set(items.filter(Boolean))];
  const findById = (collection, id) => collection.find((item) => item.id === id);
  const getControl = (name) => root.querySelector(`[data-atlas-control="${name}"]`);
  const getResult = (name) => root.querySelector(`[data-atlas-result="${name}"]`);

  const collections = {
    fluid: model.fluids,
    duty: model.duties,
    temperature: model.temperatureBands,
    pressure: model.pressureBands,
    solids: model.solidStates,
    actuation: model.actuationModes,
    connection: model.connectionModes
  };

  const defaults = {
    fluid: "water",
    duty: "isolation",
    temperature: "moderate",
    pressure: "standard",
    solids: "clean",
    actuation: "manual",
    connection: "flanged"
  };

  const safeStorageRead = (key) => {
    try {
      return JSON.parse(window.localStorage.getItem(key) || "{}");
    } catch (_error) {
      return {};
    }
  };

  const safeStorageWrite = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      // The tool still works if private-browsing policy blocks local storage.
    }
  };

  const savedState = safeStorageRead(stateKey);

  Object.entries(collections).forEach(([name, collection]) => {
    const control = getControl(name);
    if (!control) return;

    collection.forEach((item) => {
      const option = element("option", "", localize(item.label || item.name));
      option.value = item.id;
      control.appendChild(option);
    });

    const requested = savedState[name] || defaults[name];
    control.value = collection.some((item) => item.id === requested)
      ? requested
      : collection[0].id;
  });

  const readSelection = () =>
    Object.fromEntries(
      Object.keys(collections).map((name) => [name, getControl(name).value])
    );

  const renderTagGroup = (parent, label, ids, collection) => {
    const group = element("div", "atlas__group");
    group.appendChild(element("div", "atlas__group-title", label));
    const tags = element("div", "atlas__tags");

    ids.forEach((id) => {
      const item = findById(collection, id);
      if (!item) return;
      const tag = element("span", "atlas__tag");
      if (item.code) tag.appendChild(element("code", "", item.code));
      tag.appendChild(element("span", "", localize(item.name || item.label)));
      if (item.verify) tag.title = localize(item.verify);
      tags.appendChild(tag);
    });

    if (!tags.childElementCount) {
      tags.appendChild(element("p", "atlas__empty", ui.empty));
    }

    group.appendChild(tags);
    parent.appendChild(group);
  };

  const renderSelection = () => {
    const selection = readSelection();
    safeStorageWrite(stateKey, selection);

    const fluid = findById(model.fluids, selection.fluid);
    const duty = findById(model.duties, selection.duty);
    const temperature = findById(model.temperatureBands, selection.temperature);
    const pressure = findById(model.pressureBands, selection.pressure);
    const solids = findById(model.solidStates, selection.solids);
    const actuation = findById(model.actuationModes, selection.actuation);
    const connection = findById(model.connectionModes, selection.connection);

    const materialBuckets = {
      starting: [...fluid.starting],
      conditional: [...fluid.conditional],
      specialist: [...fluid.specialist]
    };

    ["starting", "conditional"].forEach((bucket) => {
      materialBuckets[bucket] = materialBuckets[bucket].filter((id) => {
        const material = findById(model.materials, id);
        if (material && temperature.level > material.maxLevel) {
          materialBuckets.specialist.push(id);
          return false;
        }
        return true;
      });
    });
    materialBuckets.specialist = unique(materialBuckets.specialist);

    const materialResult = getResult("materials");
    materialResult.replaceChildren();
    renderTagGroup(materialResult, ui.result.starting, materialBuckets.starting, model.materials);
    renderTagGroup(materialResult, ui.result.conditional, materialBuckets.conditional, model.materials);
    renderTagGroup(materialResult, ui.result.specialist, materialBuckets.specialist, model.materials);

    let valveIds = [...duty.valves];
    if (selection.solids === "suspended") {
      valveIds.push("diaphragm", "strainer");
    }
    if (selection.solids === "crystallizing") {
      valveIds.push("diaphragm");
    }
    if (selection.solids === "abrasive") {
      valveIds.push("pinch", "diaphragm", "strainer");
    }
    if (selection.actuation === "modulating") {
      valveIds.push("control_ball", "globe", "diaphragm");
    }

    const valveResult = getResult("valves");
    valveResult.replaceChildren();
    renderTagGroup(valveResult, localize(duty.label), unique(valveIds), model.valves);

    const sealResult = getResult("seals");
    sealResult.replaceChildren();
    renderTagGroup(
      sealResult,
      language === "zh" ? "需逐一核对配方与接液结构" : "Verify compound and wetted construction",
      fluid.seals,
      model.seals
    );

    const risks = unique([
      ...localize(fluid.warnings),
      localize(temperature.note),
      localize(pressure.note),
      localize(solids.note),
      localize(actuation.note),
      localize(connection.note)
    ]);
    const riskResult = getResult("risks");
    riskResult.replaceChildren();
    appendList(riskResult, risks);

    const generalQuestions =
      language === "zh"
        ? [
            "具体产品系列、口径和完整接液材料清单是什么？",
            "制造商当前压力—温度曲线、耐化学资料和书面限制是什么？",
            "项目要求哪些图纸、证书、试验记录、追溯和法规文件？"
          ]
        : [
            "What are the exact product series, size, and complete wetted-material list?",
            "What do the current manufacturer pressure-temperature curve, chemical data, and written limitations state?",
            "Which drawings, certificates, test records, traceability, and regulatory documents does the project require?"
          ];
    const questions = unique([
      ...localize(fluid.questions),
      ...localize(duty.questions),
      ...generalQuestions
    ]);
    const questionResult = getResult("questions");
    questionResult.replaceChildren();
    appendList(questionResult, questions);

    const evidenceResult = getResult("evidence");
    evidenceResult.replaceChildren();
    const evidenceGrid = element("div", "atlas__evidence-grid");
    model.evidence.forEach((entry) => {
      const item = element("section", "atlas__evidence");
      item.appendChild(element("h4", "", localize(entry.label)));
      appendList(item, localize(entry.items));
      evidenceGrid.appendChild(item);
    });
    evidenceResult.appendChild(evidenceGrid);
  };

  const definitionRow = (definition, term, description) => {
    definition.appendChild(element("dt", "", term));
    const value = Array.isArray(description) ? description.join(" · ") : description;
    definition.appendChild(element("dd", "", value || "—"));
  };

  const materialCard = (material) => {
    const card = element("article", "atlas__card");
    const head = element("div", "atlas__card-head");
    head.appendChild(element("h3", "", localize(material.name)));
    head.appendChild(element("span", "atlas__code", material.code));
    card.appendChild(head);
    card.appendChild(element("p", "atlas__card-summary", localize(material.role)));
    const definition = element("dl", "atlas__definition");
    definitionRow(definition, ui.library.role, localize(material.type));
    definitionRow(definition, ui.library.strengths, localize(material.strengths));
    definitionRow(definition, ui.library.constraints, localize(material.constraints));
    definitionRow(definition, ui.library.joins, localize(material.joins));
    definitionRow(definition, ui.library.verify, localize(material.verify));
    card.appendChild(definition);
    return card;
  };

  const sealCard = (seal) => {
    const card = element("article", "atlas__card");
    const head = element("div", "atlas__card-head");
    head.appendChild(element("h3", "", localize(seal.name)));
    head.appendChild(element("span", "atlas__code", seal.code));
    card.appendChild(head);
    const definition = element("dl", "atlas__definition");
    definitionRow(definition, ui.library.strengths, localize(seal.strengths));
    definitionRow(definition, ui.library.constraints, localize(seal.constraints));
    definitionRow(definition, ui.library.verify, localize(seal.verify));
    card.appendChild(definition);
    return card;
  };

  const valveCard = (valve) => {
    const card = element("article", "atlas__card");
    const head = element("div", "atlas__card-head");
    head.appendChild(element("h3", "", localize(valve.name)));
    head.appendChild(element("span", "atlas__code", valve.code));
    card.appendChild(head);
    const definition = element("dl", "atlas__definition");
    definitionRow(definition, ui.library.bestFor, localize(valve.bestFor));
    definitionRow(definition, ui.library.watch, localize(valve.watch));
    definitionRow(definition, ui.library.parameters, localize(valve.parameters));
    card.appendChild(definition);
    return card;
  };

  const fluidCard = (fluid) => {
    const card = element("article", "atlas__card");
    const head = element("div", "atlas__card-head");
    head.appendChild(element("h3", "", localize(fluid.label)));
    card.appendChild(head);
    card.appendChild(element("p", "atlas__card-summary", localize(fluid.summary)));
    const definition = element("dl", "atlas__definition");
    definitionRow(definition, ui.library.drivers, localize(fluid.drivers));
    const startingNames = fluid.starting
      .map((id) => findById(model.materials, id))
      .filter(Boolean)
      .map((item) => item.code);
    definitionRow(definition, ui.library.startingMaterials, startingNames);
    definitionRow(definition, ui.library.questions, localize(fluid.questions));
    card.appendChild(definition);
    return card;
  };

  const libraries = {
    materials: {
      node: root.querySelector('[data-atlas-library="materials"]'),
      items: model.materials,
      render: materialCard
    },
    seals: {
      node: root.querySelector('[data-atlas-library="seals"]'),
      items: model.seals,
      render: sealCard
    },
    valves: {
      node: root.querySelector('[data-atlas-library="valves"]'),
      items: model.valves,
      render: valveCard
    },
    fluids: {
      node: root.querySelector('[data-atlas-library="fluids"]'),
      items: model.fluids,
      render: fluidCard
    }
  };

  const searchableText = (item) => {
    const values = [];
    const visit = (value) => {
      if (Array.isArray(value)) {
        value.forEach(visit);
      } else if (value && typeof value === "object") {
        visit(value[language]);
        visit(value.en);
      } else if (value != null) {
        values.push(String(value));
      }
    };
    visit(item);
    return values.join(" ").toLocaleLowerCase(language);
  };

  const renderLibrary = (name, query = "") => {
    const library = libraries[name];
    if (!library || !library.node) return;
    const normalized = query.trim().toLocaleLowerCase(language);
    const items = normalized
      ? library.items.filter((item) => searchableText(item).includes(normalized))
      : library.items;
    library.node.replaceChildren();
    items.forEach((item) => library.node.appendChild(library.render(item)));
    if (!items.length) {
      library.node.appendChild(element("p", "atlas__empty", ui.empty));
    }
  };

  Object.keys(libraries).forEach((name) => renderLibrary(name));

  root.querySelectorAll("[data-atlas-search]").forEach((input) => {
    input.addEventListener("input", () => {
      renderLibrary(input.dataset.atlasSearch, input.value);
    });
  });

  const tabs = [...root.querySelectorAll("[data-atlas-tab]")];
  const panels = [...root.querySelectorAll("[data-atlas-panel]")];

  const activateTab = (name, focus = false) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.atlasTab === name;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.atlasPanel !== name;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.atlasTab);
      window.history.replaceState(null, "", `#${tab.dataset.atlasTab}`);
    });
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      activateTab(tabs[nextIndex].dataset.atlasTab, true);
    });
  });

  const requestedTab = window.location.hash.replace("#", "");
  if (tabs.some((tab) => tab.dataset.atlasTab === requestedTab)) {
    activateTab(requestedTab);
  }

  root.querySelectorAll("[data-atlas-control]").forEach((control) => {
    control.addEventListener("change", renderSelection);
  });

  const rfqFieldNames = [
    "project",
    "fluid",
    "concentration",
    "temperature",
    "pressure",
    "flow",
    "size",
    "connection",
    "function",
    "materials",
    "operation",
    "solids",
    "quantity",
    "documents",
    "notes"
  ];
  const textareaFields = new Set(["materials", "solids", "documents", "notes"]);
  const fullFields = new Set(["materials", "solids", "documents", "notes"]);
  const rfqFieldsNode = root.querySelector("[data-atlas-rfq-fields]");
  const savedRfq = safeStorageRead(rfqKey);

  rfqFieldNames.forEach((name) => {
    const label = element(
      "label",
      `atlas__field${fullFields.has(name) ? " atlas__field--full" : ""}`
    );
    label.appendChild(element("span", "", ui.rfq[name]));
    const control = document.createElement(textareaFields.has(name) ? "textarea" : "input");
    control.className = "atlas__control";
    control.name = name;
    control.dataset.atlasRfqField = name;
    if (!textareaFields.has(name)) control.type = "text";
    control.value = savedRfq[name] || "";
    label.appendChild(control);
    rfqFieldsNode.appendChild(label);
  });

  const output = root.querySelector("[data-atlas-rfq-output]");
  const outputWrap = output.closest(".atlas__rfq-output");
  const printOutput = element("pre", "atlas__print-summary");
  outputWrap.insertBefore(printOutput, output.nextSibling);

  const currentRfq = () =>
    Object.fromEntries(
      rfqFieldNames.map((name) => [
        name,
        root.querySelector(`[data-atlas-rfq-field="${name}"]`).value.trim()
      ])
    );

  const generateSummary = () => {
    const values = currentRfq();
    const selection = readSelection();
    const selectedLabels = Object.fromEntries(
      Object.entries(selection).map(([name, id]) => {
        const item = findById(collections[name], id);
        return [name, localize(item.label || item.name)];
      })
    );
    const unknown = language === "zh" ? "待确认" : "To be confirmed";
    const line = (label, value) => `${label}: ${value || unknown}`;
    const lines =
      language === "zh"
        ? [
            "Nuvon Flow Control｜RFQ 初步评审摘要",
            `知识模型版本: ${model.version}`,
            "",
            "一、当前筛选路径",
            line(ui.fields.fluid, selectedLabels.fluid),
            line(ui.fields.duty, selectedLabels.duty),
            line(ui.fields.temperature, selectedLabels.temperature),
            line(ui.fields.pressure, selectedLabels.pressure),
            line(ui.fields.solids, selectedLabels.solids),
            line(ui.fields.actuation, selectedLabels.actuation),
            line(ui.fields.connection, selectedLabels.connection),
            "",
            "二、客户与工况输入",
            ...rfqFieldNames.map((name) => line(ui.rfq[name], values[name])),
            "",
            "三、使用边界",
            ui.disclaimer
          ]
        : [
            "Nuvon Flow Control | Preliminary RFQ Review Summary",
            `Knowledge model version: ${model.version}`,
            "",
            "1. Current screening path",
            line(ui.fields.fluid, selectedLabels.fluid),
            line(ui.fields.duty, selectedLabels.duty),
            line(ui.fields.temperature, selectedLabels.temperature),
            line(ui.fields.pressure, selectedLabels.pressure),
            line(ui.fields.solids, selectedLabels.solids),
            line(ui.fields.actuation, selectedLabels.actuation),
            line(ui.fields.connection, selectedLabels.connection),
            "",
            "2. Customer and duty inputs",
            ...rfqFieldNames.map((name) => line(ui.rfq[name], values[name])),
            "",
            "3. Use boundary",
            ui.disclaimer
          ];

    const summary = lines.join("\n");
    output.value = summary;
    printOutput.textContent = summary;
    safeStorageWrite(rfqKey, values);
    return summary;
  };

  root.querySelector("[data-atlas-rfq-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    generateSummary();
  });

  root.querySelectorAll("[data-atlas-rfq-field]").forEach((field) => {
    field.addEventListener("input", () => safeStorageWrite(rfqKey, currentRfq()));
  });

  const feedback = root.querySelector("[data-atlas-feedback]");
  const setFeedback = (message) => {
    feedback.textContent = message;
    window.setTimeout(() => {
      if (feedback.textContent === message) feedback.textContent = "";
    }, 2500);
  };

  const downloadText = (filename, content, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  root.querySelector('[data-atlas-action="copy"]').addEventListener("click", async () => {
    const summary = generateSummary();
    try {
      await navigator.clipboard.writeText(summary);
    } catch (_error) {
      output.focus();
      output.select();
      document.execCommand("copy");
    }
    setFeedback(ui.rfq.copied);
  });

  root
    .querySelector('[data-atlas-action="download-rfq"]')
    .addEventListener("click", () => {
      downloadText("nuvon-flow-control-rfq.txt", generateSummary(), "text/plain;charset=utf-8");
    });

  root.querySelector('[data-atlas-action="print"]').addEventListener("click", () => {
    generateSummary();
    window.print();
  });

  root
    .querySelector('[data-atlas-action="download-model"]')
    .addEventListener("click", () => {
      const version = model.version.replaceAll(".", "-");
      downloadText(
        `nuvon-flow-control-atlas-${version}.json`,
        JSON.stringify(model, null, 2),
        "application/json;charset=utf-8"
      );
    });

  const sourcesNode = root.querySelector("[data-atlas-sources]");
  model.sources.forEach((source) => {
    const item = element("article", "atlas__source");
    const link = element("a", "", source.title);
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    item.appendChild(link);
    item.appendChild(element("p", "", localize(source.scope)));
    sourcesNode.appendChild(item);
  });

  renderSelection();
  generateSummary();
})();
