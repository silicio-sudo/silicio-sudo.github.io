/* ============================================================
   silicio-sudo · portfolio — lógica principal
   ============================================================ */
(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const $ = (sel) => document.querySelector(sel);

  /* ---------- animación de aparición (reveal) ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  function observeReveals() {
    document.querySelectorAll(".reveal:not(.observed)").forEach((el) => {
      el.classList.add("observed");
      observer.observe(el);
    });
  }

  /* ---------- máquina de escribir ---------- */
  const PHRASES = [
    "Creo apps Android que resuelven problemas reales.",
    "Código, hardware y ciberseguridad.",
    "30+ años de experiencia, en código abierto.",
    "De Cantabria para el mundo."
  ];

  function initTypewriter() {
    const el = $("#typed");
    if (!el) return;
    let phrase = 0, char = 0, deleting = false;

    function tick() {
      const current = PHRASES[phrase];
      if (!deleting) {
        char++;
        el.textContent = current.slice(0, char);
        if (char === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 42);
      } else {
        char--;
        el.textContent = current.slice(0, char);
        if (char === 0) {
          deleting = false;
          phrase = (phrase + 1) % PHRASES.length;
          setTimeout(tick, 320);
          return;
        }
        setTimeout(tick, 22);
      }
    }
    tick();
  }

  /* ---------- cursor glow ---------- */
  function initCursorGlow() {
    const glow = $("#cursorGlow");
    if (!glow || matchMedia("(pointer: coarse)").matches) return;
    window.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  /* ---------- barra de progreso de scroll ---------- */
  function initScrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- menú móvil ---------- */
  function initMenu() {
    const btn = $("#hamburger");
    const links = $("#navLinks");
    if (!btn || !links) return;
    btn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        btn.classList.remove("open");
      }
    });
  }

  /* ---------- datos de GitHub ---------- */
  function pickEmoji(name, topics) {
    const haystack = [name, ...(topics || [])].join(" ");
    for (const [re, emoji] of AUTO_EMOJI) {
      if (re.test(haystack)) return emoji;
    }
    return "📦";
  }

  function buildCards(repos) {
    const grid = $("#projectsGrid");
    const status = $("#projectsStatus");
    if (!grid) return;

    if (!repos.length) {
      grid.innerHTML =
        '<p class="loading">No se pudieron cargar los proyectos. Revisa tu conexión.</p>';
      if (status) status.textContent = "⚠️ Sin datos de GitHub.";
      return;
    }

    // Ordenar: curados primero por su orden, luego por fecha de creación
    const sorted = repos.slice().sort((a, b) => {
      const oa = a._order ?? 9999;
      const ob = b._order ?? 9999;
      if (oa !== ob) return oa - ob;
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

    grid.innerHTML = sorted.map((r) => cardHTML(r)).join("");

    let live = repos.some((r) => r._live);
    if (status) {
      status.textContent = live
        ? "✔ Sincronizado con GitHub — " + repos.length + " repositorios cargados."
        : "· Mostrando proyectos curados (API de GitHub no disponible).";
    }

    // efectos por tarjeta
    grid.querySelectorAll(".card").forEach(bindCard);
    observeReveals();
  }

  function cardHTML(r) {
    const accent = r.color || AUTO_COLORS[0];
    const features = r.features && r.features.length
      ? '<ul class="card-features">' +
          r.features.map((f) => "<li>" + esc(f) + "</li>").join("") +
        "</ul>"
      : "";

    const tags = (r.tech || []).concat(r.topics || []).slice(0, 6);
    const tagsHTML = tags.length
      ? '<div class="card-tags">' +
          tags.map((t) => "<span>" + esc(t) + "</span>").join("") +
        "</div>"
      : "";

    const langHTML = r.language
      ? '<span class="card-lang">' + esc(r.language) + "</span>"
      : '<span class="card-lang">App</span>';

    const starsHTML =
      typeof r.stars === "number"
        ? '<span class="card-stars"><span class="star">★</span> ' + r.stars + "</span>"
        : "";

    return (
      '<article class="card reveal" style="--a:' + accent + '">' +
        '<div class="card-top">' +
          '<div class="card-emoji">' + esc(r.emoji) + "</div>" +
          langHTML +
        "</div>" +
        '<h3 class="card-title">' + esc(r.name) + "</h3>" +
        '<p class="card-desc">' + esc(r.description) + "</p>" +
        features +
        tagsHTML +
        '<div class="card-foot">' +
          '<a class="card-link" href="' + esc(r.html_url) + '" target="_blank" rel="noopener">Ver repo ↗</a>' +
          starsHTML +
        "</div>" +
      "</article>"
    );
  }

  function bindCard(card) {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mx", x + "px");
      card.style.setProperty("--my", y + "px");
      if (matchMedia("(pointer: fine)").matches) {
        const rx = ((y / rect.height) - 0.5) * -8;
        const ry = ((x / rect.width) - 0.5) * 8;
        card.style.transform =
          "perspective(800px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
      }
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  }

  /* ---------- cargar y fusionar datos ---------- */
  async function load() {
    const grid = $("#projectsGrid");
    if (grid) grid.innerHTML = '<p class="loading">Cargando proyectos desde GitHub…</p>';
    let repos = [];

    // Empezamos con los proyectos curados
    repos = Object.entries(CURATED).map(([key, c]) => ({
      name: c.order === undefined ? key : displayName(key, c),
      _key: key,
      _order: c.order ?? 9999,
      _live: false,
      emoji: c.emoji,
      color: c.color,
      description: c.description,
      features: c.features,
      tech: c.tech,
      topics: [],
      html_url: "https://github.com/" + GITHUB_USER + "/" + key,
      stars: undefined,
      language: null,
      created_at: null
    }));

    // Intentamos enriquecer con la API de GitHub
    try {
      const res = await fetch(
        "https://api.github.com/users/" + GITHUB_USER + "/repos?per_page=100&sort=updated",
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          const byKey = new Map();
          data.forEach((gh) => byKey.set(gh.name.toLowerCase(), gh));

          // 1) enriquece los curados
          repos = repos.map((r) => {
            const gh = byKey.get(r._key);
            if (!gh) return r;
            return {
              ...r,
              _live: true,
              html_url: gh.html_url || r.html_url,
              stars: gh.stargazers_count,
              language: gh.language || r.language,
              topics: gh.topics || [],
              created_at: gh.created_at
            };
          });

          // 2) añade repos de GitHub que no estén curados
          const existing = new Set(repos.map((r) => r._key));
          let autoIdx = 0;
          data.forEach((gh) => {
            const key = gh.name.toLowerCase();
            if (existing.has(key)) return;
            existing.add(key);
            repos.push({
              name: gh.name,
              _key: key,
              _order: 100 + autoIdx,
              _live: true,
              emoji: pickEmoji(gh.name, gh.topics),
              color: AUTO_COLORS[autoIdx % AUTO_COLORS.length],
              description: gh.description || "Aplicación para Android.",
              features: [],
              tech: [],
              topics: gh.topics || [],
              html_url: gh.html_url,
              stars: gh.stargazers_count,
              language: gh.language,
              created_at: gh.created_at
            });
            autoIdx++;
          });
        }
      }
    } catch (_) {
      /* sin red o rate-limit: seguimos con los curados */
    }

    // estadísticas
    const live = repos.filter((r) => r._live);
    const totalStars = live.reduce((s, r) => s + (r.stars || 0), 0);
    const reposCount = live.length || repos.length;
    const starsEl = $("#statStars");
    const reposEl = $("#statRepos");
    if (starsEl) starsEl.textContent = live.length ? totalStars : "—";
    if (reposEl) reposEl.textContent = reposCount;

    buildCards(repos);
  }

  function displayName(key, c) {
    // devuelve un nombre legible; por defecto el mismo key
    const map = {
      rutalibre: "Rutalibre",
      rutagrava: "Rutagrava",
      rutaclima: "Rutaclima",
      futboltotal: "Futboltotal",
      baskettotal: "baskettotal",
      ciclismototal: "Ciclismototal"
    };
    return map[key] || key;
  }

  /* ---------- inicio ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTypewriter();
    initCursorGlow();
    initScrollProgress();
    initMenu();
    observeReveals();
    load();
  });
})();
