const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question) => new Promise((resolve) => readline.question(question, resolve));

async function task1(){
    let x, y, R, d;

    x = Number(await prompt("X = "));
    y = Number(await prompt("Y = "));
    R = Number(await prompt("R = "));
    
    d = Math.sqrt(x * x + y * y);
    if (d < R) console.log("Точка всередині кола");
    else if (d == R) console.log("Точка лежить на межі кола")
    else console.log("Точка лежить поза колом");
}

function task2(){
    let array = [];
    for(let i = 1; i <= 501; i++){
        const sumOfnumbers = i.toString().split('');

        let sum = 0;
        sumOfnumbers.forEach(num => {
            sum += Number(num);
        }) 

        if(sum === 10)
            array.push(i);
    }
    console.log(array);
}

async function task3(){
    const text = (await prompt("Введіть текст: ")).toLowerCase();
    const words = text.split(/\s+/).filter(word => word.length > 0);

    let matchingWords = [];

    words.forEach(word => {
        let firstLetter = word[0];
        let lastLetter = word[word.length - 1];

        if(firstLetter === lastLetter)
            matchingWords.push(word);
    })

    console.log(matchingWords);
}

function task4(){
    let max = [];
    let current = [];
    const numbers= [15, 71, 68, 22, 77, 98, 56, 100, 100, 22]; 

    for (let i = 0; i < numbers.length; i++){
        if(i === 0 || numbers[i] > numbers[i - 1])
            current.push(numbers[i]);
        else{
            if(current.length > max.length)
                max = [...current];
            current = [numbers[i]];
        }
    }

    if(current.length > max.length)
        max = [...current];

    console.log("Найдовша послідовність числ, які зростають: ", max)
}

function task5(){
    const A = [
        [1, 5, 3],
        [8, 2, 4],
        [7, 9, 0]
    ];

    const B = [
        [4, 1, 6],
        [3, 9, 2],
        [5, 0, 8]
    ];

    const rows = A.length;
    const cols = A[0].length;

    let C = [];

    for (let i = 0; i < rows; i++) {
        const row = [...A[i], ...B[i]];
        const max = Math.max(...row);
        const min = Math.min(...row);
        const diff = max - min;

        C[i] = []; 
        for (let j = 0; j < cols; j++) {
            C[i].push(diff);
        }
    }

    console.log("Матриця A:", A);
    console.log("Матриця B:", B);0,


    console.log("Матриця C:", C);
}

async function task6() {
    const text = (await prompt("Введіть текст: ")).toLowerCase();
    const possibleEmails = text.match(/[a-z0-9._%+-]*@[a-z0-9.-]*/g) || [];
    const validRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    const validEmails = [];
    const invalidEmails = [];

    possibleEmails.forEach(email => {
        if (validRegex.test(email)) {
            validEmails.push(email);
        } else {
            invalidEmails.push(email);
        }
    });

    console.log("Знайдені адреси:", possibleEmails);
    console.log("Валідні:", validEmails);
    console.log("Невалідні:", invalidEmails);
    console.log("Чи всі email валідні?:", possibleEmails.length > 0 && invalidEmails.length === 0);
}

(async () => {
    console.log("1 task. Визначити чи точка належить колу");
    await task1();
    console.log("2 task. Числа від 1 до 500, сума яких = 10")
    task2();
    console.log("3 task. Знайти в тексті слова, перша і остання літера яких однакові")
    await task3();
    console.log("4 task. Знайти найдовшу послідовність зростаючих елементів в масиві")
    task4();
    console.log("5 task. Створіть дві матриці однакового розміру та третю, де кожен елемент — різниця максимального та мінімального елемента відповідного рядка двох матриць.")
    task5();
    console.log("6 task. Перевірте, чи всі введені email-адреси у тексті валідні.")
    await task6();
    readline.close();
})();
