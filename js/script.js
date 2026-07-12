const header = document.getElementById("header");
const menu = document.querySelector(".menu");
const menuToggle = document.querySelector(".menu-toggle");
const cursorLight = document.querySelector(".cursor-light");
const laptop = document.getElementById("laptop");

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

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

window.addEventListener("mousemove", event => {
  if (cursorLight) {
    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
  }
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

function createParticles() {
  const container = document.getElementById("particles");
  const amount = window.innerWidth <= 760 ? 12 : 25;

  for (let i = 0; i < amount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${15 + Math.random() * 85}%`;
    particle.style.setProperty("--duration", `${12 + Math.random() * 16}s`);
    particle.style.setProperty("--delay", `${Math.random() * -20}s`);
    particle.style.setProperty("--opacity", `${0.08 + Math.random() * 0.22}`);
    particle.style.setProperty("--drift", `${-40 + Math.random() * 80}px`);
    container.appendChild(particle);
  }
}
createParticles();

if (laptop) {
  laptop.addEventListener("mousemove", event => {
    if (window.innerWidth < 761) return;
    const rect = laptop.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    laptop.style.transform =
      `perspective(1200px) rotateY(${x * 8 - 7}deg) rotateX(${y * -6 + 2}deg)`;
  });

  laptop.addEventListener("mouseleave", () => {
    laptop.style.transform = "perspective(1200px) rotateY(-7deg) rotateX(2deg)";
  });
}

document.querySelectorAll(".magnetic").forEach(button => {
  button.addEventListener("mousemove", event => {
    if (window.innerWidth < 761) return;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });
  button.addEventListener("mouseleave", () => button.style.transform = "");
});

document.querySelectorAll(".glow-card").forEach(card => {
  card.addEventListener("mousemove", event => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

document.querySelectorAll(".tilt-card").forEach(card => {
  card.addEventListener("mousemove", event => {
    if (window.innerWidth < 761) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateY(-5px)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});

const codeLines = [
  '<span class="code-tag">&lt;!DOCTYPE html&gt;</span>',
  '<span class="code-tag">&lt;html</span> <span class="code-attr">lang</span>=<span class="code-string">"pt-BR"</span><span class="code-tag">&gt;</span>',
  '  <span class="code-tag">&lt;head&gt;</span>',
  '    <span class="code-tag">&lt;title&gt;</span><span class="code-text">Guatelipe</span><span class="code-tag">&lt;/title&gt;</span>',
  '  <span class="code-tag">&lt;/head&gt;</span>',
  '',
  '  <span class="code-tag">&lt;body&gt;</span>',
  '    <span class="code-tag">&lt;section</span> <span class="code-attr">class</span>=<span class="code-string">"hero"</span><span class="code-tag">&gt;</span>',
  '      <span class="code-tag">&lt;h1&gt;</span><span class="code-text">Ideias em experiências</span><span class="code-tag">&lt;/h1&gt;</span>',
  '      <span class="code-tag">&lt;p&gt;</span><span class="code-text">Design, código e resultado.</span><span class="code-tag">&lt;/p&gt;</span>',
  '    <span class="code-tag">&lt;/section&gt;</span>',
  '  <span class="code-tag">&lt;/body&gt;</span>',
  '<span class="code-tag">&lt;/html&gt;</span>'
];
const typingCode = document.getElementById("typingCode");
let typedLine = 0;

function typeCode() {
  if (!typingCode) return;
  if (typedLine >= codeLines.length) {
    setTimeout(() => {
      typingCode.innerHTML = "";
      typedLine = 0;
      typeCode();
    }, 3500);
    return;
  }
  typingCode.innerHTML += `${codeLines[typedLine]}\n`;
  typedLine += 1;
  setTimeout(typeCode, typedLine < 4 ? 190 : 115);
}
setTimeout(typeCode, 700);

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.counter);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current;
    }, 28);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.8 });

document.querySelectorAll("[data-counter]").forEach(counter => counterObserver.observe(counter));

const form = document.getElementById("quoteForm");
const steps = [...document.querySelectorAll(".form-step")];
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const submitBtn = document.getElementById("submitBtn");
const progressBar = document.getElementById("progressBar");
const stepNumber = document.getElementById("stepNumber");
const formMessage = document.getElementById("formMessage");
let currentStep = 1;

function getProject() {
  return document.querySelector('input[name="projectType"]:checked');
}

function calculateEstimate() {
  return null;
}

function updateProjectCards() {
  document.querySelectorAll(".project-options label").forEach(label => {
    const input = label.querySelector("input");
    label.classList.toggle("selected", input.checked);
  });
}

function showStep(step) {
  currentStep = step;
  steps.forEach(item => {
    item.classList.toggle("active", Number(item.dataset.step) === step);
  });
  progressBar.style.width = `${step * 25}%`;
  stepNumber.textContent = step;
  backBtn.disabled = step === 1;
  nextBtn.style.display = step === 4 ? "none" : "inline-flex";
  submitBtn.style.display = step === 4 ? "inline-flex" : "none";
  formMessage.textContent = "";
  calculateEstimate();
}

function validateStep(step) {
  const active = document.querySelector(`.form-step[data-step="${step}"]`);
  const required = [...active.querySelectorAll("[required]")];

  const valid = required.every(input => {
    if (input.type === "radio") {
      return Boolean(active.querySelector('input[type="radio"]:checked'));
    }
    return input.value.trim() !== "";
  });

  if (!valid) {
    formMessage.className = "form-message error";
    formMessage.textContent = "Preencha os campos obrigatórios para continuar.";
  }

  return valid;
}

nextBtn.addEventListener("click", () => {
  if (validateStep(currentStep)) showStep(currentStep + 1);
});

backBtn.addEventListener("click", () => showStep(currentStep - 1));

form.addEventListener("change", () => {
  updateProjectCards();
  calculateEstimate();
});

document.getElementById("phone").addEventListener("input", event => {
  let value = event.target.value.replace(/\D/g, "").slice(0, 11);
  if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  else if (value.length > 6) value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  else if (value.length > 2) value = value.replace(/(\d{2})(\d+)/, "($1) $2");
  event.target.value = value;
});

const EMAILJS_CONFIG = {
  serviceId: "service_xjw1nc7",
  templateId: "template_38mbssi",
  publicKey: "eKhjPpH3lmR3aTJ1u",
  recipientEmail: "guatelipe.dev@gmail.com"
};

if (typeof emailjs !== "undefined") {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  formMessage.className = "form-message";
  formMessage.textContent = "";

  if (!validateStep(4)) return;

  const project = getProject();
  if (!project) {
    formMessage.classList.add("error");
    formMessage.textContent = "Selecione um tipo de projeto.";
    return;
  }

  const clientEmail = document.getElementById("clientEmail").value.trim();

  if (!clientEmail || !clientEmail.includes("@")) {
    formMessage.classList.add("error");
    formMessage.textContent = "Informe um e-mail válido.";
    return;
  }

  const extras = [
    ...document.querySelectorAll(".extras-grid input:checked")
  ].map(item => item.value);


  const templateParams = {
    to_email: EMAILJS_CONFIG.recipientEmail,
    from_name: document.getElementById("name").value.trim(),
    company: document.getElementById("company").value.trim() || "Não informado",
    client_email: clientEmail,
    phone: document.getElementById("phone").value.trim(),
    project_type: project.value,
    pages: document.getElementById("pages").value,
    deadline: document.getElementById("deadline").value,
    extras: extras.length ? extras.join(", ") : "Nenhuma selecionada",
    description: document.getElementById("description").value.trim()
  };

  const originalButtonText = submitBtn.innerHTML;

  submitBtn.classList.add("is-loading");
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Enviando...";
  formMessage.textContent = "Enviando sua solicitação...";

  try {
    if (typeof emailjs === "undefined") {
      throw new Error("O EmailJS não foi carregado.");
    }

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    formMessage.className = "form-message success";
    formMessage.textContent =
      "Orçamento enviado com sucesso! Verifique também sua caixa de entrada.";

    form.reset();
    updateProjectCards();
    calculateEstimate();

    setTimeout(() => {
      showStep(1);
      formMessage.className = "form-message success";
      formMessage.textContent =
        "Solicitação enviada. Entrarei em contato em breve.";
    }, 1600);
  } catch (error) {
    console.error("Erro ao enviar pelo EmailJS:", error);

    formMessage.className = "form-message error";
    const detail = error?.text || error?.message || "erro desconhecido";
    formMessage.textContent =
      `Não foi possível enviar: ${detail}. Abra o console (F12) para verificar.`;
  } finally {
    submitBtn.classList.remove("is-loading");
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalButtonText;
  }
});

showStep(1);

