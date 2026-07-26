/* ==========================================================================
   Miloop AI: main.js
   Language switcher (English / Simplified Chinese / Traditional Chinese),
   mobile-safe nav, interactive services panel, and scroll reveal.
   Traditional Chinese is a direct script conversion of the Simplified
   Chinese copy (same wording and word order), not a separate localization.
   ========================================================================== */

(function () {
  "use strict";

  var LANG_META = {
    "en": { label: "EN", htmlLang: "en" },
    "zh-Hans": { label: "\u7b80", htmlLang: "zh-Hans" },
    "zh-Hant": { label: "\u7e41", htmlLang: "zh-Hant" }
  };

  /* ---------- i18n dictionary ---------- */
  var dict = {
    "en": {
      "meta.title": "Miloop AI: Production AI systems, verified before they ship",
      "meta.description": "Miloop AI designs, builds, and evaluates production AI systems: content automation, RAG, voice assistants, agent integration, and the evaluation loops that keep them reliable.",
      "hero.eyebrow": "Applied AI Engineering Practice",
      "hero.heading.pre": "AI systems engineered to ",
      "hero.heading.em": "verify themselves",
      "hero.heading.post": ".",
      "hero.sub": "Miloop AI designs and ships production AI systems, from content automation and knowledge assistants to voice agents and beyond, each with an independent evaluation layer that catches failures before they reach your customers.",
      "hero.cta.contact": "Start a conversation",
      "loop.diagnose": "Diagnose",
      "loop.build": "Build",
      "loop.verify": "Verify",
      "loop.deploy": "Deploy",
      "loop.support": "Support",
      "services.eyebrow": "What we do",
      "services.title": "From first audit to ongoing support.",
      "s1.title": "AI Readiness Assessment",
      "s1.body": "Not sure where AI can actually move the needle in your business? We audit your current workflows and any AI systems already in place, surfacing hallucination risk, wasted spend, and the highest-leverage place to start. You walk away with <strong>a prioritized, concrete roadmap</strong>.",
      "s2.title": "Workflow & Content Automation",
      "s2.body": "We turn multi-step manual processes (classification, translation, drafting, fact-checking, publishing) into pipelines, <strong>cutting turnaround from hours to minutes</strong>. Built on production infrastructure that keeps running long after the handoff.",
      "s3.title": "Generative AI & Knowledge Systems",
      "s3.body": "From retrieval-augmented systems that let your team query internal documents with grounded, sourced answers, to lightweight fine-tuned models that write in your brand's exact voice. <strong>Generative AI that's accurate first, impressive second.</strong>",
      "s4.title": "Agentic Systems & Integration",
      "s4.body": "<strong>AI that queries your databases, operates your internal tools, and completes multi-step tasks end to end.</strong> Multi-agent systems and tool integrations (via MCP), including voice-based assistants for hands-free, conversational use cases.",
      "s5.title": "Evaluation, Deployment & Ongoing Support",
      "s5.body": "Every system ships with its own quality bar: cross-model evaluation frameworks that catch hallucinations before your users do. Once live, we handle the cloud infrastructure and ongoing maintenance, so <strong>reliability doesn't become your problem</strong>.",
      "results.eyebrow": "Proof in production",
      "results.title": "Systems Miloop AI has designed, built, and shipped.",
      "result1.tag": "Content Automation",
      "result1.title": "A Bilingual News Publisher",
      "result1.body": "A multi-model content pipeline cut per-article production time from <strong>hours to under 10 minutes</strong>, and reduced overall content cycle time by <strong>40%</strong>.",
      "result2.tag": "Voice AI",
      "result2.title": "A Nonprofit Organization",
      "result2.body": "A bilingual voice companion, <strong>among the first AI companion apps</strong> built specifically for Chinese American seniors in the U.S. Now in pre-launch.",
      "result3.tag": "Model Fine-Tuning",
      "result3.title": "Brand-Voice Model Fine-Tune",
      "result3.body": "A generic model writes generically. This one was trained on real editorial writing for <strong>$0.70</strong> on a single consumer GPU, <strong>a fraction of the cost</strong> of building a custom model from scratch.",
      "teaser.eyebrow": "About Miloop AI",
      "teaser.statement": "Most AI demos work. Few AI systems survive contact with a real deadline, a real client, or a real edge case. Miloop AI builds the kind that do, with evaluation built into every pipeline from day one.",
      "teaser.cta.about": "Learn About Us",
      "about.eyebrow": "About Us",
      "about.back": "Back to home",
      "about.lede1": "Miloop AI is built around a simple standard: automation that holds up under real, sustained use.",
      "about.p1": "Miloop AI designs and ships production AI systems, from multi-agent pipelines that handle end-to-end content workflows to retrieval-augmented systems and custom-tuned models built for a specific brand voice. Every system includes its own evaluation layer, built into the pipeline itself from the first design decision, so accuracy is verified at every step.",
      "about.pullquote": "Speed only counts when accuracy comes with it.",
      "about.p2": "That standard shapes every system Miloop AI builds, from the first prototype through production deployment.",
      "about.p3": "If a process is costing you more time than it should, or you have an AI system you are not fully confident in yet, that is exactly the kind of problem Miloop AI takes on.",
      "about.founder.eyebrow": "Founder",
      "about.founder.p1": "Miloop AI was founded by Yingying Sun. Her technical career began at a Fortune 500 technology company, where she spent years managing large-scale programs and standardizing reporting across cross-functional teams. That experience shaped how she thinks about building systems that hold up at scale.",
      "about.founder.p2": "That foundation carried into her AI engineering work. She has automated high-stakes editorial workflows, including translation, fact-checking, and formatting, and built multi-modal voice AI systems for elderly, bilingual users, where reliability was the primary design constraint.",
      "about.founder.p3": "She graduated from the University of Michigan with a Master of Applied Data Science, and brings a background in visual storytelling as well. Both disciplines rely on the same core skill: building something a person can actually trust.",
      "about.founder.aside": "(Miloop is named after her cat. Moral support, mostly.)",
      "footer.rights": "Miloop AI, LLC. All rights reserved.",
      "result1.quote": "“Translation, formatting, and the first editorial pass now happen before an editor opens the file. What used to need a full desk now needs one or two people, and they're spending that time on judgment calls instead of repetitive work.”",
      "result1.cite": "Senior Editor, a bilingual news publisher",
      "result2.quote": "“I'd tried other chatbots before. This is the first one that felt like it was actually built for us, not adapted for us.”",
      "result2.cite": "Beta tester",
      "result3.quote": "“I read the draft before I found out which parts were AI-generated. I couldn't tell it apart from our own editors' work.”",
      "result3.cite": "Editorial Director, a bilingual news publisher"
    },
    "zh-Hans": {
      "meta.title": "Miloop AI：生产级AI系统，上线前先经过验证",
      "meta.description": "Miloop AI设计、构建并评估生产级AI系统：内容自动化、RAG检索增强、语音助理、Agent集成，以及让这些系统保持可靠的评估闭环。",
      "hero.eyebrow": "应用型AI工程实践",
      "hero.heading.pre": "AI系统，设计之初就具备",
      "hero.heading.em": "自我校验",
      "hero.heading.post": "的能力。",
      "hero.sub": "Miloop AI设计并交付生产级AI系统，内容自动化、知识问答助理、语音Agent，以及更多场景，每一套都配有独立的评估层，在问题触达用户之前先行拦截。",
      "hero.cta.contact": "开始对话",
      "loop.diagnose": "诊断",
      "loop.build": "构建",
      "loop.verify": "校验",
      "loop.deploy": "部署",
      "loop.support": "支持",
      "services.eyebrow": "我们做什么",
      "services.title": "从第一次评估到持续支持。",
      "s1.title": "AI就绪度评估",
      "s1.body": "不确定AI到底能在你的业务里发挥什么作用？我们会审计你现有的工作流程，以及任何已经在使用的AI系统，找出幻觉风险、被浪费的预算，以及最值得优先投入的地方。你拿到的是一份<strong>按优先级排好的具体路线图</strong>。",
      "s2.title": "工作流与内容自动化",
      "s2.body": "我们把多步骤的人工流程（分类、翻译、起草、事实核查、发布）变成流水线，<strong>把交付时间从数小时缩短到几分钟</strong>。建立在生产级基础设施之上，交接之后依然能持续稳定运行。",
      "s3.title": "生成式AI与知识系统",
      "s3.body": "从让你的团队能够查询内部文档、给出有据可查答案的检索增强系统，到用你品牌语气说话的轻量微调模型。<strong>生成式AI首先要准确，其次才是让人印象深刻。</strong>",
      "s4.title": "Agent系统与集成",
      "s4.body": "<strong>AI能够查询你的数据库、操作你的内部工具，端到端完成多步骤任务。</strong>通过MCP实现的多智能体系统和工具集成，也包括面向免手操作场景的语音助理。",
      "s5.title": "评估、部署与持续支持",
      "s5.body": "每一套系统都自带质量门槛：跨模型评估框架会在用户之前先发现幻觉问题。系统上线之后，我们负责云端基础设施和持续维护，<strong>让可靠性不再是你的负担</strong>。",
      "results.eyebrow": "生产环境里的证据",
      "results.title": "Miloop AI已经设计、构建并交付的系统。",
      "result1.tag": "内容自动化",
      "result1.title": "一家双语新闻机构",
      "result1.body": "一套多模型内容流水线，把单篇文章的制作时间从<strong>数小时缩短到十分钟以内</strong>，整体内容周期缩短了<strong>40%</strong>。",
      "result2.tag": "语音AI",
      "result2.title": "一家非营利机构",
      "result2.body": "一款双语语音陪伴助理，是<strong>最早一批</strong>专门为美国华裔老年群体打造的AI陪伴应用之一，目前处于预发布阶段。",
      "result3.tag": "模型微调",
      "result3.title": "品牌语气模型微调",
      "result3.body": "通用模型只会说通用的话。这一个基于真实编辑写作内容微调而成，训练成本只要<strong>0.70美元</strong>，<strong>只是</strong>从零训练定制模型成本的一小部分。",
      "teaser.eyebrow": "关于Miloop AI",
      "teaser.statement": "多数AI演示都能跑起来，但很少有AI系统能撑过真实的截止日期、真实的客户、真实的边缘案例。Miloop AI做的就是这种能撑住的系统，评估机制从第一天就写进流水线里。",
      "teaser.cta.about": "了解我们",
      "about.eyebrow": "关于我们",
      "about.back": "返回首页",
      "about.lede1": "Miloop AI的标准很简单：自动化要经得起真实、持续的使用考验。",
      "about.p1": "Miloop AI设计并交付生产级AI系统，从处理端到端内容流程的多智能体流水线，到检索增强系统，再到为特定品牌语气定制微调的模型。每一套系统都自带评估层，这一层从设计之初就写进流水线本身，让准确性在每一步都经过验证。",
      "about.pullquote": "速度只有在准确性也到位的时候，才算数。",
      "about.p2": "这个标准贯穿Miloop AI构建的每一套系统，从最初的原型一路到生产环境部署。",
      "about.p3": "如果某个流程正在消耗你比预期更多的时间，或者你手上有一套自己都不完全放心的AI系统，这正是Miloop AI会接手处理的问题。",
      "about.founder.eyebrow": "创始人",
      "about.founder.p1": "Miloop AI由Yingying Sun创立。她的职业生涯始于一家财富500强科技公司，在那里她多年负责大型项目管理，并在跨职能团队之间统一报告规范。这段经历塑造了她对系统要经得起规模考验这件事的理解。",
      "about.founder.p2": "这个基础延伸到了她的AI工程工作中。她自动化过高风险的编辑流程，包括翻译、事实核查和排版，也为双语老年用户构建过多模态语音AI系统，在那里，可靠性是首要的设计约束。",
      "about.founder.p3": "她毕业于密歇根大学，主修应用数据科学硕士，同时也有视觉叙事方面的背景。这两个领域依赖同一种核心能力：做出让人真正能够信任的东西。",
      "about.founder.aside": "（Miloop这个名字，来自她养的猫。主要负责精神支持。）",
      "footer.rights": "Miloop AI, LLC. 保留所有权利。",
      "result1.quote": "「翻译、排版和第一轮编辑校对，现在编辑打开稿件之前就已经完成了。以前需要一整个编辑台的工作，现在一到两个人就能完成，他们把省下来的时间用在判断性工作上，不是重复劳动上。」",
      "result1.cite": "高级编辑，一家双语新闻机构",
      "result2.quote": "「我以前也用过其他聊天机器人。这是第一个真正让我觉得是为我们量身定制的，不是拿别的东西改一改凑合用的。」",
      "result2.cite": "内测用户",
      "result3.quote": "「我看草稿的时候还不知道哪部分是AI生成的，读完发现根本分不出来和我们编辑写的有什么差别。」",
      "result3.cite": "编辑总监，一家双语新闻机构"
    },
    "zh-Hant": {
      "meta.title": "Miloop AI：生產級AI系統，上線前先經過驗證",
      "meta.description": "Miloop AI設計、構建並評估生產級AI系統：內容自動化、RAG檢索增強、語音助理、Agent集成，以及讓這些系統保持可靠的評估閉環。",
      "hero.eyebrow": "應用型AI工程實踐",
      "hero.heading.pre": "AI系統，設計之初就具備",
      "hero.heading.em": "自我校驗",
      "hero.heading.post": "的能力。",
      "hero.sub": "Miloop AI設計並交付生產級AI系統，內容自動化、知識問答助理、語音Agent，以及更多場景，每一套都配有獨立的評估層，在問題觸達用戶之前先行攔截。",
      "hero.cta.contact": "開始對話",
      "loop.diagnose": "診斷",
      "loop.build": "構建",
      "loop.verify": "校驗",
      "loop.deploy": "部署",
      "loop.support": "支持",
      "services.eyebrow": "我們做什麼",
      "services.title": "從第一次評估到持續支持。",
      "s1.title": "AI就緒度評估",
      "s1.body": "不確定AI到底能在你的業務裏發揮什麼作用？我們會審計你現有的工作流程，以及任何已經在使用的AI系統，找出幻覺風險、被浪費的預算，以及最值得優先投入的地方。你拿到的是一份<strong>按優先級排好的具體路線圖</strong>。",
      "s2.title": "工作流與內容自動化",
      "s2.body": "我們把多步驟的人工流程（分類、翻譯、起草、事實覈查、發佈）變成流水線，<strong>把交付時間從數小時縮短到幾分鐘</strong>。建立在生產級基礎設施之上，交接之後依然能持續穩定運行。",
      "s3.title": "生成式AI與知識系統",
      "s3.body": "從讓你的團隊能夠查詢內部文檔、給出有據可查答案的檢索增強系統，到用你品牌語氣說話的輕量微調模型。<strong>生成式AI首先要準確，其次纔是讓人印象深刻。</strong>",
      "s4.title": "Agent系統與集成",
      "s4.body": "<strong>AI能夠查詢你的數據庫、操作你的內部工具，端到端完成多步驟任務。</strong>通過MCP實現的多智能體系統和工具集成，也包括面向免手操作場景的語音助理。",
      "s5.title": "評估、部署與持續支持",
      "s5.body": "每一套系統都自帶質量門檻：跨模型評估框架會在用戶之前先發現幻覺問題。系統上線之後，我們負責雲端基礎設施和持續維護，<strong>讓可靠性不再是你的負擔</strong>。",
      "results.eyebrow": "生產環境裏的證據",
      "results.title": "Miloop AI已經設計、構建並交付的系統。",
      "result1.tag": "內容自動化",
      "result1.title": "一家雙語新聞機構",
      "result1.body": "一套多模型內容流水線，把單篇文章的製作時間從<strong>數小時縮短到十分鐘以內</strong>，整體內容週期縮短了<strong>40%</strong>。",
      "result2.tag": "語音AI",
      "result2.title": "一家非營利機構",
      "result2.body": "一款雙語語音陪伴助理，是<strong>最早一批</strong>專門爲美國華裔老年羣體打造的AI陪伴應用之一，目前處於預發佈階段。",
      "result3.tag": "模型微調",
      "result3.title": "品牌語氣模型微調",
      "result3.body": "通用模型只會說通用的話。這一個基於真實編輯寫作內容微調而成，訓練成本只要<strong>0.70美元</strong>，<strong>只是</strong>從零訓練定製模型成本的一小部分。",
      "teaser.eyebrow": "關於Miloop AI",
      "teaser.statement": "多數AI演示都能跑起來，但很少有AI系統能撐過真實的截止日期、真實的客戶、真實的邊緣案例。Miloop AI做的就是這種能撐住的系統，評估機制從第一天就寫進流水線裏。",
      "teaser.cta.about": "瞭解我們",
      "about.eyebrow": "關於我們",
      "about.back": "返回首頁",
      "about.lede1": "Miloop AI的標準很簡單：自動化要經得起真實、持續的使用考驗。",
      "about.p1": "Miloop AI設計並交付生產級AI系統，從處理端到端內容流程的多智能體流水線，到檢索增強系統，再到爲特定品牌語氣定製微調的模型。每一套系統都自帶評估層，這一層從設計之初就寫進流水線本身，讓準確性在每一步都經過驗證。",
      "about.pullquote": "速度只有在準確性也到位的時候，纔算數。",
      "about.p2": "這個標準貫穿Miloop AI構建的每一套系統，從最初的原型一路到生產環境部署。",
      "about.p3": "如果某個流程正在消耗你比預期更多的時間，或者你手上有一套自己都不完全放心的AI系統，這正是Miloop AI會接手處理的問題。",
      "about.founder.eyebrow": "創始人",
      "about.founder.p1": "Miloop AI由Yingying Sun創立。她的職業生涯始於一家財富500強科技公司，在那裏她多年負責大型項目管理，並在跨職能團隊之間統一報告規範。這段經歷塑造了她對系統要經得起規模考驗這件事的理解。",
      "about.founder.p2": "這個基礎延伸到了她的AI工程工作中。她自動化過高風險的編輯流程，包括翻譯、事實覈查和排版，也爲雙語老年用戶構建過多模態語音AI系統，在那裏，可靠性是首要的設計約束。",
      "about.founder.p3": "她畢業於密歇根大學，主修應用數據科學碩士，同時也有視覺敘事方面的背景。這兩個領域依賴同一種核心能力：做出讓人真正能夠信任的東西。",
      "about.founder.aside": "（Miloop這個名字，來自她養的貓。主要負責精神支持。）",
      "footer.rights": "Miloop AI, LLC. 保留所有權利。",
      "result1.quote": "「翻譯、排版和第一輪編輯校對，現在編輯打開稿件之前就已經完成了。以前需要一整個編輯臺的工作，現在一到兩個人就能完成，他們把省下來的時間用在判斷性工作上，不是重複勞動上。」",
      "result1.cite": "高級編輯，一家雙語新聞機構",
      "result2.quote": "「我以前也用過其他聊天機器人。這是第一個真正讓我覺得是爲我們量身定製的，不是拿別的東西改一改湊合用的。」",
      "result2.cite": "內測用戶",
      "result3.quote": "「我看草稿的時候還不知道哪部分是AI生成的，讀完發現根本分不出來和我們編輯寫的有什麼差別。」",
      "result3.cite": "編輯總監，一家雙語新聞機構"
    }
  };

  var currentLang = "en";

  function applyLang(lang) {
    if (!dict[lang]) lang = "en";
    currentLang = lang;
    var entries = dict[lang];
    var meta = LANG_META[lang];
    document.documentElement.setAttribute("lang", meta.htmlLang);
    document.title = entries["meta.title"] || dict.en["meta.title"];
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", entries["meta.description"] || dict.en["meta.description"]);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (entries[key] !== undefined) el.textContent = entries[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (entries[key] !== undefined) el.innerHTML = entries[key];
    });

    var currentLabel = document.querySelector(".lang-switch-current");
    if (currentLabel) currentLabel.textContent = meta.label;

    document.querySelectorAll(".lang-option").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    try { localStorage.setItem("miloop-lang", lang); } catch (e) { /* ignore */ }
  }

  /* Exposed so other independently-loaded scripts (the lead-intake panel)
     can trigger the same language change and stay in sync, instead of
     keeping a separate copy of this logic. */
  window.miloopSetLanguage = applyLang;

  document.addEventListener("DOMContentLoaded", function () {
    var initial = "en";
    try {
      var saved = localStorage.getItem("miloop-lang");
      if (dict[saved]) initial = saved;
    } catch (e) { /* ignore */ }
    applyLang(initial);

    /* --- Language dropdown --- */
    var langSwitch = document.querySelector(".lang-switch");
    var langBtn = document.querySelector(".lang-switch-btn");
    if (langSwitch && langBtn) {
      langBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = langSwitch.classList.toggle("open");
        langBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      document.querySelectorAll(".lang-option").forEach(function (opt) {
        opt.addEventListener("click", function () {
          applyLang(opt.getAttribute("data-lang"));
          langSwitch.classList.remove("open");
          langBtn.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("click", function (e) {
        if (!langSwitch.contains(e.target)) {
          langSwitch.classList.remove("open");
          langBtn.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          langSwitch.classList.remove("open");
          langBtn.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* --- Interactive services panel --- */
    var serviceMenuItems = document.querySelectorAll(".service-menu-item");
    if (serviceMenuItems.length) {
      serviceMenuItems.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var targetId = btn.getAttribute("data-target");
          serviceMenuItems.forEach(function (b) {
            b.classList.remove("active");
            b.setAttribute("aria-selected", "false");
          });
          document.querySelectorAll(".service-panel-item").forEach(function (p) {
            p.classList.remove("active");
          });
          btn.classList.add("active");
          btn.setAttribute("aria-selected", "true");
          var target = document.getElementById(targetId);
          if (target) target.classList.add("active");
        });
      });
    }

    var yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if ("IntersectionObserver" in window) {
      var revealItems = document.querySelectorAll(".reveal");
      var observer = new IntersectionObserver(function (results) {
        results.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach(function (item) { observer.observe(item); });
    }

    /* --- "Start a conversation" trigger(s) ---
       No click handler wired up yet. The lead-intake chat panel script
       (built separately) should attach its own listener to
       document.querySelectorAll(".js-start-conversation"), or to
       #start-conversation-btn specifically for the nav trigger. */
  });
})();
