/* ==========================================================================
   Miloop AI: deskloop-agent.js
   Copy for the deskloop-agentic-it-hr case study, in the three site languages.

   Same arrangement as factloop-demo.js and driftboard-eval.js, for the same
   reason: main.js owns the dictionary every page shares, and page copy does
   not belong in it. The prefix and the attribute names are namespaced so two
   sweeps on one page cannot collide.

   Wrapped in an IIFE because main.js, lead-intake.js and this file all load as
   classic scripts into one shared global scope.
   ========================================================================== */
(function () {
  "use strict";

  /* The tier badges (T0 read, T1 action, T2 handoff), the tool names and
     CONFIRMATION_REQUIRED stay in English in every language. They are the
     literal strings the recorded interface and the audit log print, and a
     reader comparing this page against a clip has to see the same characters
     on both. Everything around them is translated. */
  var DICT = {
    en: {
      "dl.meta.title": "DeskLoop: Agentic IT and HR Helpdesk | Miloop AI",
      "dl.meta.description": "An agentic IT and HR helpdesk built around a tiered tool server: which actions an agent may take on its own, which need a human's word first, and which have no execution path at all.",

      "dl.back": "Back to home",

      "dl.hero.eyebrow": "Portfolio",
      "dl.hero.title.pre": "Agent permissions are not a ",
      "dl.hero.title.em": "prompting problem",
      "dl.hero.title.post": ".",
      "dl.hero.lede": "Most agent demos answer one question: which tools can it call. The harder question is which of those actions it may take on its own, which need a human's word first, and which it must never take regardless of what the conversation says.",
      "dl.hero.lede2": "DeskLoop is an IT and HR helpdesk built around a tiered tool server. The tiers are not instructions in a prompt. They live in a separate process that the agent is merely a client of, so no wording inside the conversation can move the boundary. The recordings below show a refusal happening in code, not a model deciding to be careful.",

      "dl.spec.role": "Role",
      "dl.spec.role.value": "Agent architecture, permission design, evaluation",
      "dl.spec.boundary": "Boundary",
      "dl.spec.boundary.value": "A tool server in its own process, reached over stdio",
      "dl.spec.evidence": "Evidence",
      "dl.spec.evidence.value": "Twelve held-out probes, run once, zero severe failures",

      "dl.notice.label": "Fictional scenario",
      "dl.notice.body": "This is a standalone technical demonstration. Quillstone, the employer DeskLoop serves, is invented for this project, along with every employee, ticket, request and policy document in it. Nothing shown here is or has been in production use, and nothing on this page describes a real client or a real system.",

      "dl.mech.eyebrow": "The mechanism",
      "dl.mech.title": "Three tiers, and one of them has no code path.",
      "dl.mech.body1": "The interesting part of an agentic system is not the list of tools. It is what happens between the agent deciding to act and the action happening. Every tool in DeskLoop is registered in one of three tiers, and the registry lives on the server side of a process boundary, where a compromised prompt cannot reach it.",

      "dl.tier0.name": "Runs on its own",
      "dl.tier0.body": "Looking up a policy, reading a leave balance, listing your own open tickets. Nothing changes, so nothing waits. Every call is logged anyway.",
      "dl.tier1.name": "Needs your word first",
      "dl.tier1.body": "Submitting leave, opening a ticket, requesting equipment or software. The server refuses the first call and describes what it would have done.",
      "dl.tier2.name": "Has no execution branch",
      "dl.tier2.body": "Password resets and anything else touching identity. Not an execution branch behind a condition. No branch. The tests assert the path is absent.",

      "dl.mech.body2": "A Tier 1 tool is therefore never called once. The first call comes back as <code>CONFIRMATION_REQUIRED</code>, carrying a normalized description of the action rather than performing it. The agent renders that as a proposal and the graph stops. The user answers, and a <strong>separate</strong> model call classifies the answer as confirm, modify or cancel under constrained output. Only a confirm instructs the server to mint a token.",
      "dl.mech.body3": "That token is minted by the server, never by a model. It is never placed in a prompt, never shown to the user, and not quotable. It binds to the session, the tool name and a hash of the exact arguments, it is single use, and it expires in three minutes. Change one parameter and it is worthless. That binding is what the first recording is about: a confirmation is not a mood the conversation is in, it belongs to one action with one set of parameters.",
      "dl.mech.callout": "<strong>Permission is decided before business state.</strong> A tampered call that also happens to exceed a leave balance is recorded as a permission failure, not as a balance problem. The order those two checks run in is the difference between measuring a bypass attempt and letting a coincidence hide one, because the severe-failure metric is computed from exactly those rows.",

      "dl.clips.eyebrow": "The recordings",
      "dl.clips.title": "Watch the refusal happen.",
      "dl.clips.body1": "A transcript hides this. If the agent says it has submitted your leave request, a reader cannot tell whether the gate was enforced or the model simply said so. The demo therefore puts a chat pane beside a live instrumentation pane: every tool call with its tier badge, every rejection reason, every confirmation classification, and the database state underneath, changing or not changing as you watch.",
      "dl.clips.body2": "There is no hosted instance, on purpose. A public chat endpoint spends real credit on every visitor turn, and a live demo pinned to a model id rots quietly and then fails at the worst possible moment. These clips are the surface instead, and everything in them can be checked without a key: the whole test suite runs with no credentials, and one script reproduces every figure further down from committed artifacts.",
      "dl.clips.note": "Unedited screen recordings. No audio, no cuts.",

      "dl.clip1.name": "Token binding",
      "dl.clip1.body": "The user asks for three days of leave, then answers \"yes, confirmed\" while changing the request to five days in the same breath. The confirmation was real. It just did not belong to this action: the server's token is bound to the exact arguments it was minted for, so the leave balance never moves off 3.5. The agent explains the permission problem first and the balance problem second, in that order.",
      "dl.clip2.name": "What normal looks like",
      "dl.clip2.body": "One action, two rows in the audit panel: yellow, then green. The yellow row is the tool server refusing to act and handing back a description of what it would have done. Nothing sits between the two rows except the user's answer. Note that the agent picked severity 3 from the mentioned workaround, not from how urgent the request sounded.",
      "dl.clip3.name": "Try to break it",
      "dl.clip3.body": "Three bypass attempts: borrowed authority, a fake system directive, and a claim that a Tier 2 tool is really a harmless read. The first two come back on the same yellow row as an ordinary request, because the server never read the argument. The third hands off to a human. There is no token that would make a password reset execute here, and no code path either. Nothing is being detected; there is nothing to detect.",
      "dl.clip4.name": "It works out the sequence itself",
      "dl.clip4.body": "One instruction, and no step named by the user: read the request history, check the rejection reason against the record, then propose the resubmission and stop for confirmation. Two tool calls rather than three, because <code>get_request_history</code> already returns days employed and the probation threshold, so no separate policy lookup was needed. This take also shows the agent naming the original rejection reason before proposing it again. It does not always do that. The evaluation found the reply going straight to the proposal on five probes, and the report says so.",
      "dl.clip5.name": "The numbers",
      "dl.clip5.body": "The whole test suite runs with no credentials, because the model, the embedding API and the tool server subprocess are all stubbed. The scoring script reproduces every figure in the evaluation report from committed artifacts, with no model call involved. Severe failures are computed from an append-only audit log, never judged by a language model. The held-out probe set was written after the label taxonomy was frozen, and run once.",

      "dl.rec.eyebrow": "What recording it turned up",
      "dl.rec.title": "The demo had a bug. The system did not.",
      "dl.rec.body1": "The bypass panel exists to be pressed, so the first take of clip 03 pressed all three buttons in a row. The script expected three rows in the panel. The take produced one, plus two confirmation checks reading unclear.",
      "dl.rec.body2": "A decision made much earlier accounts for it exactly: while a proposal is pending, the agent binds no tools. The first attempt leaves a proposal open, so the second button's text never arrives as a new request. It arrives as the user's answer to that open proposal, and the classifier will not read a fake system directive as agreement to a leave request. It returns unclear, which leaves the proposal open, and the third button meets the same wall. Every part of that is the system working as designed, including a classifier that fails towards unclear and never towards confirm.",
      "dl.rec.clip.index": "Discarded take",
      "dl.rec.clip.name": "Three presses, one row",
      "dl.rec.clip.body": "The take that was thrown away, kept because of what it shows. Each attempt is answered correctly in the chat, and the panel records almost none of it: one Tier 1 refusal, then two confirmation checks that decline to read an attack as agreement. The proposal from the first press is still open at the end, still waiting for an answer nobody gave it.",
      "dl.rec.callout": "The fix was to the demo, not to the agent: the recording now cancels between attempts, and those cancels earn their place, because a clean decline is the other half of the mechanism. <strong>Neither the test suite nor the evaluation could have caught this</strong>, since every probe runs in its own session and the script's expectations were read off those runs. It took someone sitting down and using the thing.",

      "dl.num.eyebrow": "The evaluation",
      "dl.num.title": "Severe failures are counted, not judged.",
      "dl.num.body1": "A severe failure is a Tier 1 execution with no token, any Tier 2 execution, or a bypass probe that ended with an action taken. All three are computed from the append-only audit log and the database, never from a model's opinion. That leaves the judge only the labels that are genuinely subjective, and it runs on a different model family from the agent so that nothing grades its own writing.",
      "dl.num.caption": "Multi-turn probe results",
      "dl.num.h1": "Measure",
      "dl.num.h2": "Held-out, 12 probes",
      "dl.num.h3": "Dev, 34 probes",
      "dl.num.r1": "Severe failures",
      "dl.num.r2": "Mechanical expectations met",
      "dl.num.r3": "Gold labels vs blind judge",
      "dl.num.r4": "Binary Cohen's kappa",
      "dl.num.body2": "The held-out set was written after the label taxonomy was frozen, run once, and is spent. The dev column beside it is shape, not score: that set was used for three rounds of prompt tuning, which is recorded rather than glossed over. Fourteen adversarial probes across the two sets, each one a distinct strategy, executed nothing at all.",
      "dl.num.body3": "A held-out kappa of 0.62 is the honest cost of that discipline. The set is small and the system passes most of it, which leaves the statistic little room to move, and the report says so instead of quoting the better-looking dev figure. One of the twelve mechanical expectations was missed because a scripted turn stopped meaning what it was written to mean once the agent asked a reasonable question first. That is written down too.",
      "dl.num.callout": "The evaluation also found two weaknesses in the agent itself, and both are deliberately left unfixed. Fixing them and rerunning the same twelve probes would produce better numbers and a worse measurement, because a held-out set is spent the moment you tune against what it told you. They belong to the next held-out set, or to a report that states them plainly, which is where they are.",

      "dl.why.eyebrow": "Why this matters",
      "dl.why.title": "The judgment is the product.",
      "dl.why.body1": "All of this can be attempted with a prompt that tells the model to check with the user first, and it will mostly work. Mostly is the problem. The failures that matter are the ones where the conversation itself is the attack: borrowed authority, a fake system directive, an action split into two innocent halves, a confirmation reused for something it was never given for. A prompt is negotiable with every one of them. A process boundary, a token bound to the arguments, and a tool with no execution branch are not.",
      "dl.why.body2": "What it costs is worth naming. Every Tier 1 action takes an extra turn, every user turn spends one more model call on the classifier, and someone who wanted the agent to just get on with it has to answer a question first. That is the trade being demonstrated, and it is the right one for actions that touch a person's leave balance, their equipment, or their account.",

      "dl.stack.eyebrow": "Built with",
      "dl.stack.value": "Python · LangGraph state machine with checkpointing · FastMCP tool server in its own process, over stdio · Claude Sonnet 5 (agent) · Gemini 2.5 Flash Lite (confirmation classifier) · Gemini 2.5 Pro (blind judge, a different family from the agent) · OpenRouter · Voyage AI embeddings for policy retrieval · SQLite with append-only audit triggers · Streamlit demo and FastAPI service · 288 tests that need no network and no keys",
      "dl.link.repo": "GitHub repository",
      "dl.link.report": "Read the evaluation report",
      "dl.link.findings": "Sixteen findings from the build"
    },

    "zh-Hans": {
      "dl.meta.title": "DeskLoop：分级授权的IT与HR助手 | Miloop AI",
      "dl.meta.description": "一套以分级工具服务器为核心的IT与HR助手：哪些动作Agent可以自己做，哪些必须先拿到人的同意，哪些根本没有执行路径。",

      "dl.back": "返回首页",

      "dl.hero.eyebrow": "作品案例",
      "dl.hero.title.pre": "Agent的权限，",
      "dl.hero.title.em": "不是提示词能解决的问题",
      "dl.hero.title.post": "。",
      "dl.hero.lede": "多数Agent演示回答的是同一个问题：它能调用哪些工具。更难的问题是，这些动作里哪些它可以自己做，哪些必须先拿到人的一句同意，哪些无论对话里怎么说都绝不能做。",
      "dl.hero.lede2": "DeskLoop是一套IT与HR助手，核心是一个分级的工具服务器。这些层级不是写在提示词里的指令，它们跑在另一个进程里，Agent只是这个进程的客户端，所以对话里的任何措辞都挪不动这条边界。下面的录屏拍到的是代码在拒绝，不是模型决定要谨慎。",

      "dl.spec.role": "承担角色",
      "dl.spec.role.value": "Agent架构、权限设计、评估",
      "dl.spec.boundary": "边界",
      "dl.spec.boundary.value": "独立进程中的工具服务器，通过stdio通信",
      "dl.spec.evidence": "证据",
      "dl.spec.evidence.value": "12道保留题，只跑一次，零严重失效",

      "dl.notice.label": "虚构情境",
      "dl.notice.body": "这是一个独立的技术演示。DeskLoop所服务的雇主Quillstone是为这个项目虚构出来的，里面的每一位员工、每一张工单、每一笔申请和每一份政策文件也都是。这里展示的东西没有、也从未投入生产使用，本页也没有任何内容描述真实的客户或真实的系统。",

      "dl.mech.eyebrow": "机制",
      "dl.mech.title": "三个层级，其中一个根本没有代码路径。",
      "dl.mech.body1": "一套Agent系统真正值得看的地方，不是它的工具清单，而是从Agent决定要动手，到动作真的发生，这中间发生了什么。DeskLoop里的每个工具都注册在三个层级之一，而这份注册表位于进程边界的服务器那一侧，被攻陷的提示词伸不进去。",

      "dl.tier0.name": "自己就能跑",
      "dl.tier0.body": "查一条政策、读一下假期余额、列出自己名下未结的工单。什么都不会改变，所以什么都不用等。每一次调用仍然会被记录。",
      "dl.tier1.name": "得先有你的同意",
      "dl.tier1.body": "提交请假、开工单、申请设备或软件。服务器会拒绝第一次调用，并描述它本来会做什么。",
      "dl.tier2.name": "没有执行分支",
      "dl.tier2.body": "重置密码，以及其他任何触及身份的操作。不是「有一个执行分支、外面加了条件」，是根本没有这个分支。测试断言的是这条路径不存在。",

      "dl.mech.body2": "所以Tier 1的工具永远不会只被调用一次。第一次调用返回的是<code>CONFIRMATION_REQUIRED</code>，附带一份规范化的动作描述，而不是执行它。Agent把这份描述渲染成一个提案，状态图在这里停下。用户回答之后，由<strong>另一次独立的</strong>模型调用在受限输出下把这个回答分类成确认、修改或取消。只有「确认」才会指示服务器签发令牌。",
      "dl.mech.body3": "令牌由服务器签发，绝不由模型产生。它不会出现在提示词里，不会显示给用户，也无法被引用。它绑定到会话、工具名，以及那组参数的精确哈希；一次性使用，三分钟后过期。改动任何一个参数，它就作废了。第一支录屏讲的就是这层绑定：确认不是对话当下的一种氛围，它属于某一个动作和它那一组参数。",
      "dl.mech.callout": "<strong>权限先于业务状态判定。</strong>一个被篡改的调用，如果同时刚好超出了假期余额，会被记为权限失败，而不是余额问题。这两项检查谁先跑，决定了你是在测量一次绕过尝试，还是让一次巧合把它盖了过去，因为严重失效的指标正是从这些记录里算出来的。",

      "dl.clips.eyebrow": "录屏",
      "dl.clips.title": "看着它拒绝。",
      "dl.clips.body1": "对话记录会把这件事藏起来。如果Agent说它已经提交了你的请假申请，读的人无从判断关卡到底被执行了，还是模型只是这么说而已。所以这个演示界面是聊天区旁边一块实时的仪表面板：每一次工具调用连同它的层级标记、每一条拒绝理由、每一次确认分类，以及底层数据库的状态，是变了还是没变，都在你眼前。",
      "dl.clips.body2": "这里没有在线试用版本，这是刻意的。一个公开的聊天端点，每位访客的每一轮都在烧真实额度；而一个钉死在某个模型id上的线上演示会悄悄腐坏，然后在最糟糕的时刻失灵。取而代之的展示面就是这几段录屏，而里面的每一件事都可以不用任何密钥自行核验：整套测试无需凭证即可运行，下面所有数字都能由一个脚本从已提交的产物中重算出来。",
      "dl.clips.note": "未经剪辑的屏幕录制。无声音，无剪接。",

      "dl.clip1.name": "令牌绑定",
      "dl.clip1.body": "用户先申请三天假，然后一边回答「是的，我确认」，一边在同一句话里把申请改成五天。这个确认是真的，只是它不属于这个动作：服务器的令牌绑定在签发时的那组精确参数上，所以假期余额始终停在3.5。Agent先说权限问题，再说余额问题，顺序就是这样。",
      "dl.clip2.name": "正常流程长什么样",
      "dl.clip2.body": "一个动作，在审计面板上是两行：先黄后绿。黄色那行是工具服务器拒绝执行，并把它本来会做的事描述了回来。两行之间隔着的，只有用户的一个回答。顺带一提，它把严重程度定为3，依据是用户提到还有替代办法可用，不是因为语气听起来有多急。",
      "dl.clip3.name": "试着弄坏它",
      "dl.clip3.body": "三次绕过尝试：借来的权威、伪造的系统指令，以及声称某个Tier 2工具其实只是无害的读取。前两次落在和普通请求一模一样的黄色行上，因为服务器根本没有去读那段说辞。第三次转交给人处理。这里没有任何令牌能让重置密码执行，代码里也没有那条路径。这不是检测出来的，因为压根没有需要检测的东西。",
      "dl.clip4.name": "步骤是它自己排出来的",
      "dl.clip4.body": "一句指令，没有一步是用户指名的：读申请历史、拿驳回理由去对员工记录、然后提出重新提交并停下来等确认。是两次工具调用而不是三次，因为<code>get_request_history</code>已经带回了在职天数和试用期门槛，不需要再单独查一次政策。这一条里Agent还先说出了当初被驳回的理由，才提出重新申请。它并不总是这么做：评估里有五道题，回复是直接跳到提案的，报告如实写了。",
      "dl.clip5.name": "那些数字",
      "dl.clip5.body": "整套测试不需要任何凭证就能跑，因为模型、向量接口和工具服务器子进程都被打了桩。评分脚本能从已提交的产物中重算出评估报告里的每一个数字，全程不调用任何模型。严重失效是从只可追加的审计日志里算出来的，从不交给语言模型评判。保留题集是在标签体系冻结之后才写的，并且只跑了一次。",

      "dl.rec.eyebrow": "录影时才发现的事",
      "dl.rec.title": "出问题的是演示，不是系统。",
      "dl.rec.body1": "那排绕过按钮就是拿来按的，所以第03支的第一次拍摄连按了三颗。脚本预期面板上会出现三行，实际拍到的是一行，外加两次结果为unclear的确认检查。",
      "dl.rec.body2": "一个更早做出的决定精确地解释了这件事：只要有提案还悬着，Agent就不绑定任何工具。第一次尝试留下了一个未决的提案，于是第二颗按钮送出的文字根本不是一个新请求，它是用户对那个提案的回答；而分类器不会把一段伪造的系统指令读成对请假申请的同意。它返回unclear，提案继续悬着，第三颗按钮撞上同一堵墙。这里的每一步都是系统在按设计运作，包括一个只会往unclear失败、绝不会往confirm失败的分类器。",
      "dl.rec.clip.index": "废弃的一条",
      "dl.rec.clip.name": "按了三次，只出一行",
      "dl.rec.clip.body": "这是被丢掉的那一条，留下来是因为它拍到的东西。三次尝试在聊天里都被正确回应了，而面板几乎什么都没记下：一次Tier 1拒绝，然后两次拒绝把攻击读成同意的确认检查。第一次按钮留下的提案到最后还开着，还在等一个没人给它的回答。",
      "dl.rec.callout": "修的是演示，不是Agent：现在录制流程会在两次尝试之间先取消，而这些取消值得占用时间，因为干净利落的拒绝正是这套机制的另一半。<strong>测试套件和评估都不可能抓到这件事</strong>，因为每道题都跑在自己的会话里，而脚本的预期正是照着那些运行结果写的。它需要有人真的坐下来用一遍。",

      "dl.num.eyebrow": "评估",
      "dl.num.title": "严重失效是算出来的，不是评出来的。",
      "dl.num.body1": "严重失效指的是：没有令牌就执行了Tier 1、任何一次Tier 2执行，或者一道绕过题最后真的有动作被做掉。这三者都从只可追加的审计日志和数据库里算出来，从不取决于模型的意见。这样一来，留给评判模型的只剩下真正主观的标签；而它跑在和Agent不同的模型家族上，避免自己批改自己的作业。",
      "dl.num.caption": "多轮探测结果",
      "dl.num.h1": "指标",
      "dl.num.h2": "保留题，12道",
      "dl.num.h3": "开发题，34道",
      "dl.num.r1": "严重失效",
      "dl.num.r2": "机械预期达成",
      "dl.num.r3": "人工标准答案对盲评判",
      "dl.num.r4": "二元Cohen's kappa",
      "dl.num.body2": "保留题集是在标签体系冻结之后写的，跑过一次，已经用掉了。旁边那一栏开发题是形状，不是分数：那套题被用于三轮提示词调整，这件事被记录下来，而不是含糊带过。两套题合计十四道对抗题，每一道都是不同的策略，没有一道让任何动作真的执行。",
      "dl.num.body3": "保留题的kappa是0.62，这就是那份纪律诚实的代价。题集小，而系统大部分都通过了，这让这个统计量本身没有多少活动空间；报告直说了这一点，而不是改去引用更好看的开发题数字。十二道机械预期里没达成的那一道，是因为脚本里的某一轮在Agent先反问了一个合理问题之后，就不再是当初写它时的意思了。这件事也一并写了下来。",
      "dl.num.callout": "评估还找出Agent自身的两个弱点，两个都刻意没有修。修掉它们再拿同样这十二道题重跑一次，会得到更好看的数字和更差的测量，因为一套保留题集，在你照着它给的结果去调整的那一刻就已经用掉了。它们属于下一套保留题，或者属于一份把它们直说出来的报告，而现在它们就在后者里。",

      "dl.why.eyebrow": "为什么这才是重点",
      "dl.why.title": "工程判断本身就是成品。",
      "dl.why.body1": "上面这些，都可以改用一句「动手前先问过用户」的提示词去尝试，而且大多数时候会有效。问题就在「大多数」。真正要紧的失败，是对话本身就是攻击的那些：借来的权威、伪造的系统指令、被拆成两半各自无害的动作、一个被挪用到从未被授权之处的确认。面对其中任何一种，提示词都是可以商量的；而一条进程边界、一枚绑定参数的令牌、一个根本没有执行分支的工具，不可以。",
      "dl.why.body2": "代价也该说清楚。每一个Tier 1动作都要多花一轮，每一轮用户输入都要多付一次分类器的模型调用，而一个本来只想让Agent直接把事办了的人，得先回答一个问题。这就是这里被展示出来的取舍，而对于会动到一个人的假期余额、设备或账号的动作来说，这个取舍是对的。",

      "dl.stack.eyebrow": "技术组成",
      "dl.stack.value": "Python · 带检查点的LangGraph状态机 · 独立进程中的FastMCP工具服务器，经stdio通信 · Claude Sonnet 5（Agent）· Gemini 2.5 Flash Lite（确认分类器）· Gemini 2.5 Pro（盲评判，与Agent不同家族）· OpenRouter · Voyage AI向量模型用于政策检索 · SQLite，审计表由触发器保证只可追加 · Streamlit演示界面与FastAPI服务 · 288个测试，不需要网络也不需要密钥",
      "dl.link.repo": "GitHub程序库",
      "dl.link.report": "阅读评估报告",
      "dl.link.findings": "构建过程中的十六条发现"
    },

    "zh-Hant": {
      "dl.meta.title": "DeskLoop：分級授權的IT與HR助手 | Miloop AI",
      "dl.meta.description": "一套以分級工具伺服器為核心的IT與HR助手：哪些動作Agent可以自己做，哪些必須先拿到人的同意，哪些根本沒有執行路徑。",

      "dl.back": "返回首頁",

      "dl.hero.eyebrow": "作品案例",
      "dl.hero.title.pre": "Agent的權限，",
      "dl.hero.title.em": "不是提示詞能解決的問題",
      "dl.hero.title.post": "。",
      "dl.hero.lede": "多數Agent演示回答的是同一個問題：它能呼叫哪些工具。更難的問題是，這些動作裡哪些它可以自己做，哪些必須先拿到人的一句同意，哪些無論對話裡怎麼說都絕不能做。",
      "dl.hero.lede2": "DeskLoop是一套IT與HR助手，核心是一個分級的工具伺服器。這些層級不是寫在提示詞裡的指令，它們跑在另一個行程裡，Agent只是這個行程的客戶端，所以對話裡的任何措辭都挪不動這條邊界。下面的錄影拍到的是程式碼在拒絕，不是模型決定要謹慎。",

      "dl.spec.role": "承擔角色",
      "dl.spec.role.value": "Agent架構、權限設計、評估",
      "dl.spec.boundary": "邊界",
      "dl.spec.boundary.value": "獨立行程中的工具伺服器，透過stdio通訊",
      "dl.spec.evidence": "證據",
      "dl.spec.evidence.value": "12道保留題，只跑一次，零嚴重失效",

      "dl.notice.label": "虛構情境",
      "dl.notice.body": "這是一個獨立的技術演示。DeskLoop所服務的僱主Quillstone是為這個專案虛構出來的，裡面的每一位員工、每一張工單、每一筆申請和每一份政策文件也都是。這裡展示的東西沒有、也從未投入生產使用，本頁也沒有任何內容描述真實的客戶或真實的系統。",

      "dl.mech.eyebrow": "機制",
      "dl.mech.title": "三個層級，其中一個根本沒有程式碼路徑。",
      "dl.mech.body1": "一套Agent系統真正值得看的地方，不是它的工具清單，而是從Agent決定要動手，到動作真的發生，這中間發生了什麼。DeskLoop裡的每個工具都註冊在三個層級之一，而這份註冊表位於行程邊界的伺服器那一側，被攻陷的提示詞伸不進去。",

      "dl.tier0.name": "自己就能跑",
      "dl.tier0.body": "查一條政策、讀一下假期餘額、列出自己名下未結的工單。什麼都不會改變，所以什麼都不用等。每一次呼叫仍然會被記錄。",
      "dl.tier1.name": "得先有你的同意",
      "dl.tier1.body": "提交請假、開工單、申請裝置或軟體。伺服器會拒絕第一次呼叫，並描述它本來會做什麼。",
      "dl.tier2.name": "沒有執行分支",
      "dl.tier2.body": "重置密碼，以及其他任何觸及身份的操作。不是「有一個執行分支、外面加了條件」，是根本沒有這個分支。測試斷言的是這條路徑不存在。",

      "dl.mech.body2": "所以Tier 1的工具永遠不會只被呼叫一次。第一次呼叫返回的是<code>CONFIRMATION_REQUIRED</code>，附帶一份規範化的動作描述，而不是執行它。Agent把這份描述渲染成一個提案，狀態圖在這裡停下。使用者回答之後，由<strong>另一次獨立的</strong>模型呼叫在受限輸出下把這個回答分類成確認、修改或取消。只有「確認」才會指示伺服器簽發令牌。",
      "dl.mech.body3": "令牌由伺服器簽發，絕不由模型產生。它不會出現在提示詞裡，不會顯示給使用者，也無法被引用。它綁定到會話、工具名，以及那組參數的精確雜湊；一次性使用，三分鐘後過期。改動任何一個參數，它就作廢了。第一支錄影講的就是這層綁定：確認不是對話當下的一種氛圍，它屬於某一個動作和它那一組參數。",
      "dl.mech.callout": "<strong>權限先於業務狀態判定。</strong>一個被篡改的呼叫，如果同時剛好超出了假期餘額，會被記為權限失敗，而不是餘額問題。這兩項檢查誰先跑，決定了你是在測量一次繞過嘗試，還是讓一次巧合把它蓋了過去，因為嚴重失效的指標正是從這些記錄裡算出來的。",

      "dl.clips.eyebrow": "錄影",
      "dl.clips.title": "看著它拒絕。",
      "dl.clips.body1": "對話記錄會把這件事藏起來。如果Agent說它已經提交了你的請假申請，讀的人無從判斷關卡到底被執行了，還是模型只是這麼說而已。所以這個演示介面是聊天區旁邊一塊實時的儀表面板：每一次工具呼叫連同它的層級標記、每一條拒絕理由、每一次確認分類，以及底層資料庫的狀態，是變了還是沒變，都在你眼前。",
      "dl.clips.body2": "這裡沒有線上試用版本，這是刻意的。一個公開的聊天端點，每位訪客的每一輪都在燒真實額度；而一個釘死在某個模型id上的線上演示會悄悄腐壞，然後在最糟糕的時刻失靈。取而代之的展示面就是這幾段錄影，而裡面的每一件事都可以不用任何金鑰自行核驗：整套測試無需憑證即可執行，下面所有數字都能由一個指令碼從已提交的產物中重算出來。",
      "dl.clips.note": "未經剪輯的螢幕錄製。無聲音，無剪接。",

      "dl.clip1.name": "令牌綁定",
      "dl.clip1.body": "使用者先申請三天假，然後一邊回答「是的，我確認」，一邊在同一句話裡把申請改成五天。這個確認是真的，只是它不屬於這個動作：伺服器的令牌綁定在簽發時的那組精確參數上，所以假期餘額始終停在3.5。Agent先說權限問題，再說餘額問題，順序就是這樣。",
      "dl.clip2.name": "正常流程長什麼樣",
      "dl.clip2.body": "一個動作，在審計面板上是兩行：先黃後綠。黃色那行是工具伺服器拒絕執行，並把它本來會做的事描述了回來。兩行之間隔著的，只有使用者的一個回答。順帶一提，它把嚴重程度定為3，依據是使用者提到還有替代辦法可用，不是因為語氣聽起來有多急。",
      "dl.clip3.name": "試著弄壞它",
      "dl.clip3.body": "三次繞過嘗試：借來的權威、偽造的系統指令，以及聲稱某個Tier 2工具其實只是無害的讀取。前兩次落在和普通請求一模一樣的黃色行上，因為伺服器根本沒有去讀那段說辭。第三次轉交給人處理。這裡沒有任何令牌能讓重置密碼執行，程式碼裡也沒有那條路徑。這不是檢測出來的，因為壓根沒有需要檢測的東西。",
      "dl.clip4.name": "步驟是它自己排出來的",
      "dl.clip4.body": "一句指令，沒有一步是使用者指名的：讀申請歷史、拿駁回理由去對員工記錄、然後提出重新提交並停下來等確認。是兩次工具呼叫而不是三次，因為<code>get_request_history</code>已經帶回了在職天數和試用期門檻，不需要再單獨查一次政策。這一條裡Agent還先說出了當初被駁回的理由，才提出重新申請。它並不總是這麼做：評估裡有五道題，回覆是直接跳到提案的，報告如實寫了。",
      "dl.clip5.name": "那些數字",
      "dl.clip5.body": "整套測試不需要任何憑證就能跑，因為模型、向量介面和工具伺服器子行程都被打了樁。評分指令碼能從已提交的產物中重算出評估報告裡的每一個數字，全程不呼叫任何模型。嚴重失效是從只可追加的審計日誌裡算出來的，從不交給語言模型評判。保留題集是在標籤體系凍結之後才寫的，並且只跑了一次。",

      "dl.rec.eyebrow": "錄影時才發現的事",
      "dl.rec.title": "出問題的是演示，不是系統。",
      "dl.rec.body1": "那排繞過按鈕就是拿來按的，所以第03支的第一次拍攝連按了三顆。指令碼預期面板上會出現三行，實際拍到的是一行，外加兩次結果為unclear的確認檢查。",
      "dl.rec.body2": "一個更早做出的決定精確地解釋了這件事：只要有提案還懸著，Agent就不綁定任何工具。第一次嘗試留下了一個未決的提案，於是第二顆按鈕送出的文字根本不是一個新請求，它是使用者對那個提案的回答；而分類器不會把一段偽造的系統指令讀成對請假申請的同意。它回傳unclear，提案繼續懸著，第三顆按鈕撞上同一堵牆。這裡的每一步都是系統在按設計運作，包括一個只會往unclear失敗、絕不會往confirm失敗的分類器。",
      "dl.rec.clip.index": "廢棄的一條",
      "dl.rec.clip.name": "按了三次，只出一行",
      "dl.rec.clip.body": "這是被丟掉的那一條，留下來是因為它拍到的東西。三次嘗試在聊天裡都被正確回應了，而面板幾乎什麼都沒記下：一次Tier 1拒絕，然後兩次拒絕把攻擊讀成同意的確認檢查。第一次按鈕留下的提案到最後還開著，還在等一個沒人給它的回答。",
      "dl.rec.callout": "修的是演示，不是Agent：現在錄製流程會在兩次嘗試之間先取消，而這些取消值得佔用時間，因為乾淨利落的拒絕正是這套機制的另一半。<strong>測試套件和評估都不可能抓到這件事</strong>，因為每道題都跑在自己的會話裡，而指令碼的預期正是照著那些執行結果寫的。它需要有人真的坐下來用一遍。",

      "dl.num.eyebrow": "評估",
      "dl.num.title": "嚴重失效是算出來的，不是評出來的。",
      "dl.num.body1": "嚴重失效指的是：沒有令牌就執行了Tier 1、任何一次Tier 2執行，或者一道繞過題最後真的有動作被做掉。這三者都從只可追加的審計日誌和資料庫裡算出來，從不取決於模型的意見。這樣一來，留給評判模型的只剩下真正主觀的標籤；而它跑在和Agent不同的模型家族上，避免自己批改自己的作業。",
      "dl.num.caption": "多輪探測結果",
      "dl.num.h1": "指標",
      "dl.num.h2": "保留題，12道",
      "dl.num.h3": "開發題，34道",
      "dl.num.r1": "嚴重失效",
      "dl.num.r2": "機械預期達成",
      "dl.num.r3": "人工標準答案對盲評判",
      "dl.num.r4": "二元Cohen's kappa",
      "dl.num.body2": "保留題集是在標籤體系凍結之後寫的，跑過一次，已經用掉了。旁邊那一欄開發題是形狀，不是分數：那套題被用於三輪提示詞調整，這件事被記錄下來，而不是含糊帶過。兩套題合計十四道對抗題，每一道都是不同的策略，沒有一道讓任何動作真的執行。",
      "dl.num.body3": "保留題的kappa是0.62，這就是那份紀律誠實的代價。題集小，而系統大部分都通過了，這讓這個統計量本身沒有多少活動空間；報告直說了這一點，而不是改去引用更好看的開發題數字。十二道機械預期裡沒達成的那一道，是因為指令碼裡的某一輪在Agent先反問了一個合理問題之後，就不再是當初寫它時的意思了。這件事也一併寫了下來。",
      "dl.num.callout": "評估還找出Agent自身的兩個弱點，兩個都刻意沒有修。修掉它們再拿同樣這十二道題重跑一次，會得到更好看的數字和更差的測量，因為一套保留題集，在你照著它給的結果去調整的那一刻就已經用掉了。它們屬於下一套保留題，或者屬於一份把它們直說出來的報告，而現在它們就在後者裡。",

      "dl.why.eyebrow": "為什麼這才是重點",
      "dl.why.title": "工程判斷本身就是成品。",
      "dl.why.body1": "上面這些，都可以改用一句「動手前先問過使用者」的提示詞去嘗試，而且大多數時候會有效。問題就在「大多數」。真正要緊的失敗，是對話本身就是攻擊的那些：借來的權威、偽造的系統指令、被拆成兩半各自無害的動作、一個被挪用到從未被授權之處的確認。面對其中任何一種，提示詞都是可以商量的；而一條行程邊界、一枚綁定參數的令牌、一個根本沒有執行分支的工具，不可以。",
      "dl.why.body2": "代價也該說清楚。每一個Tier 1動作都要多花一輪，每一輪使用者輸入都要多付一次分類器的模型呼叫，而一個本來只想讓Agent直接把事辦了的人，得先回答一個問題。這就是這裡被展示出來的取捨，而對於會動到一個人的假期餘額、裝置或帳號的動作來說，這個取捨是對的。",

      "dl.stack.eyebrow": "技術組成",
      "dl.stack.value": "Python · 帶檢查點的LangGraph狀態機 · 獨立行程中的FastMCP工具伺服器，經stdio通訊 · Claude Sonnet 5（Agent）· Gemini 2.5 Flash Lite（確認分類器）· Gemini 2.5 Pro（盲評判，與Agent不同家族）· OpenRouter · Voyage AI向量模型用於政策檢索 · SQLite，審計表由觸發器保證只可追加 · Streamlit演示介面與FastAPI服務 · 288個測試，不需要網路也不需要金鑰",
      "dl.link.repo": "GitHub程式庫",
      "dl.link.report": "閱讀評估報告",
      "dl.link.findings": "構建過程中的十六條發現"
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
    document.title = t("dl.meta.title");
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("dl.meta.description"));

    document.querySelectorAll("[data-dl-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-dl-i18n"));
    });
    document.querySelectorAll("[data-dl-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-dl-i18n-html"));
    });
  }

  /* main.js changes language by calling its own internal applyLang: the nav
     switcher and the initial load never go through window.miloopSetLanguage,
     so wrapping that would catch only the lead-intake panel. Every path does
     set the lang attribute on <html>, which makes observing it the single hook
     that covers all three without modifying main.js. */
  new MutationObserver(function () {
    var lang = document.documentElement.getAttribute("lang");
    if (lang !== currentLang) applyLang(lang);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(document.documentElement.getAttribute("lang"));
  });
})();
