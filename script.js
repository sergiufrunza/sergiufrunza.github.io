  // theme: saved choice wins, else system preference
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
  else if (matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
  document.getElementById("theme").onclick = () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
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
    j_gd: '<li>Proiectez servicii de crawling, colectare de date și statistici pe FastAPI, asyncio și Kafka, rulând ca workeri concurenți pe Kubernetes.</li><li>Am construit un <b>agregator de provideri</b> care consolidează date din multiple API-uri externe — minimizând costurile prin caching și reutilizarea răspunsurilor între servicii.</li><li>Am dezvoltat un <b>sistem de parsare continuă a site-urilor</b> care extrage și normalizează conținut prin pipeline-uri de reguli bazate pe regex.</li><li>Am integrat <b>pipeline-uri OCR</b> (Marker, Docling) pentru extragerea textului și tabelelor din PDF-uri și documente scanate.</li><li>Am gestionat deployment-ul prin GitLab CI/CD și manifeste Kubernetes; am optimizat Postgres pentru ingestie la volum mare.</li><li>Am construit <b>dashboard-uri</b> interne pentru monitorizarea statisticilor de colectare, a throughput-ului workerilor și a stării pipeline-urilor.</li>',
    j_milzo: '<li>Am integrat endpoint-uri noi și am restructurat API-uri legacy pentru consistență și mentenabilitate.</li><li>Am optimizat interogările în baza de date, reducând timpii de răspuns pe endpoint-urile cu trafic mare.</li><li>Am construit servicii de import/export pentru schimb structurat de date cu sisteme externe.</li>',
    j_profit: '<li>Am migrat un serviciu din Django sincron în <b>FastAPI asincron</b> pentru volum mare de request-uri, reproiectând structura și logica de business.</li><li>Am implementat <b>fluxuri KYC</b> și am integrat <b>sisteme de plăți crypto</b> cu tranzacții sigure și fiabile.</li><li>Am optimizat schema bazei de date pentru performanță SQL și latență redusă.</li>',
    j_fs: '<li>Am construit și întreținut aplicații front-end responsive și servicii back-end și API-uri scalabile.</li><li>Am integrat servicii terțe — email, alerte Slack, notificări AWS — pentru monitorizare și comunicare.</li><li>Am proiectat baze de date relaționale și non-relaționale; tuning de performanță și interogări eficiente.</li><li>Web scraping și extragere de date, cu date curățate integrate în fluxuri de business.</li>',
    j_free: '<li>Am construit un <b>bot de Telegram cu AI</b> pentru alerte în timp real bazate pe analiza mesajelor cu GPT.</li><li>Am dezvoltat parsere asincrone cu Playwright și aiohttp, rulate pe mai mulți workeri.</li><li>Am refactorizat servicii backend pe FastAPI; dezvoltare și deployment cu Docker.</li><li>Am automatizat raportarea lunară cu statistici generate în Google Sheets.</li><li>Am construit API-uri, webhook-uri și microservicii pentru comunicare modulară, în timp real, între servicii.</li>',
    j_medpark: '<li>Tool pentru trimiterea de mesaje și emailuri către clienții Medpark.</li>',
    j_neo: '<li>Tool AI pentru îmbogățirea datelor produselor în diferite limbi.</li>',
    edu_u: "Universitatea Tehnică a Moldovei",
    edu_u_p: "Licență, Automatică și Informatică — media 9.39 · Chișinău",
    edu_h: "Liceul Teoretic «Ion Creangă»",
    edu_h_p: "Profil Științe ale Naturii — media 8.82 · Bălți",
    l_ro: "Română",
    l_ru: "Rusă",
    l_en: "Engleză",
    hint: "// trimite un request — orice canal merge",
    footer_up: '<span class="up">●</span> toate sistemele funcționează',
    footer_c: "© 2026 Sergiu Frunză · alături de prietenul său Claude"
  };
  const EN = {};
  const langBtn = document.getElementById("lang");
  function setLang(l) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.dataset.i18n;
      if (!(k in EN)) EN[k] = el.innerHTML;
      el.innerHTML = l === "ro" ? RO[k] : EN[k];
    });
    root.lang = l;
    langBtn.textContent = l === "ro" ? "EN" : "RO";
    localStorage.setItem("lang", l);
  }
  langBtn.onclick = () => setLang(root.lang === "ro" ? "en" : "ro");
  if (localStorage.getItem("lang") === "ro") setLang("ro");

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // terminal: reveal lines like a streaming response
  if (!reduced) {
    const lines = document.querySelectorAll("#term .ln");
    lines.forEach((ln, i) => setTimeout(() => ln.classList.add("on"), 350 + i * (i < 3 ? 420 : 130)));
  }

  // scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
