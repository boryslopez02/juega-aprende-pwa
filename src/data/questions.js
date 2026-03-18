export const difficulties = [
    {
        id: 'easy',
        name: 'Fácil',
        label: 'Explorador',
        icon: 'sprout',
        color: '#10b981',
        colorLight: '#d1fae5',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        description: 'Conceptos básicos para empezar',
        questionCount: 5,
        pointsPerCorrect: 10,
        stars: 1
    },
    {
        id: 'medium',
        name: 'Normal',
        label: 'Aventurero',
        icon: 'zap',
        color: '#f59e0b',
        colorLight: '#fef3c7',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        description: 'Un poco más de profundidad',
        questionCount: 7,
        pointsPerCorrect: 15,
        stars: 2
    },
    {
        id: 'hard',
        name: 'Experto',
        label: 'Maestro',
        icon: 'flame',
        color: '#ef4444',
        colorLight: '#fee2e2',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        description: 'Para cerebros curiosos',
        questionCount: 10,
        pointsPerCorrect: 20,
        stars: 3
    }
]

export const categories = [
    {
        id: 'hardware',
        name: 'Hardware',
        icon: 'hardware',
        color: '#6366f1',
        colorLight: '#e0e7ff',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        intros: {
            easy: {
                title: '¡Conoce las piezas de la computadora!',
                body: 'Una computadora está hecha de piezas físicas que puedes tocar. A estas piezas las llamamos HARDWARE. Piensa en ello como el cuerpo humano: tiene un cerebro (CPU), memoria (RAM), ojos (monitor) y manos (teclado y mouse). En este nivel aprenderás a reconocer cada parte y para qué sirve. ¡Es más fácil de lo que crees!',
                tip: 'Mira la computadora más cercana e intenta identificar cada parte mientras respondes.',
                fact: 'El primer mouse fue inventado en 1964 y era de madera.'
            },
            medium: {
                title: 'El interior de la computadora',
                body: 'Ya conoces las piezas externas. ¡Ahora vamos adentro! La RAM guarda lo que usas ahora, el disco duro guarda todo para siempre, la GPU dibuja los gráficos, y la fuente de poder da electricidad a todo. En este nivel entenderás cómo trabajan estas piezas juntas como un equipo coordinado.',
                tip: 'Piensa en cada componente como un miembro de un equipo: cada uno tiene su función específica.',
                fact: 'Una RAM típica transfiere datos a más de 25 GB por segundo, ¡más rápido que cualquier internet del hogar!'
            },
            hard: {
                title: 'Rendimiento y arquitectura avanzada',
                body: 'Aquí dominamos los detalles técnicos: frecuencias de reloj en GHz, jerarquías de memoria (caché vs RAM vs disco), diferencias entre HDD y SSD a nivel físico, y la función de la placa madre como columna vertebral de todo el sistema. Ya no solo identificas las piezas, entiendes por qué cada especificación importa.',
                tip: 'Los números técnicos tienen significado real: más GHz = más operaciones por segundo.',
                fact: 'Un SSD NVMe moderno puede leer datos a 7,000 MB/s, ¡14 veces más rápido que un HDD mecánico!'
            }
        },
        questions: [
            { difficulty: 'easy', question: '¿Qué parte de la computadora es el cerebro?', options: ['Monitor', 'CPU', 'Teclado', 'Mouse'], correct: 1, explanation: '¡El CPU (Unidad Central de Procesamiento) es el cerebro! Hace todos los cálculos y toma todas las decisiones de la computadora.' },
            { difficulty: 'easy', question: '¿Para qué sirve el mouse?', options: ['Escribir texto', 'Imprimir documentos', 'Mover el cursor y hacer clic', 'Escuchar música'], correct: 2, explanation: 'El mouse controla el cursor en pantalla. Con él puedes señalar, hacer clic y seleccionar cualquier elemento.' },
            { difficulty: 'easy', question: '¿Qué dispositivo usas para VER lo que hace la computadora?', options: ['Teclado', 'Monitor', 'Impresora', 'Parlantes'], correct: 1, explanation: '¡El monitor es la pantalla! Muestra todo lo que procesa el sistema, desde texto hasta videos y juegos.' },
            { difficulty: 'easy', question: '¿Qué usas para escribir en la computadora?', options: ['Mouse', 'Monitor', 'Teclado', 'Webcam'], correct: 2, explanation: 'El teclado tiene todas las letras, números y símbolos para escribir. ¡Es como un lápiz digital con muchas teclas!' },
            { difficulty: 'easy', question: '¿Qué hace una impresora?', options: ['Navega por internet', 'Transfiere contenido digital al papel', 'Guarda archivos', 'Reproduce música'], correct: 1, explanation: '¡La impresora transfiere lo digital al papel! Puedes imprimir documentos, fotos y cualquier cosa que ves en pantalla.' },
            { difficulty: 'medium', question: '¿Para qué sirve la memoria RAM?', options: ['Guardar fotos para siempre', 'Guardar lo que usas en este momento', 'Conectarte a internet', 'Imprimir documentos'], correct: 1, explanation: 'La RAM guarda temporalmente lo que usas AHORA. Es tu mesa de trabajo: cuando apagas la computadora, todo se borra.' },
            { difficulty: 'medium', question: '¿Cuál es la diferencia entre el disco duro y la RAM?', options: ['Son exactamente lo mismo', 'El disco guarda permanentemente, la RAM temporalmente', 'La RAM siempre es más lenta', 'El disco es siempre más pequeño'], correct: 1, explanation: 'Disco duro = mochila (guarda para siempre). RAM = mesa de trabajo (solo mientras usas algo). ¡Son complementarios!' },
            { difficulty: 'medium', question: '¿Qué es una GPU?', options: ['Un tipo de mouse avanzado', 'Un procesador especializado en gráficos', 'Una memoria extra para el sistema', 'Un tipo de teclado especial'], correct: 1, explanation: 'La GPU procesa imágenes, videos y juegos. Tiene miles de núcleos pequeños trabajando en paralelo para dibujar cada píxel.' },
            { difficulty: 'medium', question: '¿Qué es un puerto USB?', options: ['Una ciudad digital virtual', 'Una entrada para conectar dispositivos externos', 'Un tipo de pantalla especial', 'Un tipo de batería interna'], correct: 1, explanation: 'El puerto USB es una entrada universal. Conectas memorias, teclados, cargadores y más de 10,000 tipos de dispositivos distintos.' },
            { difficulty: 'medium', question: '¿Qué hace la fuente de poder (PSU)?', options: ['Navega por internet', 'Convierte y distribuye electricidad a los componentes', 'Almacena archivos permanentemente', 'Muestra imágenes en pantalla'], correct: 1, explanation: 'La PSU convierte la corriente alterna de la pared en corriente directa para los componentes. ¡Sin ella nada funciona!' },
            { difficulty: 'hard', question: '¿Qué mide la velocidad de un procesador (CPU)?', options: ['Gigabytes (GB)', 'Gigahertz (GHz)', 'Megapíxeles (MP)', 'Terabytes (TB)'], correct: 1, explanation: 'Los GHz miden ciclos por segundo. Un CPU a 3 GHz ejecuta 3 mil millones de operaciones por segundo. ¡Velocidad increíble!' },
            { difficulty: 'hard', question: '¿Qué es la memoria caché del procesador?', options: ['Una RAM adicional externa al CPU', 'Memoria ultrarrápida integrada directamente en el CPU', 'Un tipo de disco sólido especial', 'Un banco de memoria virtual del sistema'], correct: 1, explanation: 'La caché está dentro del CPU y es más rápida que la RAM. Guarda datos frecuentes para no tener que buscarlos en memorias más lentas.' },
            { difficulty: 'hard', question: '¿Cuántos bits tiene un byte?', options: ['4 bits', '8 bits', '16 bits', '32 bits'], correct: 1, explanation: '1 byte = 8 bits. Los bits son ceros y unos (el idioma de la computadora). Con 8 bits puedes representar 256 valores distintos (2⁸).' },
            { difficulty: 'hard', question: '¿Qué tipo de almacenamiento es más rápido?', options: ['HDD (disco mecánico)', 'CD-ROM óptico', 'SSD NVMe (sólido)', 'Disquete magnético'], correct: 2, explanation: 'El SSD NVMe usa chips de memoria y no tiene partes móviles. Alcanza 7,000 MB/s vs los 150 MB/s de un HDD. ¡47 veces más rápido!' },
            { difficulty: 'hard', question: '¿Qué función tiene la placa madre (motherboard)?', options: ['Solo almacena archivos del sistema', 'Conecta y permite la comunicación entre todos los componentes', 'Solo procesa las imágenes del monitor', 'Solo distribuye la energía eléctrica'], correct: 1, explanation: 'La motherboard es la ciudad de la computadora. Conecta CPU, RAM, GPU, discos y puertos para que todo se comunique entre sí.' }
        ]
    },
    {
        id: 'software',
        name: 'Software',
        icon: 'software',
        color: '#0ea5e9',
        colorLight: '#e0f2fe',
        gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        intros: {
            easy: {
                title: '¿Qué es el software?',
                body: 'Si el hardware es el cuerpo de la computadora, el SOFTWARE es su mente. El software son todos los programas que no puedes tocar pero sí usar: juegos, apps, el sistema que controla todo. Sin software, una computadora sería solo metal y plástico sin vida. ¡Aprende a reconocer los tipos de software que usas cada día!',
                tip: 'Piensa en todas las apps que usas: el navegador, los juegos, la música... ¡todas son software!',
                fact: '¡Hay más de 8 millones de apps disponibles en las tiendas digitales del mundo!'
            },
            medium: {
                title: 'Cómo funciona el software por dentro',
                body: 'Ya sabes qué es el software. Ahora entendemos cómo funciona: los archivos tienen extensiones (.exe, .jpg, .pdf) que indican su tipo, los drivers conectan el sistema con el hardware, y el código abierto permite que todos colaboren. Descubrirás por qué las actualizaciones importan y cómo los antivirus protegen tu equipo en tiempo real.',
                tip: 'La próxima vez que descargues algo, observa la extensión del archivo para saber qué tipo es.',
                fact: 'Windows 11 tiene más de 50 millones de líneas de código. ¡Un libro normal tiene unas 500 páginas de texto!'
            },
            hard: {
                title: 'Arquitectura de software avanzada',
                body: 'Aquí exploramos los cimientos: el kernel gestiona el hardware directamente desde el núcleo del sistema, la memoria virtual extiende la RAM usando el disco duro, las APIs permiten que los programas se comuniquen entre sí con mensajes estandarizados, y la diferencia entre software propietario y libre define cómo se distribuye el conocimiento tecnológico.',
                tip: 'Cada app que usas llama a docenas de APIs internas y externas en milisegundos sin que lo notes.',
                fact: 'Linux, el kernel open source más usado del mundo, tiene más de 27 millones de líneas de código contribuidas por miles de personas.'
            }
        },
        questions: [
            { difficulty: 'easy', question: '¿Qué es un programa o aplicación (app)?', options: ['Una parte física de la computadora', 'Un conjunto de instrucciones que hace tareas', 'Un cable de conexión', 'Una batería recargable'], correct: 1, explanation: 'Un programa es software: instrucciones que le dicen a la computadora qué hacer. Como una receta que la máquina sigue paso a paso.' },
            { difficulty: 'easy', question: '¿Qué es el sistema operativo?', options: ['Un videojuego avanzado', 'El programa principal que controla todo el sistema', 'Un virus informático dañino', 'Una carpeta de archivos'], correct: 1, explanation: 'El sistema operativo (Windows, macOS, Android) es el jefe. Gestiona el hardware y permite que todos los demás programas funcionen.' },
            { difficulty: 'easy', question: '¿Para qué sirve un navegador web?', options: ['Jugar sin conexión a internet', 'Acceder y mostrar páginas web de internet', 'Escribir documentos de texto', 'Crear ilustraciones digitales'], correct: 1, explanation: 'Chrome, Firefox, Safari son navegadores. Son tu puerta a internet: piden páginas web a servidores y las muestran en pantalla.' },
            { difficulty: 'easy', question: '¿Qué hace un procesador de texto como Word?', options: ['Tomar fotografías digitales', 'Crear y editar documentos de texto', 'Navegar por internet', 'Administrar contraseñas seguras'], correct: 1, explanation: 'Word y similares sirven para escribir documentos. Puedes dar formato, agregar imágenes y guardar en distintos tipos de archivo.' },
            { difficulty: 'easy', question: '¿Qué es una actualización de software?', options: ['Borrar por completo el programa', 'Mejoras y correcciones al programa existente', 'Cambiar el color de la interfaz', 'Reiniciar la computadora'], correct: 1, explanation: 'Las actualizaciones corrigen errores, agregan funciones nuevas y mejoran la seguridad. ¡Mantener tus apps al día es muy importante!' },
            { difficulty: 'medium', question: '¿Cuál es la diferencia entre software y hardware?', options: ['Son exactamente idénticos', 'Hardware es físico y tangible; software es intangible', 'El software ocupa más espacio físico', 'El hardware es siempre más rápido que el software'], correct: 1, explanation: 'Hardware = puedes tocarlo (pantalla, teclado). Software = no puedes tocarlo pero sí usarlo (apps, juegos, sistemas operativos).' },
            { difficulty: 'medium', question: '¿Qué es un archivo .exe en Windows?', options: ['Una imagen digital de alta resolución', 'Un programa ejecutable que inicia una aplicación', 'Un documento de texto simple', 'Un archivo de audio o música'], correct: 1, explanation: 'Los .exe son programas que puedes abrir directamente en Windows. Son el "lanzador" que inicia las aplicaciones instaladas.' },
            { difficulty: 'medium', question: '¿Qué hace el software antivirus?', options: ['Acelera significativamente la conexión a internet', 'Detecta y elimina programas maliciosos del sistema', 'Mejora la calidad de los gráficos en pantalla', 'Libera espacio en el disco duro'], correct: 1, explanation: 'El antivirus escanea constantemente tu sistema buscando amenazas. Es el guardaespaldas digital de tu computadora.' },
            { difficulty: 'medium', question: '¿Qué indica la extensión de un archivo (.jpg, .mp3, .pdf)?', options: ['El tamaño que ocupa el archivo', 'El tipo de contenido y formato del archivo', 'La fecha exacta de creación', 'El nombre del autor del archivo'], correct: 1, explanation: '.jpg = imagen, .mp3 = audio, .pdf = documento. Las extensiones le dicen al sistema qué programa debe abrir ese archivo.' },
            { difficulty: 'medium', question: '¿Qué significa "código abierto" (open source)?', options: ['Que el programa tiene un precio muy elevado', 'Que el código puede ser visto y modificado por cualquiera', 'Que solo funciona con conexión a internet activa', 'Que el programa no recibirá más actualizaciones'], correct: 1, explanation: 'Open source comparte el código con todos. Cualquier programador puede leerlo, mejorarlo y distribuirlo. Linux y Firefox son ejemplos.' },
            { difficulty: 'hard', question: '¿Qué es un driver o controlador de dispositivo?', options: ['Un programador especializado en hardware', 'Software que permite al sistema operativo comunicarse con hardware', 'Un tipo específico de videojuego moderno', 'Un navegador especializado en seguridad'], correct: 1, explanation: 'Los drivers son traductores: le explican al sistema operativo cómo hablar con el hardware. Sin el driver de tu GPU, la pantalla no funcionaría.' },
            { difficulty: 'hard', question: '¿Qué es la memoria virtual en un sistema operativo?', options: ['Una RAM física más rápida instalada extra', 'Espacio en disco que simula RAM cuando esta se llena', 'Almacenamiento en servidores de la nube', 'Un tipo de procesador gráfico virtual'], correct: 1, explanation: 'Cuando la RAM se llena, el SO usa parte del disco como "RAM extra". Es más lento pero evita que el sistema se bloquee por completo.' },
            { difficulty: 'hard', question: '¿Qué es una API en programación?', options: ['Un tipo de virus de nueva generación', 'Una interfaz que permite que programas se comuniquen entre sí', 'Un sistema operativo alternativo moderno', 'Un tipo de navegador web especializado'], correct: 1, explanation: 'API = interfaz de programación. Permite que apps compartan funciones. Cuando una app muestra un mapa de Google, está usando su API.' },
            { difficulty: 'hard', question: '¿Qué es el kernel de un sistema operativo?', options: ['El fondo de pantalla configurado por el usuario', 'El núcleo que gestiona hardware y recursos del sistema', 'El navegador de internet incorporado', 'El reloj digital del sistema'], correct: 1, explanation: 'El kernel es el núcleo más profundo del SO. Habla directamente con el hardware y gestiona memoria, procesos y permisos de todo.' },
            { difficulty: 'hard', question: '¿Qué diferencia hay entre software propietario y software libre?', options: ['No existe ninguna diferencia real', 'Propietario tiene restricciones de uso; libre permite usar, copiar y modificar', 'El software libre siempre cuesta dinero para usar', 'El software propietario es siempre completamente gratuito'], correct: 1, explanation: 'Propietario (Windows, Photoshop): la empresa controla el código. Libre (Linux, GIMP): código abierto que puedes modificar y compartir.' }
        ]
    },
    {
        id: 'internet',
        name: 'Internet',
        icon: 'internet',
        color: '#8b5cf6',
        colorLight: '#ede9fe',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        intros: {
            easy: {
                title: '¡Viajando por la red mundial!',
                body: 'Internet es como una telaraña gigante que conecta computadoras de todo el mundo. Puedes enviar mensajes, ver videos, buscar información y hablar con personas en cualquier país. Todo esto viaja por cables submarinos y señales inalámbricas a la velocidad de la luz. En este nivel aprenderás los conceptos básicos de cómo funciona esta maravillosa red global.',
                tip: 'Cada vez que abres una página web, tu computadora hace un viaje de ida y vuelta en milisegundos.',
                fact: 'Más de 5,000 millones de personas usan internet hoy en día en el mundo.'
            },
            medium: {
                title: 'Cómo navega la información',
                body: 'Ya sabes qué es internet. Ahora exploramos cómo funciona por dentro: las URLs son como direcciones postales de las páginas, el router reparte el internet en tu hogar como un repartidor, y la nube guarda tu información en servidores remotos accesibles desde cualquier lugar. También aprenderás qué significa el candado HTTPS y por qué es crucial para tu seguridad.',
                tip: 'La próxima vez que navegues, observa si la URL tiene https:// y el candado en la barra del navegador.',
                fact: 'Cada minuto se publican más de 500 horas de video en YouTube. ¡El internet nunca duerme!'
            },
            hard: {
                title: 'Infraestructura y protocolos de red',
                body: 'Aquí llegamos al corazón técnico de internet: las direcciones IP identifican cada dispositivo de forma única, el DNS traduce nombres legibles a números de red, el ancho de banda determina cuántos datos pueden viajar a la vez, los servidores web almacenan y sirven el contenido, y las VPN crean túneles privados y cifrados. Este nivel revela la arquitectura invisible detrás de cada clic.',
                tip: 'Tu router tiene una IP pública (hacia internet) y una privada (para tu red local). ¡Son diferentes y sirven propósitos distintos!',
                fact: 'Los cables de fibra óptica submarinos, que cruzan todos los océanos, transportan el 99% del tráfico internacional de internet.'
            }
        },
        questions: [
            { difficulty: 'easy', question: '¿Qué es Internet?', options: ['Una computadora muy grande y potente', 'Una red global de computadoras interconectadas', 'Un programa especial de computadora', 'Un videojuego multijugador en línea'], correct: 1, explanation: 'Internet es una red gigante que conecta miles de millones de computadoras en todo el mundo. ¡Como una telaraña planetaria!' },
            { difficulty: 'easy', question: '¿Qué es una página web?', options: ['Un libro físico en formato digital', 'Un documento accesible a través de internet', 'Una carpeta de archivos locales', 'Un tipo de virus informático'], correct: 1, explanation: 'Una página web es un documento con texto, imágenes y videos que vive en internet y puedes ver con un navegador.' },
            { difficulty: 'easy', question: '¿Qué es un correo electrónico (email)?', options: ['Una carta tradicional impresa en papel', 'Un mensaje digital enviado por internet', 'Un tipo de videojuego en línea', 'Una fotografía digital enviada'], correct: 1, explanation: 'El email es una carta digital. Viaja por internet en segundos y puede llegar a cualquier parte del mundo al instante.' },
            { difficulty: 'easy', question: '¿Qué significa WWW?', options: ['World Wide Web', 'World Weather Watch', 'Wild Wolf World', 'Wonderful Water World'], correct: 0, explanation: 'WWW = World Wide Web = Red de Alcance Mundial. Es la parte de internet donde viven todas las páginas web que visitas.' },
            { difficulty: 'easy', question: '¿Qué es el Wi-Fi?', options: ['Un cable de datos muy delgado', 'Conexión a internet transmitida de forma inalámbrica', 'Un tipo especial de página web', 'Un correo electrónico instantáneo'], correct: 1, explanation: 'El Wi-Fi usa ondas de radio para enviar internet sin cables. ¡Por eso puedes conectarte desde cualquier rincón de tu hogar!' },
            { difficulty: 'medium', question: '¿Qué es un URL o dirección web?', options: ['El nombre de usuario de una red social', 'La dirección única que identifica una página en internet', 'Una contraseña especial encriptada', 'Un archivo automáticamente descargado'], correct: 1, explanation: 'El URL es la dirección postal de una página. Por ejemplo: www.google.com siempre lleva al mismo lugar en cualquier parte del mundo.' },
            { difficulty: 'medium', question: '¿Por qué es importante que una web tenga HTTPS?', options: ['Hace que la página cargue siempre más rápido', 'La conexión está encriptada y protege tus datos', 'Significa que tiene más imágenes de calidad', 'Indica que es completamente gratuita'], correct: 1, explanation: 'HTTPS encripta los datos entre tú y el sitio. Nadie puede interceptar tu contraseña o datos. ¡Siempre busca el candado 🔒!' },
            { difficulty: 'medium', question: '¿Qué es un motor de búsqueda?', options: ['Una aplicación de música en streaming', 'Una herramienta que indexa y permite buscar en internet', 'Una red social para profesionales', 'Un tipo de navegador especializado'], correct: 1, explanation: 'Google, Bing y similares rastrean miles de millones de páginas y las clasifican para darte los mejores resultados al buscar.' },
            { difficulty: 'medium', question: '¿Qué es "la nube" en tecnología?', options: ['El estado del clima consultable en línea', 'Servidores remotos donde almacenas y accedes a datos por internet', 'Un virus que viaja por el aire invisiblemente', 'Una nueva red social muy popular'], correct: 1, explanation: 'La nube son servidores de empresas como Google o Amazon. Guardas tus fotos allí y puedes verlas desde cualquier dispositivo.' },
            { difficulty: 'medium', question: '¿Qué hace el router en tu hogar?', options: ['Imprime documentos a través de la red', 'Distribuye la conexión de internet a todos tus dispositivos', 'Almacena permanentemente todos tus archivos', 'Muestra páginas web cuando no hay internet'], correct: 1, explanation: 'El router es el repartidor de internet de tu casa. Recibe la señal del proveedor y la comparte con todos tus dispositivos.' },
            { difficulty: 'hard', question: '¿Qué es una dirección IP?', options: ['La velocidad de tu conexión a internet', 'Un identificador numérico único para cada dispositivo en la red', 'El nombre visible de tu perfil en línea', 'Un tipo específico de virus de red'], correct: 1, explanation: 'La IP es como el número de teléfono de tu dispositivo en internet. Permite que los datos sepan exactamente a dónde ir y de dónde vienen.' },
            { difficulty: 'hard', question: '¿Qué hace el sistema DNS?', options: ['Protege la red contra virus avanzados', 'Traduce nombres de dominio a direcciones IP numéricas', 'Aumenta automáticamente la velocidad de conexión', 'Gestiona y almacena contraseñas de sitios web'], correct: 1, explanation: 'DNS es la agenda de internet. Cuando escribes "google.com", DNS lo traduce a su IP real (ej: 142.250.80.46) para que puedas conectarte.' },
            { difficulty: 'hard', question: '¿Qué mide el ancho de banda de una conexión?', options: ['El número total de páginas que puedes abrir', 'La cantidad de datos que puede transferirse por segundo', 'El número máximo de usuarios que pueden conectarse', 'El precio mensual del servicio de internet'], correct: 1, explanation: 'El ancho de banda es el "tubo" de datos. Más ancho = más datos por segundo = internet más rápido para más personas simultáneamente.' },
            { difficulty: 'hard', question: '¿Qué es un servidor web?', options: ['Un mesero en un restaurante digital virtual', 'Una computadora que almacena y entrega páginas web a usuarios', 'Un tipo muy especial de navegador web', 'Un cable de fibra óptica submarina'], correct: 1, explanation: 'El servidor web está siempre encendido. Cuando visitas un sitio, tu navegador le pide la página y el servidor la envía en milisegundos.' },
            { difficulty: 'hard', question: '¿Qué es una VPN?', options: ['Un antivirus de nueva generación avanzado', 'Un túnel cifrado que protege tu conexión y privacidad', 'Una red social completamente privada', 'Un motor de búsqueda con privacidad mejorada'], correct: 1, explanation: 'La VPN crea un túnel encriptado entre tu dispositivo e internet. Protege tu privacidad y puede ocultar tu ubicación real al navegar.' }
        ]
    },
    {
        id: 'programming',
        name: 'Programación',
        icon: 'programming',
        color: '#ec4899',
        colorLight: '#fce7f3',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        intros: {
            easy: {
                title: '¡Aprende a hablarle a las computadoras!',
                body: 'Programar es como tener un superpoder: puedes crear aplicaciones, juegos y páginas web con solo escribir instrucciones. Los programadores escriben código que las computadoras siguen exactamente. ¡La primera programadora fue Ada Lovelace en 1843! En este nivel aprenderás qué es programar, qué es un bug y cómo funcionan los lenguajes de programación.',
                tip: 'La programación es lógica pura: paso a paso, como explicarle algo a alguien muy, muy literal.',
                fact: 'Ada Lovelace escribió el primer algoritmo de computadora en 1843, ¡100 años antes de que existieran las computadoras modernas!'
            },
            medium: {
                title: 'Las herramientas del programador',
                body: 'Ya entiendes qué es programar. Ahora aprendemos las estructuras fundamentales que usan todos los programadores: el "if" toma decisiones, el "loop" repite instrucciones automáticamente, las variables guardan información con un nombre, y el "print" muestra resultados en pantalla. También aprenderás HTML, el lenguaje de las páginas web. ¡Estos son los ladrillos de todo el software del mundo!',
                tip: 'Cada app que usas está construida con miles de ifs, loops y variables trabajando juntos coordinadamente.',
                fact: 'Python fue creado en 1991 y su nombre viene del grupo cómico Monty Python, ¡no del reptil!'
            },
            hard: {
                title: 'Ingeniería de software profesional',
                body: 'Aquí entramos al mundo profesional: la programación orientada a objetos organiza código en entidades reutilizables, la recursividad resuelve problemas dividiéndolos en partes más pequeñas, la complejidad algorítmica (Big O) mide la eficiencia de los algoritmos, Git controla el historial del código, y la inteligencia artificial aprende de enormes cantidades de datos. Este nivel revela cómo se construye el software que mueve el mundo.',
                tip: 'Todo el software que usas diariamente fue escrito por programadores usando exactamente estos mismos conceptos.',
                fact: 'El algoritmo de búsqueda de Google procesa más de 8,500 millones de búsquedas al día usando complejidad algorítmica optimizada.'
            }
        },
        questions: [
            { difficulty: 'easy', question: '¿Qué es programar?', options: ['Jugar videojuegos a nivel profesional', 'Escribir instrucciones que una computadora puede ejecutar', 'Ver videos de tecnología en internet', 'Diseñar el hardware de una computadora'], correct: 1, explanation: 'Programar es darle instrucciones precisas a la computadora. Cada app, juego y sitio web que usas fue creado programando.' },
            { difficulty: 'easy', question: '¿Qué es un bug en programación?', options: ['Un insecto que daña el hardware físico', 'Un error en el código del programa', 'Una función especial muy avanzada', 'Un nuevo lenguaje de programación moderno'], correct: 1, explanation: '¡Un bug es un error en el código! El término viene de 1947 cuando encontraron una polilla real dentro de una computadora que causaba fallos.' },
            { difficulty: 'easy', question: '¿Cuál de estos es un lenguaje de programación?', options: ['El idioma español', 'Python', 'El idioma francés', 'El idioma inglés'], correct: 1, explanation: 'Python es un lenguaje de programación muy popular y fácil de aprender. ¡Con él puedes crear juegos, webs, análisis de datos e inteligencia artificial!' },
            { difficulty: 'easy', question: '¿Qué hace un programador en su trabajo?', options: ['Arregla físicamente las computadoras rotas', 'Escribe código para crear y mejorar software', 'Solo navega por internet buscando información', 'Diseña ropa y accesorios tecnológicos'], correct: 1, explanation: 'Los programadores crean el código de todo: apps, videojuegos, redes sociales, sistemas bancarios y hasta cohetes espaciales.' },
            { difficulty: 'easy', question: '¿Qué es un algoritmo?', options: ['Un tipo de virus informático peligroso', 'Una secuencia ordenada de pasos para resolver un problema', 'Un lenguaje de programación completamente nuevo', 'Un videojuego de lógica matemática'], correct: 1, explanation: 'Un algoritmo es una receta con pasos ordenados. ¡Ya usas algoritmos cuando te amarras los zapatos o calculas una suma!' },
            { difficulty: 'medium', question: '¿Qué hace una instrucción "if" en programación?', options: ['Repite instrucciones en un bucle continuo', 'Ejecuta código solo si una condición es verdadera', 'Guarda información permanentemente en memoria', 'Muestra texto en la pantalla del programa'], correct: 1, explanation: 'El "if" es el semáforo del código: "SI llueve, ENTONCES abre el paraguas". Permite que el programa tome decisiones según condiciones.' },
            { difficulty: 'medium', question: '¿Qué es un bucle o "loop" en programación?', options: ['Un tipo de error crítico del sistema', 'Instrucciones que se repiten hasta cumplir una condición', 'Una función especial exclusiva de Python', 'Un lenguaje de programación alternativo'], correct: 1, explanation: 'El loop repite instrucciones automáticamente. En vez de escribir 1000 veces lo mismo, el loop lo hace por ti con muy pocas líneas.' },
            { difficulty: 'medium', question: '¿Qué es una variable en programación?', options: ['Una parte física del procesador CPU', 'Un espacio con nombre para guardar información temporal', 'Un error difícil de encontrar en el código', 'Un tipo de función matemática avanzada'], correct: 1, explanation: 'Una variable es una cajita con nombre: nombre = "Ana", edad = 10. Puedes cambiar su contenido en cualquier momento del programa.' },
            { difficulty: 'medium', question: '¿Qué hace print() en Python?', options: ['Imprime el documento en papel físico', 'Muestra un valor o texto en la pantalla del programador', 'Guarda un archivo en el disco duro', 'Elimina datos de la memoria del programa'], correct: 1, explanation: 'print() muestra texto en la consola del programador. ¡"print(Hola Mundo)" es el primer programa que aprende toda persona que empieza a programar!' },
            { difficulty: 'medium', question: '¿Para qué sirve HTML en programación web?', options: ['Para programar videojuegos en 3D', 'Para definir la estructura y contenido de páginas web', 'Para crear sistemas operativos completos', 'Para gestionar bases de datos relacionales'], correct: 1, explanation: 'HTML define qué HAY en una página web: títulos, párrafos, imágenes, botones, enlaces. ¡Sin HTML no existirían las páginas web que conoces!' },
            { difficulty: 'hard', question: '¿Qué es la programación orientada a objetos (POO)?', options: ['Programar mientras observas objetos físicos reales', 'Organizar el código en entidades con propiedades y comportamientos', 'Un tipo específico de videojuego tridimensional', 'Una forma especial de diseñar interfaces gráficas'], correct: 1, explanation: 'En POO, un "Perro" tiene propiedades (nombre, raza) y métodos (ladrar, comer). Organiza el código en entidades reutilizables y bien estructuradas.' },
            { difficulty: 'hard', question: '¿Qué es la recursividad en programación?', options: ['Un tipo de error infinito sin ninguna solución', 'Cuando una función se llama a sí misma para resolver subproblemas', 'Un tipo muy complejo de bucle anidado', 'Una variable que cambia su tipo automáticamente'], correct: 1, explanation: 'Una función recursiva se llama a sí misma con un problema más pequeño. Muy útil para árboles, fractales y algoritmos de búsqueda binaria.' },
            { difficulty: 'hard', question: '¿Qué mide la complejidad de un algoritmo (notación Big O)?', options: ['Cuántas líneas de código tiene el programa', 'Cómo crece el tiempo/memoria necesario según el tamaño del problema', 'Cuántos programadores colaboraron en su creación', 'Qué lenguaje de programación específico utiliza'], correct: 1, explanation: 'Big O mide eficiencia. O(n²) puede tardar horas donde O(log n) tarda segundos con millones de datos. ¡La diferencia es enorme!' },
            { difficulty: 'hard', question: '¿Qué es Git en el desarrollo de software moderno?', options: ['Un lenguaje de programación funcional moderno', 'Un sistema de control de versiones para rastrear cambios en el código', 'Un tipo especial de virus de desarrollo', 'Un motor de búsqueda específico para código fuente'], correct: 1, explanation: 'Git guarda el historial completo de tu código. Puedes volver a versiones anteriores, colaborar con equipos y no perder trabajo jamás.' },
            { difficulty: 'hard', question: '¿Cómo aprende un sistema de inteligencia artificial?', options: ['Le programas manualmente cada posible respuesta', 'Encuentra patrones en grandes cantidades de datos de ejemplo', 'Conectándose constantemente a internet en tiempo real', 'Copiando exactamente la estructura del cerebro humano'], correct: 1, explanation: 'La IA aprende de datos: le muestras miles de imágenes de gatos y aprende a reconocerlos. Igual que tú aprendes viendo muchos ejemplos.' }
        ]
    },
    {
        id: 'security',
        name: 'Seguridad',
        icon: 'security',
        color: '#f59e0b',
        colorLight: '#fef3c7',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        intros: {
            easy: {
                title: '¡Protege tu mundo digital!',
                body: 'En internet, igual que en la calle, hay que saber cuidarse. La seguridad digital protege tu información personal, tus contraseñas y tu privacidad en línea. Hay personas que intentan robar datos o engañar a otros en internet. ¡Pero si conoces sus trucos, puedes estar completamente seguro! En este nivel aprenderás las reglas fundamentales para navegar de forma segura.',
                tip: 'Regla de oro: nunca compartas tu contraseña con nadie, ni siquiera con tus mejores amigos.',
                fact: 'Se crean más de 450,000 programas maliciosos nuevos cada día. ¡Por eso la seguridad digital es tan importante!'
            },
            medium: {
                title: 'Ataques comunes y cómo defenderse',
                body: 'Ya conoces las reglas básicas de seguridad. Ahora aprendemos los ataques más comunes que existen: el phishing te engaña haciéndose pasar por alguien de confianza, el ransomware secuestra tus archivos pidiendo dinero, y el 2FA agrega una capa extra de protección a tus cuentas. También entenderás por qué el candado HTTPS en los sitios web es tan crucial para tu privacidad.',
                tip: 'Cuando recibas un email sospechoso, siempre revisa la dirección completa del remitente con mucho cuidado.',
                fact: 'El 90% de los ciberataques exitosos comienzan con un simple email de phishing bien elaborado.'
            },
            hard: {
                title: 'Ciberseguridad a nivel profesional',
                body: 'En este nivel dominamos los conceptos que usan los expertos en seguridad: la encriptación convierte datos en código ilegible sin la clave correcta, el firewall filtra todo el tráfico de red bloqueando amenazas, los ataques de fuerza bruta prueban millones de contraseñas por segundo, la ingeniería social manipula psicológicamente a personas, y las vulnerabilidades zero-day son fallos secretos sin parche. ¡Este es el nivel donde la seguridad se convierte en ciencia!',
                tip: 'Los mejores hackers usan ingeniería social, no código complejo. El factor humano es el más vulnerable.',
                fact: 'La contraseña más hackeada del mundo es "123456". ¡Más de 23 millones de cuentas la utilizan!'
            }
        },
        questions: [
            { difficulty: 'easy', question: '¿Qué es una contraseña (password)?', options: ['Tu nombre de usuario público visible', 'Una clave secreta para verificar tu identidad', 'Tu fecha de nacimiento personal', 'El nombre de tu mascota favorita'], correct: 1, explanation: 'La contraseña es tu llave digital secreta. Solo tú debes conocerla. ¡Nunca la compartas con nadie, absolutamente con nadie!' },
            { difficulty: 'easy', question: '¿Debes compartir tu contraseña con amigos?', options: ['Sí, si son amigos de total confianza', 'Nunca, las contraseñas son completamente privadas', 'Solo si la necesitan con urgencia real', 'Depende del sitio web en cuestión'], correct: 1, explanation: '¡NUNCA compartas tu contraseña! Aunque confíes totalmente en la persona. Las contraseñas protegen tu identidad y todos tus datos.' },
            { difficulty: 'easy', question: '¿Qué es un virus informático?', options: ['Una enfermedad que te da por usar la computadora', 'Un programa malicioso que daña sistemas y se replica solo', 'Un videojuego de acción muy divertido', 'Una aplicación de productividad especial'], correct: 1, explanation: 'Un virus es software malicioso. Se llama virus porque, como los biológicos, se copia automáticamente y se esparce a otras computadoras.' },
            { difficulty: 'easy', question: '¿Qué debes hacer si un desconocido en internet te pide datos personales?', options: ['Dárselos si parece amable y bien educado', 'Negarse y contarle inmediatamente a un adulto de confianza', 'Ignorarlo sin contarle nada a nadie', 'Darle solamente tu nombre de pila'], correct: 1, explanation: '¡NUNCA des tu dirección, escuela o fotos a desconocidos en internet! Siempre avisa inmediatamente a un adulto si esto ocurre.' },
            { difficulty: 'easy', question: '¿Cómo es una contraseña verdaderamente segura?', options: ['Solo con tu nombre de usuario', 'Mezcla de letras mayúsculas, minúsculas, números y símbolos', 'La secuencia simple 123456', 'La palabra exacta "contraseña"'], correct: 1, explanation: 'Una contraseña fuerte mezcla todo y es larga. Ejemplo: "Ga7o$Azul#23". ¡Más larga y compleja = más difícil de hackear siempre!' },
            { difficulty: 'medium', question: '¿Qué es el phishing?', options: ['Un deporte acuático practicado digitalmente', 'Un engaño para robar datos haciéndose pasar por alguien de confianza', 'Un tipo de antivirus muy avanzado', 'Una red social completamente privada'], correct: 1, explanation: 'El phishing usa mensajes falsos que parecen de tu banco, empresa o amigo. El objetivo es que entregues tu contraseña o datos personales.' },
            { difficulty: 'medium', question: '¿Para qué sirve la autenticación de dos factores (2FA)?', options: ['Para tener dos contraseñas exactamente iguales', 'Para añadir una capa extra de verificación además de la contraseña', 'Para tener un antivirus con protección doble', 'Para conectarse desde dos dispositivos al mismo tiempo'], correct: 1, explanation: '2FA = doble cerradura digital. Además de tu contraseña, pide un código extra. ¡Aunque roben tu contraseña, no pueden entrar sin el código!' },
            { difficulty: 'medium', question: '¿Qué es el ransomware?', options: ['Un videojuego de rescate de personajes secuestrados', 'Malware que cifra tus archivos y exige dinero para recuperarlos', 'Un antivirus de código abierto completamente gratuito', 'Una red privada virtual muy segura'], correct: 1, explanation: 'El ransomware bloquea todos tus archivos con encriptación y pide dinero para liberarlos. ¡Las copias de seguridad son tu mejor defensa!' },
            { difficulty: 'medium', question: '¿Por qué es importante que las webs tengan HTTPS?', options: ['Hace que la página cargue siempre más rápidamente', 'Garantiza que la comunicación está encriptada y es segura', 'Significa que el sitio tiene más contenido disponible', 'Indica que el sitio es completamente gratuito de usar'], correct: 1, explanation: 'HTTPS cifra los datos entre tú y el sitio. Sin él, alguien en la misma red podría ver tus contraseñas y datos bancarios.' },
            { difficulty: 'medium', question: '¿Qué hace una VPN para tu seguridad en internet?', options: ['Acelera significativamente tu internet siempre', 'Cifra tu conexión y oculta tu actividad de terceros', 'Elimina automáticamente todos los virus del dispositivo', 'Guarda tus contraseñas de forma segura y organizada'], correct: 1, explanation: 'La VPN cifra todo tu tráfico de internet. Muy útil en Wi-Fi público: sin VPN, cualquiera en la misma red podría espiar tu actividad.' },
            { difficulty: 'hard', question: '¿Qué es la encriptación de datos?', options: ['Borrar datos de forma permanente e irreversible', 'Transformar información en código ilegible sin la clave correcta', 'Comprimir archivos para ahorrar espacio en disco', 'Crear copias de seguridad automáticamente programadas'], correct: 1, explanation: 'La encriptación convierte datos en código cifrado. Solo quien tiene la clave puede leerlos. AES-256 tardaría millones de años en romperse por fuerza bruta.' },
            { difficulty: 'hard', question: '¿Qué es un ataque de fuerza bruta en ciberseguridad?', options: ['Un ataque físico directo a servidores con herramientas', 'Probar automáticamente millones de contraseñas hasta encontrar la correcta', 'Un virus extremadamente potente que daña el hardware', 'Un tipo sofisticado de phishing muy elaborado'], correct: 1, explanation: 'La fuerza bruta prueba millones de contraseñas por segundo automáticamente. Una contraseña de 8 caracteres simples se puede romper en minutos.' },
            { difficulty: 'hard', question: '¿Qué hace un firewall en una red informática?', options: ['Apaga equipos cuando detecta sobrecalentamiento peligroso', 'Filtra el tráfico de red bloqueando conexiones no autorizadas', 'Acelera la conexión eliminando datos innecesarios del tráfico', 'Almacena contraseñas de forma segura y cifrada'], correct: 1, explanation: 'El firewall inspecciona cada paquete de datos que entra y sale de la red. Bloquea conexiones sospechosas como un guardia de seguridad digital.' },
            { difficulty: 'hard', question: '¿Qué es la ingeniería social en ciberseguridad?', options: ['Construir la infraestructura técnica de redes sociales', 'Manipular psicológicamente a personas para obtener información confidencial', 'Programar algoritmos específicos para redes sociales', 'Analizar estadísticamente el comportamiento en redes sociales'], correct: 1, explanation: 'La ingeniería social explota la confianza humana. Un atacante llama fingiendo ser soporte técnico y te convence de revelar tu contraseña.' },
            { difficulty: 'hard', question: '¿Qué es una vulnerabilidad de día cero (zero-day)?', options: ['Un bug encontrado exactamente el primer día de lanzamiento', 'Un fallo de seguridad desconocido para el fabricante y sin parche disponible', 'Un virus informático creado muy recientemente', 'Una contraseña extremadamente débil de un solo carácter'], correct: 1, explanation: 'Zero-day = vulnerabilidad secreta que ni el fabricante conoce. Los atacantes la explotan antes de que exista parche. Son muy peligrosas y valiosas.' }
        ]
    }
]

export function getRandomQuestions(categoryId, difficulty = 'easy') {
    const category = categories.find(c => c.id === categoryId)
    if (!category) return []
    const diff = difficulties.find(d => d.id === difficulty)
    const count = diff?.questionCount || 5
    const filtered = category.questions.filter(q => q.difficulty === difficulty)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, shuffled.length))
}