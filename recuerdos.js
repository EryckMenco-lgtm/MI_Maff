// ─────────────────────────────────────────────────────────────
// TEXTOS DEL ÁLBUM
// Aquí se cambian las frases sin tocar nada más.
//   foto:    nombre del archivo en img/album/ (sin "-p" ni ".jpg")
//   nota:    lo que va escrito a mano debajo de la foto
//   mensaje: lo que aparece al voltearla
// ─────────────────────────────────────────────────────────────

// La primera de todas: va dentro de la carta sellada
const PRIMERA = {
    foto: 'm27',
    nota: 'Te amo, M&E',
    mensaje: 'Así empezamos. Y así lo quiero seguir escribiendo, los dos.',
};

// Lo que quiero que sepas (se escriben solas al bajar)
const FRASES = [
    'Quiero que sepas que siempre te he amado.',
    'Quiero que te acuerdes de cuando eras mi viejita… porque yo sigo siendo tu viejito.',
    'Vamos de a poco.',
    'Vamos a hacerlo bien.',
    'Y si volvemos, es para siempre. Para nunca más dejarnos.',
    'Siempre serás el amor de mi vida, Ela.',
];

const CAPITULOS = [
    {
        titulo: 'Desde chiquita ya eras luz',
        icono: '🌼',
        fotos: [
            { foto: 'm06', nota: 'Desde chiquita 🌼', mensaje: 'Esa niña ya tenía la sonrisa que un día me iba a enamorar.' },
            { foto: 'm45', nota: 'Mi niña bonita', mensaje: 'Mírate, soñando despierta. Ojalá yo pueda cuidar esos sueños, de a poco.' },
        ],
    },
    {
        titulo: 'Esa sonrisa',
        icono: '😊',
        fotos: [
            { foto: 'm01', nota: 'Hola, mi amor 👋', mensaje: 'Cada vez que me saludabas así, el día ya valía la pena.' },
            { foto: 'm16', nota: 'Esa carita', mensaje: 'Así de cerquita quiero volver a verte: tranquila, feliz y sin miedo.' },
            { foto: 'm20', nota: 'Mi paz', mensaje: 'Tu sonrisa siempre fue mi lugar seguro. Quiero volver a ser el tuyo.' },
            { foto: 'm24', nota: 'Coqueta 😎', mensaje: 'Las gafas en la cabeza y esa sonrisa… no tenía cómo no enamorarme.' },
            { foto: 'm25', nota: 'Feliz así', mensaje: 'Quiero volver a verte reír así, sin pensarlo. Y quiero ser yo el motivo.' },
            { foto: 'm33', nota: 'Mi payasita ✌️', mensaje: 'Contigo hasta lo más simple se volvía bonito.' },
            { foto: 'm35', nota: 'Tan tú 💚', mensaje: 'Sin filtros y sin poses. Así, tal cual, eres la más linda.' },
            { foto: 'm53', nota: 'Sonrisita 💚', mensaje: 'Esa sonrisa tímida me la sé de memoria.' },
            { foto: 'm14', nota: 'Mi viejita 💕', mensaje: 'Quiero que te acuerdes de cuando eras mi viejita, porque yo sigo siendo tu viejito.' },
            { foto: 'm37', nota: 'Navidad 🎄', mensaje: 'De todos los regalos, mi favorito siempre fuiste tú.' },
        ],
    },
    {
        titulo: 'Mi viejita, siempre tan linda',
        icono: '🖤',
        fotos: [
            { foto: 'm04', nota: 'En blanco y negro', mensaje: 'Ni sin colores pierdes el brillo.' },
            { foto: 'm05', nota: 'Mi reina 🖤', mensaje: 'Cada vez que te veo así, me vuelvo a enamorar como la primera vez.' },
            { foto: 'm08', nota: 'Hermosa 🌸', mensaje: 'Me equivoqué al alejarme de ti. Ese error no lo vuelvo a cometer.' },
            { foto: 'm09', nota: 'Mi Ela', mensaje: 'Ela, siempre serás el amor de mi vida.' },
            { foto: 'm10', nota: 'Flor de mi vida 🌺', mensaje: 'Hasta tu ropa parece un jardín. Y yo quiero ser quien lo cuide.' },
            { foto: 'm12', nota: 'Mi elegante', mensaje: 'Tú no posas. Tú brillas.' },
            { foto: 'm13', nota: 'Divina ✨', mensaje: 'Quiero volver a acompañarte a cada lugar, de tu mano.' },
            { foto: 'm19', nota: 'Esa mirada', mensaje: 'Esa mirada todavía me desarma.' },
            { foto: 'm29', nota: 'Qué bonita', mensaje: 'Te miro y entiendo por qué nunca dejé de amarte.' },
            { foto: 'm30', nota: 'Tímida 🙊', mensaje: 'Hasta cuando te escondes eres hermosa.' },
            { foto: 'm41', nota: 'Estrella ✨', mensaje: 'Donde estés, iluminas. Siempre fue así.' },
            { foto: 'm15', nota: 'Con tu gente', mensaje: 'Me encanta verte feliz con los tuyos. Quiero volver a ser parte de eso.' },
            { foto: 'm28', nota: 'Dormilona 😴', mensaje: 'Te pienso así, tranquila. Quiero que vuelvas a sentirte en paz conmigo.' },
            { foto: 'm34', nota: 'Mi atardecer 🌅', mensaje: 'Esa luz en tu cara es lo más lindo que he visto.' },
        ],
    },
    {
        titulo: 'Mis locuras favoritas',
        icono: '🤠',
        fotos: [
            { foto: 'm03', nota: '¿Este o este? 👒', mensaje: 'Hasta probándote sombreros me tienes enamorado.' },
            { foto: 'm17', nota: 'Mi vaquera 🤠', mensaje: 'Con ese sombrero me robaste el corazón otra vez.' },
            { foto: 'm21', nota: '¿Qué miras? 😂', mensaje: 'Hasta en tus fotos más locas te amo.' },
            { foto: 'm22', nota: 'Coletas 💜', mensaje: 'Así, con coletas y esa carita, me tienes.' },
            { foto: 'm26', nota: 'Brillando 💜', mensaje: 'Esa luz morada te queda. Pero la que llevas por dentro brilla más.' },
            { foto: 'm18', nota: '¿En qué piensas?', mensaje: 'Ojalá sea en nosotros. Yo no dejo de pensar en ti.' },
            { foto: 'm02', nota: 'Días en casa', mensaje: 'Lo simple contigo era lo más bonito: una mesa, un rato, tú.' },
            { foto: 'm11', nota: 'Hasta con tapabocas 😷', mensaje: 'Ni con media cara tapada dejas de ser la más linda.' },
            { foto: 'm49', nota: 'Spa day 🧖‍♀️', mensaje: 'Con mascarilla y todo: mi viejita más linda.' },
            { foto: 'm07', nota: 'Desde abajito 😅', mensaje: 'Hasta en el ángulo más raro te ves preciosa.' },
        ],
    },
    {
        titulo: 'La playa contigo',
        icono: '🌊',
        fotos: [
            { foto: 'm23', nota: 'Mi playa 🌊', mensaje: 'Ese día en la playa lo llevo guardado. Quiero que vengan muchos más.' },
            { foto: 'm39', nota: 'Sol y tú ☀️', mensaje: 'El sol, el agua y tú. No hace falta nada más.' },
        ],
    },
    {
        titulo: 'Hasta por una pantalla',
        icono: '📱',
        fotos: [
            { foto: 'm44', nota: 'Tus ojitos 👀', mensaje: 'Hasta por una pantalla me mirabas y se me olvidaba todo.' },
            { foto: 'm46', nota: 'Videollamada 📱', mensaje: 'Las horas hablando contigo se me pasaban como minutos.' },
            { foto: 'm47', nota: 'Buenas noches 🌙', mensaje: 'Ojalá volver a darte las buenas noches cada día.' },
            { foto: 'm48', nota: 'Mi solecito ☀️', mensaje: 'Cada foto tuya me alegraba el día.' },
            { foto: 'm50', nota: 'Holiiii 🙈', mensaje: 'Ese "holiiii" todavía me saca una sonrisa.' },
            { foto: 'm52', nota: 'Todo bien 👍', mensaje: 'Contigo todo está bien. Vamos de a poco, vamos a hacerlo bien.' },
        ],
    },
    {
        titulo: 'Nosotros',
        icono: '💑',
        fotos: [
            { foto: 'm40', nota: 'Tú y yo ✨', mensaje: 'Bajo esas luces, contigo al lado, todo tenía sentido.' },
            { foto: 'm42', nota: 'Nosotros 💑', mensaje: 'Así de cerquita. Así quiero que estemos siempre.' },
            { foto: 'm43', nota: 'M & E', mensaje: 'Maff y Eryck. Si volvemos, es para siempre.' },
            { foto: 'm55', nota: 'El bollo de tu vida 😂', mensaje: 'Ese chiste lo sigo sosteniendo. Y tú sigues siendo el amor de la mía.' },
            { foto: 'm32', nota: 'Tu cadenita', mensaje: 'Lo que llevas cerca del corazón… ojalá vuelva a ser yo.' },
            { foto: 'm38', nota: 'Tú y yo ✌️', mensaje: 'Dos caritas, una sola historia. Vamos a seguir escribiéndola.' },
        ],
    },
    {
        titulo: 'Y hoy, más linda que nunca',
        icono: '🌻',
        fotos: [
            { foto: 'hoy1', nota: 'Hoy 🌻', mensaje: 'Hoy te miro y te sigo amando igual. O más.' },
            { foto: 'hoy2', nota: 'Mi flor 🌺', mensaje: 'Esa flor en tu pelo y tú: mi jardín favorito.' },
            { foto: 'hoy3', nota: 'Mi girasol 🌻', mensaje: 'Quiero que sepas que siempre te he amado.' },
        ],
    },
];

// Ella sola en el trono: portada, final, película y celebraciones
const REINA = {
    foto: 'reina',
    nota: 'Mi reina 👑',
    mensaje: 'Siempre has sido mi reina. Y ese trono sigue siendo tuyo.',
};

// La última de todas
const FINAL = {
    foto: 'm54',
    nota: 'Tu rey, a tu lado 👑',
    mensaje: 'Si volvemos, es para siempre. Para nunca más dejarnos.',
};

// El frasco: sale una al azar cada vez que lo toca
const RAZONES = [
    'Porque contigo hasta lo simple es bonito.',
    'Porque tu risa me arregla el día.',
    'Porque eres mi viejita y yo sigo siendo tu viejito.',
    'Porque eres mi paz.',
    'Porque me enseñaste lo que es amar de verdad.',
    'Porque eres fuerte, aunque te tocó serlo por mi culpa.',
    'Porque quiero volver a ganarme tu confianza, día a día.',
    'Porque eres mi girasol: siempre buscas la luz.',
    'Porque dos años no se borran. Se sanan.',
    'Porque eres el amor de mi vida.',
    'Porque esta vez lo quiero hacer bien.',
    'Porque contigo quiero ir de a poco, pero para siempre.',
    'Porque eres Ela. Mi Ela.',
    'Porque eres mi reina.',
    'Porque te pienso al despertar y antes de dormir.',
    'Porque nunca dejé de amarte.',
];

// Vales de amor: ella toca el que quiera cobrar y le hace captura
const VALES = [
    { icono: '🌊', titulo: 'Un día de playa', texto: 'Tú, yo y el mar. Tú escoges el día.' },
    { icono: '🏍️', titulo: 'Un paseo en moto', texto: 'Sin rumbo. Solo tú abrazada a mí.' },
    { icono: '🍽️', titulo: 'Una salida a comer', texto: 'Donde tú quieras. Yo invito.' },
    { icono: '💃', titulo: 'Una noche en Zamba', texto: 'Para celebrarte otra vez, como en tu grado.' },
    { icono: '🤗', titulo: 'Un abrazo largo', texto: 'De esos que lo arreglan todo sin decir nada.' },
    { icono: '☕', titulo: 'Una conversación sin prisa', texto: 'Me cuentas, te cuento. Vamos de a poco.' },
];

// Fecha en que empezaron, así: '2023-05-14' (año-mes-día).
// Mientras esté vacía, el contador de días no aparece.
const INICIO = '';

// Enlace de la canción. Para poner la exacta: en YouTube Music,
// Compartir → Copiar enlace, y pegarlo aquí entre las comillas.
const CANCION = 'https://music.youtube.com/search?q=%C3%81mame+El+Gran+Combo';
