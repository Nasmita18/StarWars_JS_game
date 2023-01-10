// Star Wars на JavaScript
var cvs = document.getElementById("canvas"); // Холст
const menu = document.getElementById("menu"); // Меню игры
const rebels_button = document.getElementById("rebels"); // Кнопка выбора повстанцев
const empire_button = document.getElementById("empire"); // Кнопка выбора имперцев
var ctx = cvs.getContext("2d"); // Контекст рисования на холсте

var starship = new Image(); // Объект коробля
var bg = new Image(); // Объект фон
var fg = new Image(); // Объект лёд
var iceUp = new Image(); // Объект сосулька сверху
var sosulka = new Image(); // Объект сосулька снизу
var game_audio = new Audio('game_music.mp3');
var end_game_audio = new Audio('end_game.mp3');

var side = null;
var picked = false;

bg.src = "img/bg.png"; // Изображение фон
fg.src = "img/fg.png"; // Изображение лёд
iceUp.src = "img/iceUp.png"; // Изображение сосулька сверху
sosulka.src = "img/sosulka.png"; // Изображение сосульки снизу

var gap = 90; // Просвет между сосульками

document.addEventListener("keydown", moveUp); // Вызов функции moveUp при нажатии клавиши

function moveUp() {
    yPos -= 30; // Подняться вверх на 30 пунктов
}

// Массив сосулек
var pipe = [];
pipe[0] = {
    x : cvs.width, // Позиционируем сосульку по координате X
    y : 0 // // Позиционируем сосульку по координате Y
}

var score = 0; // Счёт
var xPos = 100; // Позиция коробля по X
var yPos = 150; // Позиция коробля по Y
var grav = 0.8; // Гравитация


// Функция отрисовки
function draw() {   
    if (side) {
        cvs.style.display = 'block'
        menu.style.display = 'none'

        // Отображение корабля в зависимости от стороны
        if (!picked) {
            switch (side) {
                case 'rebels':
                    starship.src = 'img/starship.png';
                    break;
                case 'empire':
                    starship.src = 'img/empire_ship.png';
                    break;
            }
            picked = true;
            game_audio.play();
            game_audio.autoplay = true;
            game_audio.loop = true;
            game_audio.volume = 0.02;  
        }
        

        ctx.drawImage(bg, 0, 0); // Отрисовка фона

        for (var i = 0; i < pipe.length; i++) { // Цикл отрисовки сосулек
            // ctx.drawImage(iceUp, pipe[i].x, pipe[i].y); // Отрисовка верхней сосульки
            let num = 10
            ctx.drawImage(sosulka, pipe[i].x, pipe[i].y + iceUp.height + gap); // Отрисовка нижней сосульки
            pipe[i].x -= num; // Движение сосульки на корабль и скорость движения
            
            if (pipe[i].x == 5) { // Добавление новых сосулек при выполнении условия
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random() * iceUp.height) - iceUp.height
                });
            }

            // Отслеживание прикосновений к сосулькам
            if (xPos + starship.width >= pipe[i].x && xPos <= pipe[i].x + iceUp.width
                &&
                (yPos + starship.height >= pipe[i].y + iceUp.height + gap)
                || yPos + starship.height >= cvs.height - fg.height || yPos <= 0) {
                    // Сбрасываем все параметры при столкновении и перерисовываем нашу игру в меню
                    end_game_audio.volume = 0.4;
                    end_game_audio.play();
                    side = null;
                    xPos = 100;
                    yPos = 150;
                    alert(`Ваш итоговый счёт - ${score}`);
                    score = 0;
                    picked = false;
                    pipe = [];
                    pipe[0] = {
                        x : cvs.width, // Позиционируем сосульку по координате X
                        y : 0 // // Позиционируем сосульку по координате Y
                    }
                    draw();
                }
        
                if (pipe[i].x == 5) { // Добавляем 1 к счёту при пролёте сосульки
                    score++;
                }
            }

        ctx.drawImage(fg, 0, cvs.height - fg.height); // Отрисовка льда
        ctx.drawImage(starship, xPos, yPos); // Отрисовка коробля
        
        yPos += grav; // Под воздействием гравитации корабль падает вниз

        ctx.fillStyle = "#000"; // Цвет текста
        ctx.font = "24px Verdana"; // Шрифт текста
        ctx.fillText("Счет: " + score, 10, cvs.height - 20); // Счёт (позиционирование)

        requestAnimationFrame(draw); // Запрашиваем кадр анимации
    } else {
        cvs.style.display = 'none';
        menu.style.display = 'flex';
    }
}


sosulka.onload = draw; // Вызываем функцию draw после отрисовки нижней сосульки

rebels_button.onclick = function () {
    side = 'rebels';
    draw();
}

empire_button.onclick = function () {
    side = 'empire';
    draw();
}
