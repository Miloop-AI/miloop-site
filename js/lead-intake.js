const overlay = document.getElementById("lead-panel-overlay");
const panel = document.getElementById("lead-panel");
const closeButton = document.getElementById("lead-panel-close");
const titleEl = document.getElementById("lead-panel-title");
const bodyEl = document.getElementById("lead-panel-body");
const progressFillEl = document.getElementById("lead-progress-fill");
const triggerButtons = document.querySelectorAll(".js-start-conversation");
const exitConfirmEl = document.getElementById("lead-exit-confirm");
const exitMessageEl = document.getElementById("lead-exit-message");
const exitCancelBtn = document.getElementById("lead-exit-cancel");
const exitLeaveBtn = document.getElementById("lead-exit-leave");

const STORED_TO_DATA_LANG = { en: "en", "zh-Hans": "zh-Hans", "zh-Hant": "zh-Hant" };
const LANGUAGE_NAMES = { en: "English", "zh-Hans": "简体中文", "zh-Hant": "繁體中文" };
const ASSISTANT_MAX_TURNS = 5;

const COPY = {
  en: {
    panelTitle: "Start a conversation",
    closeLabel: "Close",
    chooseLanguage: "Choose a language to continue",
    languageHelp: "Don't see what you're looking for? Email us anytime at info@miloop.ai.",
    continue: "Continue",
    back: "Back",
    submit: "Submit",
    sending: "Sending...",
    otherLabel: "Other (please specify)",
    otherPlaceholder: "Please specify...",
    questions: {
      problemType: {
        title: "What do you need help with?",
        options: [
          { value: "assessment", label: "AI Readiness Assessment" },
          { value: "automation", label: "Workflow & Content Automation" },
          { value: "generative", label: "Generative AI & Knowledge Systems" },
          { value: "agentic", label: "Agentic Systems & Integration" },
          { value: "evaluation", label: "Evaluation, Deployment & Ongoing Support" },
        ],
        assistant: {
          trigger: "Not sure? Talk to our assistant instead",
          placeholder: "Type your message...",
          send: "Send",
          thinking: "Thinking...",
          disclaimer: "Please don't share sensitive information, such as credit card numbers, phone numbers, or unannounced business plans.",
          poweredBy: "Powered by Claude",
          done: "We've noted your needs, thanks for explaining.",
          error: "Something went wrong. Please select from the options above instead.",
        },
      },
      segment: {
        title: "What's the size of your organization?",
        options: [
          { value: "solo", label: "Independent / solo practitioner" },
          { value: "small", label: "Small business, roughly 2 to 50 people" },
          { value: "enterprise", label: "Larger company or enterprise" },
        ],
      },
      budget: { title: "What's your budget range for this?" },
      timeline: {
        title: "What's your target timeline for this?",
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
        ],
      },
    },
    budgetBrackets: {
      solo: [
        { value: "under-5k", label: "Under $5k" },
        { value: "5k-15k", label: "$5k to $15k" },
        { value: "over-15k", label: "$15k+" },
        { value: "not-sure", label: "Not sure yet" },
        { value: "prefer-not-to-say", label: "Prefer not to say" },
      ],
      small: [
        { value: "under-10k", label: "Under $10k" },
        { value: "10k-30k", label: "$10k to $30k" },
        { value: "30k-75k", label: "$30k to $75k" },
        { value: "75k-plus", label: "$75k+" },
        { value: "prefer-not-to-say", label: "Prefer not to say" },
      ],
      enterprise: [
        { value: "under-50k", label: "Under $50k" },
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
      subtitle: "We'll review this and follow up within 1 to 2 business days. Feel free to email info@miloop.ai directly in the meantime.",
    },
    exitConfirm: {
      message: "Are you sure you want to leave? Your answers won't be saved.",
      cancel: "Cancel",
      leave: "Leave",
    },
    error: "Something went wrong. Please try again, or email info@miloop.ai directly.",
  },

  "zh-Hans": {
    panelTitle: "开始对话",
    closeLabel: "关闭",
    chooseLanguage: "请选择语言以继续",
    languageHelp: "没有找到您需要的选项？欢迎随时发邮件至info@miloop.ai。",
    continue: "继续",
    back: "上一步",
    submit: "提交",
    sending: "发送中…",
    otherLabel: "其他（请说明）",
    otherPlaceholder: "请简单说明…",
    questions: {
      problemType: {
        title: "您需要哪方面的帮助？",
        options: [
          { value: "assessment", label: "AI就绪度评估" },
          { value: "automation", label: "工作流与内容自动化" },
          { value: "generative", label: "生成式AI与知识系统" },
          { value: "agentic", label: "Agent系统与集成" },
          { value: "evaluation", label: "评估、部署与持续支持" },
        ],
        assistant: {
          trigger: "还不确定？跟我们的助理聊聊",
          placeholder: "请输入您的讯息…",
          send: "发送",
          thinking: "思考中…",
          disclaimer: "请不要提供敏感信息，例如信用卡号、电话号码或尚未公开的商业计划。",
          poweredBy: "技术支持：Claude",
          done: "我们已经记住您的需求，感谢您的说明。",
          error: "出现问题，请改用上方选项。",
        },
      },
      segment: {
        title: "您的机构规模是？",
        options: [
          { value: "solo", label: "独立执业者" },
          { value: "small", label: "小型企业，约2至50人" },
          { value: "enterprise", label: "大型企业" },
        ],
      },
      budget: { title: "这个项目的预算范围是？" },
      timeline: {
        title: "您希望的目标时间安排是？",
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
        ],
      },
    },
    budgetBrackets: {
      solo: [
        { value: "under-5k", label: "5千美元以下" },
        { value: "5k-15k", label: "5千至1万5千美元" },
        { value: "over-15k", label: "1万5千美元以上" },
        { value: "not-sure", label: "还不确定" },
        { value: "prefer-not-to-say", label: "暂不透露" },
      ],
      small: [
        { value: "under-10k", label: "1万美元以下" },
        { value: "10k-30k", label: "1万至3万美元" },
        { value: "30k-75k", label: "3万至7万5千美元" },
        { value: "75k-plus", label: "7万5千美元以上" },
        { value: "prefer-not-to-say", label: "暂不透露" },
      ],
      enterprise: [
        { value: "under-50k", label: "5万美元以下" },
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
      subtitle: "我们会尽快查看，并在1至2个工作日内与您联系。如需更快得到回复，也可以直接发邮件至info@miloop.ai。",
    },
    exitConfirm: {
      message: "确定要离开吗？您填写的内容不会被保留。",
      cancel: "取消",
      leave: "离开",
    },
    error: "出现问题，请重试，或直接发送邮件至info@miloop.ai。",
  },

  "zh-Hant": {
    panelTitle: "開始對話",
    closeLabel: "關閉",
    chooseLanguage: "請選擇語言以繼續",
    languageHelp: "沒有找到您需要的選項？歡迎隨時寄信至info@miloop.ai。",
    continue: "繼續",
    back: "上一步",
    submit: "送出",
    sending: "傳送中…",
    otherLabel: "其他（請說明）",
    otherPlaceholder: "請簡單說明…",
    questions: {
      problemType: {
        title: "您需要哪方面的協助？",
        options: [
          { value: "assessment", label: "AI就緒度評估" },
          { value: "automation", label: "工作流與內容自動化" },
          { value: "generative", label: "生成式AI與知識系統" },
          { value: "agentic", label: "Agent系統與集成" },
          { value: "evaluation", label: "評估、部署與持續支持" },
        ],
        assistant: {
          trigger: "還不確定？跟我們的助理聊聊",
          placeholder: "請輸入您的訊息…",
          send: "傳送",
          thinking: "思考中…",
          disclaimer: "請不要提供敏感資訊，例如信用卡號、電話號碼或尚未公開的商業計畫。",
          poweredBy: "技術支援：Claude",
          done: "我們已經記住您的需求，感謝您的說明。",
          error: "發生問題，請改用上方選項。",
        },
      },
      segment: {
        title: "您的機構規模是？",
        options: [
          { value: "solo", label: "獨立執業者" },
          { value: "small", label: "小型企業，約2至50人" },
          { value: "enterprise", label: "大型企業" },
        ],
      },
      budget: { title: "這個專案的預算範圍是？" },
      timeline: {
        title: "您希望的目標時間安排是？",
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
        ],
      },
    },
    budgetBrackets: {
      solo: [
        { value: "under-5k", label: "5千美元以下" },
        { value: "5k-15k", label: "5千至1萬5千美元" },
        { value: "over-15k", label: "1萬5千美元以上" },
        { value: "not-sure", label: "還不確定" },
        { value: "prefer-not-to-say", label: "暫不透露" },
      ],
      small: [
        { value: "under-10k", label: "1萬美元以下" },
        { value: "10k-30k", label: "1萬至3萬美元" },
        { value: "30k-75k", label: "3萬至7萬5千美元" },
        { value: "75k-plus", label: "7萬5千美元以上" },
        { value: "prefer-not-to-say", label: "暫不透露" },
      ],
      enterprise: [
        { value: "under-50k", label: "5萬美元以下" },
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
      subtitle: "我們會盡快確認，並在1至2個工作日內與您聯繫。如需更快得到回覆，也可以直接寄信至info@miloop.ai。",
    },
    exitConfirm: {
      message: "確定要離開嗎？您填寫的內容不會被保留。",
      cancel: "取消",
      leave: "離開",
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

function attemptClose() {
  if (exitConfirmEl.classList.contains("is-open")) return;
  const hasProgress = state.step > 0;
  if (!hasProgress) {
    closePanel();
    return;
  }
  const t = currentCopy();
  exitMessageEl.textContent = t.exitConfirm.message;
  exitCancelBtn.textContent = t.exitConfirm.cancel;
  exitLeaveBtn.textContent = t.exitConfirm.leave;
  exitConfirmEl.classList.add("is-open");
}

function cancelExit() {
  exitConfirmEl.classList.remove("is-open");
}

function closePanel() {
  exitConfirmEl.classList.remove("is-open");
  overlay.classList.remove("is-open");
  panel.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  panel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedTrigger) lastFocusedTrigger.focus();
}

triggerButtons.forEach((button) => button.addEventListener("click", openPanel));
closeButton.addEventListener("click", attemptClose);
overlay.addEventListener("click", attemptClose);
exitCancelBtn.addEventListener("click", cancelExit);
exitLeaveBtn.addEventListener("click", closePanel);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (exitConfirmEl.classList.contains("is-open")) {
    cancelExit();
  } else if (panel.classList.contains("is-open")) {
    attemptClose();
  }
});

function updateProgress() {
  const position = Math.min(Math.max(state.step, 0), QUESTION_KEYS.length);
  progressFillEl.style.width = `${(position / QUESTION_KEYS.length) * 100}%`;
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

function optionButtonsHtml(options, selectedValue, extraClass) {
  return options
    .map(
      (option) => `
        <button type="button" class="lead-panel__option${extraClass ? " " + extraClass : ""}" data-value="${option.value}" aria-pressed="${option.value === selectedValue}">
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
  else if (state.step === 1) renderProblemTypeStep(t);
  else if (state.step >= 2 && state.step <= QUESTION_KEYS.length) renderSingleSelectStep(t, QUESTION_KEYS[state.step - 1]);
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
    <p class="lead-panel__language-help">${escapeHtml(t.languageHelp)}</p>
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

/* ==========================================================================
   Step 1: problem type. Multi-select checkboxes, an "other" free-text
   option, and an optional virtual assistant chat, all counted as a single
   step on the progress bar regardless of how the visitor answers it.
   ========================================================================== */
function renderProblemTypeStep(t) {
  const q = t.questions.problemType;
  const answers = state.answers;
  const selected = new Set(answers.problemType || []);
  const otherActive = !!answers.problemTypeOtherActive;
  const assistantDone = !!answers.assistantDone;
  const transcript = answers.assistantTranscript || [];

  const optionsHtml = q.options
    .map(
      (option) => `
        <button type="button" class="lead-panel__option lead-panel__option--checkbox" data-value="${option.value}" aria-pressed="${selected.has(option.value)}">
          ${escapeHtml(option.label)}
        </button>
      `
    )
    .join("");

  bodyEl.innerHTML = `
    <p class="lead-panel__prompt">${escapeHtml(q.title)}</p>
    <div class="lead-panel__options" id="lead-problem-options">
      ${optionsHtml}
      <button type="button" class="lead-panel__option lead-panel__option--checkbox" data-value="__other" aria-pressed="${otherActive}">
        ${escapeHtml(t.otherLabel)}
      </button>
    </div>
    <div class="lead-panel__other-field" id="lead-problem-other-field" ${otherActive ? "" : "hidden"}>
      <input type="text" id="lead-problem-other-input" placeholder="${escapeHtml(t.otherPlaceholder)}" value="${escapeHtml(answers.problemTypeOther || "")}" />
    </div>
    ${
      assistantDone
        ? ""
        : `<button type="button" class="lead-panel__assistant-trigger" id="lead-assistant-trigger" ${answers.assistantStarted ? "hidden" : ""}>${escapeHtml(q.assistant.trigger)}</button>`
    }
    <div class="lead-panel__assistant" id="lead-assistant" ${answers.assistantStarted ? "" : "hidden"}>
      <div class="lead-panel__assistant-messages" id="lead-assistant-messages"></div>
      <div class="lead-panel__assistant-input-row" id="lead-assistant-input-row" ${assistantDone ? "hidden" : ""}>
        <input type="text" id="lead-assistant-input" placeholder="${escapeHtml(q.assistant.placeholder)}" />
        <button type="button" id="lead-assistant-send">${escapeHtml(q.assistant.send)}</button>
      </div>
      ${assistantDone ? `<button type="button" class="lead-panel__continue lead-panel__assistant-continue" id="lead-assistant-continue">${escapeHtml(t.continue)}</button>` : ""}
      <p class="lead-panel__assistant-disclaimer">${escapeHtml(q.assistant.disclaimer)}</p>
      <p class="lead-panel__assistant-poweredby">${escapeHtml(q.assistant.poweredBy)}</p>
    </div>
    <div class="lead-panel__nav">
      <button type="button" class="lead-panel__back" data-role="back">${escapeHtml(t.back)}</button>
      <button type="button" class="lead-panel__continue" data-role="continue" id="lead-problem-continue">${escapeHtml(t.continue)}</button>
    </div>
  `;

  const continueBtn = document.getElementById("lead-problem-continue");
  const otherField = document.getElementById("lead-problem-other-field");
  const otherInput = document.getElementById("lead-problem-other-input");

  function updateContinueState() {
    const hasChecked = (state.answers.problemType || []).length > 0;
    const hasOther = state.answers.problemTypeOtherActive && (otherInput.value || "").trim().length > 0;
    const hasAssistant = !!state.answers.assistantDone;
    continueBtn.disabled = !(hasChecked || hasOther || hasAssistant);
  }

  document.querySelectorAll('#lead-problem-options [data-value]').forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value === "__other") {
        state.answers.problemTypeOtherActive = !state.answers.problemTypeOtherActive;
        button.setAttribute("aria-pressed", String(state.answers.problemTypeOtherActive));
        otherField.hidden = !state.answers.problemTypeOtherActive;
        if (!state.answers.problemTypeOtherActive) {
          state.answers.problemTypeOther = "";
          otherInput.value = "";
        } else {
          otherInput.focus();
        }
        updateContinueState();
        return;
      }
      const set = new Set(state.answers.problemType || []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      state.answers.problemType = Array.from(set);
      button.setAttribute("aria-pressed", String(set.has(value)));
      updateContinueState();
    });
  });

  otherInput.addEventListener("input", () => {
    state.answers.problemTypeOther = otherInput.value;
    updateContinueState();
  });

  initAssistantChat(t, updateContinueState);
  updateContinueState();

  const existingAssistantContinue = document.getElementById("lead-assistant-continue");
  if (existingAssistantContinue) {
    existingAssistantContinue.addEventListener("click", goNext);
  }

  bodyEl.querySelector('[data-role="back"]').addEventListener("click", goBack);
  continueBtn.addEventListener("click", goNext);
}

function initAssistantChat(t, updateContinueState) {
  const trigger = document.getElementById("lead-assistant-trigger");
  const assistantBox = document.getElementById("lead-assistant");
  const messagesEl = document.getElementById("lead-assistant-messages");
  const inputRow = document.getElementById("lead-assistant-input-row");
  const inputEl = document.getElementById("lead-assistant-input");
  const sendBtn = document.getElementById("lead-assistant-send");
  const q = t.questions.problemType;

  function renderMessages() {
    const transcript = state.answers.assistantTranscript || [];
    messagesEl.innerHTML = transcript
      .map(
        (m) =>
          `<div class="lead-panel__assistant-msg lead-panel__assistant-msg--${m.role === "user" ? "user" : "assistant"}">${escapeHtml(m.content)}</div>`
      )
      .join("");
    if (state.answers.assistantDone) {
      messagesEl.innerHTML += `<div class="lead-panel__assistant-done">${escapeHtml(q.assistant.done)}</div>`;
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  if (trigger) {
    trigger.addEventListener("click", () => {
      state.answers.assistantStarted = true;
      assistantBox.hidden = false;
      trigger.hidden = true;
      renderMessages();
      inputEl.focus();
    });
  }

  if (state.answers.assistantStarted) {
    renderMessages();
  }

  if (!inputEl || !sendBtn) return;

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || state.answers.assistantDone) return;

    const transcript = state.answers.assistantTranscript || [];
    transcript.push({ role: "user", content: text.slice(0, 500) });
    state.answers.assistantTranscript = transcript;
    inputEl.value = "";
    renderMessages();
    messagesEl.insertAdjacentHTML(
      "beforeend",
      `<div class="lead-panel__assistant-msg lead-panel__assistant-msg--pending" id="lead-assistant-pending">${escapeHtml(q.assistant.thinking)}</div>`
    );
    messagesEl.scrollTop = messagesEl.scrollHeight;
    sendBtn.disabled = true;
    inputEl.disabled = true;

    const userTurns = transcript.filter((m) => m.role === "user").length;

    try {
      const response = await fetch("/api/lead-classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: transcript, lang: state.answers.lang }),
      });
      if (!response.ok) throw new Error("request failed");
      const data = await response.json();
      const pending = document.getElementById("lead-assistant-pending");
      if (pending) pending.remove();

      transcript.push({ role: "assistant", content: data.reply || "" });
      state.answers.assistantTranscript = transcript;

      if (data.done || userTurns >= ASSISTANT_MAX_TURNS) {
        state.answers.assistantDone = true;
        const merged = new Set([...(state.answers.problemType || []), ...(data.categories || [])]);
        state.answers.problemType = Array.from(merged);
        document.querySelectorAll('#lead-problem-options [data-value]').forEach((btn) => {
          if (merged.has(btn.dataset.value)) btn.setAttribute("aria-pressed", "true");
        });
        inputRow.hidden = true;
        if (!document.getElementById("lead-assistant-continue")) {
          const continueBtn = document.createElement("button");
          continueBtn.type = "button";
          continueBtn.className = "lead-panel__continue lead-panel__assistant-continue";
          continueBtn.id = "lead-assistant-continue";
          continueBtn.textContent = t.continue;
          continueBtn.addEventListener("click", goNext);
          inputRow.insertAdjacentElement("afterend", continueBtn);
        }
      }

      renderMessages();
      updateContinueState();
    } catch (error) {
      const pending = document.getElementById("lead-assistant-pending");
      if (pending) pending.remove();
      const transcript2 = state.answers.assistantTranscript || [];
      transcript2.push({ role: "assistant", content: q.assistant.error });
      state.answers.assistantTranscript = transcript2;
      renderMessages();
    } finally {
      sendBtn.disabled = false;
      if (!state.answers.assistantDone) {
        inputEl.disabled = false;
        inputEl.focus();
      }
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
  });
}

/* ==========================================================================
   Steps 2 to 5: single-select questions. Selecting a normal option
   advances immediately. Selecting "other" reveals a text field with its
   own confirm step, since it needs a moment for typing first.
   ========================================================================== */
function renderSingleSelectStep(t, key) {
  const options = getQuestionOptions(t, key, state.answers);
  const selectedValue = state.answers[key];
  const otherActive = state.answers[key + "Other"] !== undefined;

  bodyEl.innerHTML = `
    <p class="lead-panel__prompt">${escapeHtml(t.questions[key].title)}</p>
    <div class="lead-panel__options" id="lead-single-options">
      ${optionButtonsHtml(options, selectedValue)}
      <button type="button" class="lead-panel__option" data-value="__other" aria-pressed="${otherActive}">
        ${escapeHtml(t.otherLabel)}
      </button>
    </div>
    <div class="lead-panel__other-field" id="lead-single-other-field" ${otherActive ? "" : "hidden"}>
      <input type="text" id="lead-single-other-input" placeholder="${escapeHtml(t.otherPlaceholder)}" value="${escapeHtml(state.answers[key + "Other"] || "")}" />
      <button type="button" class="lead-panel__other-confirm" id="lead-single-other-confirm">${escapeHtml(t.continue)}</button>
    </div>
    <div class="lead-panel__nav">
      <button type="button" class="lead-panel__back" data-role="back">${escapeHtml(t.back)}</button>
      <span></span>
    </div>
  `;

  const otherField = document.getElementById("lead-single-other-field");
  const otherInput = document.getElementById("lead-single-other-input");

  document.querySelectorAll('#lead-single-options [data-value]').forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      if (value === "__other") {
        otherField.hidden = false;
        otherInput.focus();
        return;
      }
      state.answers[key] = value;
      delete state.answers[key + "Other"];
      if (key === "segment") delete state.answers.budget;
      goNext();
    });
  });

  document.getElementById("lead-single-other-confirm").addEventListener("click", () => {
    const text = otherInput.value.trim();
    if (!text) return;
    state.answers[key] = "other";
    state.answers[key + "Other"] = text;
    if (key === "segment") delete state.answers.budget;
    goNext();
  });

  bodyEl.querySelector('[data-role="back"]').addEventListener("click", goBack);
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
  if (value === "other" && answers[key + "Other"]) {
    return `${t.otherLabel}: ${answers[key + "Other"]}`;
  }
  const options = getQuestionOptions(t, key, answers);
  const match = options.find((option) => option.value === value);
  return match ? match.label : value;
}

function problemTypeLabel(t, answers, notAnswered) {
  const q = t.questions.problemType;
  const labels = (answers.problemType || []).map((value) => {
    const match = q.options.find((option) => option.value === value);
    return match ? match.label : value;
  });
  if (answers.problemTypeOtherActive && answers.problemTypeOther) {
    labels.push(`${t.otherLabel}: ${answers.problemTypeOther}`);
  }
  return labels.length ? labels.join(", ") : notAnswered;
}

function renderReviewStep(t) {
  const answers = state.answers;
  const r = t.review;

  const rows = [
    [r.language, LANGUAGE_NAMES[answers.lang] || answers.lang],
    [t.questions.problemType.title, problemTypeLabel(t, answers, r.notAnswered)],
    ...QUESTION_KEYS.filter((k) => k !== "problemType").map((key) => [t.questions[key].title, findLabel(t, key, answers, r.notAnswered)]),
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
