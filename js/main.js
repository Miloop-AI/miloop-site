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
      "hero.sub": "Manual work costs you hours you don't have. AI you can't trust costs you customers, and money you won't get back. We build AI systems that take the busywork off your plate and check their own work before it reaches your customers, which keeps your costs down. You don't need to already understand AI. You just need a problem worth solving.",
      "hero.cta.contact": "Start a conversation",
      "nav.youtube": "YouTube channel",
      "footer.youtube": "YouTube",
      "loop.diagnose": "Diagnose",
      "loop.build": "Build",
      "loop.verify": "Verify",
      "loop.deploy": "Deploy",
      "loop.support": "Support",
      "loop.sentback": "sent back",
      "loop.passed": "passed",
      "services.eyebrow": "What we do",
      "services.title": "From your first audit to ongoing support.",
      "s1.title": "AI Readiness Assessment",
      "s1.body": "Not sure where AI can actually help your business, or if the AI tools you already use are quietly making things up? We audit your current workflows and any AI systems already in place, flag the wasted spend and the hallucination risk (AI stating something false with total confidence), and tell you the one place worth starting. You walk away with <strong>a prioritized, concrete roadmap</strong> you can actually read.",
      "s2.title": "Workflow & Content Automation",
      "s2.body": "If your team is retyping the same information into three different tools every day, that's hours (and payroll) you're never getting back. We turn that kind of multi-step manual work (classification, translation, drafting, fact-checking, publishing) into an automated pipeline, <strong>cutting turnaround from hours to minutes</strong>, built on production infrastructure that keeps running long after we hand it off.",
      "s3.title": "Generative AI & Knowledge Systems",
      "s3.body": "Ask an AI chatbot about your own company, and it won't know. Worse, it might guess and sound sure about it. We build systems that let your team ask questions and get answers sourced straight from your own documents, plus lightweight custom-trained models that write in your brand's exact voice, at a fraction of what training a model from scratch costs. <strong>Generative AI that's accurate first, impressive second.</strong>",
      "s4.title": "Agentic Systems & Integration",
      "s4.body": "Some tasks take ten steps across five tools, and someone has to do all ten every time. <strong>We build AI that does the whole chain itself: querying your databases, operating your internal tools, and completing multi-step tasks end to end.</strong> Multi-agent systems and tool integrations (using MCP, the standard that lets AI safely talk to your other software), including voice-based assistants for hands-free, conversational use cases.",
      "s5.title": "Evaluation, Deployment & Ongoing Support",
      "s5.body": "Every system we ship comes with its own quality bar and its own guardrails: cross-model evaluation frameworks that catch hallucinations before your users do, plus the governance and oversight controls regulators and enterprise customers increasingly expect. Once live, we handle the cloud infrastructure and ongoing maintenance, so <strong>reliability doesn't become your problem</strong>.",
      "results.eyebrow": "Proof in production",
      "results.title": "Systems Miloop AI has designed, built, and shipped.",
      "result1.tag": "Content Automation",
      "result1.title": "A Bilingual News Publisher",
      "result1.body": "A multi-model content pipeline cut per-article production time from <strong>hours to under 10 minutes</strong>, and reduced overall content cycle time by <strong>40%</strong>.",
      "result2.tag": "Voice AI",
      "result2.title": "A Nonprofit Organization",
      "result2.body": "A bilingual voice companion, <strong>among the first AI companion apps</strong> built specifically for Chinese American seniors in the U.S. Now in the App Store and Google Play.",
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
      "demo3.badge": "Case study",
      "demo3.tag": "Agent Permissions",
      "demo3.name": "DeskLoop",
      "demo3.tagline": "An IT and HR helpdesk agent that cannot be talked into acting. The tier check lives in a tool server of its own, so a confirmation belongs to one action and nothing else.",
      "demo3.cta": "Watch the walkthrough",
      "teaser.eyebrow": "About Miloop AI",
      "teaser.statement": "Most AI demos work. Few AI systems survive contact with a real deadline, a real client, or a real edge case. Miloop AI builds the kind that do, with evaluation built into every pipeline from day one.",
      "teaser.cta.about": "Learn About Us",
      "about.eyebrow": "About Us",
      "about.back": "Back to home",
      "about.lede1": "Miloop AI is built around a simple standard: automation that holds up under real, sustained use.",
      "about.p1": "We design and ship AI systems that run in real production, the kind that outlast a demo. That means pipelines that handle real content workflows start to finish, systems that answer questions using your own documents, and models custom-trained to sound like your brand. Every system includes its own evaluation layer, built in from the first design decision, so accuracy gets checked at every step along the way.",
      "about.pullquote": "Speed only counts when accuracy comes with it.",
      "about.p2": "That standard shapes every system Miloop AI builds, from the first prototype through production deployment.",
      "about.p3": "If a process is costing you more time than it should, or you already have an AI tool you're not fully sure you can trust, that's exactly the kind of problem we take on.",
      "about.founder.eyebrow": "Founder",
      "about.founder.p1": "Miloop AI was founded by an AI engineer whose technical career began at a Fortune 500 technology company, where she spent years managing large-scale programs and standardizing reporting across cross-functional teams. That experience shaped how she thinks about building systems that hold up at scale.",
      "about.founder.p2": "That foundation carried into her AI engineering work. She has automated high-stakes editorial workflows, including translation, fact-checking, and formatting, and built multi-modal voice AI systems for elderly, bilingual users, where reliability was the primary design constraint.",
      "about.founder.p3": "She graduated from the University of Michigan with a Master of Applied Data Science. Her other background spans film and TV directing, video production, programming, and news editing. All of it relies on the same core skill: building something a person can actually trust.",
      "about.founder.aside": "(Miloop is named after her cat. Moral support, mostly.)",
      "about.founder.channel": "There's also a YouTube channel, where the cat (yes, on camera duty now) pokes at AI tools until something interesting falls out. <a href=\"https://www.youtube.com/channel/UCPrsvNKxjenRt8NLZQLx50Q\" target=\"_blank\" rel=\"noopener\">Watch on YouTube</a>.",
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
      "privacy.fonts.title": "Typeface",
      "privacy.fonts.body": "This site's Chinese text is set in MiSans, used under Xiaomi's free commercial license.",
      "privacy.contact.title": "Contact",
      "privacy.contact.body": "Questions about this policy can be sent to info@miloop.ai.",
      "footer.privacy": "Privacy Policy"
    },
    "zh-Hans": {
      "meta.title": "Miloop AI：应用型 AI 工程咨询",
      "meta.description": "Miloop AI 做的是真正跑在生产环境里的 AI 系统，从内容自动化到语音助理，每一套都从第一天起就带着一层独立的评估机制。",
      "hero.eyebrow": "应用型 AI 工程实践",
      "hero.heading.pre": "从设计上就能",
      "hero.heading.em": "自我验证",
      "hero.heading.post": "的 AI 系统。",
      "hero.sub": "人工处理，赔的是您抽不出来的时间；AI 没人把关，赔的是客户，还有要不回来的钱。我们做的 AI 系统，替您把琐碎的活接过去，在交到客户手上之前自己先查一遍，成本也能跟着降下来。您不用先搞懂 AI，只要有一个值得解决的问题就行。",
      "hero.cta.contact": "开始对话",
      "nav.youtube": "YouTube 频道",
      "footer.youtube": "YouTube",
      "loop.diagnose": "诊断",
      "loop.build": "构建",
      "loop.verify": "验证",
      "loop.deploy": "部署",
      "loop.support": "支持",
      "loop.sentback": "退回重做",
      "loop.passed": "通过",
      "services.eyebrow": "我们做什么",
      "services.title": "从您的第一次摸底，到上线之后的长期维护。",
      "s1.title": "AI 就绪度评估",
      "s1.body": "不确定 AI 到底能帮您的业务做什么？或者担心自己已经在用的 AI 工具正悄悄编造答案？我们把您现在的工作流程、还有已经在跑的 AI 系统整个过一遍，找出白花的钱和“幻觉”风险（AI 一本正经说出根本不存在的事），告诉您最该先从哪里下手。您拿到的是一份<strong>排好优先级的具体路线图</strong>，看得懂、用得上。",
      "s2.title": "工作流与内容自动化",
      "s2.body": "如果您的团队每天都要把同一份信息，手动搬到三个不同的工具里，那些时间（还有人力成本）就再也要不回来了。我们把这类多步骤的手动流程（分类、翻译、起草、查证、发布）接成一条自动化流水线，<strong>交付时间从几小时压到几分钟</strong>，底下是生产级的基础设施，交接完之后还会继续稳定跑。",
      "s3.title": "生成式 AI 与知识系统",
      "s3.body": "问 AI 聊天机器人您自己公司的事，它答不上来，更糟的是，它会瞎猜，还一副很确定的样子。我们做的系统，能让您的团队提问，答案直接从您自己的文件里找出处；还有轻量定制训练的模型，写出来的东西就是您品牌说话的样子，成本只是从零训练一个模型的零头。<strong>生成式 AI，先做到准，再谈惊艳。</strong>",
      "s4.title": "Agent 系统与集成",
      "s4.body": "有些工作要十个步骤、跨五个工具，而且每次都得有人从头做到尾。<strong>我们做的 AI 能把整条链路自己走完：查您的数据库、操作您的内部工具，多步骤的任务从头做到尾。</strong>多 Agent 系统，加上通过 MCP（让 AI 能安全串接您其他软件的标准协议）做的工具集成；也包括语音助理，用在腾不出手、只能靠说的场合。",
      "s5.title": "评估、部署与持续支持",
      "s5.body": "我们交付的每一套系统，都自带及格线，也自带防护机制：跨模型的评估框架，赶在您的用户之前先把幻觉抓出来；再加上监管机构和企业客户现在越来越常要求的治理与监督控制。上线以后，云上的基础设施和日常维护由我们接着管，<strong>可靠性不该变成您的麻烦</strong>。",
      "results.eyebrow": "生产环境里的证据",
      "results.title": "Miloop AI 设计、搭建并交付过的系统。",
      "result1.tag": "内容自动化",
      "result1.title": "一家双语新闻机构",
      "result1.body": "一套多模型的内容流水线，把单篇稿子的制作时间从<strong>几小时压到十分钟以内</strong>，整体内容周期缩短<strong>40%</strong>。",
      "result2.tag": "语音 AI",
      "result2.title": "一家非营利机构",
      "result2.body": "一款双语语音陪伴助理，是<strong>最早一批</strong>专门为美国华裔老年群体做的 AI 陪伴应用之一，现已上架 App Store 和 Google Play。",
      "result3.tag": "模型微调",
      "result3.title": "品牌语气模型微调",
      "result3.body": "通用模型只会说通用的话。这一个是拿真实的编辑稿件微调出来的，训练成本<strong>0.70美元</strong>，<strong>只是</strong>从零训练一个定制模型的零头。",
      "livedemo.title": "或者，挑一个近看。",
      "demo1.badge": "实时",
      "demo1.tag": "多 Agent 流水线",
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
      "demo3.badge": "案例研究",
      "demo3.tag": "Agent 权限",
      "demo3.name": "DeskLoop",
      "demo3.tagline": "一个说服不动的 IT 与 HR 助手。分级检查跑在它自己的工具服务器里，所以一次确认只属于一个动作，别的都不算。",
      "demo3.cta": "观看演示录屏",
      "teaser.eyebrow": "关于 Miloop AI",
      "teaser.statement": "多数 AI 演示都能跑起来，但很少有 AI 系统撑得过真实的截止日期、真实的客户、真实的边缘情况。Miloop AI 做的就是能撑住的那种，评估从第一天起就写进流水线里。",
      "teaser.cta.about": "了解我们",
      "about.eyebrow": "关于我们",
      "about.back": "返回首页",
      "about.lede1": "Miloop AI 的标准很简单：自动化要经得起真实、长期的使用。",
      "about.p1": "我们做的是真正跑在生产环境里的 AI 系统，撑得过演示之后的真实使用：有从头到尾接管内容流程的多 Agent 流水线，有能直接问您自己文件的知识系统，也有为某个品牌语气单独训练的模型。每一套都自带评估层，从第一个设计决定起就长在流水线里，准确性一路都验过。",
      "about.pullquote": "准确跟不上，快就不算数。",
      "about.p2": "这个标准贯穿 Miloop AI 做的每一套系统，从第一版原型一直到生产环境上线。",
      "about.p3": "如果有个流程一直在吃掉本不该花的时间，或者您手上那套 AI 工具自己都还不太敢信，这正是我们会接手的问题。",
      "about.founder.eyebrow": "创始人",
      "about.founder.p1": "Miloop AI 由一位 AI 工程师创立。她的技术生涯从一家财富500强科技公司开始，在那里做了多年大型项目管理，把跨职能团队之间的报告口径统一了起来。系统要怎么做才撑得住规模，她的判断就是在那几年里长出来的。",
      "about.founder.p2": "这份底子后来延续到了她的 AI 工程工作里。她把高风险的编辑流程自动化过，翻译、查证、排版都在内；也为双语的老年用户做过多模态语音 AI 系统，那种场合里，可靠性是压倒一切的设计前提。",
      "about.founder.p3": "她毕业于密歇根大学应用数据科学硕士项目。另外她还有影视导演、媒体制作、编程与新闻编辑的背景。这些靠的都是同一种能力：做出一个人真的敢信的东西。",
      "about.founder.aside": "（Miloop 这个名字来自她养的猫。主要负责精神支持。）",
      "about.founder.channel": "Miloop 现在还有个 YouTube 频道，这只猫（对，真的上镜了）专门戳 AI 工具，戳到有意思的东西掉出来为止。<a href=\"https://www.youtube.com/channel/UCPrsvNKxjenRt8NLZQLx50Q\" target=\"_blank\" rel=\"noopener\">前往 YouTube 观看</a>。",
      "footer.rights": "Miloop AI, LLC. 保留所有权利。",
      "result1.quote": "“以前一篇稿子要经过好几道手，翻译、排版、初审，一个都不能少。现在这些在编辑看到稿子之前就处理好了，原本要一整个组才能扛下来的活儿，一两个人就够了，省出来的时间用来做真正需要判断的事。”",
      "result1.cite": "高级编辑，一家双语新闻机构",
      "result2.quote": "“我之前也用过别的聊天机器人，但都感觉是拿现成的东西套过来的。这个不一样，一用就知道是真的为我们做的。”",
      "result2.cite": "内测用户",
      "result3.quote": "“我看那篇稿子的时候还不知道是 AI 写的，看完才发现，跟我们编辑写的完全看不出差别。”",
      "result3.cite": "编辑总监，一家双语新闻机构",
      "footer.privacy": "隐私政策",
      "privacy.eyebrow": "隐私政策",
      "privacy.updated": "最后更新：2026年7月",
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
      "meta.description": "Miloop AI 做的是真正跑在生產環境裡的 AI 系統，從內容自動化到語音助理，每一套都從第一天起就帶著一層獨立的評估機制。",
      "hero.eyebrow": "應用型 AI 工程實踐",
      "hero.heading.pre": "從設計上就能",
      "hero.heading.em": "自我驗證",
      "hero.heading.post": "的 AI 系統。",
      "hero.sub": "人工處理，賠的是您抽不出來的時間；AI 沒人把關，賠的是客戶，還有要不回來的錢。我們做的 AI 系統，替您把瑣碎的活接過去，在交到客戶手上之前自己先查一遍，成本也能跟著降下來。您不用先搞懂 AI，只要有一個值得解決的問題就行。",
      "hero.cta.contact": "開始對話",
      "nav.youtube": "YouTube 頻道",
      "footer.youtube": "YouTube",
      "loop.diagnose": "診斷",
      "loop.build": "構建",
      "loop.verify": "驗證",
      "loop.deploy": "部署",
      "loop.support": "支援",
      "loop.sentback": "退回重做",
      "loop.passed": "通過",
      "services.eyebrow": "我們做什麼",
      "services.title": "從您的第一次盤點，到上線之後的長期維護。",
      "s1.title": "AI 就緒度評估",
      "s1.body": "不確定 AI 到底能幫您的業務做什麼？或者擔心自己已經在用的 AI 工具正悄悄編造答案？我們把您現在的工作流程、還有已經在跑的 AI 系統整個過一遍，找出白花的錢和「幻覺」風險（AI 一本正經說出根本不存在的事），告訴您最該先從哪裡下手。您拿到的是一份<strong>排好優先順序的具體路線圖</strong>，看得懂、用得上。",
      "s2.title": "工作流與內容自動化",
      "s2.body": "如果您的團隊每天都要把同一份資訊，手動搬到三個不同的工具裡，那些時間（還有人力成本）就再也要不回來了。我們把這類多步驟的手動流程（分類、翻譯、起草、查證、發布）接成一條自動化流水線，<strong>交付時間從幾小時壓到幾分鐘</strong>，底下是生產級的基礎設施，交接完之後還會繼續穩定跑。",
      "s3.title": "生成式 AI 與知識系統",
      "s3.body": "問 AI 聊天機器人您自己公司的事，它答不上來，更糟的是，它會瞎猜，還一副很確定的樣子。我們做的系統，能讓您的團隊提問，答案直接從您自己的文件裡找出處；還有輕量客製訓練的模型，寫出來的東西就是您品牌說話的樣子，成本只是從零訓練一個模型的零頭。<strong>生成式 AI，先做到準，再談驚豔。</strong>",
      "s4.title": "Agent 系統與整合",
      "s4.body": "有些工作要十個步驟、跨五個工具，而且每次都得有人從頭做到尾。<strong>我們做的 AI 能把整條鏈路自己走完：查您的資料庫、操作您的內部工具，多步驟的任務從頭做到尾。</strong>多 Agent 系統，加上透過 MCP（讓 AI 能安全串接您其他軟體的標準協定）做的工具整合；也包括語音助理，用在騰不出手、只能靠說的場合。",
      "s5.title": "評估、部署與持續支援",
      "s5.body": "我們交付的每一套系統，都自帶及格線，也自帶防護機制：跨模型的評估框架，趕在您的使用者之前先把幻覺抓出來；再加上監管機構和企業客戶現在越來越常要求的治理與監督控管。上線以後，雲端的基礎設施和日常維護由我們接著管，<strong>可靠性不該變成您的麻煩</strong>。",
      "results.eyebrow": "生產環境裡的證據",
      "results.title": "Miloop AI 設計、搭建並交付過的系統。",
      "result1.tag": "內容自動化",
      "result1.title": "一家雙語新聞機構",
      "result1.body": "一套多模型的內容流水線，把單篇稿子的製作時間從<strong>幾小時壓到十分鐘以內</strong>，整體內容週期縮短<strong>40%</strong>。",
      "result2.tag": "語音 AI",
      "result2.title": "一家非營利機構",
      "result2.body": "一款雙語語音陪伴助理，是<strong>最早一批</strong>專門為美國華裔老年群體做的 AI 陪伴應用之一，現已上架 App Store 和 Google Play。",
      "result3.tag": "模型微調",
      "result3.title": "品牌語氣模型微調",
      "result3.body": "通用模型只會說通用的話。這一個是拿真實的編輯稿件微調出來的，訓練成本<strong>0.70美元</strong>，<strong>只是</strong>從零訓練一個客製模型的零頭。",
      "livedemo.title": "或者，挑一個近看。",
      "demo1.badge": "即時",
      "demo1.tag": "多 Agent 流水線",
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
      "demo3.badge": "案例研究",
      "demo3.tag": "Agent 權限",
      "demo3.name": "DeskLoop",
      "demo3.tagline": "一個說服不動的 IT 與 HR 助手。分級檢查跑在它自己的工具伺服器裡，所以一次確認只屬於一個動作，別的都不算。",
      "demo3.cta": "觀看示範錄影",
      "teaser.eyebrow": "關於 Miloop AI",
      "teaser.statement": "多數 AI 示範都能跑起來，但很少有 AI 系統撐得過真實的截止日期、真實的客戶、真實的邊緣情況。Miloop AI 做的就是能撐住的那種，評估從第一天起就寫進流水線裡。",
      "teaser.cta.about": "瞭解我們",
      "about.eyebrow": "關於我們",
      "about.back": "返回首頁",
      "about.lede1": "Miloop AI 的標準很簡單：自動化要經得起真實、長期的使用。",
      "about.p1": "我們做的是真正跑在生產環境裡的 AI 系統，撐得過展示之後的真實使用：有從頭到尾接管內容流程的多 Agent 流水線，有能直接問您自己文件的知識系統，也有為某個品牌語氣單獨訓練的模型。每一套都自帶評估層，從第一個設計決定起就長在流水線裡，準確性一路都驗過。",
      "about.pullquote": "準確跟不上，快就不算數。",
      "about.p2": "這個標準貫穿 Miloop AI 做的每一套系統，從第一版原型一直到生產環境上線。",
      "about.p3": "如果有個流程一直在吃掉本不該花的時間，或者您手上那套 AI 工具自己都還不太敢信，這正是我們會接手的問題。",
      "about.founder.eyebrow": "創辦人",
      "about.founder.p1": "Miloop AI 由一位 AI 工程師創立。她的技術生涯從一家財富500強科技公司開始，在那裡做了多年大型專案管理，把跨職能團隊之間的報告口徑統一了起來。系統要怎麼做才撐得住規模，她的判斷就是在那幾年裡長出來的。",
      "about.founder.p2": "這份底子後來延續到了她的 AI 工程工作裡。她把高風險的編輯流程自動化過，翻譯、查證、排版都在內；也為雙語的年長使用者做過多模態語音 AI 系統，那種場合裡，可靠性是壓倒一切的設計前提。",
      "about.founder.p3": "她畢業於密西根大學應用資料科學碩士學程。另外她還有影視導演、媒體製作、程式設計與新聞編輯的背景。這些靠的都是同一種能力：做出一個人真的敢信的東西。",
      "about.founder.aside": "（Miloop 這個名字來自她養的貓。主要負責精神支持。）",
      "about.founder.channel": "Miloop 現在還有個 YouTube 頻道，這隻貓（對，真的上鏡了）專門戳 AI 工具，戳到有意思的東西掉出來為止。<a href=\"https://www.youtube.com/channel/UCPrsvNKxjenRt8NLZQLx50Q\" target=\"_blank\" rel=\"noopener\">前往 YouTube 觀看</a>。",
      "footer.rights": "Miloop AI, LLC. 保留所有權利。",
      "result1.quote": "「以前一篇稿子要經過好幾道手，翻譯、排版、初審，一個都不能少。現在這些在編輯看到稿子之前就處理好了，原本要一整個組才能扛下來的活兒，一兩個人就夠了，省出來的時間用來做真正需要判斷的事。」",
      "result1.cite": "高級編輯，一家雙語新聞機構",
      "result2.quote": "「我之前也用過別的聊天機器人，但都感覺是拿現成的東西套過來的。這個不一樣，一用就知道是真的為我們做的。」",
      "result2.cite": "內測使用者",
      "result3.quote": "「我看那篇稿子的時候還不知道是 AI 寫的，看完才發現，跟我們編輯寫的完全看不出差別。」",
      "result3.cite": "編輯總監，一家雙語新聞機構",
      "footer.privacy": "隱私權政策",
      "privacy.eyebrow": "隱私權政策",
      "privacy.updated": "最後更新：2026年7月",
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
