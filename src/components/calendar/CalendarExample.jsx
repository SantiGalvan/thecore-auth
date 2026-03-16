import { useState } from "react";
import { useCalendar } from "../../hooks/calendar/useCalendar";

const CalendarExample = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [checkResult, setCheckResult] = useState(null);

    const { holidays, isHoliday } = useCalendar();

    const checkHoliday = () => {
        if (!selectedDate) return;
        const result = isHoliday(selectedDate);
        console.log(`La data ${selectedDate} è festiva?`, result);
        setCheckResult(result);
    };

    return (
        <div className="mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">🎄 Festività 2026</h2>

            <div className="flex gap-8 w-full mx-auto flex-col md:flex-row">

                <div className="bg-white shadow-md rounded-lg p-4 mb-6 basis-2/3">
                    <h3 className="text-lg font-semibold mb-2">Lista delle festività</h3>
                    <ul className="list-disc list-inside max-h-82 overflow-y-auto">
                        {holidays.map((h, i) => (
                            <li key={i} className="py-1 border-b border-gray-200">
                                <span className="font-medium">{h.date}</span> - {h.name} ({h.type})
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <p className="mb-2 font-semibold">
                        Oggi è festivo?{" "}
                        <span className="text-lg">{isHoliday(new Date()) ? "✅" : "❌"}</span>
                    </p>

                    <h3 className="text-lg font-semibold mb-3">Controlla una data</h3>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Data</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            onClick={checkHoliday}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Controlla
                        </button>
                    </div>

                    {checkResult !== null && (
                        <p className="mt-3 font-semibold text-lg">
                            La data {selectedDate} è{" "}
                            <span className={checkResult ? "text-green-600" : "text-red-600"}>
                                {checkResult ? "una festività ✅" : "non è festiva ❌"}
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CalendarExample;