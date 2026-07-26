const overlay = document.getElementById("lead-panel-overlay");
const panel = document.getElementById("lead-panel");
const closeButton = document.getElementById("lead-panel-close");
const titleEl = document.getElementById("lead-panel-title");
const bodyEl = document.getElementById("lead-panel-body");
const progressFillEl = document.getElementById("lead-progress-fill");
const triggerButtons = document.querySelectorAll(".js-start-conversation");

const STORED_TO_DATA_LANG = {
  en: "en",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
};

const LANGUAGE_NAMES = {
  en: "English",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
};

const COPY = {
  en: {
    panelTitle: "Start a conversation",
    closeLabel: "Close",
    chooseLanguage: "Choose a language to continue",
    continue: "Continue",
    back: "Back",
    submit: "Submit",
    sending: "Sending...",
    questions: {
      problemType: {
        title: "What are you looking to solve?",
        options: [
          { value: "automation", label: "Automating a manual or repetitive process" },
          { value: "agent", label: "Building an AI agent or assistant" },
          { value: "integration", label: "Adding AI into an existing product" },
          { value: "exploring", label: "Not sure yet, exploring options" },
        ],
      },
      segment: {
        title: "Which best describes you?",
        options: [
          { value: "solo", label: "Just me" },
          { value: "small", label: "Small business, roughly 2 to 50 people" },
          { value: "enterprise", label: "Larger company or enterprise" },
        ],
      },
      budget: { title: "What's the budget range for this?" },
      timeline: {
        title: "What's the timeline?",
        options: [
          { value: "asap", label: "ASAP, within a few weeks" },
          { value: "1-3-months", label: "1 to 3 months" },
          { value: "exploring", label: "Exploring, no fixed timeline" },
          { value: "event-tied", label: "Tied to a specific event or launch date" },
        ],
      },
      source: {
        title: "How did you hear about Miloop AI?",
        options: [
          { value: "linkedin", label: "LinkedIn" },
          { value: "referral", label: "Referral" },
          { value: "search", label: "Search or found the site directly" },
          { value: "github", label: "GitHub or portfolio" },
          { value: "other", label: "Other" },
        ],
      },
    },
    budgetBrackets: {
      solo: [
        { value: "under-5k", label: "Under $5k" },
        { value: "5k-15k", label: "$5k to $15k" },
        { value: "not-sure", label: "Not sure yet" },
        { value: "prefer-not-to-say", label: "Prefer not to say" },
      ],
      small: [
        { value: "10k-30k", label: "$10k to $30k" },
        { value: "30k-75k", label: "$30k to $75k" },
        { value: "75k-plus", label: "$75k+" },
        { value: "prefer-not-to-say", label: "Prefer not to say" },
      ],
      enterprise: [
        { value: "50k-150k", label: "$50k to $150k" },
        { value: "150k-plus", label: "$150k+" },
        { value: "depends", label: "Depends on scope" },
        { value: "prefer-not-to-say", label: "Prefer not to say" },
      ],
    },
    contact: {
      prompt: "How should we reach you?",
      name: "Name",
      email: "Email",
      company: "Company (optional)",
      contactMethodLabel: "Preferred contact method (optional)",
      emailOption: "Email",
      callOption: "Call",
      phone: "Phone",
    },
    note: { prompt: "Anything else that would help us prepare? (optional)" },
    review: {
      prompt: "Quick check before this goes to Miloop AI.",
      language: "Language",
      name: "Name",
      email: "Email",
      company: "Company",
      note: "Note",
      notAnswered: "Not answered",
      notProvided: "Not provided",
    },
    confirmation: {
      title: "Thanks, that's everything we need.",
      subtitle: "We'll review this and follow up within 1 to 2 business days.",
    },
    error: "Something went wrong. Please try again, or email info@miloop.ai directly.",
  },

  "zh-Hans": {
    panelTitle: "开始对话",
    closeLabel: "关闭",
    chooseLanguage: "请选择语言以继续",
    continue: "继续",
    back: "上一步",
    submit: "提交",
    sending: "发送中…",
    questions: {
      problemType: {
        title: "您想解决什么问题？",
        options: [
          { value: "automation", label: "自动化重复性或手动流程" },
          { value: "agent", label: "构建AI智能体或助手" },
          { value: "integration", label: "为现有产品加入AI功能" },
          { value: "exploring", label: "还不确定，想先了解一下" },
        ],
      },
      segment: {
        title: "以下哪项最符合您的情况？",
        options: [
          { value: "solo", label: "个人" },
          { value: "small", label: "小型企业，约2至50人" },
          { value: "enterprise", label: "大型企业" },
        ],
      },
      budget: { title: "这个项目的预算范围是？" },
      timeline: {
        title: "预计的时间安排是？",
        options: [
          { value: "asap", label: "尽快，几周内" },
          { value: "1-3-months", label: "1至3个月" },
          { value: "exploring", label: "还在了解，没有固定时间" },
          { value: "event-tied", label: "配合特定活动或上线日期" },
        ],
      },
      source: {
        title: "您是从哪里了解到Miloop AI的？",
        options: [
          { value: "linkedin", label: "LinkedIn" },
          { value: "referral", label: "他人推荐" },
          { value: "search", label: "搜索或直接找到网站" },
          { value: "github", label: "GitHub或作品集" },
          { value: "other", label: "其他" },
        ],
      },
    },
    budgetBrackets: {
      solo: [
        { value: "under-5k", label: "5千美元以下" },
        { value: "5k-15k", label: "5千至1万5千美元" },
        { value: "not-sure", label: "还不确定" },
        { value: "prefer-not-to-say", label: "暂不透露" },
      ],
      small: [
        { value: "10k-30k", label: "1万至3万美元" },
        { value: "30k-75k", label: "3万至7万5千美元" },
        { value: "75k-plus", label: "7万5千美元以上" },
        { value: "prefer-not-to-say", label: "暂不透露" },
      ],
      enterprise: [
        { value: "50k-150k", label: "5万至15万美元" },
        { value: "150k-plus", label: "15万美元以上" },
        { value: "depends", label: "视项目范围而定" },
        { value: "prefer-not-to-say", label: "暂不透露" },
      ],
    },
    contact: {
      prompt: "我们应该如何联系您？",
      name: "姓名",
      email: "电子邮箱",
      company: "公司（选填）",
      contactMethodLabel: "偏好的联系方式（选填）",
      emailOption: "邮件",
      callOption: "电话",
      phone: "电话号码",
    },
    note: { prompt: "还有什么需要我们提前了解的吗？（选填）" },
    review: {
      prompt: "提交前请确认以下信息。",
      language: "语言",
      name: "姓名",
      email: "电子邮箱",
      company: "公司",
      note: "备注",
      notAnswered: "未作答",
      notProvided: "未提供",
    },
    confirmation: {
      title: "感谢您，我们已收到所有信息。",
      subtitle: "我们会尽快查看，并在1至2个工作日内与您联系。",
    },
    error: "出现问题，请重试，或直接发送邮件至info@miloop.ai。",
  },

  "zh-Hant": {
    panelTitle: "開始對話",
    closeLabel: "關閉",
    chooseLanguage: "請選擇語言以繼續",
    continue: "繼續",
    back: "上一步",
    submit: "送出",
    sending: "傳送中…",
    questions: {
      problemType: {
        title: "您想解決什麼問題？",
        options: [
          { value: "automation", label: "自動化重複性或手動流程" },
          { value: "agent", label: "打造AI智慧代理人或助理" },
          { value: "integration", label: "為現有產品加入AI功能" },
          { value: "exploring", label: "還不確定，想先了解一下" },
        ],
      },
      segment: {
        title: "以下哪項最符合您的情況？",
        options: [
          { value: "solo", label: "個人" },
          { value: "small", label: "小型企業，約2至50人" },
          { value: "enterprise", label: "大型企業" },
        ],
      },
      budget: { title: "這個專案的預算範圍是？" },
      timeline: {
        title: "預計的時間安排是？",
        options: [
          { value: "asap", label: "盡快，幾週內" },
          { value: "1-3-months", label: "1至3個月" },
          { value: "exploring", label: "還在了解，沒有固定時間" },
          { value: "event-tied", label: "配合特定活動或上線日期" },
        ],
      },
      source: {
        title: "您是從哪裡了解到Miloop AI的？",
        options: [
          { value: "linkedin", label: "LinkedIn" },
          { value: "referral", label: "他人推薦" },
          { value: "search", label: "搜尋或直接找到網站" },
          { value: "github", label: "GitHub或作品集" },
          { value: "other", label: "其他" },
        ],
      },
    },
    budgetBrackets: {
      solo: [
        { value: "under-5k", label: "5千美元以下" },
        { value: "5k-15k", label: "5千至1萬5千美元" },
        { value: "not-sure", label: "還不確定" },
        { value: "prefer-not-to-say", label: "暫不透露" },
      ],
      small: [
        { value: "10k-30k", label: "1萬至3萬美元" },
        { value: "30k-75k", label: "3萬至7萬5千美元" },
        { value: "75k-plus", label: "7萬5千美元以上" },
        { value: "prefer-not-to-say", label: "暫不透露" },
      ],
      enterprise: [
        { value: "50k-150k", label: "5萬至15萬美元" },
        { value: "150k-plus", label: "15萬美元以上" },
        { value: "depends", label: "視專案範圍而定" },
        { value: "prefer-not-to-say", label: "暫不透露" },
      ],
    },
    contact: {
      prompt: "我們應該如何聯繫您？",
      name: "姓名",
      email: "電子郵件",
      company: "公司（選填）",
      contactMethodLabel: "偏好的聯繫方式（選填）",
      emailOption: "郵件",
      callOption: "電話",
      phone: "電話號碼",
    },
    note: { prompt: "還有什麼需要我們提前了解的嗎？（選填）" },
    review: {
      prompt: "送出前請確認以下資訊。",
      language: "語言",
      name: "姓名",
      email: "電子郵件",
      company: "公司",
      note: "備註",
      notAnswered: "未作答",
      notProvided: "未提供",
    },
    confirmation: {
      title: "謝謝您，我們已收到所有資訊。",
      subtitle: "我們會盡快確認，並在1至2個工作日內與您聯繫。",
    },
    error: "發生問題，請重試，或直接寄送郵件至info@miloop.ai。",
  },
};

const QUESTION_KEYS = ["problemType", "segment", "budget", "timeline", "source"];
const CONTACT_STEP_INDEX = QUESTION_KEYS.length + 1;
const NOTE_STEP_INDEX = QUESTION_KEYS.length + 2;
const REVIEW_STEP_INDEX = QUESTION_KEYS.length + 3;
const CONFIRMATION_STEP_INDEX = QUESTION_KEYS.length + 4;
const TOTAL_STEPS = CONFIRMATION_STEP_INDEX;

let state = { step: 0, answers: { lang: "en" } };
let lastFocusedTrigger = null;

function readStoredLanguage() {
  const stored = localStorage.getItem("miloop-lang") || "en";
  return STORED_TO_DATA_LANG[stored] || "en";
}

function currentCopy() {
  return COPY[state.answers.lang] || COPY.en;
}

function openPanel(event) {
  if (event) event.preventDefault();
  lastFocusedTrigger = event ? event.currentTarget : null;
  state = { step: 0, answers: { lang: readStoredLanguage() } };
  overlay.classList.add("is-open");
  panel.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  panel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  render();
}

function closePanel() {
  overlay.classList.remove("is-open");
  panel.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  panel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedTrigger) lastFocusedTrigger.focus();
}

triggerButtons.forEach((button) => button.addEventListener("click", openPanel));
closeButton.addEventListener("click", closePanel);
overlay.addEventListener("click", closePanel);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && panel.classList.contains("is-open")) closePanel();
});

function updateProgress() {
  const shownStep = Math.min(state.step, TOTAL_STEPS);
  progressFillEl.style.width = `${(shownStep / TOTAL_STEPS) * 100}%`;
}

function updateChrome(t) {
  titleEl.textContent = t.panelTitle;
  closeButton.setAttribute("aria-label", t.closeLabel);
}

function goBack() {
  if (state.step > 0) {
    state.step -= 1;
    render();
  }
}

function goNext() {
  state.step += 1;
  render();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function optionButtonsHtml(options, selectedValue) {
  return options
    .map(
      (option) => `
        <button type="button" class="lead-panel__option" data-value="${option.value}" aria-pressed="${option.value === selectedValue}">
          ${escapeHtml(option.label)}
        </button>
      `
    )
    .join("");
}

function getQuestionOptions(t, key, answers) {
  if (key === "budget") {
    return t.budgetBrackets[answers.segment] || t.budgetBrackets.small;
  }
  return t.questions[key].options;
}

function render() {
  const t = currentCopy();
  updateChrome(t);
  updateProgress();
  if (state.step === 0) renderLanguageStep(t);
  else if (state.step >= 1 && state.step <= QUESTION_KEYS.length) renderQuestionStep(t, QUESTION_KEYS[state.step - 1]);
  else if (state.step === CONTACT_STEP_INDEX) renderContactStep(t);
  else if (state.step === NOTE_STEP_INDEX) renderNoteStep(t);
  else if (state.step === REVIEW_STEP_INDEX) renderReviewStep(t);
  else if (state.step === CONFIRMATION_STEP_INDEX) renderConfirmationStep(t);
}

function renderLanguageStep(t) {
  const options = Object.keys(LANGUAGE_NAMES).map((value) => ({ value, label: LANGUAGE_NAMES[value] }));

  bodyEl.innerHTML = `
    <p class="lead-panel__prompt">${escapeHtml(t.chooseLanguage)}</p>
    <div class="lead-panel__options">${optionButtonsHtml(options, state.answers.lang)}</div>
    <div class="lead-panel__nav">
      <span></span>
      <button type="button" class="lead-panel__continue" data-role="continue">${escapeHtml(t.continue)}</button>
    </div>
  `;

  bodyEl.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => {
      state.answers.lang = button.dataset.value;
      if (typeof window.miloopSetLanguage === "function") {
        window.miloopSetLanguage(state.answers.lang);
      }
      render();
    });
  });

  bodyEl.querySelector('[data-role="continue"]').addEventListener("click", goNext);
}

function renderQuestionStep(t, key) {
  const options = getQuestionOptions(t, key, state.answers);
  const selectedValue = state.answers[key];

  bodyEl.innerHTML = `
    <p class="lead-panel__prompt">${escapeHtml(t.questions[key].title)}</p>
    <div class="lead-panel__options">${optionButtonsHtml(options, selectedValue)}</div>
    <div class="lead-panel__nav">
      <button type="button" class="lead-panel__back" data-role="back">${escapeHtml(t.back)}</button>
      <button type="button" class="lead-panel__continue" data-role="continue" ${selectedValue ? "" : "disabled"}>${escapeHtml(t.continue)}</button>
    </div>
  `;

  bodyEl.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => {
      state.answers[key] = button.dataset.value;
      if (key === "segment") delete state.answers.budget;
      render();
    });
  });

  bodyEl.querySelector('[data-role="back"]').addEventListener("click", goBack);
  const continueButton = bodyEl.querySelector('[data-role="continue"]');
  if (continueButton) continueButton.addEventListener("click", goNext);
}

function renderContactStep(t) {
  const answers = state.answers;
  const c = t.contact;

  bodyEl.innerHTML = `
    <p class="lead-panel__prompt">${escapeHtml(c.prompt)}</p>
    <div class="lead-panel__field">
      <label for="lead-name">${escapeHtml(c.name)}</label>
      <input type="text" id="lead-name" value="${escapeHtml(answers.name || "")}" required />
    </div>
    <div class="lead-panel__field">
      <label for="lead-email">${escapeHtml(c.email)}</label>
      <input type="email" id="lead-email" value="${escapeHtml(answers.email || "")}" required />
    </div>
    <div class="lead-panel__field">
      <label for="lead-company">${escapeHtml(c.company)}</label>
      <input type="text" id="lead-company" value="${escapeHtml(answers.company || "")}" />
    </div>
    <div class="lead-panel__honeypot" aria-hidden="true">
      <label for="lead-website">Website</label>
      <input type="text" id="lead-website" name="website" tabindex="-1" autocomplete="off" value="${escapeHtml(answers.website || "")}" />
    </div>
    <div class="lead-panel__field">
      <span class="lead-panel__field-label">${escapeHtml(c.contactMethodLabel)}</span>
      <div class="lead-panel__options" data-role="contact-method">
        ${optionButtonsHtml(
          [
            { value: "email", label: c.emailOption },
            { value: "call", label: c.callOption },
          ],
          answers.contactMethod
        )}
      </div>
    </div>
    <div class="lead-panel__field" data-role="phone-field" ${answers.contactMethod === "call" ? "" : "hidden"}>
      <label for="lead-phone">${escapeHtml(c.phone)}</label>
      <input type="tel" id="lead-phone" value="${escapeHtml(answers.phone || "")}" />
    </div>
    <div class="lead-panel__nav">
      <button type="button" class="lead-panel__back" data-role="back">${escapeHtml(t.back)}</button>
      <button type="button" class="lead-panel__continue" data-role="continue" disabled>${escapeHtml(t.continue)}</button>
    </div>
  `;

  const nameInput = bodyEl.querySelector("#lead-name");
  const emailInput = bodyEl.querySelector("#lead-email");
  const companyInput = bodyEl.querySelector("#lead-company");
  const websiteInput = bodyEl.querySelector("#lead-website");
  const phoneInput = bodyEl.querySelector("#lead-phone");
  const phoneField = bodyEl.querySelector('[data-role="phone-field"]');
  const continueButton = bodyEl.querySelector('[data-role="continue"]');

  function validate() {
    const nameOk = nameInput.value.trim().length > 0;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    continueButton.disabled = !(nameOk && emailOk);
  }

  nameInput.addEventListener("input", validate);
  emailInput.addEventListener("input", validate);
  validate();

  bodyEl.querySelectorAll('[data-role="contact-method"] [data-value]').forEach((button) => {
    button.addEventListener("click", () => {
      answers.contactMethod = button.dataset.value;
      bodyEl.querySelectorAll('[data-role="contact-method"] [data-value]').forEach((option) => {
        option.setAttribute("aria-pressed", String(option === button));
      });
      phoneField.hidden = answers.contactMethod !== "call";
    });
  });

  function persistFields() {
    answers.name = nameInput.value.trim();
    answers.email = emailInput.value.trim();
    answers.company = companyInput.value.trim();
    answers.website = websiteInput.value.trim();
    answers.phone = phoneInput.value.trim();
  }

  bodyEl.querySelector('[data-role="back"]').addEventListener("click", () => {
    persistFields();
    goBack();
  });

  continueButton.addEventListener("click", () => {
    persistFields();
    goNext();
  });
}

function renderNoteStep(t) {
  bodyEl.innerHTML = `
    <p class="lead-panel__prompt">${escapeHtml(t.note.prompt)}</p>
    <div class="lead-panel__field">
      <textarea id="lead-note">${escapeHtml(state.answers.note || "")}</textarea>
    </div>
    <div class="lead-panel__nav">
      <button type="button" class="lead-panel__back" data-role="back">${escapeHtml(t.back)}</button>
      <button type="button" class="lead-panel__continue" data-role="continue">${escapeHtml(t.continue)}</button>
    </div>
  `;

  const noteInput = bodyEl.querySelector("#lead-note");

  bodyEl.querySelector('[data-role="back"]').addEventListener("click", () => {
    state.answers.note = noteInput.value.trim();
    goBack();
  });

  bodyEl.querySelector('[data-role="continue"]').addEventListener("click", () => {
    state.answers.note = noteInput.value.trim();
    goNext();
  });
}

function findLabel(t, key, answers, notAnswered) {
  const value = answers[key];
  if (!value) return notAnswered;
  const options = getQuestionOptions(t, key, answers);
  const match = options.find((option) => option.value === value);
  return match ? match.label : value;
}

function renderReviewStep(t) {
  const answers = state.answers;
  const r = t.review;

  const rows = [
    [r.language, LANGUAGE_NAMES[answers.lang] || answers.lang],
    ...QUESTION_KEYS.map((key) => [t.questions[key].title, findLabel(t, key, answers, r.notAnswered)]),
    [r.name, answers.name],
    [r.email, answers.email],
    [r.company, answers.company || r.notProvided],
    [r.note, answers.note || r.notProvided],
  ];

  bodyEl.innerHTML = `
    <p class="lead-panel__prompt">${escapeHtml(r.prompt)}</p>
    <ul class="lead-panel__review-list">
      ${rows.map(([label, value]) => `<li><span>${escapeHtml(label)}</span><span>${escapeHtml(String(value))}</span></li>`).join("")}
    </ul>
    <div class="lead-panel__nav">
      <button type="button" class="lead-panel__back" data-role="back">${escapeHtml(t.back)}</button>
      <button type="button" class="lead-panel__continue" data-role="submit">${escapeHtml(t.submit)}</button>
    </div>
    <p class="lead-panel__error" data-role="error" hidden></p>
  `;

  bodyEl.querySelector('[data-role="back"]').addEventListener("click", goBack);
  bodyEl.querySelector('[data-role="submit"]').addEventListener("click", () => submitLead(t));
}

async function submitLead(t) {
  const submitButton = bodyEl.querySelector('[data-role="submit"]');
  const errorEl = bodyEl.querySelector('[data-role="error"]');
  submitButton.disabled = true;
  submitButton.textContent = t.sending;
  errorEl.hidden = true;

  try {
    const response = await fetch("/api/lead-intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state.answers),
    });

    if (!response.ok) throw new Error("Request failed");
    goNext();
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = t.submit;
    errorEl.hidden = false;
    errorEl.textContent = t.error;
  }
}

function renderConfirmationStep(t) {
  bodyEl.innerHTML = `
    <div class="lead-panel__confirmation">
      <div class="lead-panel__confirmation-dot" aria-hidden="true"></div>
      <p class="lead-panel__prompt">${escapeHtml(t.confirmation.title)}</p>
      <p class="lead-panel__field-label">${escapeHtml(t.confirmation.subtitle)}</p>
    </div>
  `;
}
