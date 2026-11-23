export default function Ticket({number, isDrawn}) {
    return (
        <div className={`ticket ${isDrawn ? 'ticket-drawn' : ''}`}>
            <span>№ {number}</span>
            <small>{isDrawn ? 'Витягнуто' : 'Доступний'}</small>
        </div>
    );
};