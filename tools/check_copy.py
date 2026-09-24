"""Pre-push checks: CSS vars, braces, div balance, i18n coverage, orphan classes.

Covers all four dictionaries, not just main.js. The three portfolio pages carry
their own, keyed off their own markup attribute, and until 2026-09-24 nothing
checked them at all: their <div> balance, their key parity across the three
languages, and their zh-Hans localisation were all unguarded.
"""

import io
import re
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
bad = []

css = (SITE / "css" / "style.css").read_text(encoding="utf-8")
if css.count("{") != css.count("}"):
    bad.append("css braces %d { vs %d }" % (css.count("{"), css.count("}")))

declared = set(re.findall(r"^\s*(--[a-z0-9-]+)\s*:", css, re.M))
for used in set(re.findall(r"var\((--[a-z0-9-]+)", css)):
    if used not in declared:
        bad.append("css var used but never declared: " + used)

html_files = sorted(SITE.glob("*.html")) + sorted(SITE.glob("portfolio/*/index.html"))

def name_of(f):
    return f.relative_to(SITE).as_posix()

for f in html_files:
    h = f.read_text(encoding="utf-8")
    o = len(re.findall(r"<div\b", h))
    c = len(re.findall(r"</div>", h))
    if o != c:
        bad.append("%s: %d <div> vs %d </div>" % (name_of(f), o, c))

LANGS = ["en", "zh-Hans", "zh-Hant"]

def parse_dicts(js_path):
    """The three dictionaries inside one i18n file, in LANGS order."""
    js = js_path.read_text(encoding="utf-8")
    blocks = re.split(r'\n    "(?:en|zh-Hans|zh-Hant)": \{\n', js)[-3:]
    assert len(blocks) == 3, "could not split the three dictionaries in " + js_path.name
    out = []
    for b in blocks:
        d = {}
        for m in re.finditer(r'^      "([^"]+)": "(.*)",?$', b, re.M):
            d[m.group(1)] = m.group(2)
        out.append(d)
    return out

# The simplified dictionary is hand-localised, not a mechanical conversion of the
# traditional one. Regenerating a string with OpenCC silently undoes that, which is
# how 密歇根 became 密西根 and 老年用户 became 年长用户 in one pass. These are terms
# that belong only to the Taiwan wording and must never reach zh-Hans.
TW_ONLY = {
    "密西根": "密歇根", "硕士学程": "硕士项目",
    "年长用户": "老年用户", "即时": "实时",
    "示范": "演示", "寄邮件": "发邮件",
    "报导": "报道", "行销": "营销",
    "缺省": "默认", "录像": "录屏",
    "财星": "财富", "客制化": "定制化", "专案": "项目",
    "维运": "运维",
}

P = SITE / "portfolio"
# dictionary file, the markup attribute it drives, the pages allowed to use it
BUNDLES = [
    ("js/main.js", "data-i18n", html_files),
    ("js/driftboard-eval.js", "data-db-i18n", [P / "driftboard-rag-eval" / "index.html"]),
    ("js/deskloop-agent.js", "data-dl-i18n", [P / "deskloop-agentic-it-hr" / "index.html"]),
    ("js/factloop-demo.js", "data-fl-i18n", [P / "factloop-newsroom" / "index.html"]),
]

lookup = {lang: {} for lang in LANGS}  # every key of every dictionary, for the h1 check

for rel, attr, pages in BUNDLES:
    jsp = SITE / rel
    src = jsp.read_text(encoding="utf-8")
    ds = parse_dicts(jsp)
    for lang, d in zip(LANGS, ds):
        lookup[lang].update(d)

    union = set().union(*[set(d) for d in ds])
    for lang, d in zip(LANGS, ds):
        for missing in sorted(union - set(d)):
            bad.append("%s: i18n key missing from %s: %s" % (rel, lang, missing))

    for key, value in sorted(ds[1].items()):
        for tw, cn in TW_ONLY.items():
            if tw in value:
                bad.append("%s: zh-Hans carries the Taiwan term %s (should be %s) in %s"
                           % (rel, tw, cn, key))

    plain, rich = set(), set()
    for f in pages:
        h = f.read_text(encoding="utf-8")
        # the bare attribute writes textContent; suffixed variants exist for other
        # sinks (-html for innerHTML, -placeholder for setAttribute), so match any
        # suffix rather than the two that happen to be in use today
        for suffix, key in re.findall(r'%s(-[a-z]+)?="([^"]+)"' % re.escape(attr), h):
            (rich if suffix == "-html" else plain).add(key)
    # A key can also be applied from code rather than from markup, and not always
    # through t(): factloop passes bare literals to its own helpers, as in
    # outcomeHtml("fl.demo.error.title", ...) and { key: "fl.demo.loading.start" }.
    # So: any key-shaped literal on a line that is not itself a dictionary entry.
    from_code = set()
    for line in src.splitlines():
        if re.match(r'^      "[^"]+": ', line):
            continue
        from_code |= set(re.findall(r'"([a-z]+(?:\.[a-zA-Z0-9_]+)+)"', line))
    used = plain | rich | from_code

    for orphan in sorted((plain | rich) - union):
        bad.append("%s: markup asks for an i18n key no dictionary has: %s" % (rel, orphan))

    if rel == "js/main.js":
        # main.js is shared across every page, so only the key families that are
        # known to belong to one section can be judged dead by absence.
        for dead in sorted(k for k in union - used if re.match(r"^(result|sv|hp|s)\d", k)):
            bad.append("%s: dictionary key nothing uses: %s" % (rel, dead))
    else:
        # a portfolio dictionary serves exactly one page, so anything unreferenced
        # by that page's markup or by its own code is dead
        for dead in sorted(union - used):
            bad.append("%s: dictionary key nothing uses: %s" % (rel, dead))

    # A key rendered with the plain attribute goes through textContent, so an HTML
    # entity in it shows up on screen as the literal "&middot;". Only the -html
    # variant decodes them.
    for lang, d in zip(LANGS, ds):
        for key, value in sorted(d.items()):
            if key in plain and key not in rich and re.search(r"&[a-zA-Z]+;|&#\d+;", value):
                bad.append("%s: %s: %s is plain text but contains an HTML entity"
                           % (rel, lang, key))

# No eyebrow or h1 on this site takes a terminal stop; section h2s do. Four h1s had
# drifted back, three of them hiding the period in a trailing span of its own, so the
# whole composed heading has to be assembled per language before it can be judged.
H1 = re.compile(r"<h1\b[^>]*>(.*?)</h1>", re.S)
KEYREF = re.compile(r'data-(?:[a-z]{2}-)?i18n(?:-html)?="([^"]+)"')
for f in html_files:
    for block in H1.findall(f.read_text(encoding="utf-8")):
        keys = KEYREF.findall(block)
        if not keys:
            continue
        for lang in LANGS:
            text = "".join(lookup[lang].get(k, "") for k in keys).strip()
            if text and text[-1] in ".。":
                bad.append("%s: h1 ends with a terminal stop in %s: ...%s"
                           % (name_of(f), lang, text[-24:]))

# classes styled but not present anywhere (only for the ones we touched)
markup = "\n".join(f.read_text(encoding="utf-8") for f in html_files)
js_all = "\n".join(p.read_text(encoding="utf-8") for p in (SITE / "js").glob("*.js"))
for cls in sorted(set(re.findall(r"\.((?:result|jd)-[a-z0-9-]+)", css))):
    if cls not in markup and cls not in js_all:
        bad.append("styled but never used: ." + cls)

if bad:
    # Through a UTF-8 wrapper: a failure naming a Chinese term would otherwise die
    # in the print on a cp1252 console, and the run would report a crash instead of
    # the thing it caught.
    out = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    out.write("\n".join("FAIL  " + b for b in bad) + "\n")
    out.flush()
    sys.exit(1)
print("all checks pass: braces, vars, divs, i18n x4 dictionaries, h1 stops, orphan classes")
