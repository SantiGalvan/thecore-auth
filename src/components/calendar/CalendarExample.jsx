import { useCalendar } from "../../hooks/calendar/useCalendar";

function CalendarExample() {
    const {
        holidays,
        isTodayHoliday,
        isHoliday,
        getWeekDays,
        getWeeksInMonth,
        getDaysInMonth
    } = useCalendar();

    // Giorni di questa settimana
    const weekDays = getWeekDays(new Date());

    // Tutte le settimane di aprile
    const aprilWeeks = getWeeksInMonth(3); // 0 = gennaio

    // Tutti i giorni di dicembre
    const decemberDays = getDaysInMonth(11);

    // console.log("Settimane di aprile:", aprilWeeks);
    // console.log("Giorni di dicembre:", decemberDays);

    return (
        <div>
            <h2>Festività 2026</h2>
            <ul>
                {holidays.map((h, i) => (
                    <li key={i}>{h.date} - {h.name}</li>
                ))}
            </ul>

            <p>Oggi è festivo? {isTodayHoliday() ? "✅" : "❌"}</p>
            <p>25 dicembre è festivo? {isHoliday("2026-12-25") ? "✅" : "❌"}</p>

            <h3>Giorni di questa settimana:</h3>
            <ul>{weekDays.map(d => <li key={d.toISOString()}>{d.toDateString()}</li>)}</ul>
        </div>
    );
}

export default CalendarExample;