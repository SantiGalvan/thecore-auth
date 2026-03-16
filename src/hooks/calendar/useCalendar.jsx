import { useEffect, useState, useCallback } from "react";
import Holidays from "date-holidays";

const useCalendar = (year = new Date().getFullYear(), country = "IT") => {
    const [holidays, setHolidays] = useState([]);
    const [holidayMap, setHolidayMap] = useState(new Map());

    const formatDateKey = (d) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // --- Caricamento festività italiane per l'anno ---
    useEffect(() => {
        const hd = new Holidays(country);
        const allHolidays = hd.getHolidays(year);

        const map = new Map(
            allHolidays.map(h => {
                const d = new Date(h.date);
                const key = formatDateKey(d); // usa giorno locale
                return [key, h];
            })
        );

        setHolidays(allHolidays);
        setHolidayMap(map);
    }, [year, country]);


    // --- Controllo se oggi è festivo ---
    const isTodayHoliday = useCallback(() => {
        const todayStr = new Date().toISOString().split("T")[0];
        return holidayMap.has(todayStr);
    }, [holidayMap]);

    // --- Controllo se un giorno qualsiasi è festivo ---
    const isHoliday = useCallback(
        (date) => {
            let d;
            if (typeof date === "string") {
                if (date.includes("/")) {
                    const [day, month, year] = date.split("/");
                    d = new Date(year, month - 1, day);
                } else {
                    const [y, m, dd] = date.split("-");
                    d = new Date(y, m - 1, dd);
                }
            } else {
                d = new Date(date);
            }

            const key = formatDateKey(d); // usa giorno locale
            return holidayMap.has(key);
        },
        [holidayMap]
    );

    // --- Genera tutti i giorni di una settimana data (array di Date) ---
    const getWeekDays = useCallback((date) => {
        const d = new Date(date);
        const dayOfWeek = d.getDay(); // 0 = domenica, 1 = lunedì
        const monday = new Date(d);
        monday.setDate(d.getDate() - ((dayOfWeek + 6) % 7)); // trova lunedì
        const week = [];
        for (let i = 0; i < 7; i++) {
            const wd = new Date(monday);
            wd.setDate(monday.getDate() + i);
            week.push(wd);
        }
        return week;
    }, []);

    // --- Genera tutte le settimane di un mese (array di array di Date) ---
    const getWeeksInMonth = useCallback((month, year = new Date().getFullYear()) => {
        const weeks = [];
        let date = new Date(year, month, 1);
        while (date.getMonth() === month) {
            weeks.push(getWeekDays(date));
            date.setDate(date.getDate() + 7);
        }
        return weeks;
    }, [getWeekDays]);

    // --- Genera tutti i giorni di un mese (array di Date) ---
    const getDaysInMonth = useCallback((month, year = new Date().getFullYear()) => {
        const days = [];
        const date = new Date(year, month, 1);
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }, []);

    // --- Genera tutti i giorni di più mesi consecutivi ---
    const getDaysInMonths = useCallback((startMonth, startYear = new Date().getFullYear(), numMonths = 6) => {
        const days = [];
        for (let i = 0; i < numMonths; i++) {
            const month = (startMonth + i) % 12;
            const yearOffset = Math.floor((startMonth + i) / 12);
            days.push(...getDaysInMonth(month, startYear + yearOffset));
        }
        return days;
    }, [getDaysInMonth]);

    // --- Genera tutti i giorni dell'anno ---
    const getDaysInYear = useCallback((year) => {
        return getDaysInMonth(0, year).concat(
            getDaysInMonths(1, year, 11)
        );
    }, [getDaysInMonth, getDaysInMonths]);

    return {
        holidays,
        holidayMap,
        isTodayHoliday,
        isHoliday,
        getWeekDays,
        getWeeksInMonth,
        getDaysInMonth,
        getDaysInMonths,
        getDaysInYear
    };
};

export { useCalendar };