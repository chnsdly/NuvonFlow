(() => {
  const forms = Array.from(document.querySelectorAll("[data-rfq-form]"));

  forms.forEach((form) => {
    const steps = Array.from(form.querySelectorAll("[data-rfq-step]"));
    const indicators = Array.from(form.querySelectorAll("[data-rfq-indicator]"));
    const backButton = form.querySelector("[data-rfq-back]");
    const nextButton = form.querySelector("[data-rfq-next]");
    const submitButton = form.querySelector("[data-rfq-submit]");
    const interestField = form.querySelector("[data-rfq-interest]");
    const sourceField = form.querySelector("[data-rfq-source]");
    const contextMessage = form.querySelector("[data-rfq-context]");
    const summary = form.querySelector("[data-rfq-summary]");
    const summaryList = form.querySelector("[data-rfq-summary-list]");
    const missingMessage = form.querySelector("[data-rfq-missing]");
    const quantityField = form.querySelector("[name='quantity']");
    const documentsField = form.querySelector("[name='documents']");
    const legacyScopeField = form.querySelector("[data-rfq-legacy-scope]");
    const params = new URLSearchParams(window.location.search);
    let currentStep = 0;

    const queryInterest = (params.get("interest") || "").trim().slice(0, 200);
    const querySource = (params.get("source") || "").trim().slice(0, 500);

    if (queryInterest && interestField && !interestField.value) {
      interestField.value = queryInterest;
    }

    if (querySource && sourceField) {
      sourceField.value = querySource;
    }

    if (queryInterest && contextMessage) {
      contextMessage.textContent = `${form.dataset.contextPrefix}: ${queryInterest}. ${form.dataset.contextHint}`;
      contextMessage.hidden = false;
    }

    const syncLegacyScope = () => {
      if (!legacyScopeField) {
        return;
      }

      legacyScopeField.value = [quantityField?.value.trim(), documentsField?.value.trim()]
        .filter(Boolean)
        .join(" | ");
    };

    const validateStep = (step) => {
      const requiredFields = Array.from(step.querySelectorAll("[required]"));
      const invalidField = requiredFields.find((field) => !field.checkValidity());

      if (invalidField) {
        invalidField.reportValidity();
        invalidField.focus();
        return false;
      }

      return true;
    };

    const updateSummary = () => {
      if (!summaryList || !missingMessage) {
        return;
      }

      summaryList.replaceChildren();

      form.querySelectorAll("[data-summary-label]").forEach((field) => {
        const value = field.value.trim();

        if (!value) {
          return;
        }

        const item = document.createElement("div");
        const term = document.createElement("dt");
        const description = document.createElement("dd");

        item.className = "inquiry-form__summary-item";
        term.textContent = field.dataset.summaryLabel;
        description.textContent = value;
        item.append(term, description);
        summaryList.append(item);
      });

      const missingLabels = Array.from(form.querySelectorAll("[data-summary-important]"))
        .filter((field) => !field.value.trim())
        .map((field) => field.dataset.summaryLabel);

      missingMessage.textContent = missingLabels.length
        ? `${form.dataset.missingPrefix}: ${missingLabels.join(form.dataset.listSeparator || ", ")}`
        : form.dataset.missingNone;
    };

    const setStep = (index, moveFocus = false) => {
      currentStep = Math.max(0, Math.min(index, steps.length - 1));

      steps.forEach((step, stepIndex) => {
        step.hidden = stepIndex !== currentStep;
      });

      indicators.forEach((indicator, indicatorIndex) => {
        if (indicatorIndex === currentStep) {
          indicator.setAttribute("aria-current", "step");
        } else {
          indicator.removeAttribute("aria-current");
        }
      });

      backButton.hidden = currentStep === 0;
      nextButton.hidden = currentStep === steps.length - 1;
      submitButton.hidden = currentStep !== steps.length - 1;
      form.classList.toggle("is-final-step", currentStep === steps.length - 1);

      if (summary) {
        summary.hidden = currentStep !== steps.length - 1;
      }

      if (currentStep === steps.length - 1) {
        updateSummary();
      }

      if (moveFocus) {
        const firstControl = steps[currentStep].querySelector("input:not([type='hidden']), textarea, select");
        firstControl?.focus();
      }
    };

    form.classList.add("is-enhanced");
    backButton.hidden = false;
    nextButton.hidden = false;
    setStep(0);

    syncLegacyScope();
    nextButton.addEventListener("click", () => {
      if (validateStep(steps[currentStep])) {
        setStep(currentStep + 1, true);
      }
    });

    backButton.addEventListener("click", () => {
      setStep(currentStep - 1, true);
    });

    form.addEventListener("input", () => {
      syncLegacyScope();

      if (currentStep === steps.length - 1) {
        updateSummary();
      }
    });

    form.addEventListener("submit", (event) => {
      if (currentStep < steps.length - 1) {
        event.preventDefault();

        if (validateStep(steps[currentStep])) {
          setStep(currentStep + 1, true);
        }

        return;
      }

      syncLegacyScope();
      updateSummary();
    });
  });
})();
