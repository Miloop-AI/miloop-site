"""Pre-push checks: CSS vars, braces, div balance, i18n coverage, orphan classes."""

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

html_files = sorted(SITE.glob("*.html"))
for f in html_files:
    h = f.read_text(encoding="utf-8")
    o = len(re.findall(r"<div\b", h))
    c = len(re.findall(r"</div>", h))
    if o != c:
        bad.append("%s: %d <div> vs %d </div>" % (f.name, o, c))

# i18n coverage across all three dictionaries
js = (SITE / "js" / "main.js").read_text(encoding="utf-8")
dicts = re.split(r'\n    "(?:en|zh-Hans|zh-Hant)": \{\n', js)[-3:]
assert len(dicts) == 3, "could not split the three dictionaries"
keysets = [set(re.findall(r'^      "([^"]+)":', d, re.M)) for d in dicts]
names = ["en", "zh-Hans", "zh-Hant"]
union = set().union(*keysets)
for name, ks in zip(names, keysets):
    for missing in sorted(union - ks):
        bad.append("i18n key missing from %s: %s" % (name, missing))

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
}
hans_body = dicts[1]
for tw, cn in TW_ONLY.items():
    for m in re.finditer(r'^      "([^"]+)":.*' + re.escape(tw), hans_body, re.M):
        bad.append("zh-Hans carries the Taiwan term %s (should be %s) in %s" % (tw, cn, m.group(1)))

used_keys = set()
for f in html_files:
    h = f.read_text(encoding="utf-8")
    used_keys |= set(re.findall(r'data-i18n(?:-html)?="([^"]+)"', h))
for orphan in sorted(used_keys - union):
    bad.append("markup asks for an i18n key no dictionary has: " + orphan)
for dead in sorted(k for k in union - used_keys if re.match(r"^(result|sv|hp|s)\d", k)):
    bad.append("dictionary key nothing uses: " + dead)

# classes styled but not present anywhere (only for the ones we touched)
markup = "\n".join(f.read_text(encoding="utf-8") for f in html_files)
js_all = "\n".join(p.read_text(encoding="utf-8") for p in (SITE / "js").glob("*.js"))
for cls in sorted(set(re.findall(r"\.((?:result|jd)-[a-z0-9-]+)", css))):
    if cls not in markup and cls not in js_all:
        bad.append("styled but never used: ." + cls)

# A key rendered with data-i18n goes through textContent, so an HTML entity in it
# shows up on screen as the literal "&middot;". Only data-i18n-html decodes them.
plain_keys, html_keys = set(), set()
for f in html_files:
    h = f.read_text(encoding="utf-8")
    plain_keys |= set(re.findall(r'data-i18n="([^"]+)"', h))
    html_keys |= set(re.findall(r'data-i18n-html="([^"]+)"', h))
for name, d in zip(names, dicts):
    for m in re.finditer(r'^      "([^"]+)": "(.*)",?$', d, re.M):
        k, v = m.group(1), m.group(2)
        if k in plain_keys and k not in html_keys and re.search(r"&[a-zA-Z]+;|&#\d+;", v):
            bad.append("%s: %s is plain text but contains an HTML entity" % (name, k))

if bad:
    # Through a UTF-8 wrapper: a failure naming a Chinese term would otherwise die
    # in the print on a cp1252 console, and the run would report a crash instead of
    # the thing it caught.
    out = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    out.write("\n".join("FAIL  " + b for b in bad) + "\n")
    out.flush()
    sys.exit(1)
print("all checks pass: braces, vars, divs, i18n x3, orphan classes")
