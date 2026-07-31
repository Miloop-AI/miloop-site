/* ==========================================================================
   Miloop AI: driftboard-eval.js
   Copy for the driftboard-rag-eval case study, in the three site languages.

   Same arrangement as factloop-demo.js and for the same reason: main.js owns
   a dictionary shared by every page, and page-specific copy does not belong
   in it. The prefix and the attribute names are namespaced so the two sweeps
   cannot collide on a page that loads both files.

   Wrapped in an IIFE because main.js, lead-intake.js and this file all load
   as classic scripts into one shared global scope.
   ========================================================================== */
(function () {
  "use strict";

  /* The two taxonomies keep their English label names in every language. They
     are the literal values the judge emits under a JSON schema, so a reader
     comparing this page against the repository has to see the same strings. */
  var DICT = {
    en: {
      "db.meta.title": "Driftboard RAG Eval | Miloop AI",
      "db.meta.description": "An evaluation framework for retrieval-augmented generation, stress-tested against a fictional knowledge base to find out what happens when the system does not know the answer.",

      "db.back": "Back to home",

      "db.hero.eyebrow": "Portfolio",
      "db.hero.title.pre": "RAG systems get graded on ",
      "db.hero.title.em": "the wrong question",
      "db.hero.title.post": ".",
      "db.hero.lede": "Most retrieval-augmented generation demos answer one question: does the system respond well when the knowledge base has the answer. That is the easy case. The dangerous failure is what happens when it does not, when someone asks something the documentation never covered and the model has to choose between saying it does not know and inventing something plausible.",
      "db.hero.lede2": "This project builds a small RAG system over a fictional SaaS product, then stress-tests exactly that failure with a purpose-built probe set and an independent, cross-family judge, to check whether the system is telling the truth about what it knows.",

      "db.spec.role": "Role",
      "db.spec.role.value": "Evaluation design and implementation",
      "db.spec.kb": "Knowledge base",
      "db.spec.kb.value": "Nine markdown documents, about fifteen pages",
      "db.spec.probes": "Probe set",
      "db.spec.probes.value": "Category-split probes, plus a disjoint held-out set",

      "db.notice.label": "Fictional scenario",
      "db.notice.body": "This is a standalone technical demonstration. Driftboard is a fictional project management tool invented for this project. It is not a real company, and nothing described on this page relates to any real product, client, or production system.",

      "db.setup.eyebrow": "The setup",
      "db.setup.title": "What is actually being tested.",
      "db.setup.body1": "The knowledge base is nine markdown files covering a fictional SaaS product's pricing, permissions, integrations, API limits, data policy, and billing rules, about fifteen pages in total. Each document is chunked by heading, embedded with Voyage AI, and retrieved by cosine similarity against the query. At this size no vector database is needed. Claude Haiku 4.5 writes the answer from whatever comes back.",
      "db.setup.body2": "The RAG pipeline itself is standard. What this project is about is the probe bank built to fail it on purpose, and the evaluation layer built to catch those failures without trusting itself blindly.",

      "db.probes.caption": "Probe categories",
      "db.probes.h1": "Probe category",
      "db.probes.h2": "What it tests",
      "db.probe1.name": "Answerable",
      "db.probe1.body": "The knowledge base has a direct answer. The baseline case.",
      "db.probe2.name": "Soft unanswerable",
      "db.probe2.body": "The knowledge base addresses the question explicitly and the answer is negative, for example that EU hosting is not offered. A grounded answer, even though it is a no.",
      "db.probe3.name": "True gap",
      "db.probe3.body": "The knowledge base never addresses the topic at all. Saying so is the only correct answer here.",
      "db.probe4.name": "Rephrase pairs",
      "db.probe4.body": "The same question asked two different ways, checking that the system agrees with itself.",
      "db.probes.note": "Soft unanswerable and true gap look alike on the surface. Both produce a no or a not-covered response, but they test different things. Conflating them turned out to be the single biggest source of noise in this project's own evaluation design, which is covered further down.",

      "db.judge.eyebrow": "The judge",
      "db.judge.title": "Finding a hallucination means knowing what the model actually saw.",
      "db.judge.body": "A judge that grades an answer against general knowledge of the product is really testing whether the answer happens to be true, which is a different question from whether it is grounded. This judge sees only what the generation model saw on that specific call: the question, the retrieved excerpts, and the answer. No gold label, no category, no hint. It picks one of six outcomes, enforced by a JSON schema so that an invalid label is structurally impossible.",

      "db.labels.caption": "Judge labels",
      "db.labels.h1": "Label",
      "db.labels.h2": "What it means",
      "db.label1.name": "Grounded, correct",
      "db.label1.body": "Every claim in the answer is backed by the retrieved excerpts and matches them.",
      "db.label2.name": "Grounded, incorrect",
      "db.label2.body": "The answer cites real content but misapplies it: right document, wrong plan.",
      "db.label3.name": "Fabrication",
      "db.label3.body": "The answer states something specific that appears nowhere in what was retrieved.",
      "db.label4.name": "Correct refusal",
      "db.label4.body": "The excerpts genuinely do not cover it, and the model says so cleanly.",
      "db.label5.name": "Incorrect refusal",
      "db.label5.body": "The model claims not to know, but the answer was right there.",
      "db.label6.name": "Declined with fabrication",
      "db.label6.body": "A correct refusal at the core, with an unsupported specific claim tacked on anyway.",
      "db.judge.validation": "The judge runs on a different model family from the generator, so that no model is grading its own homework. It is validated against a hand-labeled gold set using Cohen's kappa rather than raw accuracy, because kappa corrects for how easy the labels were to guess by chance and accuracy does not.",

      "db.found.eyebrow": "What we found",
      "db.found.title": "The interesting part was never the headline number.",
      "db.found.retrieval": "<strong>Retrieval hits the right document 97.2% of the time within the top four results</strong>, across every probe with a known correct source.",
      "db.retrieval.caption": "Retrieval accuracy",
      "db.retrieval.h1": "Metric",
      "db.retrieval.h2": "Result",
      "db.retrieval.r1": "Hit@1 (correct source ranked first)",
      "db.retrieval.r2": "Hit@4 (correct source in top four)",
      "db.found.miss": "That is a clean number, easy to publish and move on from. The more useful finding was the 2.8% that missed entirely. One question, on whether two workspaces can be merged, retrieved four chunks about integrations, roles, and permissions, and none of them was the FAQ entry holding the answer. The response was still accurate and closely matched the real policy, almost certainly because “workspace merging is usually unsupported, contact support” is a common enough pattern that Claude Haiku produced it from general knowledge rather than from anything it had been given. Read the output alone and it looks like a clean, grounded answer. Only cross-referencing the retrieval log against the source of truth exposed that nothing in the response was supported by what the system retrieved on that call. This is the failure that matters most: the right answer for the wrong reason, invisible unless someone goes looking for it.",
      "db.found.judge": "<strong>The judge validation almost lied to us, and the fix is the actual point of this project.</strong> The first validation round scored a real disagreement: six probes where a human labeled correct refusal and the judge said grounded, correct instead. Every one of them was a soft-unanswerable probe, and none was a true gap. That split exposed a flaw in the label taxonomy itself. A knowledge base that states a negative fact explicitly should score as a grounded answer, not as a refusal. The definitions were fixed and the affected probes relabeled.",
      "db.found.circular": "Then came the trap. Re-scoring after that fix produced perfect agreement, a kappa of 1.000 across every category. That number is a symptom of circularity, not of judge accuracy: the answer key had just moved toward the judge's own reading, so agreement was guaranteed by construction rather than earned.",
      "db.found.holdout": "The fix was a second, disjoint probe set: fourteen new questions aimed at the same category boundary, labeled independently and blind to what the judge would later say. That is what restores an actual independent test, and it is where the honest number comes from.",
      "db.heldout.caption": "Held-out validation",
      "db.heldout.h1": "Group",
      "db.heldout.h2": "n",
      "db.heldout.h3": "Agreement",
      "db.heldout.h4": "Cohen's kappa",
      "db.heldout.r1": "Real generations",
      "db.heldout.r2": "Synthetic failure cases",
      "db.heldout.r3": "All held-out probes",
      "db.found.disagreements": "Two disagreements are recorded in the full report, each with its reasoning attached, rather than zero. A perfect score against a well-aligned answer key looks better on a slide. A held-out score with visible disagreement is the one that means something.",

      "db.why.eyebrow": "Why this matters",
      "db.why.title": "This is the differentiator, not the footnote.",
      "db.why.body1": "Most of what is written above is a story about catching our own mistakes: a labeling taxonomy that conflated two different questions, a circular validation loop, and a case where the right answer turned out to be ungrounded once it was actually checked. None of those surfaced from reading final outputs. They came from deliberately cross-checking retrieval logs against labels, and labels against an untouched holdout set, before trusting any number enough to report it.",
      "db.why.body2": "That is the standard this kind of evaluation work should be held to on a real production system: would the number survive someone trying to poke a hole in it.",

      "db.stack.eyebrow": "Built with",
      "db.stack.value": "Python · Claude Haiku 4.5 (generation) · GPT-5.6 Terra (cross-family judge) · Voyage AI embeddings, voyage-3.5-lite · OpenRouter · cosine similarity retrieval, no vector database · Cohen's kappa validation, hand-implemented",
      "db.link.repo": "GitHub repository",
      "db.link.reports": "Read the full validation reports",
      "db.link.pending": "Coming soon"
    },

    "zh-Hans": {
      "db.meta.title": "Driftboard RAG Eval | Miloop AI",
      "db.meta.description": "一套检索增强生成的评估框架，针对一个虚构知识库做压力测试，专门看系统答不出来的时候会发生什么。",

      "db.back": "返回首页",

      "db.hero.eyebrow": "作品",
      "db.hero.title.pre": "评 RAG，多半评错了",
      "db.hero.title.em": "题目",
      "db.hero.title.post": "。",
      "db.hero.lede": "大多数检索增强生成的演示只回答一个问题：知识库里有答案的时候，系统答得好不好。那是容易的一半。危险的失败发生在没有答案的时候，使用者问了文件从未涵盖的东西，模型得在「我不知道」和编一个听起来合理的说法之间做选择。",
      "db.hero.lede2": "这个专案为一个虚构的 SaaS 产品搭了一套小型 RAG 系统，再用一组专门设计的探测题和一个独立的跨模型家族评判者，针对那个失败模式做压力测试，验证系统对自己知道什么这件事有没有说实话。",

      "db.spec.role": "角色",
      "db.spec.role.value": "评估方法设计与实作",
      "db.spec.kb": "知识库",
      "db.spec.kb.value": "九份 markdown 文件，约十五页",
      "db.spec.probes": "探测题组",
      "db.spec.probes.value": "分类别的探测题，另加一组互不重叠的保留题",

      "db.notice.label": "虚构情境",
      "db.notice.body": "这是一个独立的技术展示。Driftboard 是为这个专案虚构出来的专案管理工具，并非真实公司，本页描述的任何内容都不涉及任何真实产品、客户或正式上线的系统。",

      "db.setup.eyebrow": "测试对象",
      "db.setup.title": "实际被测的是什么。",
      "db.setup.body1": "知识库是九份 markdown 文件，涵盖一个虚构 SaaS 产品的定价、权限、整合、API 限额、资料政策和计费规则，合计约十五页。每份文件按标题切块，用 Voyage AI 产生向量，再以余弦相似度对查询检索。这个规模不需要向量资料库。Claude Haiku 4.5 只根据检索回来的内容撰写答案。",
      "db.setup.body2": "RAG 流程本身是标准做法。这个专案真正的重点，是那组刻意要让它出错的探测题库，以及一层不盲目相信自己的评估机制。",

      "db.probes.caption": "探测题分类",
      "db.probes.h1": "探测题类别",
      "db.probes.h2": "测的是什么",
      "db.probe1.name": "可回答 (Answerable)",
      "db.probe1.body": "知识库里有直接的答案。这是基准情况。",
      "db.probe2.name": "软性无解 (Soft unanswerable)",
      "db.probe2.body": "知识库明确提到了这个问题，而答案是否定的，例如不提供欧盟机房。答案虽然是「否」，但仍然有依据。",
      "db.probe3.name": "真正的空白 (True gap)",
      "db.probe3.body": "知识库完全没有触及这个主题。这时候唯一正确的回答就是说自己不知道。",
      "db.probe4.name": "改写配对 (Rephrase pairs)",
      "db.probe4.body": "同一个问题用两种说法各问一次，检查系统前后是否自相一致。",
      "db.probes.note": "软性无解和真正的空白表面上很像，两者都会得到「否」或「未涵盖」的回应，但测的是不同的东西。把两者混为一谈，结果成了这个专案自身评估设计里最大的一个杂讯来源，下面会谈到。",

      "db.judge.eyebrow": "评判者",
      "db.judge.title": "要抓出幻觉，得先知道模型当时实际看到了什么。",
      "db.judge.body": "如果评判者是拿产品的一般知识来评一个答案，那它测的其实是这个答案碰巧对不对，跟这个答案有没有依据是两回事。这里的评判者只看得到生成模型在那一次呼叫看到的东西：问题、检索到的片段，以及答案本身。没有标准答案、没有类别、没有提示。它必须从六种结果里选一个，并由 JSON schema 强制约束，让不合法的标签在结构上不可能出现。",

      "db.labels.caption": "评判标签",
      "db.labels.h1": "标签",
      "db.labels.h2": "含义",
      "db.label1.name": "有依据且正确 (Grounded, correct)",
      "db.label1.body": "答案里的每一项陈述都有检索片段支持，而且与之相符。",
      "db.label2.name": "有依据但错误 (Grounded, incorrect)",
      "db.label2.body": "答案引用的是真实内容，但套用错了：文件对，方案错。",
      "db.label3.name": "捏造 (Fabrication)",
      "db.label3.body": "答案讲了某个具体的说法，而检索到的内容里完全没有出现过。",
      "db.label4.name": "正确拒答 (Correct refusal)",
      "db.label4.body": "检索片段确实没有涵盖，模型也干脆地说了自己不知道。",
      "db.label5.name": "错误拒答 (Incorrect refusal)",
      "db.label5.body": "模型说自己不知道，但答案其实就在眼前。",
      "db.label6.name": "拒答夹带捏造 (Declined with fabrication)",
      "db.label6.body": "主体是一次正确的拒答，却仍然附带了一句没有依据的具体说法。",
      "db.judge.validation": "评判者跑在与生成模型不同的模型家族上，避免让模型改自己的考卷。它以人工标注的黄金题组做验证，用的是 Cohen's kappa 而不是原始准确率，因为 kappa 会把标签本身有多容易猜中这件事扣掉，准确率不会。",

      "db.found.eyebrow": "结果",
      "db.found.title": "有意思的从来不是那个拿得出手的数字。",
      "db.found.retrieval": "<strong>在所有已知正确来源的探测题上，检索有 97.2% 的机率能把正确文件排进前四名。</strong>",
      "db.retrieval.caption": "检索准确率",
      "db.retrieval.h1": "指标",
      "db.retrieval.h2": "结果",
      "db.retrieval.r1": "Hit@1（正确来源排在第一）",
      "db.retrieval.r2": "Hit@4（正确来源在前四名内）",
      "db.found.miss": "这是个漂亮的数字，很容易就写进简报然后翻页。但更有用的发现是完全没命中的那 2.8%。其中一题问的是两个工作区能不能合并，检索回来的四个片段谈的是整合、角色和权限，没有一个是真正写着答案的 FAQ 条目。模型给的回应仍然准确，也和真实政策高度吻合，几乎可以确定是因为「工作区合并通常不支持，请联系客服」这个模式够常见，Claude Haiku 是凭一般知识生出来的，而不是凭手上拿到的任何东西。只看输出，它像是一个干净、有依据的答案。只有把检索纪录和标准答案交叉比对，才会暴露出这个回应没有任何一句是那次检索内容支持的。这才是最要命的失败：答案对了，但理由是错的，而且不去翻就看不见。",
      "db.found.judge": "<strong>评判者的验证差点骗了我们，而修正这件事本身，才是这个专案真正的重点。</strong>第一轮验证跑出了一个真实的分歧：有六题人工标注为正确拒答，评判者却判成有依据且正确。这六题全部是软性无解，没有一题是真正的空白。这个分布暴露的是标签体系本身的缺陷：知识库既然明确写出了一个否定事实，那就该算成有依据的答案，而不是拒答。于是定义被修掉，受影响的题目重新标注。",
      "db.found.circular": "陷阱就在这里。修正之后重跑，结果是完全一致，每个类别的 kappa 都是 1.000。这个数字是循环论证的症状，不是评判者准确的证据：标准答案刚刚往评判者自己的读法靠过去，一致是被建构出来的，不是挣来的。",
      "db.found.holdout": "解法是第二组互不重叠的探测题：十四道针对同一个类别边界的新题目，独立标注，且在标注时完全不知道评判者后来会怎么判。这样才重新拿回一个真正独立的检验，诚实的数字也是从这里来的。",
      "db.heldout.caption": "保留题组验证",
      "db.heldout.h1": "组别",
      "db.heldout.h2": "题数",
      "db.heldout.h3": "一致数",
      "db.heldout.h4": "Cohen's kappa",
      "db.heldout.r1": "真实生成",
      "db.heldout.r2": "合成失败案例",
      "db.heldout.r3": "全部保留题",
      "db.found.disagreements": "完整报告里记录的是两个分歧，各自附上判断理由，而不是零个。拿一份已经对齐过的标准答案跑出满分，放在投影片上比较好看；一个带着可见分歧的保留题分数，才是有意义的那个。",

      "db.why.eyebrow": "为什么这才是重点",
      "db.why.title": "这是差异所在，不是附注。",
      "db.why.body1": "上面写的大半，是一个抓自己错误的故事：一套把两个不同问题混在一起的标签体系、一个循环的验证回圈，以及一个真的去查之后才发现根本没有依据的「正确」答案。这些没有一个是靠读最终输出看出来的。它们来自刻意拿检索纪录去对标注、再拿标注去对一组从未碰过的保留题，然后才决定某个数字值不值得报出去。",
      "db.why.body2": "这就是这类评估工作在真实上线系统上该被要求的标准：这个数字，撑不撑得住别人刻意来挑洞。",

      "db.stack.eyebrow": "技术组成",
      "db.stack.value": "Python · Claude Haiku 4.5（生成）· GPT-5.6 Terra（跨家族评判）· Voyage AI 向量模型 voyage-3.5-lite · OpenRouter · 余弦相似度检索，不用向量资料库 · Cohen's kappa 验证，自行实作",
      "db.link.repo": "GitHub 程式库",
      "db.link.reports": "阅读完整验证报告",
      "db.link.pending": "即将公开"
    },

    "zh-Hant": {
      "db.meta.title": "Driftboard RAG Eval | Miloop AI",
      "db.meta.description": "一套檢索增強生成的評估框架，針對一個虛構知識庫做壓力測試，專門看系統答不出來的時候會發生什麼。",

      "db.back": "返回首頁",

      "db.hero.eyebrow": "作品",
      "db.hero.title.pre": "評 RAG，多半評錯了",
      "db.hero.title.em": "題目",
      "db.hero.title.post": "。",
      "db.hero.lede": "大多數檢索增強生成的示範只回答一個問題：知識庫裡有答案的時候，系統答得好不好。那是容易的一半。危險的失敗發生在沒有答案的時候，使用者問了文件從未涵蓋的東西，模型得在「我不知道」和編一個聽起來合理的說法之間做選擇。",
      "db.hero.lede2": "這個專案為一個虛構的 SaaS 產品搭了一套小型 RAG 系統，再用一組專門設計的探測題和一個獨立的跨模型家族評判者，針對那個失敗模式做壓力測試，驗證系統對自己知道什麼這件事有沒有說實話。",

      "db.spec.role": "角色",
      "db.spec.role.value": "評估方法設計與實作",
      "db.spec.kb": "知識庫",
      "db.spec.kb.value": "九份 markdown 文件，約十五頁",
      "db.spec.probes": "探測題組",
      "db.spec.probes.value": "分類別的探測題，另加一組互不重疊的保留題",

      "db.notice.label": "虛構情境",
      "db.notice.body": "這是一個獨立的技術展示。Driftboard 是為這個專案虛構出來的專案管理工具，並非真實公司，本頁描述的任何內容都不涉及任何真實產品、客戶或正式上線的系統。",

      "db.setup.eyebrow": "測試對象",
      "db.setup.title": "實際被測的是什麼。",
      "db.setup.body1": "知識庫是九份 markdown 文件，涵蓋一個虛構 SaaS 產品的定價、權限、整合、API 限額、資料政策和計費規則，合計約十五頁。每份文件按標題切塊，用 Voyage AI 產生向量，再以餘弦相似度對查詢檢索。這個規模不需要向量資料庫。Claude Haiku 4.5 只根據檢索回來的內容撰寫答案。",
      "db.setup.body2": "RAG 流程本身是標準做法。這個專案真正的重點，是那組刻意要讓它出錯的探測題庫，以及一層不盲目相信自己的評估機制。",

      "db.probes.caption": "探測題分類",
      "db.probes.h1": "探測題類別",
      "db.probes.h2": "測的是什麼",
      "db.probe1.name": "可回答 (Answerable)",
      "db.probe1.body": "知識庫裡有直接的答案。這是基準情況。",
      "db.probe2.name": "軟性無解 (Soft unanswerable)",
      "db.probe2.body": "知識庫明確提到了這個問題，而答案是否定的，例如不提供歐盟機房。答案雖然是「否」，但仍然有依據。",
      "db.probe3.name": "真正的空白 (True gap)",
      "db.probe3.body": "知識庫完全沒有觸及這個主題。這時候唯一正確的回答就是說自己不知道。",
      "db.probe4.name": "改寫配對 (Rephrase pairs)",
      "db.probe4.body": "同一個問題用兩種說法各問一次，檢查系統前後是否自相一致。",
      "db.probes.note": "軟性無解和真正的空白表面上很像，兩者都會得到「否」或「未涵蓋」的回應，但測的是不同的東西。把兩者混為一談，結果成了這個專案自身評估設計裡最大的一個雜訊來源，下面會談到。",

      "db.judge.eyebrow": "評判者",
      "db.judge.title": "要抓出幻覺，得先知道模型當時實際看到了什麼。",
      "db.judge.body": "如果評判者是拿產品的一般知識來評一個答案，那它測的其實是這個答案碰巧對不對，跟這個答案有沒有依據是兩回事。這裡的評判者只看得到生成模型在那一次呼叫看到的東西：問題、檢索到的片段，以及答案本身。沒有標準答案、沒有類別、沒有提示。它必須從六種結果裡選一個，並由 JSON schema 強制約束，讓不合法的標籤在結構上不可能出現。",

      "db.labels.caption": "評判標籤",
      "db.labels.h1": "標籤",
      "db.labels.h2": "含義",
      "db.label1.name": "有依據且正確 (Grounded, correct)",
      "db.label1.body": "答案裡的每一項陳述都有檢索片段支持，而且與之相符。",
      "db.label2.name": "有依據但錯誤 (Grounded, incorrect)",
      "db.label2.body": "答案引用的是真實內容，但套用錯了：文件對，方案錯。",
      "db.label3.name": "捏造 (Fabrication)",
      "db.label3.body": "答案講了某個具體的說法，而檢索到的內容裡完全沒有出現過。",
      "db.label4.name": "正確拒答 (Correct refusal)",
      "db.label4.body": "檢索片段確實沒有涵蓋，模型也乾脆地說了自己不知道。",
      "db.label5.name": "錯誤拒答 (Incorrect refusal)",
      "db.label5.body": "模型說自己不知道，但答案其實就在眼前。",
      "db.label6.name": "拒答夾帶捏造 (Declined with fabrication)",
      "db.label6.body": "主體是一次正確的拒答，卻仍然附帶了一句沒有依據的具體說法。",
      "db.judge.validation": "評判者跑在與生成模型不同的模型家族上，避免讓模型改自己的考卷。它以人工標註的黃金題組做驗證，用的是 Cohen's kappa 而不是原始準確率，因為 kappa 會把標籤本身有多容易猜中這件事扣掉，準確率不會。",

      "db.found.eyebrow": "結果",
      "db.found.title": "有意思的從來不是那個拿得出手的數字。",
      "db.found.retrieval": "<strong>在所有已知正確來源的探測題上，檢索有 97.2% 的機率能把正確文件排進前四名。</strong>",
      "db.retrieval.caption": "檢索準確率",
      "db.retrieval.h1": "指標",
      "db.retrieval.h2": "結果",
      "db.retrieval.r1": "Hit@1（正確來源排在第一）",
      "db.retrieval.r2": "Hit@4（正確來源在前四名內）",
      "db.found.miss": "這是個漂亮的數字，很容易就寫進簡報然後翻頁。但更有用的發現是完全沒命中的那 2.8%。其中一題問的是兩個工作區能不能合併，檢索回來的四個片段談的是整合、角色和權限，沒有一個是真正寫著答案的 FAQ 條目。模型給的回應仍然準確，也和真實政策高度吻合，幾乎可以確定是因為「工作區合併通常不支援，請聯絡客服」這個模式夠常見，Claude Haiku 是憑一般知識生出來的，而不是憑手上拿到的任何東西。只看輸出，它像是一個乾淨、有依據的答案。只有把檢索紀錄和標準答案交叉比對，才會暴露出這個回應沒有任何一句是那次檢索內容支持的。這才是最要命的失敗：答案對了，但理由是錯的，而且不去翻就看不見。",
      "db.found.judge": "<strong>評判者的驗證差點騙了我們，而修正這件事本身，才是這個專案真正的重點。</strong>第一輪驗證跑出了一個真實的分歧：有六題人工標註為正確拒答，評判者卻判成有依據且正確。這六題全部是軟性無解，沒有一題是真正的空白。這個分布暴露的是標籤體系本身的缺陷：知識庫既然明確寫出了一個否定事實，那就該算成有依據的答案，而不是拒答。於是定義被修掉，受影響的題目重新標註。",
      "db.found.circular": "陷阱就在這裡。修正之後重跑，結果是完全一致，每個類別的 kappa 都是 1.000。這個數字是循環論證的症狀，不是評判者準確的證據：標準答案剛剛往評判者自己的讀法靠過去，一致是被建構出來的，不是掙來的。",
      "db.found.holdout": "解法是第二組互不重疊的探測題：十四道針對同一個類別邊界的新題目，獨立標註，且在標註時完全不知道評判者後來會怎麼判。這樣才重新拿回一個真正獨立的檢驗，誠實的數字也是從這裡來的。",
      "db.heldout.caption": "保留題組驗證",
      "db.heldout.h1": "組別",
      "db.heldout.h2": "題數",
      "db.heldout.h3": "一致數",
      "db.heldout.h4": "Cohen's kappa",
      "db.heldout.r1": "真實生成",
      "db.heldout.r2": "合成失敗案例",
      "db.heldout.r3": "全部保留題",
      "db.found.disagreements": "完整報告裡記錄的是兩個分歧，各自附上判斷理由，而不是零個。拿一份已經對齊過的標準答案跑出滿分，放在投影片上比較好看；一個帶著可見分歧的保留題分數，才是有意義的那個。",

      "db.why.eyebrow": "為什麼這才是重點",
      "db.why.title": "這是差異所在，不是附註。",
      "db.why.body1": "上面寫的大半，是一個抓自己錯誤的故事：一套把兩個不同問題混在一起的標籤體系、一個循環的驗證迴圈，以及一個真的去查之後才發現根本沒有依據的「正確」答案。這些沒有一個是靠讀最終輸出看出來的。它們來自刻意拿檢索紀錄去對標註、再拿標註去對一組從未碰過的保留題，然後才決定某個數字值不值得報出去。",
      "db.why.body2": "這就是這類評估工作在真實上線系統上該被要求的標準：這個數字，撐不撐得住別人刻意來挑洞。",

      "db.stack.eyebrow": "技術組成",
      "db.stack.value": "Python · Claude Haiku 4.5（生成）· GPT-5.6 Terra（跨家族評判）· Voyage AI 向量模型 voyage-3.5-lite · OpenRouter · 餘弦相似度檢索，不用向量資料庫 · Cohen's kappa 驗證，自行實作",
      "db.link.repo": "GitHub 程式庫",
      "db.link.reports": "閱讀完整驗證報告",
      "db.link.pending": "即將公開"
    }
  };

  var currentLang = null;

  function t(key) {
    var entries = DICT[currentLang] || DICT.en;
    return entries[key] !== undefined ? entries[key] : DICT.en[key];
  }

  function applyLang(lang) {
    if (!DICT[lang]) lang = "en";
    currentLang = lang;

    /* main.js drives the title and meta description from its own dictionary,
       which has no entry for this page and so writes the homepage values here.
       Its applyLang is fully synchronous and the observer below runs as a
       microtask after it, so overwriting them at this point wins. */
    document.title = t("db.meta.title");
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("db.meta.description"));

    document.querySelectorAll("[data-db-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-db-i18n"));
    });
    document.querySelectorAll("[data-db-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-db-i18n-html"));
    });
  }

  /* main.js changes language by calling its own internal applyLang: the nav
     switcher and the initial load never go through window.miloopSetLanguage,
     so wrapping that would catch only the lead-intake panel. Every path does
     set the lang attribute on <html>, which makes observing it the single
     hook that covers all three without modifying main.js. */
  new MutationObserver(function () {
    var lang = document.documentElement.getAttribute("lang");
    if (lang !== currentLang) applyLang(lang);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(document.documentElement.getAttribute("lang"));
  });
})();
