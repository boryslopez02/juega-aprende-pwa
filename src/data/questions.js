export const categories = [
    {
        id: 'hardware',
        name: 'Hardware',
        icon: '💻',
        color: '#FF6B6B',
        questions: [
            {
                question: '¿Qué parte de la computadora es el cerebro?',
                options: ['Monitor', 'CPU', 'Teclado', 'Mouse'],
                correct: 1,
                explanation: '¡El CPU (Unidad Central de Procesamiento) es el cerebro de la computadora!'
            },
            {
                question: '¿Para qué sirve el mouse?',
                options: ['Escribir', 'Imprimir', 'Señalar y hacer clic', 'Escuchar música'],
                correct: 2,
                explanation: 'El mouse nos permite mover el cursor y hacer clic en la pantalla.'
            },
            {
                question: '¿Qué dispositivo usas para ver lo que hace la computadora?',
                options: ['Teclado', 'Monitor', 'Impresora', 'Parlantes'],
                correct: 1,
                explanation: 'El monitor es la pantalla donde ves todo lo que hace la computadora.'
            },
            {
                question: '¿Qué usas para escribir en la computadora?',
                options: ['Mouse', 'Monitor', 'Teclado', 'Webcam'],
                correct: 2,
                explanation: 'El teclado tiene letras y números para escribir.'
            }
        ]
    },
    {
        id: 'software',
        name: 'Software',
        icon: '📱',
        color: '#4ECDC4',
        questions: [
            {
                question: '¿Qué es un programa o app?',
                options: ['Una parte física', 'Un software que hace tareas', 'Un cable', 'Una batería'],
                correct: 1,
                explanation: 'Un programa o app es un software que le dice a la computadora qué hacer.'
            },
            {
                question: '¿Qué es el sistema operativo?',
                options: ['Un juego', 'El programa principal que controla todo', 'Un virus', 'Una carpeta'],
                correct: 1,
                explanation: 'El sistema operativo (como Windows o Android) controla toda la computadora.'
            },
            {
                question: '¿Para qué sirve un navegador de internet?',
                options: ['Jugar offline', 'Ver páginas web', 'Escribir documentos', 'Dibujar'],
                correct: 1,
                explanation: 'Los navegadores como Chrome o Firefox te permiten ver páginas de internet.'
            }
        ]
    },
    {
        id: 'internet',
        name: 'Internet',
        icon: '🌐',
        color: '#95E1D3',
        questions: [
            {
                question: '¿Qué es Internet?',
                options: ['Una computadora grande', 'Una red de computadoras conectadas', 'Un programa', 'Un juego'],
                correct: 1,
                explanation: 'Internet es una red gigante que conecta computadoras de todo el mundo.'
            },
            {
                question: '¿Qué es una página web?',
                options: ['Un libro físico', 'Un documento en internet', 'Una carpeta', 'Un virus'],
                correct: 1,
                explanation: 'Una página web es un documento que ves en internet con información.'
            },
            {
                question: '¿Qué es un correo electrónico (email)?',
                options: ['Una carta en papel', 'Un mensaje digital', 'Un juego', 'Una foto'],
                correct: 1,
                explanation: 'El email es como enviar cartas pero de forma digital y rápida.'
            },
            {
                question: '¿Qué significa WWW?',
                options: ['World Wide Web', 'World Weather Watch', 'Wild Wolf World', 'Wonderful Water World'],
                correct: 0,
                explanation: 'WWW significa World Wide Web (Red Mundial), es parte de Internet.'
            }
        ]
    },
    {
        id: 'programming',
        name: 'Programación',
        icon: '‍💻',
        color: '#A8E6CF',
        questions: [
            {
                question: '¿Qué es programar?',
                options: ['Jugar videojuegos', 'Dar instrucciones a una computadora', 'Ver videos', 'Dibujar'],
                correct: 1,
                explanation: 'Programar es darle instrucciones a la computadora para que haga algo.'
            },
            {
                question: '¿Qué es un bug en programación?',
                options: ['Un insecto real', 'Un error en el código', 'Una característica nueva', 'Un juego'],
                correct: 1,
                explanation: 'Un bug es un error o problema en el programa que hay que corregir.'
            },
            {
                question: '¿Qué lenguaje de programación es muy popular?',
                options: ['Español', 'Python', 'Francés', 'Inglés'],
                correct: 1,
                explanation: 'Python es un lenguaje de programación muy popular y fácil de aprender.'
            }
        ]
    },
    {
        id: 'security',
        name: 'Seguridad',
        icon: '🔒',
        color: '#FFD93D',
        questions: [
            {
                question: '¿Qué es una contraseña (password)?',
                options: ['Tu nombre', 'Una clave secreta para entrar', 'Tu edad', 'Tu color favorito'],
                correct: 1,
                explanation: 'La contraseña es una clave secreta que solo tú debes conocer.'
            },
            {
                question: '¿Debes compartir tu contraseña con amigos?',
                options: ['Sí, siempre', 'No, es secreta', 'Solo si te piden', 'A veces'],
                correct: 1,
                explanation: 'Nunca compartas tu contraseña, es como la llave de tu casa digital.'
            },
            {
                question: '¿Qué es un virus informático?',
                options: ['Una enfermedad real', 'Un programa dañino', 'Un juego divertido', 'Una app útil'],
                correct: 1,
                explanation: 'Un virus es un programa malo que puede dañar tu computadora.'
            }
        ]
    }
]

export function getRandomQuestions(categoryId, count = 5) {
    const category = categories.find(c => c.id === categoryId)
    if (!category) return []

    const shuffled = [...category.questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}