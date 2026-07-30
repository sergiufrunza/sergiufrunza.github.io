  // theme: saved choice wins, else system preference
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
  else if (matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
  const themeBtn = document.getElementById("theme");
  const flipTheme = () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
  };
  themeBtn.onclick = () => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm || !document.startViewTransition) return flipTheme();
    // the new theme wipes in as a circle spreading from the toggle
    const r = themeBtn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const far = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add("theme-vt");
    const vt = document.startViewTransition(flipTheme);
    vt.ready.then(() => root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${far}px at ${x}px ${y}px)`] },
      { duration: 480, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
    ));
    vt.finished.finally(() => root.classList.remove("theme-vt"));
  };

  // mobile menu
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menu");
  menuBtn.onclick = () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "✕" : "☰";
  };
  nav.querySelectorAll("a").forEach(a => a.onclick = () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });

  // i18n: English lives in the markup; RO overrides by data-i18n key
  const RO = {
    eyebrow: "200 OK · livrez în producție",
    sub: '<b>Inginer Python</b> cu 4+ ani de experiență în construirea sistemelor backend end-to-end — de la <b>API-uri</b> bine proiectate la <b>modelare de date</b> solidă, <b>automatizarea proceselor</b> și servicii fiabile în producție. Inginerie pragmatică pe stack-uri FastAPI și Django.',
    email_btn: "Scrie-mi",
    resp_exp: "<b>200</b> · 7 poziții · 4+ ani",
    resp_skills: "<b>200</b> · 7 grupuri",
    resp_collab: "<b>200</b> · 4 colaborări",
    resp_contact: "<b>201</b> · răspund într-o zi",
    d_gd: "sep 2025 – prezent",
    d_milzo: "oct 2025 – prezent",
    d_profit: "iul 2025 – sep 2025",
    d_feb: "feb 2023 – mai 2025",
    j_gd: '<li>Proiectez servicii de crawling, colectare de date și statistici pe FastAPI, asyncio și Kafka, rulând ca workeri concurenți pe Kubernetes.</li><li>Am migrat un serviciu din Django sincron în <b>FastAPI asincron</b> pentru volum mare de request-uri, reproiectând structura și logica de business.</li><li>Am construit un <b>agregator de provideri</b> care consolidează date din multiple API-uri externe — minimizând costurile prin caching și reutilizarea răspunsurilor între servicii.</li><li>Am dezvoltat un <b>sistem de parsare continuă a site-urilor</b> care extrage și normalizează conținut prin pipeline-uri de reguli bazate pe regex.</li><li>Am gestionat deployment-ul prin GitLab CI/CD și manifeste Kubernetes; am optimizat Postgres pentru ingestie la volum mare.</li><li>Am construit <b>dashboard-uri</b> interne pentru monitorizarea statisticilor de colectare, a throughput-ului workerilor și a stării pipeline-urilor.</li>',
    j_milzo: '<li>Am integrat endpoint-uri noi și am restructurat API-uri legacy pentru consistență și mentenabilitate.</li><li>Am construit logica de endpoints pentru widgets.</li><li>Am optimizat interogările în baza de date, reducând timpii de răspuns pe endpoint-urile cu trafic mare.</li><li>Îmbunătățire continuă a endpoints și a logicii de business — abonamente, logica de creare și gestionare a proiectelor, permisiuni.</li>',
    j_profit: '<li>Am implementat <b>fluxuri KYC</b> și am integrat <b>sisteme de plăți crypto</b> cu tranzacții sigure și fiabile.</li><li>Am optimizat schema bazei de date pentru performanță SQL și latență redusă.</li><li>Monitorizare și debugging cu <b>Portainer</b>.</li><li>Monitorizarea și întreținerea parserilor continui din <b>Airflow</b>.</li>',
    j_fs: '<li>Am construit interfețe responsive cu <b>HTML, CSS, JavaScript vanilla</b> și <b>Vue</b>.</li><li>Am proiectat interfețe în <b>Figma</b>.</li><li>Am realizat <b>sisteme de prindere de leaduri</b> prin calculatoare interactive.</li><li>Am proiectat și realizat baze de date relaționale și non-relaționale; tuning de performanță și interogări eficiente.</li><li>Am integrat servicii terțe — email, alerte Slack, notificări AWS — pentru monitorizare și comunicare.</li><li>Am lucrat cu servicii <b>AWS</b> — RDS, CodeBuild, load balancere, pipeline-uri CI/CD, containere Docker, S3 și CloudFront.</li><li>Web scraping și extragere de date, cu date curățate integrate în fluxuri de business.</li>',
    j_free: '<li>Am construit un <b>bot de Telegram cu AI</b> pentru alerte în timp real bazate pe analiza mesajelor cu GPT.</li><li>Am dezvoltat parsere asincrone cu Playwright și aiohttp, rulate pe mai mulți workeri.</li><li>Am refactorizat servicii backend pe FastAPI; dezvoltare și deployment cu Docker.</li><li>Colectare continuă a statisticilor per fiecare account, cu crearea și actualizarea în timp semi-real a datelor financiare în tabele custom în <b>Google Sheets</b>.</li>',
    j_medpark: '<li><b>Dashboard admin</b> pentru trimiterea de mesaje și emailuri către clienții Medpark.</li>',
    j_neo: '<li>Tool AI pentru îmbogățirea datelor produselor în diferite limbi.</li><li>Consultare pentru optimizarea site-ului.</li><li>Serviciul realizat a fost deploy-at pe serverul lor.</li>',
    edu_u: "Universitatea Tehnică a Moldovei",
    edu_u_p: "Licență, Automatică și Informatică — media 9.39 · Chișinău",
    edu_h: "Liceul Teoretic «Ion Creangă»",
    edu_h_p: "Profil Științe ale Naturii — media 8.82 · Bălți",
    l_ro: "Română",
    l_ru: "Rusă",
    l_en: "Engleză",
    hint: "// trimite un request — orice canal merge",
    footer_up: '<span class="up">●</span> toate sistemele funcționează',
    footer_c: "© 2026 Sergiu Frunză · alături de prietenul său Claude",
    cv_btn: "Salvează CV-ul",
    kbd_hint: 'Apasă <kbd>⌘</kbd><kbd>K</kbd> pentru a naviga oriunde',
    sk_legend: '<span class="dot-core"></span> core — folosit zilnic <span class="sep">·</span> <span class="dot-fam"></span> cunoștințe de lucru',
    term_ph: "încearcă: help, skills, cv",
    pal_ph: "Sari la o secțiune sau rulează o comandă…"
  };
  const EN = {};
  const onLang = [];
  const langBtn = document.getElementById("lang");
  function setLang(l) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.dataset.i18n;
      if (!(k in EN)) EN[k] = el.innerHTML;
      el.innerHTML = l === "ro" ? RO[k] : EN[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const k = el.dataset.i18nPh;
      if (!(k in EN)) EN[k] = el.placeholder;
      el.placeholder = l === "ro" ? RO[k] : EN[k];
    });
    root.lang = l;
    langBtn.textContent = l === "ro" ? "EN" : "RO";
    localStorage.setItem("lang", l);
    onLang.forEach(fn => fn());
  }
  langBtn.onclick = () => {
    const next = root.lang === "ro" ? "en" : "ro";
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // a view transition crossfades the swapped copy instead of snapping it
    if (calm || !document.startViewTransition) return setLang(next);
    document.startViewTransition(() => setLang(next));
  };
  // ?lang=ro wins over the stored choice — it is how the PDFs get rendered per language
  const urlLang = new URLSearchParams(location.search).get("lang");
  if (urlLang === "ro" || urlLang === "en") setLang(urlLang);
  else if (localStorage.getItem("lang") === "ro") setLang("ro");

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const t = (en, ro) => (root.lang === "ro" ? ro : en);

  // real page response time, not a hardcoded number
  document.getElementById("rt").textContent = Math.max(1, Math.round(performance.now())) + "ms";

  // core stack gets a filled marker; everything else stays hollow
  const CORE = new Set(["Python", "SQL", "FastAPI", "Django", "asyncio", "aiohttp", "PostgreSQL",
    "Redis", "Kafka", "Celery", "Docker", "Kubernetes", "GitLab CI/CD", "Git", "Postman"]);
  document.querySelectorAll(".tag").forEach(el => {
    if (CORE.has(el.textContent.trim())) el.classList.add("core");
  });

  // toast
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1900);
  }
  // execCommand is the fallback for contexts where the async clipboard is blocked
  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let done = false;
    try { done = document.execCommand("copy"); } catch (e) { done = false; }
    ta.remove();
    return done;
  }
  function copy(text) {
    const won = () => toast(t("Copied · ", "Copiat · ") + text);
    const lost = () => legacyCopy(text) ? won() : toast(t("Copy failed", "Copierea a eșuat"));
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(won).catch(lost);
    else lost();
  }

  // copy buttons next to email and phone (the links themselves keep working)
  const copyBtns = [];
  document.querySelectorAll('#contact a[href^="mailto:"], #contact a[href^="tel:"]').forEach(a => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "copy-btn";
    b.textContent = "⧉";
    b.onclick = () => copy(a.textContent.trim());
    copyBtns.push([b, a]);
    a.after(b);
  });
  function labelCopyBtns() {
    copyBtns.forEach(([b, a]) => b.setAttribute("aria-label", t("Copy ", "Copiază ") + a.textContent.trim()));
  }
  labelCopyBtns();
  onLang.push(labelCopyBtns);

  // the CV is this page printed, so it always matches what is on screen
  // Printing renders the page as it is right now; the PDFs are the same thing
  // pre-rendered by make-cv.sh so the button can just download.
  function printCv() {
    // sections still waiting on the scroll observer would print blank
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("revealed"));
    toast(t("Opening print — pick “Save as PDF”", "Se deschide printarea — alege „Salvează ca PDF”"));
    // let the layout settle before the print snapshot is taken
    setTimeout(() => window.print(), 150);
  }
  function downloadCv() {
    const file = `cv-sergiu-frunza-${root.lang === "ro" ? "ro" : "en"}.pdf`;
    const a = document.createElement("a");
    a.href = file;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast(t("Downloading CV…", "Se descarcă CV-ul…"));
  }
  document.getElementById("printCv").onclick = downloadCv;

  // ---- interactive terminal ----
  const term = document.getElementById("term");
  const termForm = document.getElementById("termForm");
  const termIn = document.getElementById("termIn");
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  function print(html, cls) {
    const el = document.createElement("span");
    el.className = "ln on" + (cls ? " " + cls : "");
    el.innerHTML = html;
    term.appendChild(el);
    term.scrollTop = term.scrollHeight;
  }
  const status = (s = "200 OK") => print(`<span class="t-ok">HTTP/1.1 ${s}</span>`);
  const gap = () => print("&nbsp;");
  const pad = (s, n) => s + " ".repeat(Math.max(1, n - s.length));

  const CMD = {
    help() {
      print(t("Available commands:", "Comenzi disponibile:"), "t-dim");
      [["help", t("this list", "această listă")],
       ["whoami", t("who I am", "cine sunt")],
       ["ls", t("list endpoints", "listează endpoint-urile")],
       ["experience", t("work history", "experiența")],
       ["skills", t("tech stack", "stack-ul tehnic")],
       ["contact", t("how to reach me", "cum mă contactezi")],
       ["cv", t("download the PDF", "descarcă PDF-ul")],
       ["print", t("print the live page", "printează pagina live")],
       ["theme", t("toggle dark mode", "schimbă tema")],
       ["lang", t("switch EN / RO", "schimbă EN / RO")],
       ["clear", t("clear the screen", "curăță ecranul")]]
        .forEach(([c, d]) => print(`  <span class="t-key">${pad(c, 12)}</span><span class="t-dim">${d}</span>`));
    },
    whoami() {
      status(); gap();
      print('<span class="t-str">{</span>');
      print('  <span class="t-key">"name"</span>: <span class="t-str">"Sergiu Frunză"</span>,');
      print('  <span class="t-key">"role"</span>: <span class="t-str">"Python Backend Engineer"</span>,');
      print('  <span class="t-key">"location"</span>: <span class="t-str">"Chișinău, Moldova"</span>,');
      print('  <span class="t-key">"experience_years"</span>: <span class="t-str">4</span>');
      print('<span class="t-str">}</span>');
    },
    ls() {
      status(); gap();
      document.querySelectorAll(".endpoint").forEach(h => {
        const m = h.querySelector(".method").textContent.trim();
        const p = h.querySelector(".path").textContent.trim();
        print(`  <span class="t-key">${pad(m, 6)}</span><span class="t-str">${p}</span>`);
      });
    },
    experience() {
      status(); gap();
      print('<span class="t-str">[</span>');
      document.querySelectorAll(".timeline .card").forEach(c => {
        const role = c.querySelector("h3").textContent.replace(/\s+/g, " ").trim();
        const date = c.querySelector(".date");
        print(`  <span class="t-str">"${esc(role)}"</span>` +
          (date ? ` <span class="t-dim">// ${esc(date.textContent.trim())}</span>` : ""));
      });
      print('<span class="t-str">]</span>');
    },
    skills() {
      status(); gap();
      document.querySelectorAll(".skill-row").forEach(r => {
        const g = r.querySelector("b").textContent.trim();
        const items = [...r.querySelectorAll(".tag")].map(x => x.textContent.trim()).join(", ");
        print(`  <span class="t-key">"${g}"</span>: <span class="t-str">${esc(items)}</span>`);
      });
    },
    contact() {
      status("201 Created"); gap();
      print('  <span class="t-key">"email"</span>: <span class="t-str">"sergiu.frunza120@gmail.com"</span>,');
      print('  <span class="t-key">"phone"</span>: <span class="t-str">"+373 78 496 209"</span>,');
      print('  <span class="t-key">"linkedin"</span>: <span class="t-str">"linkedin.com/in/sergiu-frunză"</span>');
    },
    cv() {
      status();
      print('<span class="t-dim">content-type: application/pdf</span>');
      print(`<span class="t-dim">content-language: ${root.lang === "ro" ? "ro" : "en"}</span>`);
      gap();
      print(t("downloading…", "se descarcă…"), "t-str");
      downloadCv();
    },
    print() {
      print(t("rendering the live page — pick “Save as PDF”…",
              "randez pagina live — alege „Salvează ca PDF”…"), "t-dim");
      printCv();
    },
    theme() {
      document.getElementById("theme").click();
      print(t("theme: ", "temă: ") + (root.dataset.theme || "light"), "t-dim");
    },
    lang() {
      langBtn.click();
      print(root.lang === "ro" ? "limbă: română" : "language: english", "t-dim");
    },
    clear() { term.innerHTML = ""; },
    sudo() { print(t("nice try — you already have root here.", "bună încercare — deja ai root aici."), "t-dim"); }
  };

  const ALIAS = {
    me: "whoami", who: "whoami", exp: "experience", work: "experience", jobs: "experience",
    stack: "skills", skill: "skills", resume: "cv", download: "cv", pdf: "cv",
    endpoints: "ls", dir: "ls", "?": "help", man: "help", cls: "clear",
    dark: "theme", light: "theme", ro: "lang", en: "lang", education: "ls", collaborations: "ls"
  };

  const history = [];
  let histIdx = -1;

  function run(raw) {
    const input = raw.trim();
    if (!input) return;
    print("$ " + esc(input), "t-cmd");
    history.push(input);
    histIdx = history.length;
    let c = input.toLowerCase()
      .replace(/^curl\s+/, "")
      .replace(/^-\w+\s+/, "")
      .replace(/^(get|post)\s+/, "")
      .replace(/^https?:\/\/[^\s/]+/, "")
      .replace(/^\/?v1\//, "")
      .replace(/^\//, "")
      .trim();
    c = ALIAS[c] || c;
    if (CMD[c]) CMD[c]();
    else print(t(`command not found: ${esc(input)} — type `, `comandă negăsită: ${esc(input)} — scrie `) +
      '<b class="t-key">help</b>', "t-dim");
    gap();
  }

  termForm.onsubmit = e => {
    e.preventDefault();
    const v = termIn.value;
    termIn.value = "";
    run(v);
  };
  termIn.onkeydown = e => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    if (!history.length) return;
    histIdx = e.key === "ArrowUp"
      ? Math.max(0, histIdx - 1)
      : Math.min(history.length, histIdx + 1);
    termIn.value = history[histIdx] || "";
  };

  // terminal: reveal lines like a streaming response, then hand over to the user
  function activateTerminal() {
    const caret = document.querySelector("#term .caret");
    if (caret) caret.remove();
    termForm.hidden = false;
  }
  if (reduced) {
    activateTerminal();
  } else {
    // request and status lines land deliberately, the JSON body streams in fast
    let d = 180;
    const lines = document.querySelectorAll("#term .ln");
    lines.forEach((ln, i) => {
      d += i < 3 ? 190 : 45;
      setTimeout(() => ln.classList.add("on"), d);
    });
    setTimeout(activateTerminal, d + 150);
  }

  // ---- command palette (⌘K) ----
  const palette = document.getElementById("palette");
  const palIn = document.getElementById("palIn");
  const palList = document.getElementById("palList");
  let palItems = [], palIdx = 0;

  const actions = () => [
    ...[...document.querySelectorAll("section[id]")].map(s => ({
      label: (s.querySelector(".path") || { textContent: "#" + s.id }).textContent.trim(),
      kind: t("section", "secțiune"),
      run: () => s.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })
    })),
    { label: t("Download CV (PDF)", "Descarcă CV-ul (PDF)"), kind: t("action", "acțiune"), run: downloadCv },
    { label: t("Print this page", "Printează pagina"), kind: t("action", "acțiune"), run: printCv },
    { label: t("Toggle dark mode", "Schimbă tema"), kind: t("action", "acțiune"), run: () => document.getElementById("theme").click() },
    { label: t("Switch language EN / RO", "Schimbă limba EN / RO"), kind: t("action", "acțiune"), run: () => langBtn.click() },
    { label: t("Copy email", "Copiază emailul"), kind: t("action", "acțiune"), run: () => copy("sergiu.frunza120@gmail.com") },
    { label: t("Copy phone", "Copiază telefonul"), kind: t("action", "acțiune"), run: () => copy("+373 78 496 209") },
    { label: "LinkedIn", kind: t("link", "link"), run: () => window.open("https://www.linkedin.com/in/sergiu-frunză", "_blank", "noopener") }
  ];

  function palSelect(i) {
    palIdx = i;
    [...palList.querySelectorAll("li[role=option]")].forEach((li, n) => {
      li.setAttribute("aria-selected", n === i);
      if (n === i) li.scrollIntoView({ block: "nearest" });
    });
  }
  function palRender() {
    const q = palIn.value.toLowerCase().trim();
    palItems = actions().filter(a => (a.label + " " + a.kind).toLowerCase().includes(q));
    palList.innerHTML = "";
    if (!palItems.length) {
      palList.innerHTML = `<li class="pal-empty">${t("No matches", "Niciun rezultat")}</li>`;
      return;
    }
    palItems.forEach((a, i) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.innerHTML = `<span>${a.label}</span><span class="pal-kind">${a.kind}</span>`;
      li.onclick = () => palRun(i);
      li.onmousemove = () => palSelect(i);
      palList.appendChild(li);
    });
    palSelect(0);
  }
  function palRun(i) {
    const a = palItems[i];
    palClose();
    if (a) a.run();
  }
  function palOpen() {
    palette.hidden = false;
    palIn.value = "";
    palRender();
    palIn.focus();
  }
  function palClose() { palette.hidden = true; }

  addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.hidden ? palOpen() : palClose();
      return;
    }
    if (palette.hidden || !palItems.length) {
      if (!palette.hidden && e.key === "Escape") palClose();
      return;
    }
    if (e.key === "Escape") palClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); palSelect((palIdx + 1) % palItems.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); palSelect((palIdx - 1 + palItems.length) % palItems.length); }
    else if (e.key === "Enter") { e.preventDefault(); palRun(palIdx); }
  });
  palIn.oninput = palRender;
  palette.onclick = e => { if (e.target === palette) palClose(); };

  // a section reaching the viewport answers like an endpoint: pending, then its status
  function respond(section) {
    section.querySelectorAll(".endpoint").forEach(ep => {
      // endpoints without a status badge stay quiet on purpose
      if (reduced || !ep.querySelector(".resp")) return;
      const badge = document.createElement("span");
      badge.className = "pending-badge";
      badge.innerHTML = '<span class="spin"></span>' + t("pending", "în curs");
      ep.classList.add("pending");
      ep.appendChild(badge);
      section.classList.add("awaiting");   // body holds until the response lands
      const t0 = performance.now();
      setTimeout(() => {
        const lat = document.createElement("span");
        lat.className = "lat";
        lat.textContent = "· " + Math.round(performance.now() - t0) + "ms";
        ep.appendChild(lat);
        requestAnimationFrame(() => {
          ep.classList.remove("pending");
          section.classList.remove("awaiting");
          badge.remove();
        });
      }, 300 + Math.random() * 100);
    });
  }

  // experience cards stream in one after another
  document.querySelectorAll(".timeline .card").forEach((c, i) => {
    c.style.transitionDelay = i * 55 + "ms";
  });

  // scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("revealed");
      respond(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
