// ── PÉTALOS QUE CAEN ──
const petalosEl = document.getElementById('petalos');
const flores = ['🌻', '🌻', '🌻', '🌼', '💕', '🌸'];
for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.className = 'petalo';
    p.textContent = flores[i % flores.length];
    p.style.left = `${Math.random() * 100}%`;
    p.style.fontSize = `${16 + Math.random() * 18}px`;
    p.style.animationDuration = `${12 + Math.random() * 12}s`;
    p.style.animationDelay = `${-Math.random() * 24}s`;
    petalosEl.appendChild(p);
}

// ── ABRIR LA CARTA ──
const entrada = document.getElementById('entrada');
const carta = document.getElementById('carta');
document.getElementById('btnAbrir').addEventListener('click', () => {
    entrada.classList.add('salir');
    carta.hidden = false;
    setTimeout(() => { entrada.hidden = true; }, 800);
    window.scrollTo({ top: 0 });
});

// ── REVELAR AL BAJAR ──
const revelables = document.querySelectorAll('.revelar');
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        if (e.target.hasAttribute('data-sanar')) {
            setTimeout(() => e.target.classList.add('sanada'), 600);
        }
        observador.unobserve(e.target);
    });
}, { threshold: 0.25 });
revelables.forEach((el) => observador.observe(el));

// Los bloques de texto también aparecen al bajar
document.querySelectorAll('.bloque').forEach((el) => {
    el.classList.add('revelar');
    observador.observe(el);
});

// ── BOTÓN "NO": escapa 3 veces y luego se queda quieto ──
const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const mensajeFinal = document.getElementById('mensajeFinal');
const contador = document.getElementById('contador');
const respuesta = document.getElementById('respuesta');

const mensajesNo = [
    '¿Segura? 🥺',
    'Piénsalo con calma 🌸',
    'Esta vez, te dejo quedarte quieta 🌸',
];
const LIMITE_ESCAPES = 3;
let escapes = 0;
let ultimaX = -999;
let ultimaY = -999;

function posicionAleatoria() {
    const margen = 16;
    const w = btnNo.offsetWidth || 130;
    const h = btnNo.offsetHeight || 52;
    let x, y, intentos = 0;
    do {
        x = Math.random() * (window.innerWidth - w - margen * 2) + margen;
        y = Math.random() * (window.innerHeight - h - margen * 2) + margen;
        intentos++;
    } while (intentos < 20 && Math.abs(x - ultimaX) < 120 && Math.abs(y - ultimaY) < 120);
    ultimaX = x;
    ultimaY = y;
    return { x, y };
}

function escapar() {
    if (!btnNo.classList.contains('fijo')) {
        const rect = btnNo.getBoundingClientRect();
        document.body.appendChild(btnNo);
        btnNo.classList.add('fijo');
        btnNo.style.left = `${rect.left}px`;
        btnNo.style.top = `${rect.top}px`;
    }
    escapes++;
    const { x, y } = posicionAleatoria();
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;

    contador.textContent = mensajesNo[Math.min(escapes - 1, mensajesNo.length - 1)];
    contador.classList.add('visible');
}

function puedeEscapar() {
    return escapes < LIMITE_ESCAPES;
}

btnNo.addEventListener('mouseenter', () => { if (puedeEscapar()) escapar(); });
btnNo.addEventListener('touchstart', (e) => {
    if (!puedeEscapar()) return;
    e.preventDefault();
    escapar();
}, { passive: false });

// Ya no puede escapar: cualquier toque cuenta como respuesta
btnNo.addEventListener('click', () => {
    if (puedeEscapar()) {
        escapar();
        return;
    }
    cerrarConRespuesta('Está bien, gracias por escucharme 🌸. Tómate todo el tiempo que necesites.');
});

// ── RESPUESTAS ──
function cerrarConRespuesta(texto) {
    respuesta.hidden = true;
    // Si ya escapó, el botón vive en <body> y no se oculta con su contenedor
    btnNo.hidden = true;
    contador.classList.remove('visible');
    mensajeFinal.textContent = texto;
}

btnSi.addEventListener('click', () => {
    cerrarConRespuesta('Gracias por darme esta oportunidad. Vamos despacio, con paciencia y con mucho amor 💕');
});
