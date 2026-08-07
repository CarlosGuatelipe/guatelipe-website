const prefersReducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.getElementById("header");
const menu = document.querySelector(".menu");
const menuToggle = document.querySelector(".menu-toggle");

function closeMenu() {
  menu.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Fecha o menu com Escape ou ao clicar fora dele.
document.addEventListener("keydown", event => {
  if (event.key !== "Escape" || !menu.classList.contains("open")) return;
  closeMenu();
  menuToggle.focus();
});

document.addEventListener("click", event => {
  if (!menu.classList.contains("open")) return;
  if (menu.contains(event.target) || menuToggle.contains(event.target)) return;
  closeMenu();
});

/* ==========================================================================
   ROLAGEM COM INÉRCIA
   A página continua rolando de forma nativa (a barra, as âncoras e o teclado
   funcionam igual). O que muda é que o conteúdo *persegue* a posição da
   rolagem com amortecimento, em vez de saltar direto para ela.
   ========================================================================== */
const smoothWrapper = document.getElementById("smoothWrapper");
const smoothContent = document.getElementById("smoothContent");

(function initSmoothScroll() {
  if (!smoothWrapper || !smoothContent || prefersReducedMotion) return;
  // Em telas de toque o próprio sistema já dá a inércia — duplicar atrapalha.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.documentElement.classList.add("has-smooth-scroll");

  let atual = window.scrollY;
  let rodando = false;

  // Com o envelope fixo, todo o conteúdo sai do fluxo e o corpo perderia
  // altura — não haveria o que rolar. Devolvemos a altura real ao <body>.
  function medir() {
    document.body.style.height = `${smoothContent.scrollHeight}px`;
  }
  medir();
  new ResizeObserver(medir).observe(smoothContent);

  function quadro() {
    const alvo = window.scrollY;
    const distancia = alvo - atual;

    // Abaixo de meio pixel a diferença não é visível: encaixa e para o laço.
    if (Math.abs(distancia) < 0.5) {
      atual = alvo;
      rodando = false;
    } else {
      atual += distancia * 0.11;
      requestAnimationFrame(quadro);
    }

    smoothContent.style.transform = `translate3d(0, ${-atual}px, 0)`;
  }

  function acordar() {
    if (rodando) return;
    rodando = true;
    requestAnimationFrame(quadro);
  }

  window.addEventListener("scroll", acordar, { passive: true });
  window.addEventListener("resize", () => { medir(); acordar(); });
  acordar();
})();

const backToTop = document.getElementById("backToTop");
const scrollProgress = document.getElementById("scrollProgress");

let scrollScheduled = false;
window.addEventListener("scroll", () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 20);
    if (backToTop) backToTop.classList.toggle("show", y > 700);

    if (scrollProgress) {
      const rolavel = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = rolavel > 0 ? `${(y / rolavel) * 100}%` : "0%";
    }

    scrollScheduled = false;
  });
}, { passive: true });

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}

/* Destaca a seção em leitura, tanto no menu quanto no índice lateral.
   Uma mesma seção pode ter vários links apontando para ela. */
(function initScrollSpy() {
  const links = [...document.querySelectorAll('.menu a[href^="#"], .rail a[href^="#"]')];
  if (!links.length) return;

  const porSecao = new Map();
  links.forEach(link => {
    const secao = document.querySelector(link.getAttribute("href"));
    if (!secao) return;
    if (!porSecao.has(secao)) porSecao.set(secao, []);
    porSecao.get(secao).push(link);
  });
  if (!porSecao.size) return;

  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      (porSecao.get(entry.target) || []).forEach(link => {
        link.classList.toggle("current", entry.isIntersecting);
        if (entry.isIntersecting) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  porSecao.forEach((_, secao) => spy.observe(secao));
})();

/* Acordeões: mantém apenas um item aberto por grupo. */
function initAcordeao(seletor) {
  const itens = [...document.querySelectorAll(seletor)];
  itens.forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      itens.forEach(outro => {
        if (outro !== item) outro.open = false;
      });
    });
  });
}
initAcordeao(".faq-item");
initAcordeao(".service-item");

/* Paralaxe: o miolo da prancha corre mais devagar que a página. */
(function initParallax() {
  const camadas = [...document.querySelectorAll("[data-plate-layer]")];
  if (!camadas.length || prefersReducedMotion) return;

  let agendado = false;

  function posicionar() {
    const altura = window.innerHeight;
    camadas.forEach(camada => {
      const caixa = camada.getBoundingClientRect();
      if (caixa.bottom < -200 || caixa.top > altura + 200) return;
      // -1 quando a prancha entra por baixo, +1 quando sai por cima.
      const avanco = (caixa.top + caixa.height / 2 - altura / 2) / altura;
      camada.style.transform = `translate3d(0, ${(avanco * -34).toFixed(2)}px, 0)`;
    });
    agendado = false;
  }

  function agendar() {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(posicionar);
  }

  // Com inércia ligada o conteúdo continua andando depois do scroll parar,
  // então acompanhamos o próprio quadro em vez de só o evento de rolagem.
  if (document.documentElement.classList.contains("has-smooth-scroll")) {
    (function laco() {
      posicionar();
      requestAnimationFrame(laco);
    })();
  } else {
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    posicionar();
  }
})();

/* Rótulo "Ver" que acompanha o cursor sobre as pranchas do portfólio. */
(function initPlateCursor() {
  const label = document.getElementById("plateCursor");
  const plates = [...document.querySelectorAll(".project-plate")];
  if (!label || !plates.length || prefersReducedMotion) return;
  if (!window.matchMedia("(hover: hover) and (min-width: 821px)").matches) return;

  let x = 0;
  let y = 0;
  let agendado = false;

  function mover(event) {
    x = event.clientX;
    y = event.clientY;
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      label.style.translate = `${x}px ${y}px`;
      agendado = false;
    });
  }

  plates.forEach(plate => {
    plate.addEventListener("mouseenter", () => label.classList.add("show"));
    plate.addEventListener("mouseleave", () => label.classList.remove("show"));
    plate.addEventListener("mousemove", mover, { passive: true });
  });
})();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

/* Contadores: a contagem desacelera no fim, em vez de subir em passo
   constante e parar seco. setInterval dava passo fixo e ficava mecânico —
   requestAnimationFrame acompanha a taxa de quadros da tela. */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const elemento = entry.target;
    const alvo = Number(elemento.dataset.counter);
    const sufixo = elemento.dataset.suffix || "";
    counterObserver.unobserve(elemento);

    if (prefersReducedMotion) {
      elemento.textContent = alvo + sufixo;
      return;
    }

    const duracao = 1500;
    const inicio = performance.now();

    function passo(agora) {
      const t = Math.min((agora - inicio) / duracao, 1);
      // easeOutExpo: quase todo o percurso acontece no começo.
      const suave = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      elemento.textContent = Math.round(alvo * suave) + sufixo;
      if (t < 1) requestAnimationFrame(passo);
    }

    requestAnimationFrame(passo);
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-counter]").forEach(counter => counterObserver.observe(counter));

// Ano do rodapé sempre atual, sem precisar editar o HTML todo mês de janeiro.
const footerYear = document.getElementById("footerYear");
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* ==========================================================================
   FUNCIONALIDADE E-MAIL DO RODAPÉ (COPIAR E-MAIL + TOAST NOTIFICATION)
   ========================================================================== */
(function initFooterEmailLink() {
  const emailLink = document.getElementById("footerEmailLink");
  if (!emailLink) return;

  emailLink.addEventListener("click", async (e) => {
    const email = "guatelipe.dev@gmail.com";

    // Copiar para a área de transferência. Se o navegador bloquear, deixa o
    // mailto: original acontecer em vez de mostrar um aviso que mentiu.
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;

    e.preventDefault();

    try {
      await navigator.clipboard.writeText(email);
      showToast(`✨ E-mail copiado! <span>(${email})</span>`);
    } catch (error) {
      window.location.href = emailLink.getAttribute("href");
    }
  });

  function showToast(messageHtml) {
    let toast = document.getElementById("globalToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "globalToast";
      toast.className = "toast-notification";
      document.body.appendChild(toast);
    }

    toast.innerHTML = messageHtml;
    toast.classList.add("show");

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3800);
  }
})();



