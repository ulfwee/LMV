"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};
async function task1() {
    const x = Number(await prompt("X = "));
    const y = Number(await prompt("Y = "));
    const R = Number(await prompt("R = "));
    if (isNaN(x) || isNaN(y) || isNaN(R) || R <= 0) {
        console.log("Помилка: Введено некоректні дані або радіус R <= 0");
        return;
    }
    const d = Math.sqrt(x * x + y * y);
    if (d < R) {
        console.log("Точка всередині кола");
    }
    else if (d === R) {
        console.log("Точка лежить на межі кола");
    }
    else {
        console.log("Точка лежить поза колом");
    }
}
function task2() {
    const result = [];
    for (let i = 1; i <= 500; i++) {
        let sumOfDigits = 0;
        i.toString().split('').forEach((digit) => {
            sumOfDigits += Number(digit);
        });
        if (sumOfDigits === 10) {
            result.push(i);
        }
    }
    console.log("Числа від 1 до 500 із сумою цифр 10:", result);
}
async function task3() {
    const text = (await prompt("Введіть текст: ")).toLowerCase();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    let matchingWords = [];
    words.forEach((word) => {
        let firstLetter = word[0];
        let lastLetter = word[word.length - 1];
        if (firstLetter === lastLetter)
            matchingWords.push(word);
    });
    console.log("Знайдені слова:", matchingWords);
}
function task4() {
    const numbers = [15, 71, 68, 22, 77, 98, 56, 100, 100, 22];
    let maxSequence = [];
    let currentSequence = [];
    for (let i = 0; i < numbers.length; i++) {
        if (i === 0 || numbers[i] > numbers[i - 1]) {
            currentSequence.push(numbers[i]);
        }
        else {
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
function task5() {
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
    const C = [];
    for (let i = 0; i < rows; i++) {
        const fullRow = [...A[i], ...B[i]];
        const max = Math.max(...fullRow);
        const min = Math.min(...fullRow);
        const diff = max - min;
        C[i] = Array(cols).fill(diff);
    }
    console.log("Матриця A:", A);
    console.log("Матриця B:", B);
    console.log("Матриця C:", C);
}
async function task6() {
    const text = await prompt("Введіть текст з email-адресами: ");
    const words = text.split(/\s+/).filter((w) => w.includes('@'));
    const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmails = [];
    const invalidEmails = [];
    words.forEach((email) => {
        if (validRegex.test(email)) {
            validEmails.push(email);
        }
        else {
            invalidEmails.push(email);
        }
    });
    const totalEmails = validEmails.length + invalidEmails.length;
    console.log("Валідні:", validEmails);
    console.log("Невалідні:", invalidEmails);
    console.log("Чи всі email валідні?:", totalEmails > 0 && invalidEmails.length === 0);
}
(async () => {
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
