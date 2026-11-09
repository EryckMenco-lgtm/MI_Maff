// Los textos y la lista de fotos están en recuerdos.js

const grande = (foto) => `img/album/${foto}.jpg`;
const azar = (min, max) => min + Math.random() * (max - min);
const alAzar = (lista) => lista[Math.floor(Math.random() * lista.length)];
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── LLUVIA DE EMOJIS ──
const lluvia = document.getElementById('lluvia');
const EMOJIS_LLUVIA = ['🌻', '💕', '💖', '🌹', '💘', '🌻', '✨', '🦋', '💗', '🌸', '💛', '🌻', '👑'];
const GOTAS = 40;
for (let i = 0; i < GOTAS; i++) {
    const g = document.createElement('span');
    g.className = 'gota';
    g.textContent = EMOJIS_LLUVIA[i % EMOJIS_LLUVIA.length];
    // Cada gota en su franja y en un punto distinto de su caída: así cubren toda la pantalla
    const duracion = azar(11, 22);
    g.style.left = `${(i / GOTAS) * 100 + azar(0, 100 / GOTAS)}%`;
    g.style.fontSize = `${azar(14, 30)}px`;
    g.style.animationDuration = `${duracion}s`;
    g.style.animationDelay = `${-azar(0, duracion)}s`;
    g.style.setProperty('--vaiven', `${azar(-40, 40)}px`);
    lluvia.appendChild(g);
}

// Mientras su retrato llena la pantalla, la lluvia no le tapa la cara.
// La franja de en medio de la pantalla decide qué sección se está viendo.
const obsRostro = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => lluvia.classList.toggle(e.target.dataset.rostro, e.isIntersecting));
}, { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('[data-rostro]').forEach((el) => obsRostro.observe(el));

// ── CHISPAS AL TOCAR ──
const chispasEl = document.getElementById('chispas');
const EMOJIS_CHISPA = ['💖', '💕', '🌻', '✨', '💗', '💛', '🌹'];

function rafaga(x, y, cantidad = 7, alcance = 90) {
    if (sinMovimiento) return;
    for (let i = 0; i < cantidad; i++) {
        const c = document.createElement('span');
        c.className = 'chispa';
        c.textContent = alAzar(EMOJIS_CHISPA);
        const angulo = azar(-Math.PI, 0);
        const radio = azar(alcance * .5, alcance);
        c.style.left = `${x}px`;
        c.style.top = `${y}px`;
        c.style.fontSize = `${azar(14, 26)}px`;
        c.style.setProperty('--dx', `${Math.cos(angulo) * radio}px`);
        c.style.setProperty('--dy', `${Math.sin(angulo) * radio}px`);
        c.style.setProperty('--giro', `${azar(-60, 60)}deg`);
        c.addEventListener('animationend', () => c.remove());
        chispasEl.appendChild(c);
    }
}

function centroDe(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

// Una lluvia grande de corazones por toda la pantalla
function fiesta() {
    for (let i = 0; i < 14; i++) {
        setTimeout(() => {
            rafaga(azar(0, window.innerWidth), azar(window.innerHeight * .4, window.innerHeight), 8, 220);
        }, i * 90);
    }
}

document.addEventListener('pointerdown', (e) => rafaga(e.clientX, e.clientY, 5, 70), { passive: true });

// ── ESCRIBIR LETRA POR LETRA ──
function escribir(el, texto, velocidad = 38) {
    if (sinMovimiento) {
        el.textContent = texto;
        return Promise.resolve();
    }
    const letras = Array.from(texto);
    el.textContent = '';
    el.classList.add('escribiendo');
    return new Promise((listo) => {
        let i = 0;
        const t = setInterval(() => {
            el.textContent += letras[i++];
            if (i >= letras.length) {
                clearInterval(t);
                setTimeout(() => el.classList.remove('escribiendo'), 900);
                listo();
            }
        }, velocidad);
    });
}

// ── PORTADA ──
const nombreEl = document.getElementById('nombre');
let retraso = 1;
for (const ch of 'Maria Fernanda Florez') {
    const s = document.createElement('span');
    if (ch === ' ') {
        s.className = 'espacio';
    } else {
        s.className = 'letra';
        s.textContent = ch;
        s.style.animationDelay = `${retraso}s`;
        retraso += .07;
    }
    nombreEl.appendChild(s);
}

// Brillitos dorados sobre el retrato de la portada
const brillosEl = document.getElementById('portadaBrillos');
for (let i = 0; i < 16; i++) {
    const b = document.createElement('span');
    b.className = 'brillo';
    b.textContent = i % 4 === 0 ? '💛' : '✨';
    b.style.left = `${azar(4, 94)}%`;
    b.style.top = `${azar(4, 58)}%`;
    b.style.fontSize = `${azar(10, 22)}px`;
    b.style.animationDelay = `${azar(0, 4)}s`;
    b.style.animationDuration = `${azar(2.4, 4.2)}s`;
    brillosEl.appendChild(b);
}

const portada = document.getElementById('portada');
const album = document.getElementById('album');
const btnMusica = document.getElementById('btnMusica');
const contador = document.getElementById('contador');
btnMusica.href = CANCION;

document.getElementById('btnCorazon').addEventListener('click', (e) => {
    const { x, y } = centroDe(e.currentTarget);
    rafaga(x, y, 30, 240);
    portada.classList.add('salir');
    setTimeout(() => {
        portada.hidden = true;
        album.hidden = false;
        btnMusica.hidden = false;
        contador.hidden = false;
        window.scrollTo({ top: 0 });
    }, 900);
});

// ── APARECER AL BAJAR ──
const alVer = new Map();
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        const accion = alVer.get(e.target);
        if (accion) accion();
        observador.unobserve(e.target);
    });
}, { threshold: .15, rootMargin: '0px 0px -8% 0px' });

function observar(el, accion) {
    if (accion) alVer.set(el, accion);
    observador.observe(el);
}
document.querySelectorAll('.revelar').forEach((el) => observar(el));

// ── LA CARTA SELLADA ──
const sobre = document.getElementById('sobre');
document.getElementById('sobreFoto').src = grande(PRIMERA.foto);

document.getElementById('btnSello').addEventListener('click', (e) => {
    // Sin esto el clic sube al sobre y abre la película de una vez
    e.stopPropagation();
    const { x, y } = centroDe(e.currentTarget);
    rafaga(x, y, 24, 180);
    sobre.classList.add('abierto');
    document.getElementById('pistaSobre').textContent = 'Tócala para verla grande';
    setTimeout(() => escribir(document.getElementById('sobreMensaje'), PRIMERA.mensaje), 1100);
});
sobre.addEventListener('click', () => {
    if (sobre.classList.contains('abierto')) abrirPelicula(0, true);
});

// ── LO QUE QUIERO QUE SEPAS ──
const frasesEl = document.getElementById('frases');
const ADORNOS = ['💕', '🌻', '🌹', '✨', '♾️', '💖'];
FRASES.forEach((texto, i) => {
    const bloque = document.createElement('div');
    bloque.className = 'frase-bloque';
    bloque.innerHTML = `<span class="frase-adorno">${ADORNOS[i % ADORNOS.length]}</span><p class="frase"></p>`;
    frasesEl.appendChild(bloque);
    observar(bloque, () => escribir(bloque.querySelector('.frase'), texto, 45));
});

// ── EL ÁLBUM ──
const TODAS = [PRIMERA, ...CAPITULOS.flatMap((c) => c.fotos), REINA, FINAL];
const TOTAL_ALBUM = CAPITULOS.reduce((n, c) => n + c.fotos.length, 0);
const volteadas = new Set();
const contadorNum = document.getElementById('contadorNum');
contadorNum.textContent = `0/${TOTAL_ALBUM}`;

function actualizarContador() {
    contadorNum.textContent = `${volteadas.size}/${TOTAL_ALBUM}`;
    contador.classList.remove('latir');
    void contador.offsetWidth;
    contador.classList.add('latir');
    if (volteadas.size === TOTAL_ALBUM) {
        setTimeout(() => celebrar(
            '¡Los abriste todos!',
            'Así de lleno está mi corazón de ti. Cada foto, cada momento, cada día: todo es tuyo. 💕'
        ), 900);
    }
}

function crearPolaroid(item, indice, posicion) {
    const poli = document.createElement('div');
    poli.className = 'poli';
    poli.tabIndex = 0;
    poli.setAttribute('role', 'button');
    poli.setAttribute('aria-label', `${item.nota}. Toca para voltear.`);
    poli.style.setProperty('--giro', `${azar(-4, 4).toFixed(1)}deg`);
    poli.style.transitionDelay = `${(posicion % 2) * 120}ms`;
    poli.innerHTML = `
        <div class="poli-interior">
            <div class="cara">
                <img src="${grande(item.foto)}" alt="" loading="lazy" decoding="async">
                <p class="cara-nota"></p>
            </div>
            <div class="dorso">
                <span class="dorso-corazon">${alAzar(['💕', '🌻', '💖', '🌹', '💛'])}</span>
                <p class="dorso-mensaje"></p>
                <button class="dorso-ver" type="button">Verla grande ♡</button>
            </div>
        </div>`;
    poli.querySelector('.cara-nota').textContent = item.nota;
    poli.querySelector('.dorso-mensaje').textContent = item.mensaje;

    const voltear = () => {
        poli.classList.toggle('volteada');
        if (!volteadas.has(item.foto)) {
            volteadas.add(item.foto);
            const { x, y } = centroDe(poli);
            rafaga(x, y, 10, 120);
            actualizarContador();
        }
    };
    poli.addEventListener('click', (e) => {
        if (e.target.closest('.dorso-ver')) {
            abrirPelicula(indice, true);
            return;
        }
        voltear();
    });
    poli.addEventListener('keydown', (e) => {
        if (e.target !== poli) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            voltear();
        }
    });
    observar(poli);
    return poli;
}

const capitulosEl = document.getElementById('capitulos');
let indiceGlobal = 1;
CAPITULOS.forEach((cap, ci) => {
    const seccion = document.createElement('section');
    seccion.className = 'capitulo';
    seccion.innerHTML = `
        <h3 class="capitulo-titulo revelar">
            <span class="capitulo-num"></span>
            <span class="capitulo-nombre"></span>
        </h3>
        <div class="mural"></div>`;
    seccion.querySelector('.capitulo-num').textContent = `Capítulo ${ci + 1}`;
    seccion.querySelector('.capitulo-nombre').textContent = `${cap.icono} ${cap.titulo}`;
    const mural = seccion.querySelector('.mural');
    cap.fotos.forEach((item, pi) => mural.appendChild(crearPolaroid(item, indiceGlobal++, pi)));
    capitulosEl.appendChild(seccion);
    observar(seccion.querySelector('.capitulo-titulo'));
});

// ── EL FRASCO ──
const frasco = document.getElementById('btnFrasco');
const notaFrasco = document.getElementById('notaFrasco');
let ultimaRazon = -1;
frasco.addEventListener('click', () => {
    frasco.classList.remove('sacudir');
    void frasco.offsetWidth;
    frasco.classList.add('sacudir');

    let i;
    do { i = Math.floor(Math.random() * RAZONES.length); } while (i === ultimaRazon && RAZONES.length > 1);
    ultimaRazon = i;

    const papel = document.createElement('p');
    papel.className = 'papelito';
    papel.style.setProperty('--giro', `${azar(-4, 4).toFixed(1)}deg`);
    papel.textContent = RAZONES[i];
    notaFrasco.replaceChildren(papel);

    const { x, y } = centroDe(frasco);
    rafaga(x, y - 60, 12, 140);
});

// ── DESDE QUE EMPEZAMOS ──
const inicio = INICIO ? new Date(`${INICIO}T00:00:00`) : null;
if (inicio && !isNaN(inicio)) {
    document.getElementById('dias').hidden = false;
    document.getElementById('diasDesde').textContent =
        `Desde el ${inicio.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })} 💕`;
    const dosCifras = (n) => String(n).padStart(2, '0');
    const latir = () => {
        let s = Math.max(0, Math.floor((Date.now() - inicio) / 1000));
        document.getElementById('diasNum').textContent = Math.floor(s / 86400).toLocaleString('es-CO');
        s %= 86400;
        document.getElementById('horasNum').textContent = dosCifras(Math.floor(s / 3600));
        s %= 3600;
        document.getElementById('minNum').textContent = dosCifras(Math.floor(s / 60));
        document.getElementById('segNum').textContent = dosCifras(s % 60);
    };
    latir();
    setInterval(latir, 1000);
}

// ── VALES DE AMOR ──
// Se recuerda en su teléfono cuáles ya cobró; si el navegador no deja guardar, igual funciona
const CLAVE_VALES = 'maff-vales-cobrados';
let cobrados = [];
try { cobrados = JSON.parse(localStorage.getItem(CLAVE_VALES)) || []; } catch (e) { cobrados = []; }

const valesEl = document.getElementById('vales');
VALES.forEach((v) => {
    const vale = document.createElement('button');
    vale.type = 'button';
    vale.className = 'vale revelar';
    vale.innerHTML = `
        <span class="vale-talon"></span>
        <span class="vale-cuerpo">
            <span class="vale-por">Vale por</span>
            <span class="vale-titulo"></span>
            <span class="vale-texto"></span>
            <span class="vale-captura">Hazle captura y mándamela 📸</span>
        </span>
        <span class="vale-sello">¡Es tuyo! 💕</span>`;
    vale.querySelector('.vale-talon').textContent = v.icono;
    vale.querySelector('.vale-titulo').textContent = v.titulo;
    vale.querySelector('.vale-texto').textContent = v.texto;
    if (cobrados.includes(v.titulo)) vale.classList.add('cobrado');

    vale.addEventListener('click', () => {
        vale.classList.add('cobrado');
        const { x, y } = centroDe(vale);
        rafaga(x, y, 14, 160);
        if (!cobrados.includes(v.titulo)) {
            cobrados.push(v.titulo);
            try { localStorage.setItem(CLAVE_VALES, JSON.stringify(cobrados)); } catch (e) { /* sin guardar */ }
        }
    });
    valesEl.appendChild(vale);
    observar(vale);
});

// ── FINAL ──
const seccionFinal = document.getElementById('final');
document.getElementById('reinaFoto').src = grande(REINA.foto);
document.getElementById('retratoFoto').src = grande(FINAL.foto);
observar(seccionFinal);
const reinaMensaje = document.getElementById('reinaMensaje');
observar(reinaMensaje, () => setTimeout(() => escribir(reinaMensaje, REINA.mensaje, 50), 400));
const finalMensaje = document.getElementById('finalMensaje');
observar(finalMensaje, () => setTimeout(() => escribir(finalMensaje, FINAL.mensaje, 50), 400));

// Botón "No": escapa 3 veces y luego se queda quieto
const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const respuesta = document.getElementById('respuesta');
const finalRespuesta = document.getElementById('finalRespuesta');
const avisoNo = document.getElementById('avisoNo');
const MENSAJES_NO = ['¿Segura, viejita? 🥺', 'Piénsalo con calma 🌸', 'Bueno… te dejo quieta 🌻'];
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
        x = azar(margen, window.innerWidth - w - margen);
        y = azar(margen + 60, window.innerHeight - h - margen - 80);
        intentos++;
    } while (intentos < 20 && Math.abs(x - ultimaX) < 120 && Math.abs(y - ultimaY) < 120);
    ultimaX = x;
    ultimaY = y;
    return { x, y };
}

function escapar() {
    if (!btnNo.classList.contains('fijo')) {
        const r = btnNo.getBoundingClientRect();
        document.body.appendChild(btnNo);
        btnNo.classList.add('fijo');
        btnNo.style.left = `${r.left}px`;
        btnNo.style.top = `${r.top}px`;
    }
    escapes++;
    const { x, y } = posicionAleatoria();
    btnNo.style.left = `${x}px`;
    btnNo.style.top = `${y}px`;
    avisoNo.textContent = MENSAJES_NO[Math.min(escapes - 1, MENSAJES_NO.length - 1)];
    avisoNo.classList.add('visible');

    // Al quedarse quieto vuelve a su sitio, para que no flote sobre el texto al bajar
    if (!puedeEscapar()) {
        setTimeout(() => {
            btnNo.classList.remove('fijo');
            btnNo.style.left = '';
            btnNo.style.top = '';
            respuesta.appendChild(btnNo);
        }, 700);
    }
}

const puedeEscapar = () => escapes < LIMITE_ESCAPES;

btnNo.addEventListener('mouseenter', () => { if (puedeEscapar()) escapar(); });
btnNo.addEventListener('touchstart', (e) => {
    if (!puedeEscapar()) return;
    e.preventDefault();
    escapar();
}, { passive: false });
btnNo.addEventListener('click', () => {
    if (puedeEscapar()) {
        escapar();
        return;
    }
    responder('Está bien, mi amor. Aquí voy a estar, con paciencia. 🌻');
});

function responder(texto) {
    respuesta.hidden = true;
    btnNo.hidden = true;
    avisoNo.classList.remove('visible');
    escribir(finalRespuesta, texto);
}

btnSi.addEventListener('click', () => {
    responder('Vamos a hacerlo bien. 🌻');
    celebrar('Vamos de a poco 💕', 'Y esta vez, para siempre. Te amo, Ela.\n— Tu viejito, Eryck');
});

// ── CELEBRACIÓN ──
const celebracion = document.getElementById('celebracion');
function celebrar(titulo, texto) {
    document.getElementById('celebracionTitulo').textContent = titulo;
    const t = document.getElementById('celebracionTexto');
    t.textContent = '';
    texto.split('\n').forEach((linea, i) => {
        if (i) t.appendChild(document.createElement('br'));
        t.append(linea);
    });
    celebracion.hidden = false;
    fiesta();
}
document.getElementById('celebracionCerrar').addEventListener('click', () => { celebracion.hidden = true; });

// ── LA PELÍCULA ──
const DURACION = 5000;
const pelicula = document.getElementById('pelicula');
const peliFoto = document.getElementById('peliFoto');
const peliFondo = document.getElementById('peliFondo');
const peliProgreso = document.getElementById('peliProgreso');
const peliPausa = document.getElementById('peliPausa');
const peliTexto = document.querySelector('.pelicula-texto');
let peliIndice = 0;
let peliPausada = false;
let peliTimer = null;
let peliInicio = 0;
let peliRestante = DURACION;
peliFoto.style.setProperty('--dur', `${DURACION}ms`);

function correrProgreso(ms) {
    clearTimeout(peliTimer);
    peliProgreso.style.transition = `width ${ms}ms linear`;
    peliProgreso.style.width = '100%';
    peliInicio = Date.now();
    peliRestante = ms;
    peliTimer = setTimeout(siguienteFoto, ms);
}

function mostrarFoto(i) {
    peliIndice = (i + TODAS.length) % TODAS.length;
    const item = TODAS[peliIndice];

    peliFoto.classList.remove('entra');
    peliFoto.onload = () => {
        void peliFoto.offsetWidth;
        peliFoto.classList.add('entra');
    };
    peliFoto.src = grande(item.foto);
    peliFoto.alt = item.nota;
    peliFondo.style.backgroundImage = `url("${grande(item.foto)}")`;

    document.getElementById('peliNota').textContent = item.nota;
    document.getElementById('peliMensaje').textContent = item.mensaje;
    document.getElementById('peliCuenta').textContent = `${peliIndice + 1} / ${TODAS.length}`;
    peliTexto.classList.remove('entra');
    void peliTexto.offsetWidth;
    peliTexto.classList.add('entra');

    const siguiente = TODAS[(peliIndice + 1) % TODAS.length];
    new Image().src = grande(siguiente.foto);

    clearTimeout(peliTimer);
    peliProgreso.style.transition = 'none';
    peliProgreso.style.width = '0%';
    void peliProgreso.offsetWidth;
    peliRestante = DURACION;
    if (!peliPausada) correrProgreso(DURACION);
}

function siguienteFoto() {
    if (peliIndice === TODAS.length - 1 && !peliPausada) {
        cerrarPelicula();
        celebrar('Fin… o mejor, el comienzo 💕', 'Esta es nuestra historia hasta hoy. Ojalá me dejes escribir lo que sigue, contigo. Vamos de a poco.');
        return;
    }
    mostrarFoto(peliIndice + 1);
}

function pausar() {
    peliPausada = true;
    clearTimeout(peliTimer);
    peliRestante = Math.max(0, peliRestante - (Date.now() - peliInicio));
    const ancho = getComputedStyle(peliProgreso).width;
    peliProgreso.style.transition = 'none';
    peliProgreso.style.width = ancho;
    pelicula.classList.add('pausada');
    peliPausa.textContent = '▶';
    peliPausa.setAttribute('aria-label', 'Reanudar');
}

function reanudar() {
    peliPausada = false;
    pelicula.classList.remove('pausada');
    peliPausa.textContent = '❚❚';
    peliPausa.setAttribute('aria-label', 'Pausar');
    correrProgreso(peliRestante || DURACION);
}

// Créditos de entrada cuando la película arranca desde el principio; tocarlos los salta
const peliCreditos = document.getElementById('peliCreditos');
let creditosTimer = null;

function quitarCreditos() {
    clearTimeout(creditosTimer);
    if (peliCreditos.hidden) return;
    peliCreditos.hidden = true;
    mostrarFoto(0);
}
peliCreditos.addEventListener('click', quitarCreditos);

function abrirPelicula(desde = 0, empezarPausada = false) {
    pelicula.hidden = false;
    document.body.style.overflow = 'hidden';
    peliPausada = empezarPausada;
    pelicula.classList.toggle('pausada', empezarPausada);
    peliPausa.textContent = empezarPausada ? '▶' : '❚❚';

    if (desde === 0 && !empezarPausada) {
        clearTimeout(peliTimer);
        peliProgreso.style.transition = 'none';
        peliProgreso.style.width = '0%';
        peliCreditos.hidden = false;
        peliCreditos.style.animation = 'none';
        void peliCreditos.offsetWidth;
        peliCreditos.style.animation = '';
        creditosTimer = setTimeout(quitarCreditos, sinMovimiento ? 2500 : 4200);
        return;
    }
    mostrarFoto(desde);
}

function cerrarPelicula() {
    clearTimeout(peliTimer);
    clearTimeout(creditosTimer);
    peliCreditos.hidden = true;
    pelicula.hidden = true;
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-pelicula]').forEach((b) => b.addEventListener('click', () => abrirPelicula(0)));
document.getElementById('peliCerrar').addEventListener('click', cerrarPelicula);
document.getElementById('peliAdelante').addEventListener('click', () => mostrarFoto(peliIndice + 1));
document.getElementById('peliAtras').addEventListener('click', () => mostrarFoto(peliIndice - 1));
peliPausa.addEventListener('click', () => (peliPausada ? reanudar() : pausar()));

let toqueX = null;
pelicula.addEventListener('touchstart', (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
pelicula.addEventListener('touchend', (e) => {
    if (toqueX === null || !peliCreditos.hidden) return;
    const dx = e.changedTouches[0].clientX - toqueX;
    toqueX = null;
    if (Math.abs(dx) < 50) return;
    e.preventDefault();
    mostrarFoto(peliIndice + (dx < 0 ? 1 : -1));
});

document.addEventListener('keydown', (e) => {
    if (pelicula.hidden) return;
    if (e.key === 'Escape') {
        cerrarPelicula();
        return;
    }
    if (!peliCreditos.hidden) {
        quitarCreditos();
        return;
    }
    if (e.key === 'ArrowRight') mostrarFoto(peliIndice + 1);
    if (e.key === 'ArrowLeft') mostrarFoto(peliIndice - 1);
    if (e.key === ' ') {
        e.preventDefault();
        peliPausada ? reanudar() : pausar();
    }
});
