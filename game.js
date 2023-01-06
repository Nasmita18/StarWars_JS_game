// Star Wars на JavaScript
var cvs = document.getElementById("canvas"); // Холст
var ctx = cvs.getContext("2d"); // Контекст рисования на холсте

var starship = new Image(); // Объект коробля
var bg = new Image(); // Объект фон
var fg = new Image(); // Объект лёд
var iceUp = new Image(); // Объект сосулька сверху
var sosulka = new Image(); // Объект сосулька снизу

starship.src = "img/starship.png"; // Изображение коробля
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
                location.reload(); // Перезагрузка страницы при прикосновении
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
}


sosulka.onload = draw; // Вызываем функцию draw после отрисовки нижней сосульки