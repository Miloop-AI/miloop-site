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
      "loop.diagnose": "Diagnose",
      "loop.build": "Build",
      "loop.verify": "Verify",
      "loop.deploy": "Deploy",
      "loop.support": "Support",
      "loop.sentback": "sent back",
      "loop.passed": "passed",
      "services.eyebrow": "What we do",
      "services.title": "From your first audit to ongoing support.",
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
      "y5bd": "Cloud infrastructure and day-to-day maintenance stay with us, not with your staff.",
      "hp.r1": "We find the faults nobody reported",
      "hp.r2": "Our automation catches its own mistakes before they go out",
      "hp.r3": "Our systems answer only from your documents, and name the source",
      "hp.r4": "Our agents do the work, and ask before they act",
      "hp.r5": "We test the model that does the testing",
      "services.lede": "No technical background needed. Most people take one of these rather than all five, and start with the first.",
      "sv1.stage": "01 / DIAGNOSE",
      "sv1.pain": "Everyone says to use AI. You have tried a few tools. Nobody can tell you which part of the work to fix first, or what fixing it would be worth.",
      "sv1.kick": "Finding 2 of 16",
      "sv1.head": "A write that changes nothing reports success.",
      "sv1.r1": "The leave request <b>was created</b>. The balance <b>never moved</b>.",
      "sv1.r2": "<b>No error was raised anywhere.</b> The same three days could then be requested without limit.",
      "sv1.fix": "A write that cannot take effect now fails loudly, rather than reporting success.",
      "sv2.stage": "02 / BUILD",
      "sv2.pain": "Someone retyped the same information this morning, for the third time this week. The work is easy. It costs two hours a day, and nobody wants it.",
      "sv2.n1": "Research",
      "sv2.n2": "Translate",
      "sv2.n3": "Write",
      "sv2.n4": "Fact-check",
      "sv2.n5": "Publish",
      "sv2.skipped": "skipped",
      "sv2.sentlabel": "Sent back",
      "sv2.call": "The draft opened with <q>NEW YORK &ndash;</q>. Not one of the five sources says this happened in New York.",
      "sv2.ratio": "Writing took 15 seconds. Checking its own writing took 67.",
      "sv3.stage": "03 / BUILD",
      "sv3.pain": "Ask about something only your own documents contain, and the AI starts inventing. It answers fast, it sounds certain, and it cannot tell you where the answer came from.",
      "sv3.q": "I want to work from Japan for three weeks. Is that allowed?",
      "sv3.a1": "Yes. Three weeks (15 business days) is inside the 20 business-day annual limit for working from another country. No approval needed, just advance notice to your manager.",
      "sv3.src1": "HR Remote Work &middot; \"Working from another country\"",
      "sv3.a2": "One catch: you are on VPN level 2, which only connects from approved regions. <span class=\"qa-hl\">Japan is not on that list, so your VPN will simply fail to connect there.</span>",
      "sv3.src2": "IT VPN Access Levels",
      "sv4.stage": "04 / BUILD",
      "sv4.pain": "Five tools, five logins, and nothing joins them up. Every task needs a person in the middle: look it up here, paste it there, come back and mark it done.",
      "sv4.ready": "Ready to run",
      "sv4.k1": "Action",
      "sv4.v1": "Open an IT ticket",
      "sv4.k2": "Subject",
      "sv4.k3": "Severity",
      "sv4.wait": "Awaiting your confirmation",
      "sv4.waittx": "Open a severity 3 IT ticket titled \"External monitor flickering\".",
      "sv4.note": "<b>Nothing has been submitted.</b> The server issues a one-time token bound to these exact details, and only after you answer.",
      "sv4.b1": "Confirm",
      "sv4.b2": "Change it",
      "sv4.b3": "Cancel",
      "sv5.stage": "05 / VERIFY",
      "sv5.pain": "When it goes wrong, your customer usually finds out before you do. An AI system does not crash. It just starts being wrong, in exactly the same confident tone.",



      "sv5.kill": "Discarded",
      "sv5.why": "An earlier validation reached <b>perfect agreement</b>. Its answer key had been revised after reading the judge&rsquo;s own output, so it was no longer measuring the same thing. That run was thrown out and the lower number published.",
      "sv.realrun": "real run",
      "s1.title": "AI Readiness Assessment",
      "s1.body": "We walk your current process end to end, including any AI already running, and work out where the time and the money actually go.",
      "s2.title": "Workflow & Content Automation",
      "s2.body": "We connect those steps into a line that runs itself, with nobody in the middle. <strong>Quotes, support replies, internal reports, customer-facing content: the same approach fits all of them.</strong>",
      "s3.title": "Generative AI & Knowledge Systems",
      "s3.body": "This is the one that <strong>answers</strong>. Every answer has to name the document and the section it came from, and if it cannot find one, it says so.",
      "s4.title": "Agentic Systems & Integration",
      "s4.body": "The last one answers. This one <strong>acts</strong>: it finishes the whole chain, stopping only where a person has to say yes. That stop is enforced in the code.",
      "s5.title": "Evaluation, Deployment & Ongoing Support",
      "s5.body": "Every system we ship carries <strong>its own exam</strong>: a second model keeps testing its answers, and anything wrong or unsupported is logged and sent to you. It can also be added to a system you already run.",
      "results.eyebrow": "Proof in production",
      "results.title": "Systems Miloop AI has designed, built, and shipped.",
      "result3.lead": "Training cost: <b>$0.70</b>",
      "result2.lead": "Launched on <b>App Store &middot; Google Play</b>",
      "result1.lead": "Work duration reduced <b>40%</b>",
      "result1.tag": "Content Automation",
      "result1.title": "A Bilingual News Publisher",
      "result2.tag": "Voice AI Chatbot",
      "result2.title": "A Nonprofit Organization",
      "result3.tag": "Model Fine-Tuning",
      "result3.title": "A Bilingual News Publisher",
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
      "result1.quote": "Translation, formatting, and the first editorial pass now happen before an editor opens the file. What used to need a full desk now needs one or two people, and they're spending that time on judgment calls instead of repetitive work.",
      "result1.cite": "Senior Editor, a bilingual news publisher",
      "result2.quote": "I had tried other chatbots, but none of them ever met my needs in the details. This one gives me the answer I want, just when I need it, as though it were made for me.",
      "result2.cite": "A user",
      "result3.quote": "I read the draft before I found out which parts were AI-generated. I couldn't tell it apart from our own editors' work.",
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
      "loop.diagnose": "诊断",
      "loop.build": "构建",
      "loop.verify": "验证",
      "loop.deploy": "部署",
      "loop.support": "支持",
      "loop.sentback": "退回重做",
      "loop.passed": "通过",
      "services.eyebrow": "我们做什么",
      "services.title": "从您的第一次摸底，到上线之后的长期维护。",
      "sv.yield": "您会拿到什么",
      "y1a": "排好顺序的路线图",
      "y1ad": "我们看过的每个环节，照「修了值多少」排序。",
      "y1b": "风险清单",
      "y1bd": "哪里可能一本正经说出错的事，以及那会让您付出什么代价。",
      "y2a": "会自己跑的流水线",
      "y2ad": "跑在您自己的环境上，交接之后还会继续稳定跑。",
      "y2b": "操作手册",
      "y2bd": "写成您的人不必再找我们就能自己调整。",
      "y3a": "带出处的回答",
      "y3ad": "每个回答都指出来自哪份文档的哪一段，找不到就直说。",
      "y3b": "照您公司说法产出的模型",
      "y3bd": "用您自己的材料训练，成本只是从零打造的零头。",
      "y4a": "把整条流程跑完的 Agent",
      "y4ad": "自己查您的系统、把事情做完，而不是只做其中一步。",
      "y4b": "人工确认关卡",
      "y4bd": "写在程序里强制运行，不是靠提示词求模型小心。",
      "y5a": "评估报告",
      "y5ad": "另一个模型持续抽考回答，漏掉的都会记下来并通知您。",
      "y5b": "持续维运",
      "y5bd": "云端环境和日常维护由我们接手，不用您的员工另外学一套。",
      "hp.r1": "没有人回报过的错，我们找得出来",
      "hp.r2": "我们做的自动化，送出去之前会先拦下自己的错",
      "hp.r3": "我们做的 AI，只根据您的文档回答，而且附上出处",
      "hp.r4": "我们做的 AI 会替您做事，但动手前先问过您",
      "hp.r5": "负责检查的那个模型，我们也拿去验",
      "services.lede": "您不必先懂技术。多数人从第一项开始，做完再决定下一步。",
      "sv1.stage": "01 ／ 诊断",
      "sv1.pain": "上面说要用 AI，工具也试了几个。但没有人说得清楚，哪个环节最该先动、动了到底能省多少。",
      "sv1.kick": "第 2 条／共 16 条",
      "sv1.head": "一个什么都没改的写入，却回报成功。",
      "sv1.r1": "请假单<b>创建了</b>，余额<b>没有动</b>。",
      "sv1.r2": "<b>全程没有任何错误。</b>同样那三天可以无限次重复请。",
      "sv1.fix": "现在只要写入不可能生效，就会直接报错停下来。",
      "sv2.stage": "02 ／ 构建",
      "sv2.pain": "同一份数据，这是这周第三次手动搬了。从这个工具拷贝到那个工具，中间还要改格式、补字段。不难，但每天吃掉两小时，而且谁都不想接这个活。",
      "sv2.n1": "搜集",
      "sv2.n2": "翻译",
      "sv2.n3": "撰写",
      "sv2.n4": "查核",
      "sv2.n5": "发布",
      "sv2.skipped": "跳过",
      "sv2.sentlabel": "退回重写",
      "sv2.call": "文章开头写了 <q>NEW YORK &ndash;</q>。五份来源里没有一份说这件事发生在纽约。",
      "sv2.ratio": "写稿花 15 秒，查核自己写的东西花 67 秒。",
      "sv3.stage": "03 ／ 构建",
      "sv3.pain": "问到只有您内部文档里才有的东西，AI 就开始编。条款怎么写、流程该找谁、某个规格到底是多少，它答得飞快、语气笃定，但没有一句讲得出出处。",
      "sv3.q": "我想去日本工作三周，可以吗？",
      "sv3.a1": "可以。三周（15 个工作天）在每年 20 个工作天的海外工作上限内，不需要核准，只要事先通知您的主管。",
      "sv3.src1": "HR 远距办公政策 &middot;「在其他国家工作」",
      "sv3.a2": "但有一件事：您的 VPN 是 level 2，只在核准地区连得上。<span class=\"qa-hl\">日本不在名单里，您到了那边 VPN 会直接连不上。</span>",
      "sv3.src2": "IT VPN 权限等级政策",
      "sv4.stage": "04 ／ 构建",
      "sv4.pain": "五个工具、五套接口，没有一个真的连着。每完成一件事，就得有人在中间接手：这边查完、拷贝到那边、再回来更新状态。",
      "sv4.ready": "准备运行",
      "sv4.k1": "动作",
      "sv4.v1": "开立 IT 工单",
      "sv4.k2": "标题",
      "sv4.k3": "严重度",
      "sv4.wait": "等待您的确认",
      "sv4.waittx": "开一张严重度 3 的 IT 工单，标题「External monitor flickering」。",
      "sv4.note": "<b>什么都还没送出。</b>服务器只会在您回答之后，才发出一组绑定这些细节的一次性权杖。",
      "sv4.b1": "确认",
      "sv4.b2": "改一下",
      "sv4.b3": "取消",
      "sv5.stage": "05 ／ 验证",
      "sv5.pain": "出错的时候，通常是客户先发现，不是您。AI 系统不会当机，它只是慢慢开始答错，而且语气跟答对的时候一模一样。",



      "sv5.kill": "作废",
      "sv5.why": "更早一次验证拿到<b>完全一致</b>。但那份答案卷是在看过评审的输出之后才修改的，量的已经不是同一件事，所以整笔丢掉，公布这个比较难看的数字。",
      "sv.realrun": "实际运行",
      "s1.title": "AI 就绪度评估",
      "s1.body": "我们把您现在的流程从头到尾走一遍，包括已经在跑的 AI，算出时间和钱实际花在哪里。",
      "s2.title": "工作流与内容自动化",
      "s2.body": "我们把这些步骤接成一条会自己跑的线，中间不需要有人接手。<strong>报价单、客服回复、内部报告、对外内容，同一套做法都适用。</strong>",
      "s3.title": "生成式 AI 与知识系统",
      "s3.body": "这一项做的是<strong>「会回答」的系统</strong>。每个回答都必须指出是从哪一份文档的哪一段来的；查不到就说查不到。",
      "s4.title": "Agent 系统与集成",
      "s4.body": "上一项是会回答，这一项是<strong>会动手做</strong>：整条流程自己跑完，只在需要有人点头的地方停下来。那个关卡是写在程序里强制的。",
      "s5.title": "评估、部署与持续支持",
      "s5.body": "我们交的每一套系统都附<strong>一套自己的考卷</strong>：另一个模型持续抽考它的回答，答错或没根据的都会被记下来并通知您。这一项也能单独加到您已经在跑的系统上。",
      "results.eyebrow": "生产环境里的证据",
      "results.title": "Miloop AI 设计、搭建并交付过的系统。",
      "result3.lead": "训练成本：<b>$0.70</b>",
      "result2.lead": "已上架 <b>App Store &middot; Google Play</b>",
      "result1.lead": "工作时间减少 <b>40%</b>",
      "result1.tag": "内容自动化",
      "result1.title": "一家双语新闻机构",
      "result2.tag": "语音 AI 聊天机器人",
      "result2.title": "一家非营利机构",
      "result3.tag": "模型微调",
      "result3.title": "一家双语新闻机构",
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
      "result1.quote": "以前一篇稿子要经过好几道手，翻译、排版、初审，一个都不能少。现在这些在编辑看到稿子之前就处理好了，原本要一整个组才能扛下来的活儿，一两个人就够了，省出来的时间用来做真正需要判断的事。",
      "result1.cite": "高级编辑，一家双语新闻机构",
      "result2.quote": "我用过不同的聊天机器人，但总无法在细节上满足我的需要。这款机器人却总能在我需要的时候，给我想要的回答，仿佛是为我量身定制的。",
      "result2.cite": "用户",
      "result3.quote": "我看那篇稿子的时候还不知道是 AI 写的，看完才发现，跟我们编辑写的完全看不出差别。",
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
      "loop.diagnose": "診斷",
      "loop.build": "構建",
      "loop.verify": "驗證",
      "loop.deploy": "部署",
      "loop.support": "支援",
      "loop.sentback": "退回重做",
      "loop.passed": "通過",
      "services.eyebrow": "我們做什麼",
      "services.title": "從您的第一次盤點，到上線之後的長期維護。",
      "sv.yield": "您會拿到什麼",
      "y1a": "排好順序的路線圖",
      "y1ad": "我們看過的每個環節，照「修了值多少」排序。",
      "y1b": "風險清單",
      "y1bd": "哪裡可能一本正經說出錯的事，以及那會讓您付出什麼代價。",
      "y2a": "會自己跑的流水線",
      "y2ad": "跑在您自己的環境上，交接之後還會繼續穩定跑。",
      "y2b": "操作手冊",
      "y2bd": "寫成您的人不必再找我們就能自己調整。",
      "y3a": "帶出處的回答",
      "y3ad": "每個回答都指出來自哪份文件的哪一段，找不到就直說。",
      "y3b": "照您公司說法產出的模型",
      "y3bd": "用您自己的材料訓練，成本只是從零打造的零頭。",
      "y4a": "把整條流程跑完的 Agent",
      "y4ad": "自己查您的系統、把事情做完，而不是只做其中一步。",
      "y4b": "人工確認關卡",
      "y4bd": "寫在程式裡強制執行，不是靠提示詞求模型小心。",
      "y5a": "評估報告",
      "y5ad": "另一個模型持續抽考回答，漏掉的都會記下來並通知您。",
      "y5b": "持續維運",
      "y5bd": "雲端環境和日常維護由我們接手，不用您的員工另外學一套。",
      "hp.r1": "沒有人回報過的錯，我們找得出來",
      "hp.r2": "我們做的自動化，送出去之前會先攔下自己的錯",
      "hp.r3": "我們做的 AI，只根據您的文件回答，而且附上出處",
      "hp.r4": "我們做的 AI 會替您做事，但動手前先問過您",
      "hp.r5": "負責檢查的那個模型，我們也拿去驗",
      "services.lede": "您不必先懂技術。多數人從第一項開始，做完再決定下一步。",
      "sv1.stage": "01 ／ 診斷",
      "sv1.pain": "上面說要用 AI，工具也試了幾個。但沒有人說得清楚，哪個環節最該先動、動了到底能省多少。",
      "sv1.kick": "第 2 條／共 16 條",
      "sv1.head": "一個什麼都沒改的寫入，卻回報成功。",
      "sv1.r1": "請假單<b>建立了</b>，餘額<b>沒有動</b>。",
      "sv1.r2": "<b>全程沒有任何錯誤。</b>同樣那三天可以無限次重複請。",
      "sv1.fix": "現在只要寫入不可能生效，就會直接報錯停下來。",
      "sv2.stage": "02 ／ 構建",
      "sv2.pain": "同一份資料，這是這週第三次手動搬了。從這個工具複製到那個工具，中間還要改格式、補欄位。不難，但每天吃掉兩小時，而且誰都不想接這個活。",
      "sv2.n1": "搜集",
      "sv2.n2": "翻譯",
      "sv2.n3": "撰寫",
      "sv2.n4": "查核",
      "sv2.n5": "發佈",
      "sv2.skipped": "跳過",
      "sv2.sentlabel": "退回重寫",
      "sv2.call": "文章開頭寫了 <q>NEW YORK &ndash;</q>。五份來源裡沒有一份說這件事發生在紐約。",
      "sv2.ratio": "寫稿花 15 秒，查核自己寫的東西花 67 秒。",
      "sv3.stage": "03 ／ 構建",
      "sv3.pain": "問到只有您內部文件裡才有的東西，AI 就開始編。條款怎麼寫、流程該找誰、某個規格到底是多少，它答得飛快、語氣篤定，但沒有一句講得出出處。",
      "sv3.q": "我想去日本工作三週，可以嗎？",
      "sv3.a1": "可以。三週（15 個工作天）在每年 20 個工作天的海外工作上限內，不需要核准，只要事先通知您的主管。",
      "sv3.src1": "HR 遠距辦公政策 &middot;「在其他國家工作」",
      "sv3.a2": "但有一件事：您的 VPN 是 level 2，只在核准地區連得上。<span class=\"qa-hl\">日本不在名單裡，您到了那邊 VPN 會直接連不上。</span>",
      "sv3.src2": "IT VPN 權限等級政策",
      "sv4.stage": "04 ／ 構建",
      "sv4.pain": "五個工具、五套介面，沒有一個真的連著。每完成一件事，就得有人在中間接手：這邊查完、複製到那邊、再回來更新狀態。",
      "sv4.ready": "準備執行",
      "sv4.k1": "動作",
      "sv4.v1": "開立 IT 工單",
      "sv4.k2": "標題",
      "sv4.k3": "嚴重度",
      "sv4.wait": "等待您的確認",
      "sv4.waittx": "開一張嚴重度 3 的 IT 工單，標題「External monitor flickering」。",
      "sv4.note": "<b>什麼都還沒送出。</b>伺服器只會在您回答之後，才發出一組綁定這些細節的一次性權杖。",
      "sv4.b1": "確認",
      "sv4.b2": "改一下",
      "sv4.b3": "取消",
      "sv5.stage": "05 ／ 驗證",
      "sv5.pain": "出錯的時候，通常是客戶先發現，不是您。AI 系統不會當機，它只是慢慢開始答錯，而且語氣跟答對的時候一模一樣。",



      "sv5.kill": "作廢",
      "sv5.why": "更早一次驗證拿到<b>完全一致</b>。但那份答案卷是在看過評審的輸出之後才修改的，量的已經不是同一件事，所以整筆丟掉，公布這個比較難看的數字。",
      "sv.realrun": "實際執行",
      "s1.title": "AI 就緒度評估",
      "s1.body": "我們把您現在的流程從頭到尾走一遍，包括已經在跑的 AI，算出時間和錢實際花在哪裡。",
      "s2.title": "工作流與內容自動化",
      "s2.body": "我們把這些步驟接成一條會自己跑的線，中間不需要有人接手。<strong>報價單、客服回覆、內部報告、對外內容，同一套做法都適用。</strong>",
      "s3.title": "生成式 AI 與知識系統",
      "s3.body": "這一項做的是<strong>「會回答」的系統</strong>。每個回答都必須指出是從哪一份文件的哪一段來的；查不到就說查不到。",
      "s4.title": "Agent 系統與整合",
      "s4.body": "上一項是會回答，這一項是<strong>會動手做</strong>：整條流程自己跑完，只在需要有人點頭的地方停下來。那個關卡是寫在程式裡強制的。",
      "s5.title": "評估、部署與持續支援",
      "s5.body": "我們交的每一套系統都附<strong>一套自己的考卷</strong>：另一個模型持續抽考它的回答，答錯或沒根據的都會被記下來並通知您。這一項也能單獨加到您已經在跑的系統上。",
      "results.eyebrow": "生產環境裡的證據",
      "results.title": "Miloop AI 設計、搭建並交付過的系統。",
      "result3.lead": "訓練成本：<b>$0.70</b>",
      "result2.lead": "已上架 <b>App Store &middot; Google Play</b>",
      "result1.lead": "工作時間減少 <b>40%</b>",
      "result1.tag": "內容自動化",
      "result1.title": "一家雙語新聞機構",
      "result2.tag": "語音 AI 聊天機器人",
      "result2.title": "一家非營利機構",
      "result3.tag": "模型微調",
      "result3.title": "一家雙語新聞機構",
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
      "result1.quote": "以前一篇稿子要經過好幾道手，翻譯、排版、初審，一個都不能少。現在這些在編輯看到稿子之前就處理好了，原本要一整個組才能扛下來的活兒，一兩個人就夠了，省出來的時間用來做真正需要判斷的事。",
      "result1.cite": "高級編輯，一家雙語新聞機構",
      "result2.quote": "我用過不同的聊天機器人，但總無法在細節上滿足我的需要。這款機器人卻總能在我需要的時候，給我想要的回答，彷彿是為我量身定製的。",
      "result2.cite": "使用者",
      "result3.quote": "我看那篇稿子的時候還不知道是 AI 寫的，看完才發現，跟我們編輯寫的完全看不出差別。",
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
