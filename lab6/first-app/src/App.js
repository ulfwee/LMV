
import { useState, useRef } from 'react';
import TicketList from './components/TicketList';
import './App.css';

export default function App() {
  const [count, setCount] = useState(10);

  const [tickets, setTickets] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );

  const [drawnTickets, setDrawnTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);

  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const remainingCount = tickets.length - drawnTickets.length;

  const generateTickets = () => {
    const number = Number(count);

    if (!Number.isInteger(number) || number < 1 || number > 100) {
      alert('Введіть кількість білетів від 1 до 100');

      inputRef.current.focus();
      inputRef.current.select();

      return;
    }

    const newTickets = Array.from(
      { length: number },
      (_, i) => i + 1
    );

    setTickets(newTickets);
    setDrawnTickets([]);
    setCurrentTicket(null);
  };

  const drawTickets = () => {
    const availableTickets = tickets.filter(
      (number) => !drawnTickets.includes(number)
    );

    if (availableTickets.length === 0) return;

    const randomIndex = Math.floor(
      Math.random() * availableTickets.length
    );

    const selectedTicket = availableTickets[randomIndex];

    setCurrentTicket(selectedTicket);
    setDrawnTickets((prev) => [...prev, selectedTicket]);

    resultRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Тягни білет</h1>
          <p>Випадковий вибір білетів без повторів</p>
        </header>

        <section className="panel">
          <h2>Налаштування</h2>

          <div className="settings">
            <label htmlFor="ticket-count">
              Кількість білетів
            </label>

            <input
              ref={inputRef}
              id="ticket-count"
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />

            <button
              className="btn btn-secondary"
              onClick={generateTickets}
            >
              Згенерувати
            </button>
          </div>
        </section>

        <section className="panel draw-panel">
          <h2>Витягування білета</h2>

          <div className="result" ref={resultRef}>
            {currentTicket !== null ? (
              <>
                <span>Ваш білет</span>
                <strong>№ {currentTicket}</strong>
              </>
            ) : (
              <p>Натисніть кнопку, щоб витягнути білет</p>
            )}
          </div>

          <button
            className="btn btn-primary"
            onClick={drawTickets}
            disabled={remainingCount === 0}
          >
            {remainingCount === 0
              ? 'Усі білети витягнуто'
              : 'Витягнути білет'}
          </button>

          <div className="statistics">
            <div>
              <strong>{tickets.length}</strong>
              <span>Усього</span>
            </div>

            <div>
              <strong>{drawnTickets.length}</strong>
              <span>Витягнуто</span>
            </div>

            <div>
              <strong>{remainingCount}</strong>
              <span>Залишилось</span>
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>Усі білети</h2>

          <TicketList
            tickets={tickets}
            drawnTickets={drawnTickets}
          />
        </section>

        <section className="panel">
          <h2>Історія витягнутих білетів</h2>

          {drawnTickets.length === 0 ? (
            <p className="empty-message">
              Поки що жодного білета не витягнуто
            </p>
          ) : (
            <div className="history">
              {drawnTickets.map((number, index) => (
                <div className="history-item" key={number}>
                  <span>Спроба {index + 1}</span>
                  <strong>Білет № {number}</strong>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
