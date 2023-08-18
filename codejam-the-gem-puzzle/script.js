
/* ___________________________________________________creating layout________________________________________________________________________ */

let countMoves = 0;
let result_list_items = [];

let wrapper = document.createElement('div');
wrapper.className = "wrapper";

let buttons = document.createElement('div');
buttons.className = "buttons";

    let button_shuffle = document.createElement('button');
    button_shuffle.className = "button_shuffle";
    button_shuffle.innerHTML = "Shuffle and start";

    let button_sound = document.createElement('button');
    button_sound.id = "sound";
    button_sound.className = "button_sound";
    button_sound.innerHTML = "SoundOn";


    let button_save = document.createElement('button');
    button_save.className = "button_save";
    button_save.innerHTML = "Save";

    let button_results = document.createElement('button');
    button_results.className = "button_results";
    button_results.innerHTML = "Result";


let times = document.createElement('div');
times.className = "times";
// times.innerHTML = "times here";

    let times_moves_p = document.createElement('div');
    times_moves_p.className = "times_moves_p";
    times_moves_p.innerHTML = "Moves:";

    let times_moves = document.createElement('div');
    times_moves.className = "times_moves";
    times_moves.innerHTML = `${countMoves}`;

    let times_time_p = document.createElement('div');
    times_time_p.className = "times_time_p";
    times_time_p.innerHTML = "Time:";

    let times_time = document.createElement('div');
    times_time.className = "times_time";
    times_time.textContent = "00:00";


let field = document.createElement('div');
field.className = "field";
// field.innerHTML = "game field here";

let frame_sizes_p = document.createElement('div');
frame_sizes_p.className = "frame_sizes_p";
frame_sizes_p.innerHTML = "Frame size:";

    let frame_sizes = document.createElement('div');
    frame_sizes.className = "frame_sizes";
    frame_sizes.innerHTML = "4x4";
     
let other_sizes_p = document.createElement('div');
other_sizes_p.className = "other_sizes_p";
other_sizes_p.innerHTML = "Other sizes:";

    let other_sizes_3 = document.createElement('a');
    other_sizes_3.className = "other_sizes_3";
    other_sizes_3.innerHTML = "3x3";
    other_sizes_3.href = '#';

    let other_sizes_4 = document.createElement('a');
    other_sizes_4.className = "other_sizes_4";
    other_sizes_4.innerHTML = "4x4";
    other_sizes_4.href = '#';

    let other_sizes_5 = document.createElement('a');
    other_sizes_5.className = "other_sizes_5";
    other_sizes_5.innerHTML = "5x5";
    other_sizes_5.href = '#';

    let other_sizes_6 = document.createElement('a');
    other_sizes_6.className = "other_sizes_6";
    other_sizes_6.innerHTML = "6x6";
    other_sizes_6.href = '#';

    let other_sizes_7 = document.createElement('a');
    other_sizes_7.className = "other_sizes_7";
    other_sizes_7.innerHTML = "7x7";
    other_sizes_7.href = '#';

    let other_sizes_8 = document.createElement('a');
    other_sizes_8.className = "other_sizes_8";
    other_sizes_8.innerHTML = "8x8";
    other_sizes_8.href = '#';

let result = document.createElement('div');
result.className = "result";
result.innerHTML = "Results:";

    let result_list = document.createElement('div');
    result_list.className = "result_list";
    result_list.innerHTML = ``;

let body_shadow = document.createElement('div');
body_shadow.className = "body_shadow";



document.body.append(wrapper);
document.body.append(body_shadow);
document.body.append(result);
    result.append(result_list);
wrapper.append(buttons);
    buttons.append(button_shuffle);
    buttons.append(button_sound);
    buttons.append(button_save);
    buttons.append(button_results);
wrapper.append(times);
    times.append(times_moves_p);
    times.append(times_moves);
    times.append(times_time_p);
    times.append(times_time);
wrapper.append(field);
wrapper.append(frame_sizes_p);
    frame_sizes_p.append(frame_sizes);   
wrapper.append(other_sizes_p);
    other_sizes_p.append(other_sizes_3);  
    other_sizes_p.append(other_sizes_4);  
    other_sizes_p.append(other_sizes_5);  
    other_sizes_p.append(other_sizes_6);  
    other_sizes_p.append(other_sizes_7);  
    other_sizes_p.append(other_sizes_8); 



/* ___________________________________________________creating layout________________________________________________________________________ */


let myAudio = new Audio('../codejam-the-gem-puzzle/click_1.mp3');

function audioSwitch () {/** вкл\выкл звуков */
    let w = myAudio.muted;
        if (w === false) {
            myAudio.muted = true;
        } else {
            myAudio.muted = false
        }
};

function onOff() {/** вкл\выкл на кнопке */
    let elem = document.querySelector('.button_sound');
    let w = button_sound.innerHTML;
        if (w === 'SoundOn') {
            button_sound.innerHTML = 'SoundOff';
        } else {
            button_sound.innerHTML = 'SoundOn';
        }
};

button_sound.addEventListener('click', () => { /*подсвечивание кнопки Sound и переключение звуков */
    let elem = document.querySelector('.button_sound');
    elem.classList.toggle('active');
    audioSwitch();
    onOff();
});

button_shuffle.addEventListener('click', () => { /*reload cells */
    document.location.reload();
});

function count(value){ /**count moves*/
    countMoves = countMoves++;
    times_moves.innerHTML = countMoves;
    // console.log(countMoves);
};

let cellSize = 100;
let gemCount = 15;
let gemPosition = 4;

function changeResolution() { /* смена размера шага при изменении разрешения */
    let w = window.innerWidth;
    if (w <= 410) {
        cellSize = 75;
        return cellSize;
    }
    if (w > 410) {
        cellSize = 100;
        return cellSize;
    }
};
  
window.addEventListener('resize', () => {
    changeResolution();
    document.location.reload();
});

// function changeSizeOfGame() {

//     return gemCount = 8;
//     // gemPosition = 3;
//     // cellSize = 75;
// }

// other_sizes_3.addEventListener('click', () => { 
//     changeSizeOfGame();
//     console.log('gemCount:',gemCount);
//     console.log('gemPosition:',gemPosition);
//     console.log('cellSize:',cellSize);
// });



const game_field = document.querySelector('.field');
const empty = { /*crete empty cell */
    value: 0,
    top: 0,
    left: 0
}
const cells = []; /*организуем хранение координат клеток */
cells.push(empty);

const numbers = [...Array(gemCount).keys()] /**рандомайзер */
                .sort((() => Math.random()- 0.5));

                
function move(index) { /**организуем метод перемещения */
    const cell = cells[index];

    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return;
    }
    console.log('внутри move:',cellSize);
    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;


    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    
    empty.left = cell.left;
    empty.top = cell.top;

    cell.left = emptyLeft;
    cell.top = emptyTop;

    const isFinished = cells.every(cell => { /**проверка на правильность собранности */
        // console.log(cell.value, cell.top, cell.left);  
        return cell.value === cell.top * 4 + cell.left;
    });

    if (isFinished) {
        localStorage.setItem(`- победитель! Moves: ${countMoves}`, `Time: ${times_time.textContent}`); 
        alert('Вы выиграли!\nВаш результат:\n' + `moves: ${countMoves};\n` + `time: ${times_time.textContent}`);
    };

    x = countMoves++;
    count(x);

    myAudio.play();
}
createGems ()
function createGems () {
for (let i = 1; i <= gemCount; i++) { /**crete cells from 1 to 15 */
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1;
    cell.className = 'cell';
    cell.innerHTML = value;
    
    const left = i % gemPosition; /** вычисление позиции яйчеки */
    const top = (i - left) / gemPosition;

    cells.push({   /** запись координат яйчейки в массив */
        value: value,
        left: left,
        top: top,
        element: cell
    });
    console.log('внутри for:',cellSize);
    cell.style.left = `${left * changeResolution() }px`; /** добавляем позицию в свойсва css. позяция на ширину яйчейки*/
    cell.style.top = `${top * changeResolution() }px`;

    game_field.append(cell);

    cell.addEventListener('click', () => { /**добавляем событие click */
        move(i);
    });
}
}
let times_count = document.getElementsByClassName('times_time')[0];
let stop = document.getElementsByClassName('button_stop');
let sec = 0;
let min = 0; 
let t;

function add() {
    tick();
    times_count.textContent = (min > 9 ? min : "0" + min)
                    + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
    // console.log(times_count.textContent);
}

function tick () {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
        }
    }
}

function timer() {
    t = setTimeout(add, 1000);
}

timer();

function showResult() {
    // result_list.textContent = localStorage;
    console.log(localStorage);

    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        result_list_items[i] = (`<br>${i+1}. Gamer №${i+1} ${key}; ${localStorage.getItem(key)} `)
      };
    console.log( result_list_items);
    result_list.innerHTML = result_list_items;
    
};

button_save.addEventListener('click', () => { /**stop timer & add row to list result */
    clearTimeout(t);
    localStorage.setItem(`не закончил! moves: ${countMoves}`, `time: ${times_time.textContent}`);
    showResult()
    alert('Игра остановлена, ваше время сохранено!\nВаш результат:\n' + `moves: ${countMoves};\n` + `time: ${times_time.textContent}`);
});


function onClickPopup() { 
    result.classList.toggle('active');
    body_shadow.classList.toggle("active");
}

    button_results.addEventListener('click', () => { /* show results */
        onClickPopup();
        showResult();
    });

    body_shadow.addEventListener('click', () => { /*add shadow when result*/
        onClickPopup();
    });

    result.addEventListener('click', () => { /*show result */
        onClickPopup();
    });



