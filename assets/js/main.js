/* =====================================================================
 *  Portfolio renderer — builds the whole page from PORTFOLIO (data.js)
 *  Vanilla JS, no dependencies. You normally don't need to edit this file.
 * ===================================================================== */
(function () {
  "use strict";

  // `const PORTFOLIO` in data.js is a global binding (not a window property)
  const D = (typeof PORTFOLIO !== "undefined" && PORTFOLIO) || window.PORTFOLIO || {};
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  /* ---------- {years} / {projects} placeholders ---------- */
  function yearsSince(start) {
    const m = String(start || "").match(/^(\d{4})(?:-(\d{1,2}))?/);
    if (!m) return "";
    const now = new Date();
    const months = (now.getFullYear() - Number(m[1])) * 12 + (now.getMonth() + 1 - Number(m[2] || 1));
    return String(Math.max(0, Math.floor(months / 12)));
  }
  const YEARS = yearsSince(D.profile && D.profile.careerStart);
  const PROJECTS = String((D.projects || []).length);
  (function fill(obj) {
    Object.keys(obj).forEach((k) => {
      const v = obj[k];
      if (typeof v === "string") obj[k] = v.replace(/\{years\}/g, YEARS).replace(/\{projects\}/g, PROJECTS);
      else if (v && typeof v === "object") fill(v);
    });
  })(D);

  /* ---------------- helpers ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const has = (v) => Array.isArray(v) ? v.length > 0 : !!v;
  const icon = (name, cls = "") => `<span class="material-symbols-rounded ${cls}" aria-hidden="true">${esc(name)}</span>`;
  const initials = (name) => String(name || "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const pad = (n) => String(n).padStart(2, "0");
  const html = (sel, markup) => { const el = typeof sel === "string" ? $(sel) : sel; if (el) el.innerHTML = markup; return el; };
  const chips = (list, cls = "chip") => (list || []).map((t) => `<span class="${cls}">${esc(t)}</span>`).join("");
  const host = (url) => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return ""; } };

  // Brand icons missing from Bootstrap Icons (paths from Simple Icons, CC0). Use the key as social "icon".
  const SVG_ICONS = {
    hackerrank: "M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95c-.061 0-.111-.05-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 01-.11.112h-5.78a.11.11 0 01-.11-.11V8.111c0-.06.05-.11.11-.11z"
  };
  const brandIcon = (name) => SVG_ICONS[name]
    ? `<svg class="svg-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${SVG_ICONS[name]}"/></svg>`
    : `<i class="bi bi-${esc(name)}" aria-hidden="true"></i>`;
  const socialLinks = (list) => (list || []).filter((s) => s.url).map((s) =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener" class="social-btn" aria-label="${esc(s.name)}" title="${esc(s.name)}">${brandIcon(s.icon)}</a>`
  ).join("");

  const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  function parseMonth(s) {
    const t = String(s || "").trim().toLowerCase();
    if (!t || /present|now|current/.test(t)) return new Date();
    const m = t.match(/([a-z]{3})[a-z]*\.?\s+(\d{4})/);
    if (m && MONTHS.includes(m[1])) return new Date(Number(m[2]), MONTHS.indexOf(m[1]), 1);
    const y = t.match(/(\d{4})/);
    return y ? new Date(Number(y[1]), 0, 1) : null;
  }
  function duration(start, end) {
    const a = parseMonth(start), b = parseMonth(end);
    if (!a || !b) return "";
    let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
    if (months < 1) return "";
    const y = Math.floor(months / 12), m = months % 12;
    return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
  }
  function hash7(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }
  async function copy(text, msg = "Copied to clipboard") {
    try { await navigator.clipboard.writeText(text); toast(msg); }
    catch (e) { toast(text); }
  }

  /* ---------------- meta ---------------- */
  function renderMeta() {
    const m = D.meta || {};
    if (m.title) document.title = m.title;
    if (m.description) $('meta[name="description"]').setAttribute("content", m.description);
  }

  /* ---------------- nav ---------------- */
  let SECTIONS = [];
  function renderNav() {
    const p = D.profile || {};
    $("#brandMark").textContent = p.initials || initials(p.name);
    $("#brandName").textContent = p.name || "";

    const all = [
      ["home", "Home", true, "home"],
      ["about", "About", has(D.about), "person"],
      ["skills", "Stack", has(D.skills), "deployed_code"],
      ["experience", "Career", has(D.experience), "commit"],
      ["projects", "Work", has(D.projects), "grid_view"],
      ["education", "Credentials", has(D.education) || has(D.certifications), "verified"],
      ["testimonials", "Testimonials", has(D.testimonials), "format_quote"],
      ["contact", "Contact", true, "alternate_email"]
    ];
    all.filter((s) => !s[2]).forEach(([id]) => { const el = document.getElementById(id); if (el) el.remove(); });
    SECTIONS = all.filter((s) => s[2]);

    // renumber section indices (01, 02 …) after hidden sections are removed
    $$(".section .section-index").forEach((el, i) => { el.textContent = pad(i + 1); });

    const links = SECTIONS.filter(([id]) => id !== "home");
    html("#navLinks", links.map(([id, label]) => `<li><a href="#${id}" data-nav="${id}">${label}</a></li>`).join(""));
    html("#mobileLinks", links.map(([id, label], i) => `<li><a href="#${id}" data-nav="${id}">${label}<span>${pad(i + 1)}</span></a></li>`).join(""));
    $("#cmdkHint").textContent = IS_MAC ? "⌘ K" : "Ctrl K";
  }

  /* ---------------- hero ---------------- */
  function renderHero() {
    const p = D.profile || {};
    const parts = String(p.name || "").trim().split(/\s+/);
    const last = parts.length > 1 ? parts.pop() : "";
    $("#heroName").innerHTML = `${esc(parts.join(" "))}${last ? ` <span class="last">${esc(last)}</span>` : ""}`;
    $("#heroTagline").textContent = p.tagline || "";

    // status line: availability · location · local time
    const bits = [];
    if (p.availability) bits.push(`<span class="pulse" aria-hidden="true"></span><span>${esc(p.availability)}</span>`);
    if (p.location) bits.push(`<span>${esc(p.location)}</span>`);
    if (p.timezone) bits.push(`<span id="localTime"></span>`);
    if (bits.length) html("#heroStatus", bits.join(`<span class="sep">/</span>`));
    else $("#heroStatus").remove();
    if (p.timezone) {
      const tick = () => {
        try {
          const t = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: p.timezone }).format(new Date());
          $("#localTime").textContent = `${t} local`;
        } catch (e) { $("#localTime").textContent = ""; }
      };
      tick(); setInterval(tick, 30000);
    }

    let actions = `<a href="#projects" class="btn btn-primary">View selected work <span class="material-symbols-rounded arrow">arrow_forward</span></a>`;
    if (p.resume) actions += `<a href="${esc(p.resume)}" class="btn btn-ghost" download>${icon("download")} Download CV</a>`;
    actions += `<a href="#contact" class="btn btn-ghost">${icon("mail")} Get in touch</a>`;
    html("#heroActions", actions);
    html("#heroSocials", socialLinks(D.socials));

    // ID badge (About spec sheet)
    if (p.photo && $("#photoCard")) {
      const img = $("#heroPhoto");
      img.src = p.photo;
      img.alt = p.name ? `Portrait of ${p.name}` : "Profile photo";
      $("#badgeName").textContent = p.name || "";
      $("#badgeTitle").textContent = p.title || "";
      html("#photoChips", (p.floatingChips || []).map((c) => `<span class="chip">${icon(c.icon)}${esc(c.text)}</span>`).join(""));
    } else if ($("#photoCard")) $("#photoCard").remove();

    // stats
    html("#heroStats", (D.stats || []).map((s, i) => {
      const m = String(s.value).match(/^(\d+)(.*)$/);
      const val = m
        ? `<span class="count" data-to="${m[1]}">${REDUCED ? m[1] : "0"}</span>${m[2] ? `<span class="plus">${esc(m[2])}</span>` : ""}`
        : esc(s.value);
      return `<div class="stat reveal" style="--d:${i * 80}ms"><div class="stat-value">${val}</div><div class="stat-label">${esc(s.label)}</div></div>`;
    }).join(""));

    // marquee: every skill + tool
    const tech = [...new Set((D.skills || []).flatMap((g) => (g.items || []).map((s) => typeof s === "object" ? s.name : s))
      .concat(D.tools || []).map((t) => String(t).replace(/\s*\(basic\)\s*/i, "")))];
    if (tech.length) {
      const row = tech.map((t) => `<span class="marquee-item">${esc(t)}</span>`).join("");
      html("#marquee", row + row);
    } else $(".marquee").remove();

    typeRoles(has(p.roles) ? p.roles : [p.title || ""]);
    renderIDE();
  }

  function typeRoles(roles) {
    const el = $("#heroTyped");
    if (REDUCED || roles.length < 2) { el.textContent = roles[0]; return; }
    let r = 0, c = 0, deleting = false;
    (function tick() {
      const word = roles[r];
      c += deleting ? -1 : 1;
      el.textContent = word.substring(0, c);
      let delay = deleting ? 32 : 70;
      if (!deleting && c === word.length) { delay = 2000; deleting = true; }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 380; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------- the self-typing Java "profile" in the hero ---------- */
  function renderIDE() {
    const p = D.profile || {};
    const facts = (D.about && D.about.facts) || [];
    const fact = (label) => (facts.find((f) => f.label.toLowerCase() === label) || {}).value;
    const cls = String(p.name || "Engineer").replace(/[^A-Za-z0-9]/g, "") || "Engineer";
    const company = (D.experience && D.experience[0] && D.experience[0].company) || "";
    const stack = has(p.stack) ? p.stack
      : (D.skills || []).map((g) => (g.items || []).map((s) => typeof s === "object" ? s.name : s).find((s) => !/basic/i.test(s))).filter(Boolean).slice(0, 4);
    const cert = String(fact("certification") || "")
      .replace(/Oracle Certified Professional,?/i, "OCP").replace(/Programmer$/i, "").trim();
    $("#ideFile").textContent = `${cls}.java`;

    // each line = list of [tokenClass, text]
    const K = (t) => ["kw", t], T = (t) => ["type", t], S = (t) => ["str", `"${t}"`], A = (t) => ["ann", t],
          N = (t) => ["num", t], F = (t) => ["fn", t], C = (t) => ["cm", t], _ = (t) => ["", t];
    const fields = [
      ["String", "role", S(p.title || "Software Engineer")],
      company && ["String", "company", S(company.split(",")[0])],
      p.location && ["String", "basedIn", S(p.location)],
      YEARS && ["int", "yearsShipping", N(YEARS)]
    ].filter(Boolean);
    const w = Math.max(...fields.map((f) => f[1].length));
    const L = [
      [A("@Engineer"), _("(available = "), K(p.availability ? "true" : "false"), _(")")],
      [K("public final class "), T(cls), _(" {")],
      [],
      ...fields.map(([type, name, val]) => [_("    "), T(type.padEnd(6)), _(" " + name.padEnd(w) + " = "), val, _(";")]),
      ...(cert ? [[_("    "), T("String"), _(" " + "certified".padEnd(w) + " = "), S(cert), _(";")]] : []),
      [],
      ...(stack.length ? [
        [_("    "), T("List"), _("<"), T("String"), _("> stack = "), T("List"), _("."), F("of"), _("(")],
        [_("        "), ...stack.flatMap((s, i) => i ? [_(", "), S(s)] : [S(s)])],
        [_("    );")],
        []
      ] : []),
      [_("    "), C("// clean code, tested, shipped")],
      [_("    "), K("public "), T("Impact"), _(" "), F("ship"), _("("), T("Problem"), _(" p) {")],
      [_("        "), K("return "), _("p."), F("solve"), _("()."), F("with"), _("(quality, maintainability);")],
      [_("    }")],
      [_("}")]
    ];

    html("#ideGutter", L.map((_, i) => `<li>${i + 1}</li>`).join(""));
    const code = $("#ideCode");
    const render = (line, n = Infinity) => {
      let out = "", left = n;
      for (const [k, t] of line) {
        if (left <= 0) break;
        const s = t.slice(0, left); left -= s.length;
        out += k ? `<span class="tok-${k}">${esc(s)}</span>` : esc(s);
      }
      return out;
    };
    const lenOf = (line) => line.reduce((a, [, t]) => a + t.length, 0);
    const lines = L.map(() => `<span class="ln"></span>`).join("");
    code.innerHTML = lines;
    const els = $$(".ln", code);

    if (REDUCED) { els.forEach((el, i) => { el.innerHTML = render(L[i]); }); return; }
    let li = 0, ci = 0;
    function step() {
      if (li >= L.length) { els[L.length - 1].classList.add("typing"); return; }
      const total = lenOf(L[li]);
      ci = Math.min(total, ci + 3);
      els.forEach((e) => e.classList.remove("typing"));
      els[li].innerHTML = render(L[li], ci);
      els[li].classList.add("typing");
      if (ci >= total) { li++; ci = 0; setTimeout(step, total ? 40 : 10); }
      else setTimeout(step, 14);
    }
    setTimeout(step, 600);
  }

  function countUp(root) {
    $$(".count", root).forEach((el) => {
      const to = Number(el.dataset.to) || 0;
      if (REDUCED || el.dataset.done) { el.textContent = to; return; }
      el.dataset.done = "1";
      const t0 = performance.now(), dur = 1400;
      (function frame(t) {
        const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
        el.textContent = Math.round(to * e);
        if (k < 1) requestAnimationFrame(frame);
      })(t0);
      setTimeout(() => { el.textContent = to; }, dur + 100);   // guarantee the final value (e.g. background tabs)
    });
  }

  /* ---------------- about ---------------- */
  function renderAbout() {
    const a = D.about;
    if (!a) return;
    $("#aboutHeading").textContent = a.heading || "";
    html("#aboutText", (a.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join(""));
    html("#aboutFacts", (a.facts || []).map((f) => `<div class="row"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join(""));
    if (!has(a.facts)) $(".spec-sheet").remove();
    html("#aboutHighlights", (a.highlights || []).map((h, i) => `
      <article class="bento-card spotlight reveal" style="--d:${i * 70}ms">
        <span class="idx">${pad(i + 1)}</span>
        <div class="tile">${icon(h.icon || "bolt")}</div>
        <h3>${esc(h.title)}</h3>
        <p>${esc(h.text)}</p>
      </article>`).join(""));
  }

  /* ---------------- skills ---------------- */
  function renderSkills() {
    if (!has(D.skills)) return;
    const n = D.skills.length;
    const total = new Set(D.skills.flatMap((g) => (g.items || []).map((s) => typeof s === "object" ? s.name : s))).size;
    $("#skillsLede").textContent = `${total} technologies across ${n} disciplines — chosen for reliability, not novelty.`;
    const item = (s) => (typeof s === "object" && s.level != null) ? `
      <div class="skill-bar">
        <div class="top"><span>${esc(s.name)}</span><span class="pct">${Number(s.level) || 0}%</span></div>
        <div class="bar"><i data-level="${Number(s.level) || 0}"></i></div>
      </div>` : (() => {
        const name = typeof s === "object" ? s.name : s;
        return `<span class="chip${/basic/i.test(name) ? " basic" : ""}">${esc(name)}</span>`;
      })();
    let out = D.skills.map((g, i) => {
      const items = g.items || [];
      const bars = items.some((s) => typeof s === "object" && s.level != null);
      const wide = (n % 3 === 2 && i === 0) || (n % 3 === 1 && i === 0);
      return `
      <article class="skill-card spotlight reveal ${wide ? "wide" : ""}" style="--d:${(i % 3) * 70}ms">
        <div class="skill-head">${icon(g.icon || "code")}<h3>${esc(g.category)}</h3><span class="skill-n">${pad(items.length)}</span></div>
        ${bars ? `<div style="display:grid;gap:14px">${items.map(item).join("")}</div>` : `<div class="chip-row">${items.map(item).join("")}</div>`}
      </article>`;
    }).join("");
    if (n % 3 === 1 && n > 1) out = out.replace('class="skill-card spotlight reveal wide"', 'class="skill-card spotlight reveal wide" style="grid-column:1/-1"');
    if (has(D.tools)) out += `<div class="tools-row reveal"><span class="label">+ also</span>${chips(D.tools)}</div>`;
    html("#skillsGrid", out);
  }

  /* ---------------- experience (git log) ---------------- */
  function renderExperience() {
    if (!has(D.experience)) return;
    html("#experienceTimeline", D.experience.map((e, i) => {
      const current = /present|now|current/i.test(e.end || "");
      const dur = duration(e.start, e.end);
      return `
      <li class="commit ${i === 0 ? "head" : ""} reveal">
        <div class="commit-when">
          <div class="range">${esc(e.start)} — ${esc(e.end)}</div>
          ${dur ? `<div class="dur">${dur}</div>` : ""}
        </div>
        <div class="commit-rail"><span class="commit-node"></span></div>
        <div class="commit-body">
          <article class="commit-card spotlight">
            <div class="commit-meta">
              <span class="hash">${hash7(e.role + e.company + e.start)}</span>
              ${i === 0 ? `<span class="ref head-ref">HEAD → ${current ? "current" : "latest"}</span>` : ""}
              ${e.location ? `<span class="loc">${icon("location_on")}${esc(e.location)}</span>` : ""}
            </div>
            <h3>${esc(e.role)}</h3>
            <div class="company">
              ${e.companyUrl ? `<a href="${esc(e.companyUrl)}" target="_blank" rel="noopener">${esc(e.company)}</a>` : `<span>${esc(e.company)}</span>`}
            </div>
            ${e.summary ? `<p class="summary">${esc(e.summary)}</p>` : ""}
            ${has(e.achievements) ? `<ul class="diff">${e.achievements.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}
            ${has(e.tech) ? `<div class="chip-row">${chips(e.tech)}</div>` : ""}
          </article>
        </div>
      </li>`;
    }).join(""));
  }

  /* ---------------- projects ---------------- */
  const projectYear = (p) => (String(p.duration || "").match(/\d{4}/) || [""])[0];
  function projectLinks(p) {
    const l = p.links || {};
    let out = "";
    if (l.live) out += `<a href="${esc(l.live)}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">${icon("open_in_new")} Live site</a>`;
    if (l.details) out += `<a href="${esc(l.details)}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">${icon("article")} Case study</a>`;
    if (l.source) out += `<a href="${esc(l.source)}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm"><i class="bi bi-github" aria-hidden="true"></i> Source</a>`;
    return out;
  }
  const browserBar = (p) => {
    const h = host(p.links && p.links.live);
    return `<div class="browser-bar"><span class="dots"><i></i><i></i><i></i></span>
      <span class="url">${icon(h ? "lock" : "shield_lock")}${esc(h || "internal · enterprise")}</span></div>`;
  };

  function renderProjects() {
    if (!has(D.projects)) return;
    const P = D.projects.map((p, i) => Object.assign({ _i: i }, p));
    const featured = P.filter((p) => p.featured);
    const rest = P.filter((p) => !p.featured);
    const cats = [...new Set(P.map((p) => p.category).filter(Boolean))];

    if (cats.length > 1) {
      html("#projectFilters", [`<button class="filter active" data-filter="*" role="tab" aria-selected="true">All<span class="n">${P.length}</span></button>`]
        .concat(cats.map((c) => `<button class="filter" data-filter="${slug(c)}" role="tab" aria-selected="false">${esc(c)}<span class="n">${P.filter((p) => p.category === c).length}</span></button>`)).join(""));
    } else $("#projectFilters").remove();

    html("#projectsGrid", featured.map((p, k) => `
      <article class="work-card spotlight reveal" data-cat="${slug(p.category || "")}" data-index="${p._i}" tabindex="0" role="button" aria-label="Open case study: ${esc(p.title)}" style="--d:${(k % 2) * 80}ms">
        <div class="shot"><div class="browser">${browserBar(p)}<img src="${esc(p.thumbnail)}" alt="" loading="lazy"></div></div>
        <div class="work-body">
          <div class="work-top"><span class="cat">${esc(p.category)}</span><span>${esc(projectYear(p) || pad(k + 1))}</span></div>
          <h3 class="work-title">${esc(p.title)}<span class="go">${icon("arrow_forward")}</span></h3>
          <p class="work-desc">${esc(p.shortDescription)}</p>
          ${has(p.tech) ? `<div class="chip-row">${chips(p.tech.slice(0, 5))}${p.tech.length > 5 ? `<span class="chip">+${p.tech.length - 5}</span>` : ""}</div>` : ""}
        </div>
      </article>`).join(""));

    if (rest.length) {
      html("#projectsArchive", `
        <div class="archive-head reveal"><h3>More projects</h3><span>${pad(rest.length)} entries</span></div>
        ${rest.map((p, k) => `
          <button class="archive-row reveal" data-cat="${slug(p.category || "")}" data-index="${p._i}" type="button">
            <span class="n">${pad(featured.length + k + 1)}</span>
            <span class="t">${esc(p.title)}<small>${esc(p.shortDescription)}</small></span>
            <span class="c">${esc(p.category)}</span>
            <span class="s">${esc((p.tech || []).slice(0, 3).join(" · "))}</span>
            <span class="a">${icon("arrow_forward")}</span>
          </button>`).join("")}`);
    } else $("#projectsArchive").remove();

    const layout = () => {
      const visible = $$(".work-card", $("#projectsGrid")).filter((c) => !c.classList.contains("is-hidden"));
      visible.forEach((c, i) => c.classList.toggle("lead", i === 0 && visible.length % 2 === 1));
      $("#projectsGrid").classList.toggle("is-hidden", !visible.length);
      const arch = $("#projectsArchive");
      if (arch) arch.classList.toggle("is-hidden", !$$(".archive-row", arch).some((r) => !r.classList.contains("is-hidden")));
    };
    layout();

    const filters = $("#projectFilters");
    if (filters) filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-selected", x === b); });
      const f = b.dataset.filter;
      $$("#projectsGrid .work-card, #projectsArchive .archive-row").forEach((el) => {
        el.classList.toggle("is-hidden", !(f === "*" || el.dataset.cat === f));
        el.classList.add("in-view");
      });
      layout();
    });

    const open = (e) => {
      const el = e.target.closest("[data-index]");
      if (el && !e.target.closest("a")) openProject(Number(el.dataset.index));
    };
    $("#projects").addEventListener("click", open);
    $("#projectsGrid").addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("work-card")) { e.preventDefault(); open(e); }
    });
  }

  /* ---------------- project dialog ---------------- */
  const pm = $("#projectModal");
  let pmState = null;

  function openProject(index) {
    const p = (D.projects || [])[index];
    if (!p) return;
    const steps = (has(p.steps) ? p.steps : [{ title: p.title, description: p.shortDescription }])
      .map((s) => Object.assign({}, s, { image: s.image || p.thumbnail }));

    $("#pmCategory").textContent = p.category || "";
    $("#pmTitle").textContent = p.title || "";

    const meta = [["Role", p.role], ["Timeline", p.duration], ["Client", p.client]].filter((m) => m[1])
      .map(([k, v]) => `<div class="row"><span>${k.toLowerCase()}</span><strong>${esc(v)}</strong></div>`).join("");
    const multi = steps.length > 1;

    html("#pmBody", `
      <div class="pm-top${multi ? " has-steps" : ""}">
        <div>
          <div class="slider">
            ${browserBar(p)}
            <div class="slides">${steps.map((s, i) => `<img src="${esc(s.image)}" alt="${esc(s.title)}" class="${i === 0 ? "active" : ""}" ${i ? 'loading="lazy"' : ""}>`).join("")}</div>
            ${multi ? `
              <button class="slide-nav prev" type="button" aria-label="Previous step">${icon("chevron_left")}</button>
              <button class="slide-nav next" type="button" aria-label="Next step">${icon("chevron_right")}</button>
              <span class="slide-count"><span id="pmNow">1</span> / ${steps.length}</span>` : ""}
          </div>
          <div class="cap"><h4 id="pmCapTitle">${esc(steps[0].title)}</h4><p id="pmCapDesc">${esc(steps[0].description)}</p></div>
        </div>
        <div>
          ${multi ? `<div class="pm-label">${icon("route")} Walkthrough</div>
          <ol class="steps">${steps.map((s, i) => `
            <li class="step ${i === 0 ? "active" : ""}" data-step="${i}" tabindex="0">
              <span class="num">${pad(i + 1)}</span>
              <div><div class="st">${esc(s.title)}</div><div class="sd">${esc(s.description)}</div></div>
            </li>`).join("")}</ol>` : `
          ${meta ? `<div class="pm-meta">${meta}</div>` : ""}
          <div class="pm-links">${projectLinks(p)}</div>`}
        </div>
      </div>
      <div class="pm-bottom">
        <div>
          <div class="pm-label">${icon("description")} Overview</div>
          <p class="ov">${esc(p.overview)}</p>
          ${has(p.features) ? `<div class="pm-label" style="margin-top:28px">${icon("checklist")} Key features</div>
          <ul class="features">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        </div>
        <div>
          ${multi && meta ? `<div class="pm-meta">${meta}</div>` : ""}
          ${has(p.tech) ? `<div class="pm-label" style="margin-top:${multi && meta ? 24 : 0}px">${icon("memory")} Tech stack</div><div class="chip-row">${chips(p.tech)}</div>` : ""}
          ${multi ? `<div class="pm-links">${projectLinks(p)}</div>` : ""}
        </div>
      </div>`);

    pmState = { steps, i: 0 };
    if (p.id) history.replaceState(null, "", "#project=" + encodeURIComponent(p.id));
    if (!pm.open) { pm.showModal(); document.body.classList.add("no-scroll"); }
    $(".pm-body", pm).scrollTop = 0;
  }

  function setStep(i) {
    if (!pmState) return;
    const n = pmState.steps.length;
    i = (i + n) % n;
    pmState.i = i;
    $$(".slides img", pm).forEach((img, k) => img.classList.toggle("active", k === i));
    $$(".step", pm).forEach((s, k) => { s.classList.toggle("active", k === i); s.classList.toggle("done", k < i); });
    const now = $("#pmNow"); if (now) now.textContent = i + 1;
    $("#pmCapTitle").textContent = pmState.steps[i].title;
    $("#pmCapDesc").textContent = pmState.steps[i].description;
  }

  function initProjectDialog() {
    pm.addEventListener("click", (e) => {
      if (e.target === pm) return pm.close();                  // backdrop click
      if (e.target.closest(".slide-nav.prev")) setStep(pmState.i - 1);
      else if (e.target.closest(".slide-nav.next")) setStep(pmState.i + 1);
      else if (e.target.closest(".step")) setStep(Number(e.target.closest(".step").dataset.step));
    });
    pm.addEventListener("keydown", (e) => {
      if (!pmState) return;
      if (e.key === "ArrowRight") setStep(pmState.i + 1);
      else if (e.key === "ArrowLeft") setStep(pmState.i - 1);
      else if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("step")) { e.preventDefault(); setStep(Number(e.target.dataset.step)); }
    });
    let x0 = null;
    pm.addEventListener("touchstart", (e) => { if (e.target.closest(".slides")) x0 = e.touches[0].clientX; }, { passive: true });
    pm.addEventListener("touchend", (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) setStep(pmState.i + (dx < 0 ? 1 : -1));
    });
    $("#pmClose").addEventListener("click", () => pm.close());
    pm.addEventListener("close", () => {
      pmState = null;
      document.body.classList.remove("no-scroll");
      if (location.hash.startsWith("#project=")) history.replaceState(null, "", location.pathname + location.search);
    });
  }

  function openFromHash() {
    const m = location.hash.match(/^#project=(.+)$/);
    if (!m) return;
    const idx = (D.projects || []).findIndex((p) => p.id === decodeURIComponent(m[1]));
    if (idx > -1) openProject(idx);
  }

  /* ---------------- education & certifications ---------------- */
  function renderEducation() {
    if (has(D.education)) {
      html("#educationList", `<div class="sub-head reveal"><span>Education</span><span>${pad(D.education.length)}</span></div>` +
        D.education.map((e) => `
        <div class="edu-item reveal">
          <div class="yr">${esc(e.start)}${e.end ? ` — ${esc(e.end)}` : ""}</div>
          <div>
            <h3>${esc(e.degree)}</h3>
            <p>${esc(e.institution)}</p>
            ${e.details ? `<p>${esc(e.details)}</p>` : ""}
          </div>
        </div>`).join(""));
    } else $("#educationList").remove();

    if (has(D.certifications)) {
      html("#certList", `<div class="sub-head reveal"><span>Certifications</span><span>${pad(D.certifications.length)}</span></div><div class="cert-list">` +
        D.certifications.map((c, i) => `
        <article class="cert spotlight reveal" style="--d:${i * 60}ms">
          <div class="seal">${icon("workspace_premium")}</div>
          <div>
            <h3>${esc(c.name)}</h3>
            <div class="issuer">${esc(c.issuer)}${c.year ? ` · ${esc(c.year)}` : ""}</div>
            ${(c.stars || c.note || c.credentialId) ? `<div class="extra">
              ${c.stars ? `<span class="stars" aria-label="${Number(c.stars)} of 5 stars">${[1, 2, 3, 4, 5].map((n) => icon("star", n <= c.stars ? "on" : "")).join("")}</span>` : ""}
              ${c.note ? `<span>${esc(c.note)}</span>` : ""}
              ${c.credentialId ? `<span>ID ${esc(c.credentialId)}</span>` : ""}
            </div>` : ""}
          </div>
          ${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener" class="verify">Verify ${icon("north_east")}</a>` : ""}
        </article>`).join("") + `</div>`);
    } else $("#certList").remove();
  }

  /* ---------------- testimonials ---------------- */
  function renderTestimonials() {
    if (!has(D.testimonials)) return;
    html("#testimonialsGrid", D.testimonials.map((t) => `
      <figure class="quote-card spotlight reveal" style="margin:0">
        <blockquote>${esc(t.quote)}</blockquote>
        <figcaption class="who">
          ${t.photo ? `<img src="${esc(t.photo)}" alt="" class="avatar">` : `<span class="avatar">${initials(t.name)}</span>`}
          <span><strong>${esc(t.name)}</strong><small>${esc(t.role)}</small></span>
        </figcaption>
      </figure>`).join(""));
  }

  /* ---------------- contact ---------------- */
  function renderContact() {
    const c = D.contact || {}, p = D.profile || {};
    const words = String(c.heading || "Get in touch").trim().split(/\s+/);
    const lastWord = words.length > 1 ? words.pop() : "";
    $("#contactHeading").innerHTML = `${esc(words.join(" "))}${lastWord ? ` <em>${esc(lastWord)}</em>` : ""}`;
    $("#contactText").textContent = c.text || "";

    if (p.email) {
      html("#contactEmail", `<a class="email-link" href="mailto:${esc(p.email)}">${esc(p.email)}</a>
        <button class="icon-btn" type="button" id="copyEmail" aria-label="Copy email address" title="Copy email">${icon("content_copy")}</button>`);
      $("#copyEmail").addEventListener("click", () => copy(p.email, "Email copied"));
    } else $("#contactEmail").remove();

    const rows = [
      ["phone", p.phone, p.phone ? "tel:" + p.phone.replace(/[^\d+]/g, "") : ""],
      ["location", p.location, ""],
      ["response", "Usually within 24 hours", ""]
    ].filter((r) => r[1]);
    html("#contactInfo", rows.map(([k, v, href]) => `<div class="row"><span>${k}</span>${href ? `<a href="${esc(href)}">${esc(v)}</a>` : `<span>${esc(v)}</span>`}</div>`).join(""));
    html("#contactSocials", socialLinks(D.socials));

    const form = $("#contactForm"), status = $("#formStatus");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add("was-validated"); form.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(form));
      if (c.formEndpoint) {
        status.className = "form-status"; status.textContent = "sending…";
        try {
          const res = await fetch(c.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) });
          if (!res.ok) throw new Error(res.status);
          status.classList.add("ok"); status.textContent = "✓ message sent — thank you!";
          form.reset(); form.classList.remove("was-validated");
        } catch (err) {
          status.classList.add("err"); status.textContent = "✗ couldn't send — please email me directly.";
        }
      } else {
        const body = `${data.message}\n\n— ${data.name} (${data.email})`;
        window.location.href = `mailto:${p.email || ""}?subject=${encodeURIComponent(data.subject || "Portfolio enquiry")}&body=${encodeURIComponent(body)}`;
      }
    });
  }

  /* ---------------- footer ---------------- */
  function renderFooter() {
    const p = D.profile || {};
    $("#footerText").textContent = ((D.footer && D.footer.text) || "").replace("{year}", new Date().getFullYear());
    $("#footerBig").textContent = p.name || "";
    const len = Math.max(4, String(p.name || "").length);
    $("#footerBig").style.fontSize = `min(${(92 / (0.6 * len)).toFixed(2)}vw, 13.5rem)`;
    const lm = new Date(document.lastModified);
    const stamp = isNaN(lm) ? "" : ` · updated ${lm.toLocaleString("en", { month: "short", year: "numeric" })}`;
    $("#footerMeta").textContent = `hand-built · html / css / js${stamp}`;
    html("#footerSocials", socialLinks(D.socials));
  }

  /* ---------------- theme ---------------- */
  function initTheme() {
    const btn = $("#themeToggle");
    const sync = () => {
      const t = document.documentElement.getAttribute("data-theme") || "dark";
      $(".material-symbols-rounded", btn).textContent = t === "dark" ? "light_mode" : "dark_mode";
      $('meta[name="theme-color"]').setAttribute("content", t === "dark" ? "#08090b" : "#f6f5f1");
    };
    sync();
    btn.addEventListener("click", toggleTheme);
    function toggleTheme() {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("portfolio-theme", next); } catch (e) { /* storage unavailable */ }
      sync();
    }
    return toggleTheme;
  }

  /* ---------------- scroll UI ---------------- */
  function initScrollUI() {
    const nav = $("#navWrap"), top = $("#backToTop"), bar = $("#scrollProgress");
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle("scrolled", y > 20);
      top.classList.toggle("show", y > 700);
      bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));

    // mobile menu
    const menuBtn = $("#menuToggle"), menu = $("#mobileMenu");
    const setMenu = (open) => {
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", open);
      $(".material-symbols-rounded", menuBtn).textContent = open ? "close" : "menu";
    };
    menuBtn.addEventListener("click", () => setMenu(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("click", (e) => { if (!menu.hidden && !e.target.closest("#navWrap")) setMenu(false); });

    // active nav link
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === en.target.id));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    }
  }

  /* ---------------- reveal on scroll ---------------- */
  function initReveal() {
    const done = (el) => {
      el.classList.add("in-view");
      $$(".bar i", el).forEach((b) => { b.style.width = b.dataset.level + "%"; });
      countUp(el);
    };
    if (!("IntersectionObserver" in window) || REDUCED) { $$(".reveal").forEach(done); countUp(document); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { done(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------------- cursor spotlight ---------------- */
  function initSpotlight() {
    if (!window.matchMedia("(hover: hover)").matches) return;
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest && e.target.closest(".spotlight");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------------- command palette ---------------- */
  function initCommandPalette(toggleTheme) {
    const dlg = $("#cmdk"), input = $("#cmdkInput"), list = $("#cmdkList");
    const p = D.profile || {};
    const go = (id) => () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" }); };
    const items = [
      ...SECTIONS.map(([id, label, , ic]) => ({ group: "Navigate", label, icon: icon(ic), hint: `#${id}`, run: go(id) })),
      ...(D.projects || []).map((pr, i) => ({ group: "Projects", label: pr.title, icon: icon("folder_open"), hint: pr.category, run: () => openProject(i) })),
      { group: "Actions", label: "Toggle light / dark theme", icon: icon("contrast"), run: toggleTheme },
      ...(p.email ? [
        { group: "Actions", label: "Copy email address", icon: icon("content_copy"), hint: p.email, run: () => copy(p.email, "Email copied") },
        { group: "Actions", label: "Send an email", icon: icon("mail"), run: () => { location.href = "mailto:" + p.email; } }
      ] : []),
      ...(p.resume ? [{ group: "Actions", label: "Download CV", icon: icon("download"), run: () => { const a = document.createElement("a"); a.href = p.resume; a.download = ""; a.click(); } }] : []),
      ...(D.socials || []).filter((s) => s.url).map((s) => ({ group: "Links", label: `Open ${s.name}`, icon: brandIcon(s.icon), hint: host(s.url), run: () => window.open(s.url, "_blank", "noopener") }))
    ];
    let shown = [], sel = 0;

    function draw() {
      const q = input.value.trim().toLowerCase();
      shown = items.filter((it) => !q || `${it.label} ${it.hint || ""} ${it.group}`.toLowerCase().includes(q));
      sel = Math.min(sel, Math.max(0, shown.length - 1));
      if (!shown.length) { list.innerHTML = `<li class="cmdk-empty">No results for “${esc(input.value)}”</li>`; return; }
      let g = "", out = "";
      shown.forEach((it, i) => {
        if (it.group !== g) { g = it.group; out += `<li class="cmdk-group" role="presentation">${esc(g)}</li>`; }
        out += `<li class="cmdk-item" role="option" id="cmdk-${i}" data-i="${i}" aria-selected="${i === sel}">${it.icon}<span>${esc(it.label)}</span>${it.hint ? `<small>${esc(it.hint)}</small>` : ""}</li>`;
      });
      list.innerHTML = out;
      input.setAttribute("aria-activedescendant", `cmdk-${sel}`);
      const cur = $(`#cmdk-${sel}`); if (cur) cur.scrollIntoView({ block: "nearest" });
    }
    function run(i) {
      const it = shown[i];
      if (!it) return;
      dlg.close();
      setTimeout(it.run, 60);
    }
    function open() {
      if (pm.open) pm.close();
      input.value = ""; sel = 0; draw();
      dlg.showModal(); input.focus();
    }

    $("#cmdkOpen").addEventListener("click", open);
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); dlg.open ? dlg.close() : open(); }
      else if (e.key === "/" && !dlg.open && !pm.open && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });
    input.addEventListener("input", () => { sel = 0; draw(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(1, shown.length); draw(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + shown.length) % Math.max(1, shown.length); draw(); }
      else if (e.key === "Enter") { e.preventDefault(); run(sel); }
    });
    list.addEventListener("click", (e) => { const li = e.target.closest(".cmdk-item"); if (li) run(Number(li.dataset.i)); });
    list.addEventListener("pointermove", (e) => {
      const li = e.target.closest(".cmdk-item");
      if (li && Number(li.dataset.i) !== sel) { sel = Number(li.dataset.i); $$(".cmdk-item", list).forEach((x) => x.setAttribute("aria-selected", x === li)); }
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  }

  /* ---------------- boot ---------------- */
  function boot() {
    const toggleTheme = initTheme();
    renderMeta();
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderProjects();
    renderEducation();
    renderTestimonials();
    renderContact();
    renderFooter();

    initProjectDialog();
    initScrollUI();
    initReveal();
    initSpotlight();
    initCommandPalette(toggleTheme);
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
