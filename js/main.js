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
      "hero.eyebrow": "Reliable AI for real business problems",
      "hero.heading.pre": "Automate the busywork with AI that ",
      "hero.heading.em": "verifies itself",
      "hero.heading.post": "",
      "hero.sub": "Manual work costs you time. AI you can't trust costs you money. We build self-checking AI systems that automate your biggest bottlenecks, including:",
      "hero.offer1.name": "Entire processes, start to finish",
      "hero.offer1.desc": "A quote, an invoice, a monthly report: the chain that used to pass through three people and four tools now runs on its own.",
      "hero.offer2.name": "Custom-trained AI assistants",
      "hero.offer2.desc": "A simple chat screen, backed by a model fine-tuned on your own material, so the people using it get complex work done without any technical training.",
      "hero.offer3.name": "Agents that do the work, not just answer questions",
      "hero.offer3.desc": "Instead of telling your staff what to do next, it does it: finds the record, makes the change, and updates the other tools. You choose which steps stop for a person first.",
      "hero.promise": "You don't need to already understand AI. You just need a problem worth solving.",
      "hero.cta.contact": "Start a conversation",
      "hero.cta.short": "Let’s talk",
      "nav.youtube": "YouTube channel",
      "loop.diagnose": "Diagnose",
      "loop.build": "Build",
      "loop.verify": "Verify",
      "loop.deploy": "Deploy",
      "loop.support": "Support",
      "loop.sentback": "sent back",
      "loop.passed": "passed",
      "services.eyebrow": "What we do",
      "services.title": "From your first assessment to ongoing support.",
      "sv.yield": "What you walk away with",
      "y1a": "A prioritized roadmap",
      "y1ad": "Every process we looked at, ranked by what fixing it is actually worth.",
      "y1b": "A risk list",
      "y1bd": "Where a system can state something false with total confidence, and what that would cost you.",
      "y2a": "An automated pipeline",
      "y2ad": "Runs on your own infrastructure, and keeps running long after we hand it off.",
      "y2b": "A runbook",
      "y2bd": "Written so your team can change how it behaves without calling us back.",
      "y3a": "Answers that carry sources",
      "y3ad": "Every reply names the document and the section it came from, or says it could not find one.",
      "y3b": "A model that writes the way you write",
      "y3bd": "Trained on your own material, at a fraction of what building one from scratch costs.",
      "y4a": "An agent that runs the whole chain",
      "y4ad": "Queries your systems and finishes the task, rather than handling one step of it.",
      "y4b": "A human confirmation gate",
      "y4bd": "Enforced in the code, not by asking the model to be careful.",
      "y5a": "An evaluation report",
      "y5ad": "A second model keeps testing the answers, and what slips through is logged and sent to you.",
      "y5b": "Ongoing operations",
      "y5bd": "Cloud infrastructure and day-to-day maintenance stay with us, so nobody on your team has to learn a new system.",



      "services.lede": "Most people take one of these rather than all five, and start with the first.",







      "sv1.stage": "01 / DIAGNOSE",
      "sv1.pain": "Everyone says to use AI. You have tried a few tools. Nobody can tell you which part of the work to fix first, or what fixing it would be worth.",
      "sv2.stage": "02 / BUILD",
      "sv2.pain": "Someone moved the same information by hand this morning, for the third time this week. Copy it out of one tool, fix the formatting, fill in the missing fields, paste it into the next one. The work is easy. It costs two hours a day, and nobody wants it.",






      "sv3.stage": "03 / BUILD",
      "sv3.pain": "Ask about something only your own documents contain, and the AI starts inventing. What the contract says, who signs off on this, what that spec number actually is: it answers fast, it sounds certain, and it cannot tell you where any of it came from.",




      "sv4.stage": "04 / BUILD",
      "sv4.pain": "Five tools, five logins, and nothing joins them up. Every task needs a person in the middle: look it up here, paste it there, come back and mark it done.",








      "sv5.stage": "05 / VERIFY",
      "sv5.pain": "When it goes wrong, your customer usually finds out before you do. An AI system does not crash. It just starts being wrong, in exactly the same confident tone.",



      "sv.realrun": "real run",
      "s1.title": "AI Readiness Assessment",
      "s1.body": "We walk your current process end to end, including any AI already running, and work out where the time and the money actually go.",
      "s2.title": "Workflow & Content Automation",
      "s2.body": "We connect those steps into a line that runs itself, with nobody in the middle. <strong>Quotes, support replies, internal reports, customer-facing content: the same approach fits all of them.</strong>",
      "s3.title": "Generative AI & Knowledge Systems",
      "s3.body": "This is the one that <strong>answers</strong>. Every answer has to name the document and the section it came from, and if it cannot find one, it says so.",
      "s4.title": "Agentic Systems & Integration",
      "s4.body": "The previous one answers. This one <strong>acts</strong>: it finishes the whole chain, stopping only where a person has to say yes. That stop is enforced in the code.",
      "s5.title": "Evaluation, Deployment & Ongoing Support",
      "s5.body": "Every system we ship carries <strong>its own exam</strong>: a second model keeps testing its answers, and anything wrong or unsupported is logged and sent to you. It can also be added to a system you already run.",
      "results.eyebrow": "Proof in production",
      "results.title": "Systems we have designed, built, and shipped.",
      "result3.lead": "Training cost: <b>$0.70</b>",
      "result2.lead": "Launched on <b>App Store &middot; Google Play</b>",
      "result1.lead": "Turnaround time cut <b>40%</b>",
      "result1.tag": "Content Automation",
      "result1.title": "A Bilingual News Publisher",
      "result2.tag": "Voice AI Chatbot",
      "result2.title": "A Nonprofit Organization",
      "result3.tag": "Model Fine-Tuning",
      "result3.title": "A Bilingual News Publisher",
      "livedemo.eyebrow": "Portfolio",
      "livedemo.title": "Three systems you can try, read, or watch for yourself.",
      "demo1.badge": "Live",
      "demo1.tag": "Multi-Agent Pipeline",
      "demo1.name": "FactLoop Newsroom",
      "demo1.tagline": "Type a topic in any language and watch it research, write, and fact-check a sourced article, live.",
      "demo1.cta": "Try it live",
      "demo2.badge": "Case study",
      "demo2.tag": "RAG Evaluation",
      "demo2.name": "Driftboard RAG Eval",
      "demo2.tagline": "An evaluation framework for RAG, stress-tested against a fictional knowledge base. It measures what the system does when it has no answer, and checks its own judge for blind spots.",
      "demo2.stat1.label": "Held-out kappa",
      "demo2.stat2.label": "Retrieval Hit@4",
      "demo2.cta": "Read the case study",
      "demo3.badge": "Case study",
      "demo3.tag": "Agent Permissions",
      "demo3.name": "DeskLoop",
      "demo3.tagline": "An IT and HR helpdesk agent whose permission check sits outside the model, in a tool server of its own. Persuading it gets you no further, and a confirmation belongs to one action and nothing else.",
      "demo3.cta": "Watch the walkthrough",
      "teaser.eyebrow": "About Miloop AI",
      "teaser.statement": "Most AI looks good in a demo. Few AI systems hold up against a real deadline and a real edge case. We build the kind that do, with evaluation built into every pipeline from day one.",
      "teaser.cta.about": "Learn About Us",
      "about.eyebrow": "About Us",
      "about.back": "Back to home",
      "about.lede1": "Miloop AI is built around a simple standard: automation that holds up under real, sustained use.",
      "about.p1": "We design and ship AI systems that run in real production, the kind that outlast a demo. That means pipelines that handle real content workflows start to finish, systems that answer questions using your own documents, and models custom-trained to sound like your brand. Every system includes its own evaluation layer, built in from day one, so accuracy is checked at every step.",
      "about.pullquote": "Speed only counts when accuracy comes with it.",
      "about.p3": "If a process is costing you more time than it should, or you already have an AI tool you're not fully sure you can trust, that's exactly the kind of problem we take on.",
      "about.founder.eyebrow": "Founder",
      "about.founder.p1": "Miloop AI was founded by an AI engineer who built her career managing large-scale programs and standardizing cross-functional reporting at a Fortune 500 technology company. Those years are where she learned to tell whether a system will hold up at scale.",
      "about.founder.p2": "She has since engineered AI solutions for high-stakes environments, from automating complex editorial workflows and fine-tuning custom language models for specialized tasks, to building multi-modal voice AI systems for elderly, bilingual users, where reliability was the absolute top priority.",
      "about.founder.p3": "She holds a Master of Applied Data Science from the University of Michigan, and her background before that spans film and TV directing, video production, news editing, programming and data analysis. Those jobs are all hard in the same way. Whatever you make, someone has to be able to trust it.",
      "about.founder.aside": "(And yes, Miloop is named after her cat, the company’s Chief Moral Support Officer.)",
      "about.founder.channel": "There&rsquo;s also a YouTube channel, where our feline host pokes at AI tools until something breaks. <a href=\"https://www.youtube.com/channel/UCPrsvNKxjenRt8NLZQLx50Q\" target=\"_blank\" rel=\"noopener\">Watch on YouTube</a>.",
      "footer.rights": "Miloop AI, LLC. All rights reserved.",
      "result1.quote": "Translation, formatting, and the first editorial pass now happen before an editor opens the file. What used to need a full desk now needs one or two people, and they're spending that time on judgment calls instead of repetitive work.",
      "result1.cite": "Senior Editor, a bilingual news publisher",
      "result2.quote": "I had tried other chatbots, but none of them ever met my needs in the details. This one gives me the answer I want, just when I need it, as though it were made for me.",
      "result2.cite": "A user",
      "result3.quote": "I read the draft before I found out which parts were AI-generated. I couldn't tell it apart from our own editors' work.",
      "result3.cite": "Editorial Director, a bilingual news publisher",
      "privacy.eyebrow": "Privacy Policy",
      "privacy.updated": "Last updated: September 2026",
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
      "privacy.fonts.title": "Typeface",
      "privacy.fonts.body": "This site's Chinese text is set in MiSans, used under Xiaomi's free commercial license.",
      "privacy.contact.title": "Contact",
      "privacy.contact.body": "Questions about this policy can be sent to info@miloop.ai.",
      "footer.privacy": "Privacy Policy"
    },
    "zh-Hans": {
      "meta.title": "Miloop AI：应用型 AI 工程咨询",
      "meta.description": "Miloop AI 搭建真正运行于生产环境的 AI 系统，涵盖内容自动化至语音助理，每一套自第一天起即内置独立的评估层。",
      "hero.eyebrow": "可靠的 AI，解决真实的业务问题",
      "hero.heading.pre": "将重复的人工作业交给会",
      "hero.heading.em": "自我验证",
      "hero.heading.post": "的 AI 系统",
      "hero.sub": "人工作业耗费的是时间，不可信的 AI 耗费的是金钱。我们搭建具备自我验证能力的 AI 系统，自动化您最主要的作业瓶颈，包括：",
      "hero.offer1.name": "完整的流程，从头到尾",
      "hero.offer1.desc": "一份报价、一张发票、一份月报：原本需经过三个人、四套工具的作业链，现在可自行完成。",
      "hero.offer2.name": "为您训练的 AI 助理",
      "hero.offer2.desc": "界面只是一个简单的对话框，背后是以您自有材料微调过的模型，让使用的人不需要任何技术背景，也能完成复杂的工作。",
      "hero.offer3.name": "会动手把事情做完的 Agent，不只是回答问题",
      "hero.offer3.desc": "它不是告诉您的团队下一步该做什么，而是直接执行：找出那笔记录、完成修改，再将其他系统一并更新。哪些环节需要先经人工确认，由您决定。",
      "hero.promise": "您无须预先理解 AI，只需要一个值得解决的问题。",
      "hero.cta.contact": "开始对话",
      "hero.cta.short": "聊聊",
      "nav.youtube": "YouTube 频道",
      "loop.diagnose": "诊断",
      "loop.build": "构建",
      "loop.verify": "验证",
      "loop.deploy": "部署",
      "loop.support": "支持",
      "loop.sentback": "退回重做",
      "loop.passed": "通过",
      "services.eyebrow": "我们做什么",
      "services.title": "从您的第一次评估，到上线之后的长期维护。",
      "sv.yield": "您会拿到什么",
      "y1a": "排定优先顺序的路线图",
      "y1ad": "我们检视过的每个环节，依改善后的实际效益排序。",
      "y1b": "风险清单",
      "y1bd": "系统可能在哪些环节以笃定的语气陈述错误内容，以及各自对应的代价。",
      "y2a": "可自动运行的流水线",
      "y2ad": "部署在您自有的环境上，交接之后仍持续稳定运行。",
      "y2b": "操作手册",
      "y2bd": "内容足以让您的团队自行调整其运作方式，无须再与我们联系。",
      "y3a": "附带出处的回答",
      "y3ad": "每则回答都标明其来源文档与段落；若查无依据，则明确说明。",
      "y3b": "符合您既有文字风格的模型",
      "y3bd": "以您自有的素材训练，成本远低于从零搭建。",
      "y4a": "可完成整条流程的 Agent",
      "y4ad": "自行查询您的系统并完成整项任务，而非仅处理其中一个环节。",
      "y4b": "人工确认关卡",
      "y4bd": "由代码强制执行，而非仰赖提示词要求模型谨慎。",
      "y5a": "评估报告",
      "y5ad": "由另一个模型持续抽验回答，未通过的项目均会记录并通知您。",
      "y5b": "持续运维",
      "y5bd": "云端环境与日常维护由我们承担，您的团队无须另行学习一套新系统。",



      "services.lede": "多数客户从第一项开始，完成后再决定下一步。",







      "sv1.stage": "01 ／ 诊断",
      "sv1.pain": "上面说要用 AI，工具也试了几个。但没有人说得清楚，哪个环节最该先动、动了到底能省多少。",
      "sv2.stage": "02 ／ 构建",
      "sv2.pain": "同一份数据，这是这周第三次手动搬了。从这个工具拷贝到那个工具，中间还要改格式、补字段。不难，但每天吃掉两小时，而且谁都不想接这个活。",






      "sv3.stage": "03 ／ 构建",
      "sv3.pain": "问到只有您内部文档里才有的东西，AI 就开始编。条款怎么写、流程该找谁、某个规格到底是多少，它答得飞快、语气笃定，但没有一句讲得出出处。",




      "sv4.stage": "04 ／ 构建",
      "sv4.pain": "五个工具、五套接口，没有一个真的连着。每完成一件事，就得有人在中间接手：这边查完、拷贝到那边、再回来更新状态。",








      "sv5.stage": "05 ／ 验证",
      "sv5.pain": "出错的时候，通常是客户先发现，不是您。AI 系统不会当机，它只是慢慢开始答错，而且语气跟答对的时候一模一样。",



      "sv.realrun": "实际运行",
      "s1.title": "AI 就绪度评估",
      "s1.body": "我们完整检视您现行的流程，包含已在运行的 AI，厘清时间与成本的实际去向。",
      "s2.title": "工作流与内容自动化",
      "s2.body": "我们将这些步骤串接成一条自动运行的流程，中间无须人工介入。<strong>报价单、客服回复、内部报告、对外内容，同一套做法均适用。</strong>",
      "s3.title": "生成式 AI 与知识系统",
      "s3.body": "这一项交付的是<strong>「能回答」的系统</strong>。每则回答都必须标明其来源文档与段落；查无依据时，则明确告知。",
      "s4.title": "Agent 系统与集成",
      "s4.body": "上一项是能回答，这一项则<strong>能执行</strong>：整条流程自动完成，仅在需要人工核可之处停下。该关卡由代码强制执行。",
      "s5.title": "评估、部署与持续支持",
      "s5.body": "我们交付的每一套系统都附带<strong>一份自己的考卷</strong>：由另一个模型持续抽验其回答，错误或缺乏依据的项目均会记录并通知您。这一项也可单独加装于您既有的系统。",
      "results.eyebrow": "生产环境里的证据",
      "results.title": "我们设计、搭建并交付过的系统。",
      "result3.lead": "训练成本：<b>$0.70</b>",
      "result2.lead": "已上架 <b>App Store &middot; Google Play</b>",
      "result1.lead": "工作时间减少 <b>40%</b>",
      "result1.tag": "内容自动化",
      "result1.title": "一家双语新闻机构",
      "result2.tag": "语音 AI 聊天机器人",
      "result2.title": "一家非营利机构",
      "result3.tag": "模型微调",
      "result3.title": "一家双语新闻机构",
      "livedemo.eyebrow": "作品集",
      "livedemo.title": "三套您可以自己试、自己读、自己看的系统。",
      "demo1.badge": "实时",
      "demo1.tag": "多 Agent 流水线",
      "demo1.name": "FactLoop Newsroom",
      "demo1.tagline": "以任何语言输入一个主题，即可现场观看它搜集资料、撰稿、查证，产出一篇附有来源的报道。",
      "demo1.cta": "实际试跑",
      "demo2.badge": "案例研究",
      "demo2.tag": "RAG 评估",
      "demo2.name": "Driftboard RAG Eval",
      "demo2.tagline": "一套 RAG 评估框架，以虚构知识库进行压力测试。它衡量的是系统在无法作答时的行为，并一并检验评判模型自身的盲点。",
      "demo2.stat1.label": "保留题 kappa 值",
      "demo2.stat2.label": "检索 Hit@4",
      "demo2.cta": "阅读案例",
      "demo3.badge": "案例研究",
      "demo3.tag": "Agent 权限",
      "demo3.name": "DeskLoop",
      "demo3.tagline": "一套将权限检查置于模型之外的 IT 与 HR 助手：该检查运行于独立的工具服务器。任何说服都无法取得权限，且一次确认仅对应一个动作，不涵盖其他。",
      "demo3.cta": "观看演示录屏",
      "teaser.eyebrow": "关于 Miloop AI",
      "teaser.statement": "多数 AI 在演示中表现良好，但少有系统能承受真实的交付期限与边缘案例。我们搭建的正是能承受的那一类，评估自第一天起即写入流水线。",
      "teaser.cta.about": "了解我们",
      "about.eyebrow": "关于我们",
      "about.back": "返回首页",
      "about.lede1": "Miloop AI 的标准很简单：自动化要经得起真实、长期的使用。",
      "about.p1": "我们搭建的是真正运行于生产环境的 AI 系统，能承受演示之后的长期使用：包含完整接管内容流程的多 Agent 流水线、可直接查询您自有文档的知识系统，以及为特定品牌语气单独训练的模型。每一套都内置评估层，自第一天起即写入流水线，准确性在各个环节都经过验证。",
      "about.pullquote": "准确跟不上，快就不算数。",
      "about.p3": "如果有个流程一直在吃掉本不该花的时间，或者您手上那套 AI 工具自己都还不太敢信，这正是我们会接手的问题。",
      "about.founder.eyebrow": "创始人",
      "about.founder.p1": "Miloop AI 由一位 AI 工程师创立。她的职涯积累于一家财富500强科技公司，负责管理大型项目并推动跨职能报表的标准化。正是那段经历，让她学会了判断一件事：一个系统在规模扩大之后，还撑不撑得住。",
      "about.founder.p2": "此后，她为出错代价很高的环境开发 AI 解决方案。她的项目经验涵盖自动化复杂的编辑工作流程、为特定任务微调定制化语言模型，以及为老年双语用户打造多模态语音 AI 系统。在那些场景里，可靠性是绝对的第一顺位。",
      "about.founder.p3": "她拥有密歇根大学应用数据科学硕士学位。在此之前，她的专业背景横跨影视导演、影片制作、新闻编辑、编程与数据分析。这些看似不同的工作，其实都面临同一个核心挑战：无论你做出什么，都得让人信得过。",
      "about.founder.aside": "（顺带一提，Miloop 这个名字取自她的爱猫，目前担任公司的“首席精神支持官”。）",
      "about.founder.channel": "我们也经营一个 YouTube 频道。我们的猫咪主持人会亲自上阵实测各种 AI 工具，看看它们会在哪里坏掉。<a href=\"https://www.youtube.com/channel/UCPrsvNKxjenRt8NLZQLx50Q\" target=\"_blank\" rel=\"noopener\">前往 YouTube 观看</a>。",
      "footer.rights": "Miloop AI, LLC. 保留所有权利。",
      "result1.quote": "以前一篇稿子要经过好几道手，翻译、排版、初审，一个都不能少。现在这些在编辑看到稿子之前就处理好了，原本要一整个组才能扛下来的活儿，一两个人就够了，省出来的时间用来做真正需要判断的事。",
      "result1.cite": "高级编辑，一家双语新闻机构",
      "result2.quote": "我用过不同的聊天机器人，但总无法在细节上满足我的需要。这款机器人却总能在我需要的时候，给我想要的回答，仿佛是为我量身定制的。",
      "result2.cite": "用户",
      "result3.quote": "我看那篇稿子的时候还不知道是 AI 写的，看完才发现，跟我们编辑写的完全看不出差别。",
      "result3.cite": "编辑总监，一家双语新闻机构",
      "footer.privacy": "隐私政策",
      "privacy.eyebrow": "隐私政策",
      "privacy.updated": "最后更新：2026年9月",
      "privacy.intro": "Miloop AI, LLC（下称“Miloop AI”“我们”）重视您的隐私。本页说明我们通过本网站收集哪些信息，以及怎么使用这些信息。",
      "privacy.collect.title": "我们收集哪些信息",
      "privacy.collect.body": "您使用“开始对话”面板时，我们会收到您填写的内容：姓名、电子邮箱，以及选填的公司名称、电话号码和项目细节。另外，您选的语言（英文、简体中文或繁体中文）会存在您自己的浏览器里，下次再来还是这个语言。这项设置留在您的设备上，不会传给我们。",
      "privacy.use.title": "我们如何使用这些信息",
      "privacy.use.body": "通过对话面板收到的信息，我们只用来回复您，以及判断这个项目我们接不接得下来。我们不出售、不出租您的信息，也不会为了别人的营销目的把信息分享出去。",
      "privacy.providers.title": "服务提供商",
      "privacy.providers.body": "我们用 Resend 发送对话面板产生的邮件，用 Vercel 托管本网站，用 Anthropic 的 Claude API 支撑对话面板里那个可选的虚拟助理。这几家服务商是代我们处理数据的，各自遵守自己的隐私与安全规范。",
      "privacy.assistant.title": "虚拟助理",
      "privacy.assistant.body": "如果您用了对话面板里的虚拟助理，您在那段对话里发的内容会送到 Anthropic 的 Claude API，用来判断哪些服务对得上您的需求。请不要在那里填敏感信息，比如信用卡号、电话号码，或者还没公开的商业计划。这些对话我们会留一份，用来复查助理判断得准不准；不用于广告，也不会流出 Miloop AI 之外。",
      "privacy.assistant.retention": "Anthropic 默认不会拿这些数据训练模型，但按照它自己的 API 条款，可能会出于安全和防滥用的目的保留一段有限的时间。Anthropic 的数据保留政策可以在<a href=\"https://platform.claude.com/docs/en/manage-claude/api-and-data-retention\" target=\"_blank\" rel=\"noopener\">这里</a>看到。",
      "privacy.tracking.title": "Cookie 与追踪",
      "privacy.tracking.body": "本网站不用分析工具、广告 Cookie，也没有第三方追踪。您浏览器里存着的只有上面说的那个语言设置。",
      "privacy.children.title": "儿童隐私",
      "privacy.children.body": "本网站不面向儿童，我们也不会在知情的情况下收集18岁以下人士的个人信息。",
      "privacy.retention.title": "数据保留",
      "privacy.retention.body": "您的咨询信息，我们会在合理必要的期限内保留，用于回复您和留存业务记录。任何时候您都可以发邮件要求我们删掉。",
      "privacy.choices.title": "您的选择",
      "privacy.choices.body": "要查阅、更正或删除您提交过的信息，发邮件到 info@miloop.ai 即可，我们会在合理时间内回复。",
      "privacy.changes.title": "政策更新",
      "privacy.changes.body": "本页内容我们可能会不时更新，上方的“最后更新”就是最近一次修订的时间。",
      "privacy.fonts.title": "字体",
      "privacy.fonts.body": "本网站的中文内容使用 MiSans 字体，依据小米的免费商用授权使用。",
      "privacy.contact.title": "联系方式",
      "privacy.contact.body": "对本政策有疑问，欢迎发邮件到 info@miloop.ai。"
    },
    "zh-Hant": {
      "meta.title": "Miloop AI：應用型 AI 工程顧問",
      "meta.description": "Miloop AI 建置真正運行於生產環境的 AI 系統，涵蓋內容自動化至語音助理，每一套自第一天起即內建獨立的評估層。",
      "hero.eyebrow": "可靠的 AI，解決真實的業務問題",
      "hero.heading.pre": "將重複的人工作業交給會",
      "hero.heading.em": "自我驗證",
      "hero.heading.post": "的 AI 系統",
      "hero.sub": "人工作業耗費的是時間，不可信的 AI 耗費的是金錢。我們建置具備自我驗證能力的 AI 系統，自動化您最主要的作業瓶頸，包括：",
      "hero.offer1.name": "完整的流程，從頭到尾",
      "hero.offer1.desc": "一份報價、一張發票、一份月報：原本需經過三個人、四套工具的作業鏈，現在可自行完成。",
      "hero.offer2.name": "為您訓練的 AI 助理",
      "hero.offer2.desc": "介面只是一個簡單的對話框，背後是以您自有材料微調過的模型，讓使用的人不需要任何技術背景，也能完成複雜的工作。",
      "hero.offer3.name": "會動手把事情做完的 Agent，不只是回答問題",
      "hero.offer3.desc": "它不是告訴您的團隊下一步該做什麼，而是直接執行：找出那筆紀錄、完成修改，再將其他系統一併更新。哪些環節需要先經人工確認，由您決定。",
      "hero.promise": "您無須預先理解 AI，只需要一個值得解決的問題。",
      "hero.cta.contact": "開始對話",
      "hero.cta.short": "聊聊",
      "nav.youtube": "YouTube 頻道",
      "loop.diagnose": "診斷",
      "loop.build": "構建",
      "loop.verify": "驗證",
      "loop.deploy": "部署",
      "loop.support": "支援",
      "loop.sentback": "退回重做",
      "loop.passed": "通過",
      "services.eyebrow": "我們做什麼",
      "services.title": "從您的第一次評估，到上線之後的長期維護。",
      "sv.yield": "您會拿到什麼",
      "y1a": "排定優先順序的路線圖",
      "y1ad": "我們檢視過的每個環節，依改善後的實際效益排序。",
      "y1b": "風險清單",
      "y1bd": "系統可能在哪些環節以篤定的語氣陳述錯誤內容，以及各自對應的代價。",
      "y2a": "可自動運行的流水線",
      "y2ad": "部署在您自有的環境上，交接之後仍持續穩定運行。",
      "y2b": "操作手冊",
      "y2bd": "內容足以讓您的團隊自行調整其運作方式，無須再與我們聯繫。",
      "y3a": "附帶出處的回答",
      "y3ad": "每則回答都標明其來源文件與段落；若查無依據，則明確說明。",
      "y3b": "符合您既有文字風格的模型",
      "y3bd": "以您自有的素材訓練，成本遠低於從零建置。",
      "y4a": "可完成整條流程的 Agent",
      "y4ad": "自行查詢您的系統並完成整項任務，而非僅處理其中一個環節。",
      "y4b": "人工確認關卡",
      "y4bd": "由程式碼強制執行，而非仰賴提示詞要求模型謹慎。",
      "y5a": "評估報告",
      "y5ad": "由另一個模型持續抽驗回答，未通過的項目均會記錄並通知您。",
      "y5b": "持續維運",
      "y5bd": "雲端環境與日常維護由我們承擔，您的團隊無須另行學習一套新系統。",



      "services.lede": "多數客戶從第一項開始，完成後再決定下一步。",







      "sv1.stage": "01 ／ 診斷",
      "sv1.pain": "上面說要用 AI，工具也試了幾個。但沒有人說得清楚，哪個環節最該先動、動了到底能省多少。",
      "sv2.stage": "02 ／ 構建",
      "sv2.pain": "同一份資料，這是這週第三次手動搬了。從這個工具複製到那個工具，中間還要改格式、補欄位。不難，但每天吃掉兩小時，而且誰都不想接這個活。",






      "sv3.stage": "03 ／ 構建",
      "sv3.pain": "問到只有您內部文件裡才有的東西，AI 就開始編。條款怎麼寫、流程該找誰、某個規格到底是多少，它答得飛快、語氣篤定，但沒有一句講得出出處。",




      "sv4.stage": "04 ／ 構建",
      "sv4.pain": "五個工具、五套介面，沒有一個真的連著。每完成一件事，就得有人在中間接手：這邊查完、複製到那邊、再回來更新狀態。",








      "sv5.stage": "05 ／ 驗證",
      "sv5.pain": "出錯的時候，通常是客戶先發現，不是您。AI 系統不會當機，它只是慢慢開始答錯，而且語氣跟答對的時候一模一樣。",



      "sv.realrun": "實際執行",
      "s1.title": "AI 就緒度評估",
      "s1.body": "我們完整檢視您現行的流程，包含已在運行的 AI，釐清時間與成本的實際去向。",
      "s2.title": "工作流與內容自動化",
      "s2.body": "我們將這些步驟串接成一條自動運行的流程，中間無須人工介入。<strong>報價單、客服回覆、內部報告、對外內容，同一套做法均適用。</strong>",
      "s3.title": "生成式 AI 與知識系統",
      "s3.body": "這一項交付的是<strong>「能回答」的系統</strong>。每則回答都必須標明其來源文件與段落；查無依據時，則明確告知。",
      "s4.title": "Agent 系統與整合",
      "s4.body": "上一項是能回答，這一項則<strong>能執行</strong>：整條流程自動完成，僅在需要人工核可之處停下。該關卡由程式碼強制執行。",
      "s5.title": "評估、部署與持續支援",
      "s5.body": "我們交付的每一套系統都附帶<strong>一份自己的考卷</strong>：由另一個模型持續抽驗其回答，錯誤或缺乏依據的項目均會記錄並通知您。這一項也可單獨加裝於您既有的系統。",
      "results.eyebrow": "生產環境裡的證據",
      "results.title": "我們設計、搭建並交付過的系統。",
      "result3.lead": "訓練成本：<b>$0.70</b>",
      "result2.lead": "已上架 <b>App Store &middot; Google Play</b>",
      "result1.lead": "工作時間減少 <b>40%</b>",
      "result1.tag": "內容自動化",
      "result1.title": "一家雙語新聞機構",
      "result2.tag": "語音 AI 聊天機器人",
      "result2.title": "一家非營利機構",
      "result3.tag": "模型微調",
      "result3.title": "一家雙語新聞機構",
      "livedemo.eyebrow": "作品集",
      "livedemo.title": "三套您可以自己試、自己讀、自己看的系統。",
      "demo1.badge": "即時",
      "demo1.tag": "多 Agent 流水線",
      "demo1.name": "FactLoop Newsroom",
      "demo1.tagline": "以任何語言輸入一個主題，即可現場觀看它蒐集資料、撰稿、查證，產出一篇附有來源的報導。",
      "demo1.cta": "實際試跑",
      "demo2.badge": "案例研究",
      "demo2.tag": "RAG 評估",
      "demo2.name": "Driftboard RAG Eval",
      "demo2.tagline": "一套 RAG 評估框架，以虛構知識庫進行壓力測試。它衡量的是系統在無法作答時的行為，並一併檢驗評判模型自身的盲點。",
      "demo2.stat1.label": "保留題 kappa 值",
      "demo2.stat2.label": "檢索 Hit@4",
      "demo2.cta": "閱讀案例",
      "demo3.badge": "案例研究",
      "demo3.tag": "Agent 權限",
      "demo3.name": "DeskLoop",
      "demo3.tagline": "一套將權限檢查置於模型之外的 IT 與 HR 助手：該檢查運行於獨立的工具伺服器。任何說服都無法取得權限，且一次確認僅對應一個動作，不涵蓋其他。",
      "demo3.cta": "觀看示範錄影",
      "teaser.eyebrow": "關於 Miloop AI",
      "teaser.statement": "多數 AI 在展示中表現良好，但少有系統能承受真實的交付期限與邊緣案例。我們建置的正是能承受的那一類，評估自第一天起即寫入流水線。",
      "teaser.cta.about": "瞭解我們",
      "about.eyebrow": "關於我們",
      "about.back": "返回首頁",
      "about.lede1": "Miloop AI 的標準很簡單：自動化要經得起真實、長期的使用。",
      "about.p1": "我們建置的是真正運行於生產環境的 AI 系統，能承受展示之後的長期使用：包含完整接管內容流程的多 Agent 流水線、可直接查詢您自有文件的知識系統，以及為特定品牌語氣單獨訓練的模型。每一套都內建評估層，自第一天起即寫入流水線，準確性在各個環節都經過驗證。",
      "about.pullquote": "準確跟不上，快就不算數。",
      "about.p3": "如果有個流程一直在吃掉本不該花的時間，或者您手上那套 AI 工具自己都還不太敢信，這正是我們會接手的問題。",
      "about.founder.eyebrow": "創辦人",
      "about.founder.p1": "Miloop AI 由一位 AI 工程師創立。她的職涯積累於一家財星 500 大科技公司，負責管理大型專案並推動跨職能報表的標準化。正是那段經歷，讓她學會了判斷一件事：一個系統在規模擴大之後，還撐不撐得住。",
      "about.founder.p2": "此後，她為出錯代價很高的環境開發 AI 解決方案。她的專案經驗涵蓋自動化複雜的編輯工作流程、為特定任務微調客製化語言模型，以及為高齡雙語使用者打造多模態語音 AI 系統。在那些場景裡，可靠性是絕對的第一順位。",
      "about.founder.p3": "她擁有密西根大學應用資料科學碩士學位。在此之前，她的專業背景橫跨影視導演、影片製作、新聞編輯、程式開發與資料分析。這些看似不同的工作，其實都面臨同一個核心挑戰：無論你做出什麼，都得讓人信得過。",
      "about.founder.aside": "（順帶一提，Miloop 這個名字取自她的愛貓，目前擔任公司的「首席精神支持官」。）",
      "about.founder.channel": "我們也經營一個 YouTube 頻道。我們的貓咪主持人會親自上陣實測各種 AI 工具，看看它們會在哪裡壞掉。<a href=\"https://www.youtube.com/channel/UCPrsvNKxjenRt8NLZQLx50Q\" target=\"_blank\" rel=\"noopener\">前往 YouTube 觀看</a>。",
      "footer.rights": "Miloop AI, LLC. 保留所有權利。",
      "result1.quote": "以前一篇稿子要經過好幾道手，翻譯、排版、初審，一個都不能少。現在這些在編輯看到稿子之前就處理好了，原本要一整個組才能扛下來的活兒，一兩個人就夠了，省出來的時間用來做真正需要判斷的事。",
      "result1.cite": "高級編輯，一家雙語新聞機構",
      "result2.quote": "我用過不同的聊天機器人，但總無法在細節上滿足我的需要。這款機器人卻總能在我需要的時候，給我想要的回答，彷彿是為我量身定製的。",
      "result2.cite": "使用者",
      "result3.quote": "我看那篇稿子的時候還不知道是 AI 寫的，看完才發現，跟我們編輯寫的完全看不出差別。",
      "result3.cite": "編輯總監，一家雙語新聞機構",
      "footer.privacy": "隱私權政策",
      "privacy.eyebrow": "隱私權政策",
      "privacy.updated": "最後更新：2026年9月",
      "privacy.intro": "Miloop AI, LLC（下稱「Miloop AI」「我們」）重視您的隱私。本頁說明我們透過本網站收集哪些資訊，以及怎麼使用這些資訊。",
      "privacy.collect.title": "我們收集哪些資訊",
      "privacy.collect.body": "您使用「開始對話」面板時，我們會收到您填寫的內容：姓名、電子郵件，以及選填的公司名稱、電話號碼和專案細節。另外，您選的語言（英文、簡體中文或繁體中文）會存在您自己的瀏覽器裡，下次再來還是這個語言。這項設定留在您的裝置上，不會傳給我們。",
      "privacy.use.title": "我們如何使用這些資訊",
      "privacy.use.body": "透過對話面板收到的資訊，我們只用來回覆您，以及判斷這個專案我們接不接得下來。我們不出售、不出租您的資訊，也不會為了別人的行銷目的把資訊分享出去。",
      "privacy.providers.title": "服務提供商",
      "privacy.providers.body": "我們用 Resend 發送對話面板產生的郵件，用 Vercel 託管本網站，用 Anthropic 的 Claude API 支撐對話面板裡那個可選的虛擬助理。這幾家服務商是代我們處理資料的，各自遵守自己的隱私與安全規範。",
      "privacy.assistant.title": "虛擬助理",
      "privacy.assistant.body": "如果您用了對話面板裡的虛擬助理，您在那段對話裡發的內容會送到 Anthropic 的 Claude API，用來判斷哪些服務對得上您的需求。請不要在那裡填敏感資訊，比如信用卡號、電話號碼，或者還沒公開的商業計畫。這些對話我們會留一份，用來複查助理判斷得準不準；不用於廣告，也不會流出 Miloop AI 之外。",
      "privacy.assistant.retention": "Anthropic 預設不會拿這些資料訓練模型，但按照它自己的 API 條款，可能會基於安全和防濫用的目的保留一段有限的時間。Anthropic 的資料保留政策可以在<a href=\"https://platform.claude.com/docs/en/manage-claude/api-and-data-retention\" target=\"_blank\" rel=\"noopener\">這裡</a>看到。",
      "privacy.tracking.title": "Cookie 與追蹤",
      "privacy.tracking.body": "本網站不用分析工具、廣告 Cookie，也沒有第三方追蹤。您瀏覽器裡存著的只有上面說的那個語言設定。",
      "privacy.children.title": "兒童隱私",
      "privacy.children.body": "本網站不面向兒童，我們也不會在知情的情況下收集18歲以下人士的個人資訊。",
      "privacy.retention.title": "資料保留",
      "privacy.retention.body": "您的諮詢資訊，我們會在合理必要的期限內保留，用於回覆您和留存業務紀錄。任何時候您都可以寄郵件要求我們刪掉。",
      "privacy.choices.title": "您的選擇",
      "privacy.choices.body": "要查閱、更正或刪除您提交過的資訊，寄郵件到 info@miloop.ai 即可，我們會在合理時間內回覆。",
      "privacy.changes.title": "政策更新",
      "privacy.changes.body": "本頁內容我們可能會不時更新，上方的「最後更新」就是最近一次修訂的時間。",
      "privacy.fonts.title": "字型",
      "privacy.fonts.body": "本網站的中文內容使用 MiSans 字型，依據小米的免費商用授權使用。",
      "privacy.contact.title": "聯繫方式",
      "privacy.contact.body": "對本政策有疑問，歡迎寄郵件到 info@miloop.ai。"
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
