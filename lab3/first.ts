import * as readline from 'readline';

const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question: string): Promise<string> => {
    return new Promise((resolve) => rl.question(question, resolve));
};

async function task1(): Promise<void> {
    const x: number = Number(await prompt("X = "));
    const y: number = Number(await prompt("Y = "));
    const R: number = Number(await prompt("R = "));

    if (isNaN(x) || isNaN(y) || isNaN(R) || R <= 0) {
        console.log("Помилка: Введено некоректні дані або радіус R <= 0");
        return;
    }

    const d: number = Math.sqrt(x * x + y * y);

    if (d < R) {
        console.log("Точка всередині кола");
    } else if (d === R) {
        console.log("Точка лежить на межі кола");
    } else {
        console.log("Точка лежить поза колом");
    }
}

function task2(): void {
    const result: number[] = [];

    for (let i = 1; i <= 500; i++) {
        let sumOfDigits: number = 0;
        i.toString().split('').forEach((digit: string) => {
            sumOfDigits += Number(digit);
        });

        if (sumOfDigits === 10) {
            result.push(i);
        }
    }

    console.log("Числа від 1 до 500 із сумою цифр 10:", result);
}

async function task3(): Promise<void> {
    const text: string = (await prompt("Введіть текст: ")).toLowerCase();
    const words: string[] = text.split(/\s+/).filter(word => word.length > 0);
    let matchingWords: string[] = [];

    words.forEach((word: string) => {
        let firstLetter: string = word[0];
        let lastLetter: string = word[word.length - 1];

        if(firstLetter === lastLetter)
            matchingWords.push(word);
    });

    console.log("Знайдені слова:", matchingWords);
}

function task4(): void {
    const numbers: number[] = [15, 71, 68, 22, 77, 98, 56, 100, 100, 22];

    let maxSequence: number[] = [];
    let currentSequence: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
        if (i === 0 || numbers[i] > numbers[i - 1]) {
            currentSequence.push(numbers[i]);
        } else {
            if (currentSequence.length > maxSequence.length) {
                maxSequence = [...currentSequence];
            }
            currentSequence = [numbers[i]];
        }
    }

    if (currentSequence.length > maxSequence.length) {
        maxSequence = [...currentSequence];
    }

    console.log("Початковий масив:", numbers);
    console.log("Найдовша зростаюча послідовність:", maxSequence);
}

function task5(): void {
    const A: number[][] = [
        [1, 5, 3],
        [8, 2, 4],
        [7, 9, 0]
    ];

    const B: number[][] = [
        [4, 1, 6],
        [3, 9, 2],
        [5, 0, 8]
    ];

    const rows: number = A.length;
    const cols: number = A[0].length;

    const C: number[][] = [];

    for (let i = 0; i < rows; i++) {
        const fullRow: number[] = [...A[i], ...B[i]];
        const max: number = Math.max(...fullRow);
        const min: number = Math.min(...fullRow);
        const diff: number = max - min;

        C[i] = Array(cols).fill(diff);
    }

    console.log("Матриця A:", A);
    console.log("Матриця B:", B);
    console.log("Матриця C:", C);
}

async function task6(): Promise<void> {
    const text: string = await prompt("Введіть текст з email-адресами: ");
    
    const words: string[] = text.split(/\s+/).filter((w: string) => w.includes('@'));
    const validRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validEmails: string[] = [];
    const invalidEmails: string[] = [];

    words.forEach((email: string) => {
        if (validRegex.test(email)) {
            validEmails.push(email);
        } else {
            invalidEmails.push(email);
        }
    });

    const totalEmails: number = validEmails.length + invalidEmails.length;

    console.log("Валідні:", validEmails);
    console.log("Невалідні:", invalidEmails);
    console.log("Чи всі email валідні?:", totalEmails > 0 && invalidEmails.length === 0);
}

(async (): Promise<void> => {
    console.log("\nTask 1: Точка і коло");
    await task1();

    console.log("\n Task 2: Сума цифр дорівнює 10 ");
    task2();

    console.log("\n Task 3: Перша та остання літера слова ");
    await task3();

    console.log("\n Task 4: Зростаюча послідовність ");
    task4();

    console.log("\n Task 5: Матриці A, B та C ");
    task5();

    console.log("\n Task 6: Перевірка Email ");
    await task6();

    rl.close();
})();