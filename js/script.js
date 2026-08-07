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

const form = document.getElementById("quoteForm");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

function getProject() {
  return document.querySelector('input[name="projectType"]:checked');
}

/* Sem etapas: a validação roda uma vez, no envio. */
function validarForm() {
  const obrigatorios = [...form.querySelectorAll("[required]")];

  const preenchido = campo => {
    if (campo.type === "tel") return campo.value.replace(/\D/g, "").length >= 10;
    return campo.value.trim() !== "";
  };

  const invalido = obrigatorios.find(campo => !preenchido(campo));

  obrigatorios.forEach(campo => {
    campo.classList.toggle("invalid", campo === invalido);
    campo.setAttribute("aria-invalid", campo === invalido ? "true" : "false");
  });

  // O e-mail é opcional, mas se foi digitado precisa estar certo.
  const email = document.getElementById("clientEmail");
  const emailRuim = email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
  if (emailRuim) {
    email.classList.add("invalid");
    email.closest("details").open = true;
  }

  if (invalido) {
    formMessage.className = "form-message error";
    formMessage.textContent = invalido.type === "tel" && invalido.value.trim()
      ? "Informe um WhatsApp com DDD."
      : "Preencha nome, WhatsApp e uma linha sobre o projeto.";
    invalido.focus({ preventScroll: true });
    return false;
  }

  if (emailRuim) {
    formMessage.className = "form-message error";
    formMessage.textContent = "Confira o e-mail informado.";
    email.focus({ preventScroll: true });
    return false;
  }

  return true;
}

// Limpa o destaque de erro assim que o campo é corrigido.
form.addEventListener("input", event => {
  event.target.classList.remove("invalid");
  event.target.removeAttribute("aria-invalid");
});

function updateProjectCards() {
  document.querySelectorAll(".chips label").forEach(label => {
    label.classList.toggle("selected", label.querySelector("input").checked);
  });
}
form.addEventListener("change", updateProjectCards);

document.getElementById("phone").addEventListener("input", event => {
  let value = event.target.value.replace(/\D/g, "").slice(0, 11);
  if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  else if (value.length > 6) value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  else if (value.length > 2) value = value.replace(/(\d{2})(\d+)/, "($1) $2");
  event.target.value = value;
});

/* ==========================================================================
   ENVIO — CONTENÇÃO DE ABUSO

   Estas chaves são públicas por natureza: rodam no navegador, então qualquer
   pessoa consegue lê-las. As barreiras abaixo encarecem o abuso, mas NENHUMA
   delas é intransponível — quem controla o navegador controla o JavaScript.

   A proteção que de fato vale está no painel do EmailJS (Allowed Origins).
   Sem ela, nada aqui impede alguém de chamar a API direto.
   ========================================================================== */
const EMAILJS_CONFIG = {
  serviceId: "service_xjw1nc7",
  templateId: "template_38mbssi",
  publicKey: "eKhjPpH3lmR3aTJ1u",
  recipientEmail: "guatelipe.dev@gmail.com"
};

// Endereços de onde o formulário aceita funcionar. Se alguém copiar os
// arquivos e hospedar em outro lugar, o envio não acontece.
const ORIGENS_PERMITIDAS = [
  "guatelipe.dev",
  "www.guatelipe.dev",
  "localhost",
  "127.0.0.1"
];

function origemPermitida() {
  const host = window.location.hostname;
  if (!host) return true;                        // aberto como arquivo local
  if (ORIGENS_PERMITIDAS.includes(host)) return true;
  return host.endsWith(".netlify.app");          // prévias do Netlify
}

// Limite por navegador: três envios por hora. Não impede um ataque real,
// mas corta o envio repetido acidental e o robô ingênuo.
const LIMITE_CHAVE = "guatelipe_envios";
const LIMITE_MAXIMO = 3;
const LIMITE_JANELA = 60 * 60 * 1000;

function dentroDoLimite() {
  try {
    const agora = Date.now();
    const registros = JSON.parse(localStorage.getItem(LIMITE_CHAVE) || "[]")
      .filter(t => agora - t < LIMITE_JANELA);
    if (registros.length >= LIMITE_MAXIMO) return false;
    registros.push(agora);
    localStorage.setItem(LIMITE_CHAVE, JSON.stringify(registros));
    return true;
  } catch (error) {
    return true;   // localStorage bloqueado: não é motivo para barrar alguém
  }
}

// Robô preenche e envia em menos de um segundo; pessoa não.
const abertoEm = Date.now();
const TEMPO_MINIMO = 4000;

if (typeof emailjs !== "undefined") {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  formMessage.className = "form-message";
  formMessage.textContent = "";

  // Campo isca: só um robô preenche um input escondido.
  const honeypot = document.getElementById("website");
  if (honeypot && honeypot.value.trim() !== "") {
    // Resposta de sucesso de propósito: um robô que recebe erro tenta de novo.
    formMessage.className = "form-message success";
    formMessage.textContent = "Solicitação enviada. Entrarei em contato em breve.";
    return;
  }

  // Preenchido rápido demais para ser pessoa.
  if (Date.now() - abertoEm < TEMPO_MINIMO) {
    formMessage.className = "form-message success";
    formMessage.textContent = "Solicitação enviada. Entrarei em contato em breve.";
    return;
  }

  if (!origemPermitida()) {
    formMessage.className = "form-message error";
    formMessage.textContent =
      "Este formulário só funciona em guatelipe.dev. Me chame no WhatsApp (31) 99919-1545.";
    return;
  }

  if (!validarForm()) return;

  if (!dentroDoLimite()) {
    formMessage.className = "form-message error";
    formMessage.textContent =
      "Você já enviou algumas solicitações. Me chame no WhatsApp (31) 99919-1545 que eu respondo na hora.";
    return;
  }

  const clientEmail = document.getElementById("clientEmail").value.trim();
  const project = getProject();

  // Os campos que saíram do formulário continuam sendo enviados com um valor
  // padrão: assim o modelo do EmailJS segue funcionando sem precisar ser editado.
  const templateParams = {
    to_email: EMAILJS_CONFIG.recipientEmail,
    reply_to: clientEmail || EMAILJS_CONFIG.recipientEmail,
    from_name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    client_email: clientEmail || "Não informado — responder pelo WhatsApp",
    project_type: project ? project.value : "A definir",
    description: document.getElementById("description").value.trim(),
    company: "Não informado",
    pages: "A combinar",
    deadline: "A combinar",
    extras: "A combinar"
  };

  const textoOriginal = submitBtn.innerHTML;
  submitBtn.classList.add("is-loading");
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Enviando...";
  formMessage.textContent = "Enviando sua solicitação...";

  try {
    if (typeof emailjs === "undefined") throw new Error("O EmailJS não foi carregado.");

    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams);

    formMessage.className = "form-message success";
    formMessage.textContent = "Recebido! Respondo em até 48h úteis — ou me chame no WhatsApp se for urgente.";

    form.reset();
    updateProjectCards();
    clearDraft();
  } catch (error) {
    console.error("Erro ao enviar pelo EmailJS:", error);
    formMessage.className = "form-message error";
    formMessage.textContent =
      "Não consegui enviar agora. Me chame no WhatsApp (31) 99919-1545 que eu respondo na hora.";
  } finally {
    submitBtn.classList.remove("is-loading");
    submitBtn.disabled = false;
    submitBtn.innerHTML = textoOriginal;
  }
});

/* ==========================================================================
   RASCUNHO DO ORÇAMENTO — quem sai da página não perde o que já digitou.
   ========================================================================== */
const DRAFT_KEY = "guatelipe_orcamento_rascunho";
const DRAFT_FIELDS = ["name", "phone", "clientEmail", "description"];

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    /* localStorage bloqueado: seguir sem rascunho */
  }
}

function saveDraft() {
  const draft = {};
  DRAFT_FIELDS.forEach(id => {
    const field = document.getElementById(id);
    if (field && field.value) draft[id] = field.value;
  });

  const project = getProject();
  if (project) draft.projectType = project.value;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (error) {
    /* localStorage bloqueado ou cheio: seguir sem rascunho */
  }
}

function restoreDraft() {
  let draft;
  try {
    draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
  } catch (error) {
    return;
  }
  if (!draft) return;

  DRAFT_FIELDS.forEach(id => {
    const field = document.getElementById(id);
    if (field && typeof draft[id] === "string") field.value = draft[id];
  });

  if (draft.projectType) {
    const radio = document.querySelector(`input[name="projectType"][value="${CSS.escape(draft.projectType)}"]`);
    if (radio) radio.checked = true;
  }

  updateProjectCards();
}

restoreDraft();
form.addEventListener("input", saveDraft);
form.addEventListener("change", saveDraft);

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



