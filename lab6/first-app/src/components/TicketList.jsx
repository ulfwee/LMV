import Ticket from './Ticket';

export default function TicketList({ tickets, drawnTickets }) {
    return (
        <div className="ticket-list">
            {tickets.map((number) => (
                <Ticket key={number} number={number} isDrawn={drawnTickets.includes(number)} />
            ))}
        </div>
    );
};