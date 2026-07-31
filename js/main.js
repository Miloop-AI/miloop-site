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
      "meta.title": "Miloop AI: Applied AI Engineering Consultancy",
      "meta.description": "Miloop AI designs and ships production AI systems, from content automation to voice agents, each with an independent evaluation layer built in from day one.",
      "hero.eyebrow": "Applied AI Engineering Practice",
      "hero.heading.pre": "AI systems engineered to ",
      "hero.heading.em": "verify themselves",
      "hero.heading.post": ".",
      "hero.sub": "Manual workflows have a hidden cost in time and budget. Unchecked AI has a hidden cost in trust. Miloop AI designs and ships production AI systems, from content automation and knowledge assistants to voice agents and beyond, each with an independent evaluation layer that catches failures before they reach your customers.",
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
      "livedemo.title": "Or look at one up close.",
      "demo1.badge": "Live",
      "demo1.tag": "Multi-Agent Pipeline",
      "demo1.name": "FactLoop Newsroom",
      "demo1.tagline": "Type a topic in any language and watch it research, write, and fact-check a sourced article, live.",
      "demo1.cta": "Try it live",
      "demo2.badge": "Case study",
      "demo2.tag": "RAG Evaluation",
      "demo2.name": "Driftboard RAG Eval",
      "demo2.tagline": "An evaluation framework for RAG, stress-tested against a fictional knowledge base to catch what happens when the system does not know the answer, and to catch its own judge's blind spots too.",
      "demo2.stat1.label": "Held-out kappa",
      "demo2.stat2.label": "Retrieval Hit@4",
      "demo2.cta": "Read the case study",
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
      "result3.cite": "Editorial Director, a bilingual news publisher",
      "privacy.eyebrow": "Privacy Policy",
      "privacy.updated": "Last updated: July 2026",
      "privacy.intro": "Miloop AI, LLC (“Miloop AI,” “we,” “us”) respects your privacy. This page explains what information we collect through this website and how we use it.",
      "privacy.collect.title": "Information we collect",
      "privacy.collect.body": "When you use the “Start a conversation” panel, we collect what you provide: your name, email address, and optionally your company, phone number, and any details you share about your project. We also store your language preference (English, Simplified Chinese, or Traditional Chinese) locally in your browser so the site remembers your choice on return visits. This preference stays on your device and is not sent to us.",
      "privacy.use.title": "How we use it",
      "privacy.use.body": "We use the information you submit through the contact panel solely to respond to your inquiry and evaluate whether we're a good fit for your project. We do not sell, rent, or share your information with third parties for their own marketing purposes.",
      "privacy.providers.title": "Service providers",
      "privacy.providers.body": "We use Resend to deliver the emails generated by the contact panel, Vercel to host this website, and Anthropic's Claude API to power the optional virtual assistant inside the contact panel. These providers process data on our behalf and are bound by their own privacy and security practices.",
      "privacy.assistant.title": "Virtual assistant",
      "privacy.assistant.body": "If you choose to use the virtual assistant inside the contact panel, your messages there are sent to Anthropic's Claude API to help identify which of our services fit your needs. Please don't share sensitive information, such as credit card numbers, phone numbers, or unannounced business plans, in that conversation. We keep a copy of these conversations to review the assistant's accuracy. We don't use them for advertising, and we don't share them outside Miloop AI.",
      "privacy.assistant.retention": "Anthropic does not use this data to train its models by default, and may retain it for a limited period for safety and abuse-monitoring purposes under its own API terms. You can read Anthropic's data retention policy <a href=\"https://platform.claude.com/docs/en/manage-claude/api-and-data-retention\" target=\"_blank\" rel=\"noopener\">here</a>.",
      "privacy.tracking.title": "Cookies and tracking",
      "privacy.tracking.body": "This site does not use analytics tools, advertising cookies, or third-party trackers. The only thing stored in your browser is the language preference described above.",
      "privacy.children.title": "Children's privacy",
      "privacy.children.body": "This website is not directed at children, and we do not knowingly collect personal information from anyone under 18.",
      "privacy.retention.title": "Data retention",
      "privacy.retention.body": "We retain inquiry information for as long as reasonably necessary to respond to you and maintain our business records. You can request that we delete your information at any time by emailing us.",
      "privacy.choices.title": "Your choices",
      "privacy.choices.body": "To access, correct, or delete the information you've submitted, email info@miloop.ai. We'll respond within a reasonable timeframe.",
      "privacy.changes.title": "Changes to this policy",
      "privacy.changes.body": "We may update this page from time to time. The “last updated” date above reflects the most recent revision.",
      "privacy.contact.title": "Contact",
      "privacy.contact.body": "Questions about this policy can be sent to info@miloop.ai.",
      "footer.privacy": "Privacy Policy"
    },
    "zh-Hans": {
      "meta.title": "Miloop AI：应用型AI工程咨询",
      "meta.description": "Miloop AI设计并交付可用于生产环境的AI系统，从内容自动化到语音助理，每一套系统从第一天起就配有独立的评估层。",
      "hero.eyebrow": "应用型AI工程实践",
      "hero.heading.pre": "AI系统，设计之初就具备",
      "hero.heading.em": "自我核验",
      "hero.heading.post": "的能力。",
      "hero.sub": "人工流程的隐性成本，是时间和预算。未经校验的AI，隐性成本是信任。Miloop AI设计并交付可用于生产环境的AI系统：内容自动化、知识问答、语音助理，以及更多场景。每一套系统都配有独立的评估机制，在问题影响到您的客户之前，先一步拦截。",
      "hero.cta.contact": "开始对话",
      "loop.diagnose": "诊断",
      "loop.build": "构建",
      "loop.verify": "校验",
      "loop.deploy": "部署",
      "loop.support": "支持",
      "services.eyebrow": "我们做什么",
      "services.title": "从第一次评估到持续支持。",
      "s1.title": "AI就绪度评估",
      "s1.body": "不确定AI到底能在您的业务里发挥什么作用？我们会审计您现有的工作流程，以及任何已经在使用的AI系统，找出幻觉风险、被浪费的预算，以及最值得优先投入的地方。您拿到的是一份<strong>按优先级排好的具体路线图</strong>。",
      "s2.title": "工作流与内容自动化",
      "s2.body": "我们把多步骤的人工作业（分类、翻译、起草、事实核查、发布）整合成一条流水线，<strong>交付时间从数小时压缩到几分钟</strong>。系统建立在生产级基础设施上，交接之后仍能持续稳定运行。",
      "s3.title": "生成式AI与知识系统",
      "s3.body": "从让您的团队查询内部文档、获得有据可查的答案，到用您品牌语气说话的轻量微调模型。<strong>生成式AI，准确是前提，令人印象深刻只是结果。</strong>",
      "s4.title": "Agent系统与集成",
      "s4.body": "<strong>AI能够查询您的数据库、操作您的内部工具，端到端完成多步骤任务。</strong>通过MCP实现的多智能体系统和工具集成，也包括面向免手操作场景的语音助理。",
      "s5.title": "评估、部署与持续支持",
      "s5.body": "每一套系统都自带质量门槛：跨模型评估框架会在用户之前先发现幻觉问题。系统上线之后，我们负责云端基础设施和持续维护，<strong>可靠性从此不再是您的负担</strong>。",
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
      "livedemo.title": "或者，挑一个近看。",
      "demo1.badge": "即时",
      "demo1.tag": "多智能体流水线",
      "demo1.name": "FactLoop Newsroom",
      "demo1.tagline": "用任何语言输入一个主题，看它当场搜集资料、撰稿、查证，产出一篇有来源可查的报道。",
      "demo1.cta": "实际试跑",
      "demo2.badge": "案例研究",
      "demo2.tag": "RAG 评估",
      "demo2.name": "Driftboard RAG Eval",
      "demo2.tagline": "一套 RAG 评估框架，拿一个虚构知识库做压力测试，专门抓系统答不出来的时候会发生什么，连评判者自己的盲点也一起抓。",
      "demo2.stat1.label": "保留题 kappa 值",
      "demo2.stat2.label": "检索 Hit@4",
      "demo2.cta": "阅读案例",
      "teaser.eyebrow": "关于Miloop AI",
      "teaser.statement": "多数AI演示都能跑起来，但很少有AI系统能撑过真实的截止日期、真实的客户、真实的边缘案例。Miloop AI做的就是这种能撑住的系统，评估机制从第一天就写进流水线里。",
      "teaser.cta.about": "了解我们",
      "about.eyebrow": "关于我们",
      "about.back": "返回首页",
      "about.lede1": "Miloop AI的标准很简单：自动化要经得起真实、持续的使用考验。",
      "about.p1": "Miloop AI设计并交付生产级AI系统，从处理端到端内容流程的多智能体流水线，到检索增强系统，再到为特定品牌语气定制微调的模型。每一套系统都自带评估层，这一层从设计之初就写进流水线本身，让准确性在每一步都经过验证。",
      "about.pullquote": "唯有准确性同时到位，速度才有意义。",
      "about.p2": "这个标准贯穿Miloop AI构建的每一套系统，从最初的原型一路到生产环境部署。",
      "about.p3": "如果某个流程正在消耗您比预期更多的时间，或者您手上有一套自己都不完全放心的AI系统，这正是Miloop AI会接手处理的问题。",
      "about.founder.eyebrow": "创始人",
      "about.founder.p1": "Miloop AI由Yingying Sun创立。她的职业生涯始于一家财富500强科技公司，在那里她多年负责大型项目管理，并在跨职能团队之间统一报告规范。这段经历塑造了她对系统要经得起规模考验这件事的理解。",
      "about.founder.p2": "这个基础延伸到了她的AI工程工作中。她自动化过高风险的编辑流程，包括翻译、事实核查和排版，也为双语老年用户构建过多模态语音AI系统，在那里，可靠性是首要的设计约束。",
      "about.founder.p3": "她毕业于密歇根大学，主修应用数据科学硕士，同时也有视觉叙事方面的背景。这两个领域依赖同一种核心能力：做出让人真正能够信任的东西。",
      "about.founder.aside": "（Miloop这个名字，来自她养的猫。主要负责精神支持。）",
      "footer.rights": "Miloop AI, LLC. 保留所有权利。",
      "result1.quote": "「以前一篇稿子要经过好几道手，翻译、排版、初审，一个都不能少。现在这些在编辑看到稿子之前就处理好了，原本要一整个组才能扛下来的活儿，一两个人就够了，省出来的时间用来做真正需要判断的事。」",
      "result1.cite": "高级编辑，一家双语新闻机构",
      "result2.quote": "「我之前也用过别的聊天机器人，但都感觉是拿现成的东西套过来的。这个不一样，一用就知道是真的为我们做的。」",
      "result2.cite": "内测用户",
      "result3.quote": "「我看那篇稿子的时候还不知道是AI写的，看完才发现，跟我们编辑写的完全看不出差别。」",
      "result3.cite": "编辑总监，一家双语新闻机构",
      "footer.privacy": "隐私权政策",
      "privacy.eyebrow": "隐私权政策",
      "privacy.updated": "最后更新：2026年7月",
      "privacy.intro": "Miloop AI, LLC（以下称“Miloop AI”、“我们”）重视您的隐私。本页说明我们通过本网站收集哪些信息，以及如何使用这些信息。",
      "privacy.collect.title": "我们收集哪些信息",
      "privacy.collect.body": "当您使用“开始对话”面板时，我们会收集您提供的信息：姓名、电子邮箱，以及您选填的公司名称、电话号码，还有您分享的项目相关细节。我们也会在您的浏览器本地保存语言偏好设置（英文、简体中文或繁体中文），方便您下次访问时沿用同样的语言。这项偏好只保存在您的设备上，不会传送给我们。",
      "privacy.use.title": "我们如何使用这些信息",
      "privacy.use.body": "我们使用您通过对话面板提交的信息，唯一目的是回应您的咨询，并判断是否适合承接您的项目。我们不会出售、出租您的信息，也不会为了第三方自己的营销目的而分享给对方。",
      "privacy.providers.title": "服务提供商",
      "privacy.providers.body": "我们使用Resend发送对话面板产生的邮件，使用Vercel托管本网站，并使用Anthropic的Claude API为对话面板里可选的虚拟助理提供支持。这些服务商代表我们处理数据，并各自遵循自己的隐私与安全规范。",
      "privacy.assistant.title": "虚拟助理",
      "privacy.assistant.body": "如果您选择使用对话面板里的虚拟助理，您在那段对话里发送的内容会传送给Anthropic的Claude API，用于判断哪些服务符合您的需求。请不要在那段对话里透露敏感信息，比如信用卡号、电话号码或尚未公开的商业计划。我们会保留这些对话记录，用于复查助理判断的准确性，不会用于广告投放，也不会分享给Miloop AI以外的任何人。",
      "privacy.assistant.retention": "Anthropic默认不会用这些数据训练模型，可能会依照其API条款，出于安全与防止滥用的目的保留一段有限的时间。您可以在<a href=\"https://platform.claude.com/docs/en/manage-claude/api-and-data-retention\" target=\"_blank\" rel=\"noopener\">这里</a>查看Anthropic的数据保留政策。",
      "privacy.tracking.title": "Cookie与追踪",
      "privacy.tracking.body": "本网站不使用任何分析工具、广告Cookie或第三方追踪工具。您的浏览器里唯一保存的，只有上文提到的语言偏好设置。",
      "privacy.children.title": "儿童隐私",
      "privacy.children.body": "本网站的设计对象不包括儿童，我们不会在知情的情况下收集18岁以下人士的个人信息。",
      "privacy.retention.title": "数据保留",
      "privacy.retention.body": "我们会在合理必要的期限内保留您的咨询信息，用于回应您以及维护业务记录。您可以随时发邮件要求我们删除您的信息。",
      "privacy.choices.title": "您的选择",
      "privacy.choices.body": "如需查阅、更正或删除您提交的信息，请发邮件至info@miloop.ai，我们会在合理时间内回复。",
      "privacy.changes.title": "政策更新",
      "privacy.changes.body": "我们可能不时更新本页内容，上方“最后更新”日期反映最近一次修订的时间。",
      "privacy.contact.title": "联系方式",
      "privacy.contact.body": "如对本政策有任何疑问，欢迎发邮件至info@miloop.ai。"
    },
    "zh-Hant": {
      "meta.title": "Miloop AI：應用型AI工程顧問",
      "meta.description": "Miloop AI設計並交付可用於生產環境的AI系統，從內容自動化到語音助理，每一套系統從第一天起就配有獨立的評估層。",
      "hero.eyebrow": "應用型AI工程實踐",
      "hero.heading.pre": "AI系統，設計之初就具備",
      "hero.heading.em": "自我核驗",
      "hero.heading.post": "的能力。",
      "hero.sub": "人工流程的隱性成本，是時間和預算。未經校驗的AI，隱性成本是信任。Miloop AI設計並交付可用於生產環境的AI系統：內容自動化、知識問答、語音助理，以及更多場景。每一套系統都配有獨立的評估機制，在問題影響到您的客戶之前，先一步攔截。",
      "hero.cta.contact": "開始對話",
      "loop.diagnose": "診斷",
      "loop.build": "構建",
      "loop.verify": "校驗",
      "loop.deploy": "部署",
      "loop.support": "支持",
      "services.eyebrow": "我們做什麼",
      "services.title": "從第一次評估到持續支持。",
      "s1.title": "AI就緒度評估",
      "s1.body": "不確定AI到底能在您的業務裡發揮什麼作用？我們會審計您現有的工作流程，以及任何已經在使用的AI系統，找出幻覺風險、被浪費的預算，以及最值得優先投入的地方。您拿到的是一份<strong>按優先級排好的具體路線圖</strong>。",
      "s2.title": "工作流與內容自動化",
      "s2.body": "我們把多步驟的人工作業（分類、翻譯、起草、事實核查、發佈）整合成一條流水線，<strong>交付時間從數小時壓縮到幾分鐘</strong>。系統建立在生產級基礎設施上，交接之後仍能持續穩定運行。",
      "s3.title": "生成式AI與知識系統",
      "s3.body": "從讓您的團隊查詢內部文檔、獲得有據可查的答案，到用您品牌語氣說話的輕量微調模型。<strong>生成式AI，準確是前提，令人印象深刻只是結果。</strong>",
      "s4.title": "Agent系統與集成",
      "s4.body": "<strong>AI能夠查詢您的資料庫、操作您的內部工具，端到端完成多步驟任務。</strong>通過MCP實現的多智能體系統和工具集成，也包括面向免手操作場景的語音助理。",
      "s5.title": "評估、部署與持續支持",
      "s5.body": "每一套系統都自帶品質門檻：跨模型評估框架會在使用者之前先發現幻覺問題。系統上線之後，我們負責雲端基礎設施和持續維護，<strong>可靠性從此不再是您的負擔</strong>。",
      "results.eyebrow": "生產環境裡的證據",
      "results.title": "Miloop AI已經設計、構建並交付的系統。",
      "result1.tag": "內容自動化",
      "result1.title": "一家雙語新聞機構",
      "result1.body": "一套多模型內容流水線，把單篇文章的製作時間從<strong>數小時縮短到十分鐘以內</strong>，整體內容週期縮短了<strong>40%</strong>。",
      "result2.tag": "語音AI",
      "result2.title": "一家非營利機構",
      "result2.body": "一款雙語語音陪伴助理，是<strong>最早一批</strong>專門為美國華裔老年群體打造的AI陪伴應用之一，目前處於預發佈階段。",
      "result3.tag": "模型微調",
      "result3.title": "品牌語氣模型微調",
      "result3.body": "通用模型只會說通用的話。這一個基於真實編輯寫作內容微調而成，訓練成本只要<strong>0.70美元</strong>，<strong>只是</strong>從零訓練定製模型成本的一小部分。",
      "livedemo.title": "或者，挑一個近看。",
      "demo1.badge": "即時",
      "demo1.tag": "多智能體流水線",
      "demo1.name": "FactLoop Newsroom",
      "demo1.tagline": "用任何語言輸入一個主題，看它當場蒐集資料、撰稿、查證，產出一篇有來源可查的報導。",
      "demo1.cta": "實際試跑",
      "demo2.badge": "案例研究",
      "demo2.tag": "RAG 評估",
      "demo2.name": "Driftboard RAG Eval",
      "demo2.tagline": "一套 RAG 評估框架，拿一個虛構知識庫做壓力測試，專門抓系統答不出來的時候會發生什麼，連評判者自己的盲點也一起抓。",
      "demo2.stat1.label": "保留題 kappa 值",
      "demo2.stat2.label": "檢索 Hit@4",
      "demo2.cta": "閱讀案例",
      "teaser.eyebrow": "關於Miloop AI",
      "teaser.statement": "多數AI演示都能跑起來，但很少有AI系統能撐過真實的截止日期、真實的客戶、真實的邊緣案例。Miloop AI做的就是這種能撐住的系統，評估機制從第一天就寫進流水線裡。",
      "teaser.cta.about": "瞭解我們",
      "about.eyebrow": "關於我們",
      "about.back": "返回首頁",
      "about.lede1": "Miloop AI的標準很簡單：自動化要經得起真實、持續的使用考驗。",
      "about.p1": "Miloop AI設計並交付生產級AI系統，從處理端到端內容流程的多智能體流水線，到檢索增強系統，再到為特定品牌語氣定製微調的模型。每一套系統都自帶評估層，這一層從設計之初就寫進流水線本身，讓準確性在每一步都經過驗證。",
      "about.pullquote": "唯有準確性同時到位，速度才有意義。",
      "about.p2": "這個標準貫穿Miloop AI構建的每一套系統，從最初的原型一路到生產環境部署。",
      "about.p3": "如果某個流程正在消耗您比預期更多的時間，或者您手上有一套自己都不完全放心的AI系統，這正是Miloop AI會接手處理的問題。",
      "about.founder.eyebrow": "創始人",
      "about.founder.p1": "Miloop AI由Yingying Sun創立。她的職業生涯始於一家財富500強科技公司，在那裡她多年負責大型專案管理，並在跨職能團隊之間統一報告規範。這段經歷塑造了她對系統要經得起規模考驗這件事的理解。",
      "about.founder.p2": "這個基礎延伸到了她的AI工程工作中。她自動化過高風險的編輯流程，包括翻譯、事實核查和排版，也為雙語老年使用者構建過多模態語音AI系統，在那裡，可靠性是首要的設計約束。",
      "about.founder.p3": "她畢業於密歇根大學，主修應用資料科學碩士，同時也有視覺敘事方面的背景。這兩個領域依賴同一種核心能力：做出讓人真正能夠信任的東西。",
      "about.founder.aside": "（Miloop這個名字，來自她養的貓。主要負責精神支持。）",
      "footer.rights": "Miloop AI, LLC. 保留所有權利。",
      "result1.quote": "「以前一篇稿子要經過好幾道手，翻譯、排版、初審，一個都不能少。現在這些在編輯看到稿子之前就處理好了，原本要一整個組才能扛下來的活兒，一兩個人就夠了，省出來的時間用來做真正需要判斷的事。」",
      "result1.cite": "高級編輯，一家雙語新聞機構",
      "result2.quote": "「我之前也用過別的聊天機器人，但都感覺是拿現成的東西套過來的。這個不一樣，一用就知道是真的為我們做的。」",
      "result2.cite": "內測使用者",
      "result3.quote": "「我看那篇稿子的時候還不知道是AI寫的，看完才發現，跟我們編輯寫的完全看不出差別。」",
      "result3.cite": "編輯總監，一家雙語新聞機構",
      "footer.privacy": "隱私權政策",
      "privacy.eyebrow": "隱私權政策",
      "privacy.updated": "最後更新：2026年7月",
      "privacy.intro": "Miloop AI, LLC（以下稱“Miloop AI”、“我們”）重視您的隱私。本頁說明我們通過本網站收集哪些資訊，以及如何使用這些資訊。",
      "privacy.collect.title": "我們收集哪些資訊",
      "privacy.collect.body": "當您使用“開始對話”面板時，我們會收集您提供的資訊：姓名、電子郵件，以及您選填的公司名稱、電話號碼，還有您分享的專案相關細節。我們也會在您的瀏覽器本地保存語言偏好設定（英文、簡體中文或繁體中文），方便您下次訪問時沿用同樣的語言。這項偏好只保存在您的設備上，不會傳送給我們。",
      "privacy.use.title": "我們如何使用這些資訊",
      "privacy.use.body": "我們使用您通過對話面板提交的資訊，唯一目的是回應您的諮詢，並判斷是否適合承接您的專案。我們不會出售、出租您的資訊，也不會為了第三方自己的行銷目的而分享給對方。",
      "privacy.providers.title": "服務提供商",
      "privacy.providers.body": "我們使用Resend發送對話面板產生的郵件，使用Vercel託管本網站，並使用Anthropic的Claude API為對話面板裡可選的虛擬助理提供支援。這些服務商代表我們處理資料，並各自遵循自己的隱私與安全規範。",
      "privacy.assistant.title": "虛擬助理",
      "privacy.assistant.body": "如果您選擇使用對話面板裡的虛擬助理，您在那段對話裡傳送的內容會傳送給Anthropic的Claude API，用於判斷哪些服務符合您的需求。請不要在那段對話裡透露敏感資訊，比如信用卡號、電話號碼或尚未公開的商業計畫。我們會保留這些對話紀錄，用於複查助理判斷的準確性，不會用於廣告投放，也不會分享給Miloop AI以外的任何人。",
      "privacy.assistant.retention": "Anthropic預設不會用這些資料訓練模型，可能會依照其API條款，基於安全與防止濫用的目的保留一段有限的時間。您可以在<a href=\"https://platform.claude.com/docs/en/manage-claude/api-and-data-retention\" target=\"_blank\" rel=\"noopener\">這裡</a>查看Anthropic的資料保留政策。",
      "privacy.tracking.title": "Cookie與追蹤",
      "privacy.tracking.body": "本網站不使用任何分析工具、廣告Cookie或第三方追蹤工具。您的瀏覽器裡唯一保存的，只有上文提到的語言偏好設定。",
      "privacy.children.title": "兒童隱私",
      "privacy.children.body": "本網站的設計對象不包括兒童，我們不會在知情的情況下收集18歲以下人士的個人資訊。",
      "privacy.retention.title": "資料保留",
      "privacy.retention.body": "我們會在合理必要的期限內保留您的諮詢資訊，用於回應您以及維護業務記錄。您可以隨時寄郵件要求我們刪除您的資訊。",
      "privacy.choices.title": "您的選擇",
      "privacy.choices.body": "如需查閱、更正或刪除您提交的資訊，請寄郵件至info@miloop.ai，我們會在合理時間內回覆。",
      "privacy.changes.title": "政策更新",
      "privacy.changes.body": "我們可能不時更新本頁內容，上方“最後更新”日期反映最近一次修訂的時間。",
      "privacy.contact.title": "聯繫方式",
      "privacy.contact.body": "如對本政策有任何疑問，歡迎寄郵件至info@miloop.ai。"
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
      var AUTO_ADVANCE_DELAY = 6000;
      var MANUAL_DWELL_DELAY = 10000;
      var serviceTimer = null;
      var currentServiceIndex = 0;

      serviceMenuItems.forEach(function (btn, index) {
        if (btn.classList.contains("active")) currentServiceIndex = index;
      });

      function activateService(index) {
        var btn = serviceMenuItems[index];
        if (!btn) return;
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
        currentServiceIndex = index;
      }

      function scheduleNextAdvance(delay) {
        if (serviceTimer) clearTimeout(serviceTimer);
        serviceTimer = setTimeout(function () {
          activateService((currentServiceIndex + 1) % serviceMenuItems.length);
          scheduleNextAdvance(AUTO_ADVANCE_DELAY);
        }, delay);
      }

      serviceMenuItems.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          activateService(index);
          scheduleNextAdvance(MANUAL_DWELL_DELAY);
        });
      });

      scheduleNextAdvance(AUTO_ADVANCE_DELAY);
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
