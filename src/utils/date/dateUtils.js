//* Converte un oggetto Date in una stringa compatibile con <input type="datetime-local">
const toDatetimeLocalValue = (date) => {
    if (!(date instanceof Date)) return '';
    const pad = (n) => String(n).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // getMonth() è 0-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

//* Restituisce una nuova data impostando ore, minuti e secondi specificati
const setTime = (date, hours, minutes = 0, seconds = 0) => {
    if (!(date instanceof Date)) return null;
    const newDate = new Date(date); // copia per non modificare l'originale
    newDate.setHours(hours, minutes, seconds, 0);
    return newDate;
};

//* Restituisce una nuova data sottraendo un numero di giorni dalla data fornita
const subtractDays = (date, days) => {
    if (!(date instanceof Date)) return null;
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
};

//* Converte una data in formato UTC in un oggetto Date in ora locale
const parseUtcToLocal = (utcString) => {
    const date = new Date(utcString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

//* Converte un oggetto Date in una stringa "YYYY-MM-DD" compatibile con <input type="date">
const toDateValue = (date) => {
    if (!(date instanceof Date)) return '';
    const pad = (n) => String(n).padStart(2, '0');
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    return `${year}-${month}-${day}`;
};

export { toDatetimeLocalValue, setTime, subtractDays, parseUtcToLocal, toDateValue };