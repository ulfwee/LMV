const TelegramBot = require('node-telegram-bot-api');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
require('dotenv').config();

const token = process.env.API_KEY;
if (!token) {
  console.error('Error finding token.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
let db;

const jokes = [
  '- Чай!!! Нарешті чай!!! - радісно закричала печінка...і впала в обморок.',
  'Діти вірять у Діда Мороза, а дорослі в те, що якщо більше разів натиснути на кнопку біля переходу, світлофор швидше переключиться. І хто після цього наївний?',
  'Іноді я використовую в речі неіснуючі слова, щоб здаватися більш імпрелентативним.',
  'Ніколи не опускай руки, адже попереду на тебе чекає ще так багато приводів опустити руки, а ти вже опустив руки.',
  'Сьогодні ліг спати раніше — о 22:00. О першій ночі все ще не міг натішитися, що рано ліг спати.'
];

const quotes = [
  '«Великі справи починаються з маленьких кроків».',
  '«Не обов’язково бути великим, щоб почати, але потрібно почати, щоб стати великим».',
  '«Успіх — це сума маленьких зусиль, які повторюються щодня».',
  '«Помилки — це доказ того, що ти намагаєшся».',
  '«Найкращий час почати — зараз».',
  '«Рухайся вперед у власному темпі: головне — не зупинятися».'
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

async function initDatabase() {
  db = await open({
    filename: path.join(__dirname, 'bot.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      chat_id INTEGER PRIMARY KEY,
      first_name TEXT,
      username TEXT,
      subscribed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

function mainMenu() {
  return {
    reply_markup: {
      keyboard: [
        [{ text: '😂 Отримати жарт' }, { text: '💡 Мотиваційна цитата' }],
        [{ text: '🔔 Підписатися' }, { text: '🔕 Відписатися' }]
      ],
      resize_keyboard: true
    }
  };
}

bot.onText(/^\/start$/, async (msg) => {
  const name = msg.from.first_name || 'друже';
  await bot.sendMessage(
    msg.chat.id,
    `Привіт, ${name}! 👋\n\nЯ бот із жартами та мотиваційними цитатами.\n\n` +
    'Доступні команди:\n' +
    '/joke — випадковий жарт\n' +
    '/quote — мотиваційна цитата\n' +
    '/subscribe — щоденна розсилка\n' +
    '/unsubscribe — скасувати розсилку\n' +
    '/help — довідка',
    mainMenu()
  );
});

bot.onText(/^\/help$/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    'Довідка 📘\n\n' +
    '/joke — отримати випадковий жарт.\n' +
    '/quote — отримати мотиваційну цитату.\n' +
    '/subscribe — підписатися на щоденну розсилку.\n' +
    '/unsubscribe — відписатися від розсилки.\n\n' +
    'Також можна користуватися кнопками меню.'
  );
});

bot.onText(/^\/joke$/, async (msg) => {
  await bot.sendMessage(msg.chat.id, `😂 ${randomItem(jokes)}`);
});

bot.onText(/^\/quote$/, async (msg) => {
  await bot.sendMessage(msg.chat.id, `💡 ${randomItem(quotes)}`);
});

bot.onText(/^\/subscribe$/, async (msg) => {
  try {
    await db.run(
      `INSERT INTO subscriptions (chat_id, first_name, username)
       VALUES (?, ?, ?)
       ON CONFLICT(chat_id) DO UPDATE SET
         first_name = excluded.first_name,
         username = excluded.username`,
      [msg.chat.id, msg.from.first_name || '', msg.from.username || '']
    );
    await bot.sendMessage(
      msg.chat.id,
      'Готово! 🔔 Ви підписалися на щоденну розсилку. Надсилатиму випадковий жарт або мотиваційну цитату щодня.'
    );
  } catch (err) {
    console.error('Помилка збереження підписки:', err.message);
    await bot.sendMessage(msg.chat.id, 'Не вдалося оформити підписку. Спробуйте пізніше.');
  }
});

bot.onText(/^\/unsubscribe$/, async (msg) => {
  try {
    const result = await db.run('DELETE FROM subscriptions WHERE chat_id = ?', [msg.chat.id]);
    await bot.sendMessage(
      msg.chat.id,
      result.changes > 0
        ? 'Ви відписалися від щоденної розсилки. 🔕'
        : 'Ви ще не підписані на розсилку.'
    );
  } catch (err) {
    console.error('Помилка скасування підписки:', err.message);
    await bot.sendMessage(msg.chat.id, 'Не вдалося скасувати підписку. Спробуйте пізніше.');
  }
});

bot.on('message', async (msg) => {
  if (!msg.text) return;
  const actions = {
    '😂 Отримати жарт': () => bot.sendMessage(msg.chat.id, `😂 ${randomItem(jokes)}`),
    '💡 Мотиваційна цитата': () => bot.sendMessage(msg.chat.id, `💡 ${randomItem(quotes)}`),
    '🔔 Підписатися': async () => {
      try {
        await db.run(
          `INSERT INTO subscriptions (chat_id, first_name, username)
           VALUES (?, ?, ?)
           ON CONFLICT(chat_id) DO UPDATE SET
             first_name = excluded.first_name,
             username = excluded.username`,
          [msg.chat.id, msg.from.first_name || '', msg.from.username || '']
        );
        await bot.sendMessage(msg.chat.id, 'Готово! Ви підписалися на щоденну розсилку. 🔔');
      } catch (err) {
        console.error(err.message);
        await bot.sendMessage(msg.chat.id, 'Не вдалося оформити підписку.');
      }
    },
    '🔕 Відписатися': async () => {
      try {
        const result = await db.run('DELETE FROM subscriptions WHERE chat_id = ?', [msg.chat.id]);
        await bot.sendMessage(msg.chat.id, result.changes > 0 ? 'Ви відписалися. 🔕' : 'Ви не підписані.');
      } catch (err) {
        console.error(err.message);
        await bot.sendMessage(msg.chat.id, 'Не вдалося скасувати підписку.');
      }
    }
  };

  if (msg.text.startsWith('/')) return;
  if (actions[msg.text]) await actions[msg.text]();
});

async function sendDailyMessages() {
  try {
    const subscribers = await db.all('SELECT chat_id FROM subscriptions');
    for (const subscriber of subscribers) {
      const message = Math.random() < 0.5
        ? `😂 Жарт дня:\n${randomItem(jokes)}`
        : `💡 Цитата дня:\n${randomItem(quotes)}`;
      try {
        await bot.sendMessage(subscriber.chat_id, message);
      } catch (err) {
        console.error(`Не вдалося надіслати повідомлення ${subscriber.chat_id}:`, err.message);
        if (err.response && [403, 400].includes(err.response.statusCode)) {
          await db.run('DELETE FROM subscriptions WHERE chat_id = ?', [subscriber.chat_id]);
        }
      }
    }
    console.log(`Щоденну розсилку завершено. Одержувачів: ${subscribers.length}`);
  } catch (err) {
    console.error('Помилка щоденної розсилки:', err.message);
  }
}

function scheduleDailyMessages() {
  const hour = Number.parseInt(process.env.DAILY_SEND_HOUR || '09', 10);
  const minute = Number.parseInt(process.env.DAILY_SEND_MINUTE || '00', 10);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23 ||
      !Number.isInteger(minute) || minute < 0 || minute > 59) {
    console.error('Некоректний час у DAILY_SEND_HOUR або DAILY_SEND_MINUTE.');
    process.exit(1);
  }

  let lastSentDate = '';
  setInterval(() => {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    if (now.getHours() === hour && now.getMinutes() === minute && lastSentDate !== date) {
      lastSentDate = date;
      sendDailyMessages();
    }
  }, 30000);
  console.log(`Час щоденної розсилки: ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} (часова зона сервера).`);
}

bot.on('polling_error', (err) => {
  console.error('Помилка Telegram polling:', err.message);
});

async function start() {
  try {
    await initDatabase();
    scheduleDailyMessages();
    console.log('Telegram-бот запущено.');
  } catch (err) {
    console.error('Не вдалося запустити бота:', err.message);
    process.exit(1);
  }
}

start();

process.on('SIGINT', async () => {
  console.log('\nЗавершення роботи бота...');
  bot.stopPolling();
  if (db) {
    await db.close();
  }
  process.exit(0);
});