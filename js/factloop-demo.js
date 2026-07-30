/* ==========================================================================
   Miloop AI: factloop-demo.js
   Copy and behaviour for the factloop-newsroom case study page, including
   the live demo that calls the deployed newsroom service.

   Wrapped in an IIFE, unlike lead-intake.js, because both scripts run on
   this page as classic scripts sharing one global lexical scope. Names such
   as `state` and `escapeHtml` exist in both, and a top-level redeclaration
   would throw before either script ran.

   Traditional Chinese is a script conversion of the Simplified Chinese copy
   (same wording and word order), matching the convention in main.js.
   ========================================================================== */

(function () {
  "use strict";

  /* The deployed newsroom service. Cross-origin, unlike the same-origin
     /api/* calls in lead-intake.js, so the full URL is required and the
     service's CORS allowlist has to name the origin this page is served
     from. Nothing secret is sent: the API keys live on the server, and the
     request body carries only the visitor's keyword. */
  var ENDPOINT = "https://factloop-newsroom.onrender.com/generate";

  /* The service enforces this same ceiling and rejects anything longer with
     a 400, so the input is capped to match rather than let a request fail
     for a reason the visitor was never shown. */
  var MAX_KEYWORD_LENGTH = 200;

  /* A full run chains several sequential model calls, and each draft the
     fact-check rejects sends the writing stage round again, up to twice. One
     run against an already-warm server had still not answered after five
     minutes, so a tighter ceiling risks cutting off work that is still
     progressing. This one exists only to stop a request hanging forever. */
  var REQUEST_TIMEOUT_MS = 480000;

  /* When each loading message takes over, in milliseconds. The pipeline
     reports nothing back while it runs, so these are honest descriptions of
     what is normally happening at that point, not measured progress. */
  var LOADING_STAGES = [
    { after: 0, key: "fl.demo.loading.start" },
    { after: 8000, key: "fl.demo.loading.waking" },
    { after: 50000, key: "fl.demo.loading.working" },
    { after: 150000, key: "fl.demo.loading.long" }
  ];

  var DICT = {
    "en": {
      "fl.meta.title": "FactLoop Newsroom | Miloop AI",
      "fl.meta.description": "A multi-agent newsroom that turns a keyword in any language into a fact-checked, source-backed article, and refuses to publish what it cannot verify. Try it live.",
      "fl.back": "Back to home",
      "fl.hero.eyebrow": "Portfolio",
      "fl.hero.title.pre": "A newsroom that ",
      "fl.hero.title.em": "checks its own work",
      "fl.hero.title.post": ".",
      "fl.hero.lede": "FactLoop Newsroom takes a topic in any language and returns a news article written in that same language, built only from sources it can point you to. When it cannot verify what it just wrote, it publishes nothing. You can run it yourself further down this page.",
      "fl.spec.role": "Role",
      "fl.spec.role.value": "Design, build, and deployment",
      "fl.spec.stack": "Built with",
      "fl.spec.stack.value": "LangGraph, FastAPI, MCP, five models across three providers",
      "fl.spec.langs": "Languages",
      "fl.spec.langs.value": "Whatever language you ask in",
      "fl.problem.eyebrow": "The problem",
      "fl.problem.title": "AI writes quickly. That was never the hard part.",
      "fl.problem.body": "Point a language model at a news topic and it will hand you clean copy in seconds. Some of it will be true. The rest will read exactly the same. For anyone publishing on a deadline, that is not a time saving, it is a liability handed to whoever reads it last. So the question worth solving is not how to make AI write faster. It is how to know, before anything goes out, which sentences are actually held up by something real.",
      "fl.how.eyebrow": "How it works",
      "fl.how.title": "Five stages, and one of them is allowed to say no.",
      "fl.how.lede": "Each stage does one job and hands the result on. The system is arranged so that the stage doing the writing never gets the last word.",
      "fl.stage1.name": "Gather",
      "fl.stage1.body": "Searches recent news only, starting with the last two days and reaching back up to a week when it needs more to work with. Every fact it keeps stays attached to the article it came from.",
      "fl.stage2.name": "Carry over",
      "fl.stage2.body": "When the sources are not in the language you asked in, the facts are carried across so the writing can be done natively. The originals are kept, untouched.",
      "fl.stage3.name": "Write",
      "fl.stage3.body": "Drafts the article from the collected facts and nothing else. No outside knowledge, no filling in the gaps with something that sounds right.",
      "fl.stage4.name": "Verify",
      "fl.stage4.body": "Reads the draft back against the original sources, claim by claim. Anything the sources do not support goes back to the writing stage.",
      "fl.stage5.name": "Publish",
      "fl.stage5.body": "Shapes the finished piece so search engines and AI assistants can read it properly, without introducing anything new.",
      "fl.stage.retry": "The writing stage gets two attempts to fix whatever verification flagged. If the third draft still cannot be supported, the run stops and nothing is published. You may well see this happen in the demo below.",
      "fl.principle.eyebrow": "Design decisions",
      "fl.principle.title": "Three choices that make the difference.",
      "fl.principle1.title": "The step that collects facts has no AI in it",
      "fl.principle1.body": "Every other stage uses a model. This one deliberately does not. A model sitting between the search results and the record of facts could summarise, smooth over, or quietly drop a detail, and every check after that would be measuring the article against a record that was already wrong.",
      "fl.principle2.title": "Translation never touches the evidence",
      "fl.principle2.body": "When the sources are in a different language from the one you asked in, verification still compares the finished article against the originals rather than the translated version. A slip in translation cannot disguise an invented fact, and it cannot be mistaken for one either.",
      "fl.principle3.title": "Publishing nothing is a valid outcome",
      "fl.principle3.body": "Most systems treat a failed check as an obstacle to route around. Here it is the product working as designed. A run that stops and tells you exactly which claims it could not stand behind is worth more than one that prints them quietly and leaves you to find out later.",
      "fl.demo.eyebrow": "Try it",
      "fl.demo.title": "Run the newsroom.",
      "fl.demo.lede": "Type a topic in any language. You will get back an article in that same language with every source listed and linked, or an honest account of why there is not one.",
      "fl.demo.label": "Topic",
      "fl.demo.placeholder": "e.g. coastal tidal energy",
      "fl.demo.hint": "Be specific. A focused phrase finds better sources than one broad word.",
      "fl.demo.note": "This demo runs live news search and several AI models on every request, so it is usage limited. Please try a couple of topics rather than a dozen.",
      "fl.demo.submit": "Run the newsroom",
      "fl.demo.running": "Working...",
      "fl.demo.loading.start": "Starting the run.",
      "fl.demo.loading.waking": "The demo server sleeps when it is idle, and waking it up takes up to a minute, so the first run of the day is the slow one. Nothing has gone wrong.",
      "fl.demo.loading.working": "The server is up. Now searching the news, drafting, and fact-checking. Several models run one after another, so this part usually takes a few minutes.",
      "fl.demo.loading.long": "Still running. A long run usually means the fact-check sent a draft back to be rewritten.",
      "fl.demo.elapsed": "Elapsed {n}s",
      "fl.demo.result.eyebrow": "Result",
      "fl.demo.result.language": "Detected language",
      "fl.demo.result.coverage": "Coverage",
      "fl.demo.result.coverage.value": "last {n} days",
      "fl.demo.result.sources": "Sources",
      "fl.demo.result.meta.summary": "View GEO/SEO metadata",
      "fl.demo.result.keywords": "SEO keywords",
      "fl.demo.result.metadesc": "Meta description",
      "fl.demo.empty.title": "No recent news on that topic.",
      "fl.demo.empty.body": "The search covers the last week only, so a topic that has not been reported on lately comes back with nothing to write from. Try something more current, or widen the phrase a little.",
      "fl.demo.blocked.title": "The fact-check held this one back.",
      "fl.demo.blocked.body": "The draft made claims the sources did not support, and after two rewrites it still could not stay within them, so nothing was published. This is the guardrail doing its job, not the system breaking. Try a different angle, or a sharper keyword.",
      "fl.demo.blocked.claims": "Claims that could not be verified",
      "fl.demo.limit.title": "Usage limit reached.",
      "fl.demo.limit.body": "This demo is capped to keep the cost of running it sane. Please try again a little later.",
      "fl.demo.error.title": "Something went wrong.",
      "fl.demo.error.body": "The run did not complete. Please try again in a moment, and email info@miloop.ai if it keeps happening.",
      "fl.demo.error.timeout": "The run took longer than expected and was stopped. Usually that means the server was still starting up. Please try once more."
    },

    "zh-Hans": {
      "fl.meta.title": "FactLoop Newsroom｜Miloop AI",
      "fl.meta.description": "一套多智能体新闻编辑室，把任何语言的关键字变成经过查证、有来源可循的报道，查不出来的就不发。欢迎实际试跑。",
      "fl.back": "返回首页",
      "fl.hero.eyebrow": "作品案例",
      "fl.hero.title.pre": "一个会",
      "fl.hero.title.em": "自我查证",
      "fl.hero.title.post": "的新闻编辑室。",
      "fl.hero.lede": "FactLoop Newsroom接受任何语言的主题，回传一篇用同样语言写成的报道，内容只来自它能指给您看的来源。如果它没办法查证自己刚写下的东西，它就什么都不发。这一页往下拉，您可以自己跑一次。",
      "fl.spec.role": "角色",
      "fl.spec.role.value": "设计、开发与部署",
      "fl.spec.stack": "技术组成",
      "fl.spec.stack.value": "LangGraph、FastAPI、MCP，三家供应商的五个模型",
      "fl.spec.langs": "语言",
      "fl.spec.langs.value": "您用什么语言问，就用什么语言回",
      "fl.problem.eyebrow": "问题在哪",
      "fl.problem.title": "AI写得快，但那从来不是难的部分。",
      "fl.problem.body": "把一个新闻主题丢给语言模型，几秒钟内就会拿到一篇干净利落的稿子。其中有些是真的，其余的读起来一模一样。对于赶截止时间的人来说，这不是省下时间，而是把风险转嫁给最后读到的那个人。所以真正值得解决的问题，不是怎么让AI写得更快，而是怎么在东西发出去之前，就知道哪几句话真的有依据。",
      "fl.how.eyebrow": "运作方式",
      "fl.how.title": "五个阶段，其中一个有权说不。",
      "fl.how.lede": "每个阶段只做一件事，然后把结果交给下一棒。整套系统的安排，就是要让负责写稿的那一段，永远不是最后拍板的人。",
      "fl.stage1.name": "搜集",
      "fl.stage1.body": "只搜索近期新闻，先看最近两天，需要更多素材时才往回延伸，最多一周。每一条留下来的事实，都绑着它出自的那篇报道。",
      "fl.stage2.name": "转换语言",
      "fl.stage2.body": "当来源不是您提问的语言时，事实会被转换过来，让写稿这一段能用母语进行。原文完整保留，不动。",
      "fl.stage3.name": "撰稿",
      "fl.stage3.body": "只根据搜集到的事实写稿，其他一概不用。不引入外部知识，也不用听起来合理的话填补空缺。",
      "fl.stage4.name": "查证",
      "fl.stage4.body": "拿写好的稿子逐条比对原始来源。任何来源撑不住的说法，都退回撰稿阶段。",
      "fl.stage5.name": "发布",
      "fl.stage5.body": "把成稿整理成搜索引擎和AI助理读得懂的形式，过程中不新增任何内容。",
      "fl.stage.retry": "撰稿阶段有两次机会，修正查证挑出来的问题。如果第三版仍然站不住脚，整次运行就此打住，什么都不发布。您在下面的demo里很可能会遇到这种情况。",
      "fl.principle.eyebrow": "设计取舍",
      "fl.principle.title": "三个决定了成败的选择。",
      "fl.principle1.title": "搜集事实的那一步，刻意不放AI",
      "fl.principle1.body": "其他每个阶段都用模型，唯独这一步没有，而且是刻意的。如果让模型坐在搜索结果和事实记录之间，它可能会概括、会润饰，或者悄悄漏掉一个细节，那么后面所有的查证，比对的都是一份已经出错的记录。",
      "fl.principle2.title": "翻译碰不到证据",
      "fl.principle2.body": "当来源的语言和您提问的语言不同时，查证比对的仍然是原文来源，而不是翻译过的版本。这样一来，翻译上的闪失不会变成掩护造假的借口，也不会被误认成造假。",
      "fl.principle3.title": "什么都不发，也是一种正确结果",
      "fl.principle3.body": "多数系统把查证失败当成需要绕过去的障碍。在这里，它是产品照着设计在运作。一次停下来、并且明确告诉您哪些说法它撑不住的运行，价值高过一次悄悄把它们印出来、让您日后自己发现的运行。",
      "fl.demo.eyebrow": "实际试试",
      "fl.demo.title": "跑一次这个编辑室。",
      "fl.demo.lede": "用任何语言输入一个主题。您会拿回一篇同样语言的报道，每个来源都列出来、可以点开；或者拿到一个诚实的说明，告诉您这次为什么没有稿子。",
      "fl.demo.label": "主题",
      "fl.demo.placeholder": "例如：沿海潮汐发电",
      "fl.demo.hint": "讲得具体一点。一个明确的词组，找到的来源会比单一个笼统的词好。",
      "fl.demo.note": "这个demo每次执行都会实际搜索新闻，并调用好几个AI模型，因此有使用次数限制。请试个两三个主题就好，不必一口气试十几个。",
      "fl.demo.submit": "开始执行",
      "fl.demo.running": "执行中…",
      "fl.demo.loading.start": "正在启动。",
      "fl.demo.loading.waking": "这个demo的服务器闲置时会休眠，唤醒大约需要一分钟，所以当天第一次执行会特别慢。这不是出错。",
      "fl.demo.loading.working": "服务器已就绪，正在搜索新闻、撰稿、查证。好几个模型依序接力，这一段通常需要几分钟。",
      "fl.demo.loading.long": "还在跑。跑得比较久，通常代表查证把稿子退回去重写了。",
      "fl.demo.elapsed": "已耗时 {n} 秒",
      "fl.demo.result.eyebrow": "结果",
      "fl.demo.result.language": "判定语言",
      "fl.demo.result.coverage": "来源涵盖范围",
      "fl.demo.result.coverage.value": "近 {n} 天",
      "fl.demo.result.sources": "来源",
      "fl.demo.result.meta.summary": "查看 GEO/SEO 元数据",
      "fl.demo.result.keywords": "SEO 关键字",
      "fl.demo.result.metadesc": "Meta 描述",
      "fl.demo.empty.title": "这个主题近期没有新闻。",
      "fl.demo.empty.body": "搜索范围只涵盖最近一周，所以近期没有被报道过的主题，找不到可以下笔的材料。换一个时事性强一点的主题，或者把词组放宽一些。",
      "fl.demo.blocked.title": "查证把这一篇挡下来了。",
      "fl.demo.blocked.body": "稿子里出现了来源撑不住的说法，重写两次之后仍然没有收回到来源范围内，所以没有发布。这是防线正常运作，不是系统坏了。换个角度，或者用更明确的关键字再试一次。",
      "fl.demo.blocked.claims": "无法查证的说法",
      "fl.demo.limit.title": "已达使用次数上限。",
      "fl.demo.limit.body": "这个demo有次数限制，用来控制实际的运行成本。请稍后再试。",
      "fl.demo.error.title": "出了点问题。",
      "fl.demo.error.body": "这次执行没有完成。请稍后再试一次；如果一直这样，欢迎发邮件到info@miloop.ai告诉我们。",
      "fl.demo.error.timeout": "这次执行的时间超过预期，已经中止。通常是服务器还在启动，请再试一次。"
    },

    "zh-Hant": {
      "fl.meta.title": "FactLoop Newsroom｜Miloop AI",
      "fl.meta.description": "一套多智能體新聞編輯室，把任何語言的關鍵字變成經過查證、有來源可循的報導，查不出來的就不發。歡迎實際試跑。",
      "fl.back": "返回首頁",
      "fl.hero.eyebrow": "作品案例",
      "fl.hero.title.pre": "一個會",
      "fl.hero.title.em": "自我查證",
      "fl.hero.title.post": "的新聞編輯室。",
      "fl.hero.lede": "FactLoop Newsroom接受任何語言的主題，回傳一篇用同樣語言寫成的報導，內容只來自它能指給您看的來源。如果它沒辦法查證自己剛寫下的東西，它就什麼都不發。這一頁往下拉，您可以自己跑一次。",
      "fl.spec.role": "角色",
      "fl.spec.role.value": "設計、開發與部署",
      "fl.spec.stack": "技術組成",
      "fl.spec.stack.value": "LangGraph、FastAPI、MCP，三家供應商的五個模型",
      "fl.spec.langs": "語言",
      "fl.spec.langs.value": "您用什麼語言問，就用什麼語言回",
      "fl.problem.eyebrow": "問題在哪",
      "fl.problem.title": "AI寫得快，但那從來不是難的部分。",
      "fl.problem.body": "把一個新聞主題丟給語言模型，幾秒鐘內就會拿到一篇乾淨俐落的稿子。其中有些是真的，其餘的讀起來一模一樣。對於趕截止時間的人來說，這不是省下時間，而是把風險轉嫁給最後讀到的那個人。所以真正值得解決的問題，不是怎麼讓AI寫得更快，而是怎麼在東西發出去之前，就知道哪幾句話真的有依據。",
      "fl.how.eyebrow": "運作方式",
      "fl.how.title": "五個階段，其中一個有權說不。",
      "fl.how.lede": "每個階段只做一件事，然後把結果交給下一棒。整套系統的安排，就是要讓負責寫稿的那一段，永遠不是最後拍板的人。",
      "fl.stage1.name": "蒐集",
      "fl.stage1.body": "只搜尋近期新聞，先看最近兩天，需要更多素材時才往回延伸，最多一週。每一條留下來的事實，都綁著它出自的那篇報導。",
      "fl.stage2.name": "轉換語言",
      "fl.stage2.body": "當來源不是您提問的語言時，事實會被轉換過來，讓寫稿這一段能用母語進行。原文完整保留，不動。",
      "fl.stage3.name": "撰稿",
      "fl.stage3.body": "只根據蒐集到的事實寫稿，其他一概不用。不引入外部知識，也不用聽起來合理的話填補空缺。",
      "fl.stage4.name": "查證",
      "fl.stage4.body": "拿寫好的稿子逐條比對原始來源。任何來源撐不住的說法，都退回撰稿階段。",
      "fl.stage5.name": "發布",
      "fl.stage5.body": "把成稿整理成搜尋引擎和AI助理讀得懂的形式，過程中不新增任何內容。",
      "fl.stage.retry": "撰稿階段有兩次機會，修正查證挑出來的問題。如果第三版仍然站不住腳，整次執行就此打住，什麼都不發布。您在下面的demo裡很可能會遇到這種情況。",
      "fl.principle.eyebrow": "設計取捨",
      "fl.principle.title": "三個決定了成敗的選擇。",
      "fl.principle1.title": "蒐集事實的那一步，刻意不放AI",
      "fl.principle1.body": "其他每個階段都用模型，唯獨這一步沒有，而且是刻意的。如果讓模型坐在搜尋結果和事實記錄之間，它可能會概括、會潤飾，或者悄悄漏掉一個細節，那麼後面所有的查證，比對的都是一份已經出錯的記錄。",
      "fl.principle2.title": "翻譯碰不到證據",
      "fl.principle2.body": "當來源的語言和您提問的語言不同時，查證比對的仍然是原文來源，而不是翻譯過的版本。這樣一來，翻譯上的閃失不會變成掩護造假的藉口，也不會被誤認成造假。",
      "fl.principle3.title": "什麼都不發，也是一種正確結果",
      "fl.principle3.body": "多數系統把查證失敗當成需要繞過去的障礙。在這裡，它是產品照著設計在運作。一次停下來、並且明確告訴您哪些說法它撐不住的執行，價值高過一次悄悄把它們印出來、讓您日後自己發現的執行。",
      "fl.demo.eyebrow": "實際試試",
      "fl.demo.title": "跑一次這個編輯室。",
      "fl.demo.lede": "用任何語言輸入一個主題。您會拿回一篇同樣語言的報導，每個來源都列出來、可以點開；或者拿到一個誠實的說明，告訴您這次為什麼沒有稿子。",
      "fl.demo.label": "主題",
      "fl.demo.placeholder": "例如：沿海潮汐發電",
      "fl.demo.hint": "講得具體一點。一個明確的詞組，找到的來源會比單一個籠統的詞好。",
      "fl.demo.note": "這個demo每次執行都會實際搜尋新聞，並調用好幾個AI模型，因此有使用次數限制。請試個兩三個主題就好，不必一口氣試十幾個。",
      "fl.demo.submit": "開始執行",
      "fl.demo.running": "執行中…",
      "fl.demo.loading.start": "正在啟動。",
      "fl.demo.loading.waking": "這個demo的伺服器閒置時會休眠，喚醒大約需要一分鐘，所以當天第一次執行會特別慢。這不是出錯。",
      "fl.demo.loading.working": "伺服器已就緒，正在搜尋新聞、撰稿、查證。好幾個模型依序接力，這一段通常需要幾分鐘。",
      "fl.demo.loading.long": "還在跑。跑得比較久，通常代表查證把稿子退回去重寫了。",
      "fl.demo.elapsed": "已耗時 {n} 秒",
      "fl.demo.result.eyebrow": "結果",
      "fl.demo.result.language": "判定語言",
      "fl.demo.result.coverage": "來源涵蓋範圍",
      "fl.demo.result.coverage.value": "近 {n} 天",
      "fl.demo.result.sources": "來源",
      "fl.demo.result.meta.summary": "查看 GEO/SEO 中繼資料",
      "fl.demo.result.keywords": "SEO 關鍵字",
      "fl.demo.result.metadesc": "Meta 描述",
      "fl.demo.empty.title": "這個主題近期沒有新聞。",
      "fl.demo.empty.body": "搜尋範圍只涵蓋最近一週，所以近期沒有被報導過的主題，找不到可以下筆的材料。換一個時事性強一點的主題，或者把詞組放寬一些。",
      "fl.demo.blocked.title": "查證把這一篇擋下來了。",
      "fl.demo.blocked.body": "稿子裡出現了來源撐不住的說法，重寫兩次之後仍然沒有收回到來源範圍內，所以沒有發布。這是防線正常運作，不是系統壞了。換個角度，或者用更明確的關鍵字再試一次。",
      "fl.demo.blocked.claims": "無法查證的說法",
      "fl.demo.limit.title": "已達使用次數上限。",
      "fl.demo.limit.body": "這個demo有次數限制，用來控制實際的執行成本。請稍後再試。",
      "fl.demo.error.title": "出了點問題。",
      "fl.demo.error.body": "這次執行沒有完成。請稍後再試一次；如果一直這樣，歡迎寄郵件到info@miloop.ai告訴我們。",
      "fl.demo.error.timeout": "這次執行的時間超過預期，已經中止。通常是伺服器還在啟動，請再試一次。"
    }
  };

  var form = document.getElementById("factloop-form");
  var input = document.getElementById("factloop-keyword");
  var submitButton = document.getElementById("factloop-submit");
  var statusEl = document.getElementById("factloop-status");
  var resultEl = document.getElementById("factloop-result");

  var currentLang = null;
  /* The outcome currently on screen, kept so a language change can redraw
     the labels around it without re-running the pipeline. */
  var lastOutcome = null;
  var isRunning = false;
  var loadingTimer = null;
  var loadingStartedAt = 0;

  function t(key) {
    var entries = DICT[currentLang] || DICT.en;
    return entries[key] !== undefined ? entries[key] : DICT.en[key];
  }

  /* main.js has no interpolation of its own because nothing on the other
     pages needs it. Two strings here have to place a number inside a
     sentence whose word order differs by language, so the count travels in
     the copy as {n} rather than being concatenated on in English order. */
  function withCount(key, count) {
    return t(key).replace("{n}", String(count));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ==========================================================================
     Language
     ========================================================================== */

  function applyLang(lang) {
    if (!DICT[lang]) lang = "en";
    currentLang = lang;

    /* main.js sets the title and meta description from its own dictionary,
       which has no entry for this page, so it writes the homepage values
       here. Its applyLang is fully synchronous and the observer below runs
       as a microtask afterwards, so restoring them at this point wins. */
    document.title = t("fl.meta.title");
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("fl.meta.description"));

    document.querySelectorAll("[data-fl-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-fl-i18n"));
    });
    document.querySelectorAll("[data-fl-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-fl-i18n-html"));
    });
    document.querySelectorAll("[data-fl-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-fl-i18n-placeholder")));
    });

    if (isRunning) {
      submitButton.textContent = t("fl.demo.running");
      paintLoading();
    }
    /* The article itself stays in the language it was generated in. Only the
       labels around it belong to the interface. */
    if (lastOutcome) paintOutcome(lastOutcome);
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

  /* Names the detected language in whichever language the page is currently
     showing, since the API reports it as a bare ISO 639-1 code. */
  function languageName(code) {
    if (!code) return null;
    try {
      var names = new Intl.DisplayNames([currentLang], { type: "language" });
      return names.of(code) || code;
    } catch (error) {
      return code;
    }
  }

  /* ==========================================================================
     Loading state
     ========================================================================== */

  function paintLoading() {
    var elapsedMs = Date.now() - loadingStartedAt;
    var message = LOADING_STAGES[0];
    LOADING_STAGES.forEach(function (stage) {
      if (elapsedMs >= stage.after) message = stage;
    });

    statusEl.innerHTML =
      '<p class="factloop-demo__status-text">' + escapeHtml(t(message.key)) + "</p>" +
      '<div class="factloop-demo__bar" aria-hidden="true"></div>' +
      '<span class="factloop-demo__elapsed">' +
      escapeHtml(withCount("fl.demo.elapsed", Math.floor(elapsedMs / 1000))) +
      "</span>";
  }

  function startLoading() {
    loadingStartedAt = Date.now();
    statusEl.hidden = false;
    paintLoading();
    loadingTimer = setInterval(paintLoading, 1000);
  }

  function stopLoading() {
    clearInterval(loadingTimer);
    loadingTimer = null;
    statusEl.hidden = true;
    statusEl.innerHTML = "";
  }

  /* ==========================================================================
     Rendering the article
     ========================================================================== */

  /* Only links the service can be trusted to have produced. A source URL
     that is malformed, or that carries a scheme like javascript:, is shown
     as plain text instead of becoming a live link in the page. */
  function safeUrl(value) {
    try {
      var parsed = new URL(value);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.href;
    } catch (error) {
      return null;
    }
    return null;
  }

  /* The body comes back as Markdown whose sections open with '## '. This
     site has no build step and no dependencies, so rather than add a
     Markdown library it handles only what the service is asked to emit:
     headings, bullet lists, and blank-line separated paragraphs. Everything
     is escaped first, so any other Markdown the model happens to write is
     shown as the literal characters rather than interpreted. */
  function renderMarkdown(markdown) {
    var html = "";
    var paragraph = [];
    var list = [];

    function flushParagraph() {
      if (!paragraph.length) return;
      html += "<p>" + inline(paragraph.join(" ")) + "</p>";
      paragraph = [];
    }

    function flushList() {
      if (!list.length) return;
      html += "<ul>" + list.map(function (item) {
        return "<li>" + inline(item) + "</li>";
      }).join("") + "</ul>";
      list = [];
    }

    /* Line by line rather than splitting on blank lines: a heading is not
       always followed by one, and treating "## Heading\nText" as a single
       block would silently discard the text under it. */
    String(markdown).split("\n").forEach(function (rawLine) {
      var line = rawLine.trim();
      if (!line) {
        flushParagraph();
        flushList();
        return;
      }

      var heading = line.match(/^#{1,6}\s+(.*)$/);
      if (heading) {
        flushParagraph();
        flushList();
        html += "<h3>" + inline(heading[1]) + "</h3>";
        return;
      }

      var bullet = line.match(/^[-*]\s+(.*)$/);
      if (bullet) {
        flushParagraph();
        list.push(bullet[1]);
        return;
      }

      flushList();
      paragraph.push(line);
    });

    flushParagraph();
    flushList();
    return html;
  }

  function inline(text) {
    return escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  function factsHtml(data) {
    var facts = [];
    var language = languageName(data.language);
    if (language) {
      facts.push([t("fl.demo.result.language"), language]);
    }
    if (data.coverage_days) {
      facts.push([t("fl.demo.result.coverage"), withCount("fl.demo.result.coverage.value", data.coverage_days)]);
    }
    if (!facts.length) return "";

    return '<ul class="factloop-demo__facts">' + facts.map(function (pair) {
      return "<li>" + escapeHtml(pair[0]) + " <strong>" + escapeHtml(pair[1]) + "</strong></li>";
    }).join("") + "</ul>";
  }

  function sourcesHtml(sources) {
    if (!Array.isArray(sources) || !sources.length) return "";

    var items = sources.map(function (source, index) {
      var number = '<span class="factloop-demo__source-num">' + String(index + 1).padStart(2, "0") + "</span>";
      var title = escapeHtml(source.title || source.url || "");
      var url = safeUrl(source.url);
      var link = url
        ? '<a class="factloop-demo__source-link" href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' + title + "</a>"
        : '<span class="factloop-demo__source-link">' + title + "</span>";
      return "<li>" + number + link + "</li>";
    }).join("");

    return '<p class="factloop-demo__sources-title">' + escapeHtml(t("fl.demo.result.sources")) + "</p>" +
      '<ul class="factloop-demo__sources">' + items + "</ul>";
  }

  /* The GEO stage's own output. Collapsed by default: it is evidence that
     the last stage ran, not something a visitor reading the article needs. */
  function metadataHtml(article) {
    var blocks = "";

    if (article.meta_description) {
      blocks += '<p class="factloop-demo__meta-label">' + escapeHtml(t("fl.demo.result.metadesc")) + "</p>" +
        '<p class="factloop-demo__meta-value">' + escapeHtml(article.meta_description) + "</p>";
    }
    if (Array.isArray(article.seo_keywords) && article.seo_keywords.length) {
      blocks += '<p class="factloop-demo__meta-label">' + escapeHtml(t("fl.demo.result.keywords")) + "</p>" +
        '<ul class="factloop-demo__keywords">' + article.seo_keywords.map(function (keyword) {
          return "<li>" + escapeHtml(keyword) + "</li>";
        }).join("") + "</ul>";
    }
    if (!blocks) return "";

    return '<details class="factloop-demo__meta">' +
      "<summary>" + escapeHtml(t("fl.demo.result.meta.summary")) + "</summary>" +
      '<div class="factloop-demo__meta-body">' + blocks + "</div>" +
      "</details>";
  }

  function articleHtml(data) {
    var article = data.article || {};
    return '<span class="factloop-demo__result-eyebrow">' + escapeHtml(t("fl.demo.result.eyebrow")) + "</span>" +
      '<h3 class="factloop-demo__article-title">' + escapeHtml(article.title || "") + "</h3>" +
      factsHtml(data) +
      '<div class="factloop-demo__body">' + renderMarkdown(article.body || "") + "</div>" +
      sourcesHtml(data.sources) +
      metadataHtml(article);
  }

  /* A blocked run and an empty search are outcomes, not faults, so they use
     the same panel as an article and differ only by accent. */
  function outcomeHtml(titleKey, bodyKey, modifier, claims) {
    var html = '<div class="factloop-demo__outcome' + (modifier ? " factloop-demo__outcome--" + modifier : "") + '">' +
      '<p class="factloop-demo__outcome-title">' + escapeHtml(t(titleKey)) + "</p>" +
      '<p class="factloop-demo__outcome-body">' + escapeHtml(t(bodyKey)) + "</p>";

    if (Array.isArray(claims) && claims.length) {
      html += '<p class="factloop-demo__claims-title">' + escapeHtml(t("fl.demo.blocked.claims")) + "</p>" +
        '<ul class="factloop-demo__claims">' + claims.map(function (claim) {
          return "<li>" + escapeHtml(claim) + "</li>";
        }).join("") + "</ul>";
    }

    return html + "</div>";
  }

  function paintOutcome(outcome) {
    lastOutcome = outcome;

    if (outcome.kind === "article") {
      resultEl.innerHTML = articleHtml(outcome.data);
    } else if (outcome.kind === "no_results") {
      resultEl.innerHTML = outcomeHtml("fl.demo.empty.title", "fl.demo.empty.body", null);
    } else if (outcome.kind === "qc_blocked") {
      resultEl.innerHTML = outcomeHtml("fl.demo.blocked.title", "fl.demo.blocked.body", "verified", outcome.claims);
    } else if (outcome.kind === "rate_limited") {
      resultEl.innerHTML = outcomeHtml("fl.demo.limit.title", "fl.demo.limit.body", null);
    } else if (outcome.kind === "timeout") {
      resultEl.innerHTML = outcomeHtml("fl.demo.error.title", "fl.demo.error.timeout", "failed");
    } else {
      resultEl.innerHTML = outcomeHtml("fl.demo.error.title", "fl.demo.error.body", "failed");
    }
  }

  /* ==========================================================================
     Running the demo
     ========================================================================== */

  function validate() {
    submitButton.disabled = isRunning || !input.value.trim();
  }

  async function run(keyword) {
    isRunning = true;
    validate();
    submitButton.textContent = t("fl.demo.running");
    lastOutcome = null;
    resultEl.innerHTML = "";
    startLoading();

    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS);

    try {
      var response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword }),
        signal: controller.signal
      });

      if (response.status === 429) {
        paintOutcome({ kind: "rate_limited" });
        return;
      }
      if (!response.ok) throw new Error("Request failed with status " + response.status);

      var data = await response.json();

      if (data.status === "no_results") {
        paintOutcome({ kind: "no_results" });
      } else if (data.status === "qc_blocked") {
        paintOutcome({ kind: "qc_blocked", claims: data.unverified_claims });
      } else if (data.status === "ok" && data.article) {
        paintOutcome({ kind: "article", data: data });
      } else {
        /* A 200 in a shape this page does not know how to draw. Treated as a
           failure rather than rendered half-empty. */
        throw new Error("Unrecognised response shape");
      }
    } catch (error) {
      /* Nothing from the exception reaches the page. A cross-origin failure
         and a server fault are indistinguishable to fetch, and neither
         phrasing would help a visitor. */
      paintOutcome({ kind: error.name === "AbortError" ? "timeout" : "error" });
    } finally {
      clearTimeout(timeout);
      stopLoading();
      isRunning = false;
      submitButton.textContent = t("fl.demo.submit");
      validate();
    }
  }

  input.addEventListener("input", validate);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var keyword = input.value.trim().slice(0, MAX_KEYWORD_LENGTH);
    if (!keyword || isRunning) return;
    run(keyword);
  });

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(document.documentElement.getAttribute("lang"));
    validate();
  });
})();
