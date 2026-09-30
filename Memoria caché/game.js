/* =====================================================
   CACHE QUEST
   MAPA LIBRE - 10 ZONAS + ZONA SECRETA
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let score = 0;

let lives = 3;

let completedZones = 0;

let currentZone = null;

let questionAnswered = false;

let movementInterval = null;

let playerX = 0;

let playerY = 0;

let bestScore =
    Number(
        localStorage.getItem(
            "cacheQuestBest"
        )
    ) || 0;


/* =====================================================
   ELEMENTOS
===================================================== */

const menu =
    document.getElementById("menu");

const instructions =
    document.getElementById("instructions");

const game =
    document.getElementById("game");

const gameOver =
    document.getElementById("gameOver");

const victory =
    document.getElementById("victory");

const questionModal =
    document.getElementById("questionModal");

const explanationModal =
    document.getElementById("explanationModal");

const player =
    document.getElementById("player");

const gameArea =
    document.getElementById("gameArea");

const scoreText =
    document.getElementById("score");

const livesText =
    document.getElementById("lives");

const completedCount =
    document.getElementById("completedCount");

const progressBar =
    document.getElementById("progressBar");

const levelTitle =
    document.getElementById("levelTitle");

const levelDescription =
    document.getElementById("levelDescription");

const questionLevel =
    document.getElementById("questionLevel");

const questionPoints =
    document.getElementById("questionPoints");

const questionText =
    document.getElementById("questionText");

const answers =
    document.getElementById("answers");

const questionFeedback =
    document.getElementById("questionFeedback");

const resultIcon =
    document.getElementById("resultIcon");

const resultTitle =
    document.getElementById("resultTitle");

const explanationText =
    document.getElementById("explanationText");

const secretZone =
    document.getElementById("secretZone");

const secretStatus =
    document.getElementById("secretStatus");


/* =====================================================
   PREGUNTAS
===================================================== */

const levels = [

    {
        title: "🧠 Zona CPU",

        description:
            "Conoce qué es la memoria caché y dónde se encuentra.",

        points: 100,

        question:
            "¿Qué es la memoria caché?",

        options: [

            "Una memoria de gran capacidad",

            "Una memoria rápida y de poca capacidad",

            "Un tipo de almacenamiento permanente",

            "Una memoria que solamente utiliza la GPU"

        ],

        correct: 1,

        explanation:
            "La memoria caché es una memoria de acceso muy rápido y de poca capacidad. Se encuentra integrada en el procesador o muy cerca de él."
    },


    {
        title: "⚡ Zona Velocidad",

        description:
            "Descubre por qué la caché mejora el funcionamiento del sistema.",

        points: 125,

        question:
            "¿Cuál es una función principal de la memoria caché?",

        options: [

            "Guardar todos los archivos permanentemente",

            "Guardar copias temporales de datos utilizados frecuentemente",

            "Reemplazar el disco duro",

            "Eliminar la memoria RAM"

        ],

        correct: 1,

        explanation:
            "La caché guarda copias temporales para permitir un acceso rápido a información y mejorar el rendimiento del sistema."
    },


    {
        title: "🎯 Zona Cache Hit",

        description:
            "Encuentra qué sucede cuando el dato sí está en caché.",

        points: 150,

        question:
            "El procesador necesita el DATO A y este se encuentra en la caché. ¿Qué ocurre?",

        options: [

            "Cache Miss",

            "Cache Hit",

            "Se busca directamente en ROM",

            "Se elimina el dato"

        ],

        correct: 1,

        explanation:
            "Es un Cache Hit porque el sistema encuentra los datos que necesita en la memoria caché."
    },


    {
        title: "🚫 Zona Cache Miss",

        description:
            "El dato no está en la caché. ¿Qué sucede?",

        points: 175,

        question:
            "El procesador necesita el DATO X, pero no está en la caché. ¿Qué ocurre?",

        options: [

            "Cache Hit",

            "Cache Miss",

            "La computadora se apaga",

            "El dato se guarda en ROM"

        ],

        correct: 1,

        explanation:
            "Es un Cache Miss. El dato no está en la caché y debe buscarse en la RAM."
    },


    {
        title: "🗺️ Zona Mapeo Directo",

        description:
            "Aprende cómo se asignan los bloques en el mapeo directo.",

        points: 200,

        question:
            "En el mapeo directo, ¿dónde puede colocarse un bloque?",

        options: [

            "En cualquier posición disponible",

            "En una única ubicación específica",

            "En todas las posiciones",

            "Solamente en la RAM"

        ],

        correct: 1,

        explanation:
            "Cada bloque de memoria principal corresponde a una única ubicación específica dentro de la caché."
    },


    {
        title: "🔄 Zona Asociativa",

        description:
            "Ahora el bloque puede ocupar cualquier posición disponible.",

        points: 225,

        question:
            "¿Qué característica tiene el mapeo asociativo?",

        options: [

            "Cada bloque tiene una sola posición",

            "El bloque puede almacenarse en cualquier posición disponible",

            "El bloque solamente puede entrar en la RAM",

            "No utiliza memoria caché"

        ],

        correct: 1,

        explanation:
            "En el mapeo asociativo, cualquier bloque de memoria puede almacenarse en cualquier posición disponible de la caché."
    },


    {
        title: "🧩 Zona Conjuntos",

        description:
            "Aprende el funcionamiento del mapeo asociativo por conjuntos.",

        points: 250,

        question:
            "¿Cómo funciona el mapeo asociativo por conjuntos?",

        options: [

            "Cada bloque tiene una única posición",

            "Cualquier bloque puede ocupar cualquier lugar de toda la caché",

            "La caché se divide en conjuntos y el bloque puede ocupar varias posiciones dentro de su conjunto",

            "Los bloques solamente se guardan en ROM"

        ],

        correct: 2,

        explanation:
            "La caché se divide en conjuntos y cada bloque puede almacenarse dentro de varias posiciones de su conjunto."
    },


    {
        title: "💾 Zona RAM / ROM",

        description:
            "Diferencia RAM, ROM y memoria caché.",

        points: 275,

        question:
            "¿Cuál representa mejor a la memoria caché?",

        options: [

            "Una memoria muy rápida utilizada para datos que se necesitan frecuentemente",

            "Una memoria permanente de gran capacidad",

            "Una memoria utilizada exclusivamente para arrancar la computadora",

            "Un dispositivo externo"

        ],

        correct: 0,

        explanation:
            "La caché es muy rápida y mantiene temporalmente información que el procesador utiliza con frecuencia."
    },


    {
        title: "🗑️ Zona LRU / FIFO",

        description:
            "La caché está llena. Decide qué elemento debe salir.",

        points: 300,

        question:
            "Utilizando LRU, ¿qué elemento se elimina cuando la caché necesita espacio?",

        options: [

            "El utilizado más recientemente",

            "El utilizado menos recientemente",

            "El primero que llegó siempre",

            "Todos los elementos"

        ],

        correct: 1,

        explanation:
            "LRU significa Least Recently Used. Se elimina lo que lleva más tiempo sin utilizarse."
    },


    {
        title: "🤖 Zona Caché en IA",

        description:
            "Aplica el concepto de caché a Inteligencia Artificial.",

        points: 400,

        question:
            "¿Cómo puede ayudar la memoria caché a una aplicación de Inteligencia Artificial?",

        options: [

            "Eliminando el procesador",

            "Facilitando el acceso rápido a datos utilizados frecuentemente",

            "Aumentando físicamente la memoria RAM",

            "Reemplazando todos los algoritmos"

        ],

        correct: 1,

        explanation:
            "La memoria caché puede mejorar el rendimiento de aplicaciones de IA al facilitar el acceso rápido a datos utilizados frecuentemente y reducir tiempos de espera del procesador."
    }

];


/* =====================================================
   PREGUNTA SECRETA
===================================================== */

const secretQuestion = {

    points: 500,

    question:
        "¿Qué pasaría si una computadora no tuviera memoria caché?",

    options: [

        "Dejaría de funcionar completamente",

        "Funcionaría, pero podría ser entre 10 y 100 veces más lenta",

        "Tendría automáticamente más RAM",

        "La ROM desaparecería"

    ],

    correct: 1,

    explanation:
        "La computadora seguiría funcionando, pero según el contenido de la clase podría ser mucho más lenta debido a que el procesador tendría que esperar más frecuentemente por los datos."
};


/* =====================================================
   INICIAR JUEGO
===================================================== */

function startGame() {

    score = 0;

    lives = 3;

    completedZones = 0;

    currentZone = null;

    questionAnswered = false;


    hideAllScreens();


    game.classList.add(
        "active"
    );


    /* Reactivar las 10 zonas */

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const zone =
            document.getElementById(
                "zone-" + i
            );


        zone.classList.remove(
            "completed-zone"
        );


        zone.classList.add(
            "active-zone"
        );


        zone.dataset.completed =
            "false";

    }


    /* Bloquear zona secreta */

    secretZone.classList.remove(
        "unlocked"
    );


    secretZone.classList.add(
        "locked-zone"
    );


    secretStatus.textContent =
        "COMPLETA LAS 10";


    updateStats();


    /*
       Esperamos un momento para asegurarnos
       de que el mapa ya tenga dimensiones.
    */

    setTimeout(
        function () {

            resetPlayer();

        },
        50
    );


    levelTitle.textContent =
        "🧠 Explora Cache Quest";


    levelDescription.textContent =
        "Elige cualquiera de las 10 zonas para comenzar.";

}


/* =====================================================
   ESTADÍSTICAS
===================================================== */

function updateStats() {

    scoreText.textContent =
        score;


    livesText.textContent =
        lives;


    completedCount.textContent =
        completedZones;


    progressBar.style.width =
        (
            completedZones /
            10 *
            100
        ) + "%";

}


/* =====================================================
   POSICIÓN INICIAL DEL JUGADOR
===================================================== */

function resetPlayer() {

    const width =
        gameArea.clientWidth;


    const height =
        gameArea.clientHeight;


    /*
       El jugador comienza abajo
       y aproximadamente en el centro.
    */

    playerX =
        (width / 2) - 22;


    playerY =
        height - 60;


    player.style.left =
        playerX + "px";


    player.style.top =
        playerY + "px";

}


/* =====================================================
   MOVIMIENTO
===================================================== */

function movePlayer(direction) {

    const width =
        gameArea.clientWidth;


    const height =
        gameArea.clientHeight;


    const step = 12;


    if (direction === "up") {

        playerY -= step;

    }


    if (direction === "down") {

        playerY += step;

    }


    if (direction === "left") {

        playerX -= step;

    }


    if (direction === "right") {

        playerX += step;

    }


    /*
       Evita que el jugador salga
       del mapa.
    */

    playerX =
        Math.max(
            0,
            Math.min(
                width - 45,
                playerX
            )
        );


    playerY =
        Math.max(
            0,
            Math.min(
                height - 45,
                playerY
            )
        );


    player.style.left =
        playerX + "px";


    player.style.top =
        playerY + "px";


    checkCollisions();

}


/* =====================================================
   MOVIMIENTO CONTINUO
===================================================== */

function startMove(direction) {

    stopMove();


    movePlayer(direction);


    movementInterval =
        setInterval(
            function () {

                movePlayer(direction);

            },
            100
        );

}


function stopMove() {

    if (
        movementInterval
    ) {

        clearInterval(
            movementInterval
        );


        movementInterval =
            null;

    }

}


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !game.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key === "ArrowUp" ||
            event.key.toLowerCase() === "w"
        ) {

            event.preventDefault();

            movePlayer("up");

        }


        if (
            event.key === "ArrowDown" ||
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();

            movePlayer("down");

        }


        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            movePlayer("left");

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            event.preventDefault();

            movePlayer("right");

        }

    }
);


/* =====================================================
   COLISIONES
===================================================== */

function checkCollisions() {


    /* Revisar las 10 zonas */

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const zone =
            document.getElementById(
                "zone-" + i
            );


        /*
           Si ya fue respondida,
           se ignora.
        */

        if (
            zone.dataset.completed ===
            "true"
        ) {

            continue;

        }


        if (
            isColliding(zone)
        ) {

            stopMove();


            openQuestion(i);


            return;

        }

    }


    /*
       Revisar Zona Secreta
       solamente cuando está desbloqueada.
    */

    if (
        completedZones === 10 &&
        isColliding(secretZone)
    ) {

        stopMove();


        openSecretQuestion();

    }

}


/* =====================================================
   DETECTAR COLISIÓN
===================================================== */

function isColliding(element) {

    const x =
        element.offsetLeft;


    const y =
        element.offsetTop;


    const width =
        element.offsetWidth;


    const height =
        element.offsetHeight;


    return (

        playerX < x + width &&

        playerX + 45 > x &&

        playerY < y + height &&

        playerY + 45 > y

    );

}


/* =====================================================
   ABRIR PREGUNTA
===================================================== */

function openQuestion(index) {

    currentZone =
        index;


    questionAnswered =
        false;


    const level =
        levels[index];


    questionLevel.textContent =
        "Zona " +
        (index + 1);


    questionPoints.textContent =
        "+" +
        level.points;


    questionText.textContent =
        level.question;


    answers.innerHTML =
        "";


    questionFeedback.textContent =
        "";


    level.options.forEach(
        function (
            option,
            answerIndex
        ) {


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-button";


            button.textContent =
                String.fromCharCode(
                    65 +
                    answerIndex
                ) +
                ") " +
                option;


            button.onclick =
                function () {

                    answerQuestion(
                        answerIndex
                    );

                };


            answers.appendChild(
                button
            );

        }
    );


    questionModal.classList.add(
        "active"
    );

}


/* =====================================================
   RESPONDER PREGUNTA
===================================================== */

function answerQuestion(
    selected
) {

    if (
        questionAnswered
    ) {

        return;

    }


    questionAnswered =
        true;


    const level =
        levels[currentZone];


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );


    /*
       RESPUESTA CORRECTA
    */

    if (
        selected ===
        level.correct
    ) {


        buttons[selected]
            .classList.add(
                "correct"
            );


        score +=
            level.points;


        questionFeedback.textContent =
            "✅ ¡Correcto! +" +
            level.points +
            " puntos";


        questionFeedback.style.color =
            "#24d99a";

    }


    /*
       RESPUESTA INCORRECTA
    */

    else {


        buttons[selected]
            .classList.add(
                "incorrect"
            );


        buttons[level.correct]
            .classList.add(
                "correct"
            );


        lives--;


        questionFeedback.textContent =
            "❌ Incorrecto. Perdiste una vida.";


        questionFeedback.style.color =
            "#ff6b6b";

    }


    /*
       IMPORTANTE:
       LA ZONA SE DESACTIVA
       HAYA ACIERTO O ERROR.
    */

    disableZone(
        currentZone
    );


    updateStats();


    setTimeout(
        function () {


            questionModal.classList.remove(
                "active"
            );


            showExplanation(
                selected === level.correct,
                level.explanation
            );


        },
        700
    );

}


/* =====================================================
   DESACTIVAR ZONA
===================================================== */

function disableZone(index) {

    const zone =
        document.getElementById(
            "zone-" + index
        );


    zone.dataset.completed =
        "true";


    zone.classList.remove(
        "active-zone"
    );


    zone.classList.add(
        "completed-zone"
    );


    completedZones++;


    updateStats();


    /*
       Al completar las 10:
       desbloqueamos la zona secreta.
    */

    if (
        completedZones === 10
    ) {

        unlockSecretZone();

    }

}


/* =====================================================
   DESBLOQUEAR ZONA SECRETA
===================================================== */

function unlockSecretZone() {

    secretZone.classList.remove(
        "locked-zone"
    );


    secretZone.classList.add(
        "unlocked"
    );


    secretStatus.textContent =
        "🔓 DESBLOQUEADA";


    levelTitle.textContent =
        "🔓 ¡Zona Secreta desbloqueada!";


    levelDescription.textContent =
        "Completaste las 10 zonas. Ahora puedes entrar a la Zona Secreta.";

}


/* =====================================================
   MOSTRAR EXPLICACIÓN
===================================================== */

function showExplanation(
    correct,
    explanation
) {


    if (correct) {

        resultIcon.textContent =
            "✅";


        resultTitle.textContent =
            "¡Correcto!";

    }

    else {

        resultIcon.textContent =
            "❌";


        resultTitle.textContent =
            "Respuesta incorrecta";

    }


    explanationText.textContent =
        explanation;


    explanationModal.classList.add(
        "active"
    );

}


/* =====================================================
   CERRAR EXPLICACIÓN
===================================================== */

function closeExplanation() {

    explanationModal.classList.remove(
        "active"
    );


    /*
       Si se quedó sin vidas,
       termina el juego.
    */

    if (
        lives <= 0
    ) {

        showGameOver();

        return;

    }


    levelTitle.textContent =
        "🧠 Explora Cache Quest";


    if (
        completedZones < 10
    ) {

        levelDescription.textContent =
            "Elige otra zona activa.";

    }

    else {

        levelDescription.textContent =
            "Todas las zonas están completas. Entra a la Zona Secreta.";

    }

}


/* =====================================================
   PREGUNTA SECRETA
===================================================== */

function openSecretQuestion() {

    questionAnswered =
        false;


    questionLevel.textContent =
        "🔐 ZONA SECRETA";


    questionPoints.textContent =
        "+" +
        secretQuestion.points;


    questionText.textContent =
        secretQuestion.question;


    answers.innerHTML =
        "";


    questionFeedback.textContent =
        "";


    secretQuestion.options.forEach(
        function (
            option,
            index
        ) {


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-button";


            button.textContent =
                String.fromCharCode(
                    65 +
                    index
                ) +
                ") " +
                option;


            button.onclick =
                function () {

                    answerSecretQuestion(
                        index
                    );

                };


            answers.appendChild(
                button
            );

        }
    );


    questionModal.classList.add(
        "active"
    );

}


/* =====================================================
   RESPONDER ZONA SECRETA
===================================================== */

function answerSecretQuestion(
    selected
) {


    if (
        questionAnswered
    ) {

        return;

    }


    questionAnswered =
        true;


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );


    /*
       CORRECTO
    */

    if (
        selected ===
        secretQuestion.correct
    ) {


        buttons[selected]
            .classList.add(
                "correct"
            );


        score +=
            secretQuestion.points;


        questionFeedback.textContent =
            "🏆 ¡RESPUESTA CORRECTA! +" +
            secretQuestion.points +
            " puntos";


        questionFeedback.style.color =
            "#24d99a";


        updateStats();


        setTimeout(
            function () {


                questionModal.classList.remove(
                    "active"
                );


                resultIcon.textContent =
                    "🏆";


                resultTitle.textContent =
                    "¡CACHE MASTER!";


                explanationText.textContent =
                    secretQuestion.explanation;


                explanationModal.classList.add(
                    "active"
                );


                const button =
                    explanationModal.querySelector(
                        "button"
                    );


                button.onclick =
                    function () {

                        finishGame();

                    };


            },
            700
        );

    }


    /*
       INCORRECTO
    */

    else {


        buttons[selected]
            .classList.add(
                "incorrect"
            );


        buttons[
            secretQuestion.correct
        ].classList.add(
            "correct"
        );


        lives--;


        questionFeedback.textContent =
            "❌ Incorrecto. Perdiste una vida.";


        questionFeedback.style.color =
            "#ff6b6b";


        updateStats();


        setTimeout(
            function () {


                questionModal.classList.remove(
                    "active"
                );


                if (
                    lives <= 0
                ) {

                    showGameOver();

                }

                else {


                    resultIcon.textContent =
                        "❌";


                    resultTitle.textContent =
                        "Respuesta incorrecta";


                    explanationText.textContent =
                        secretQuestion.explanation;


                    explanationModal.classList.add(
                        "active"
                    );

                }


            },
            700
        );

    }

}


/* =====================================================
   FINALIZAR JUEGO
===================================================== */

function finishGame() {

    explanationModal.classList.remove(
        "active"
    );


    hideAllScreens();


    victory.classList.add(
        "active"
    );


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    if (
        score > bestScore
    ) {

        bestScore =
            score;


        localStorage.setItem(
            "cacheQuestBest",
            bestScore
        );

    }

}


/* =====================================================
   GAME OVER
===================================================== */

function showGameOver() {

    hideAllScreens();


    gameOver.classList.add(
        "active"
    );


    document.getElementById(
        "gameOverScore"
    ).textContent =
        score;

}


/* =====================================================
   INSTRUCCIONES
===================================================== */

function showInstructions() {

    hideAllScreens();


    instructions.classList.add(
        "active"
    );

}


/* =====================================================
   VOLVER AL MENÚ
===================================================== */

function backToMenu() {

    stopMove();


    hideAllScreens();


    menu.classList.add(
        "active"
    );


    document.getElementById(
        "bestScoreMenu"
    ).textContent =
        bestScore;

}


/* =====================================================
   OCULTAR TODAS LAS PANTALLAS
===================================================== */

function hideAllScreens() {

    menu.classList.remove(
        "active"
    );


    instructions.classList.remove(
        "active"
    );


    game.classList.remove(
        "active"
    );


    gameOver.classList.remove(
        "active"
    );


    victory.classList.remove(
        "active"
    );

}


/* =====================================================
   INICIO
===================================================== */

document.getElementById(
    "bestScoreMenu"
).textContent =
    bestScore;