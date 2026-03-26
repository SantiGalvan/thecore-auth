import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import useClickOutside from "../../hooks/ui/useClickOutside";

const EMPTY_ARRAY = [];

const DEFAULT_CLASSNAMES = {
    container: "relative w-full mb-4",
    label: "mb-2 text-input-label font-medium text-color-label",
    trigger: "border border-gray-300 rounded-lg p-2 flex flex-wrap gap-1 cursor-pointer h-[43px] bg-white overflow-x-auto scrollbar-none",
    placeholder: "text-gray-400 text-sm",
    tag: "bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1",
    tagButton: "text-blue-500 hover:text-blue-700 cursor-pointer",
    chevron: "w-5 h-5 ml-auto text-gray-500 transition-transform duration-200",
    dropdown: "absolute w-full mt-1 bg-input-bg border border-input-border rounded-lg shadow-lg max-h-50 overflow-hidden z-10",
    searchInput: "w-full p-2 border-b border-gray-200 outline-none",
    list: "max-h-40 overflow-auto",
    listItem: "px-3 py-2 cursor-pointer hover:bg-blue-50",
    listItemSelected: "bg-blue-100",
    noResults: "px-3 py-2 text-gray-500 text-sm",
};

const MultiSelect = ({
    // Data
    label,
    items,
    value = EMPTY_ARRAY,
    placeholder,
    displayKey,
    valueKey,
    idKey = "id",
    // Filter update
    type,
    updateFilter,
    // Text overrides (i18n)
    searchPlaceholder = "Cerca...",
    noResultsText = "Nessun risultato",
    // Style overrides (merged with defaults)
    classNames = {},
}) => {

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef(null);

    const cx = { ...DEFAULT_CLASSNAMES, ...classNames };

    useClickOutside(containerRef, () => setOpen(false));

    const toggleOption = (option) => {
        if (type) {
            updateFilter((prev) => {
                const alreadySelected = prev[type].some((item) => item[idKey] === option[idKey]);
                return {
                    ...prev,
                    [type]: alreadySelected
                        ? prev[type].filter((item) => item[idKey] !== option[idKey])
                        : [...prev[type], option],
                };
            });
        } else {
            const alreadySelected = value.some((item) => item[idKey] === option[idKey]);
            const newValue = alreadySelected
                ? value.filter((item) => item[idKey] !== option[idKey])
                : [...value, option];
            updateFilter(newValue);
        }
    };

    const getDisplayText = (item) => {
        if (Array.isArray(displayKey)) {
            return displayKey.map((key) => item[key]).filter(Boolean).join(" ");
        }
        if (typeof displayKey === "string" && item[displayKey]) {
            return item[displayKey];
        }
        return item.code || item.name || item.label || String(item[idKey] || "");
    };

    const filteredItems = items?.filter((item) =>
        getDisplayText(item).toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={containerRef} className={cx.container}>

            {label && <div className={cx.label}>{label}</div>}

            {/* Trigger */}
            <div className={cx.trigger} onClick={() => setOpen(!open)}>
                {value.length > 0 ? (
                    value.map((item) => (
                        <span key={item[idKey]} className={cx.tag}>
                            {valueKey ? item[valueKey] : getDisplayText(item)}
                            <button
                                type="button"
                                className={cx.tagButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOption(item);
                                }}
                            >
                                ✕
                            </button>
                        </span>
                    ))
                ) : (
                    <span className={cx.placeholder}>{placeholder}</span>
                )}

                <FaChevronDown className={`${cx.chevron} ${open ? "rotate-180" : "rotate-0"}`} />
            </div>

            {/* Dropdown */}
            {open && (
                <div className={cx.dropdown}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={searchPlaceholder}
                        className={cx.searchInput}
                        autoFocus
                    />
                    <ul className={cx.list}>
                        {filteredItems?.length > 0 ? (
                            filteredItems.map((item) => (
                                <li
                                    key={item[idKey]}
                                    onClick={() => toggleOption(item)}
                                    className={`${cx.listItem} ${value.some((s) => s[idKey] === item[idKey]) ? cx.listItemSelected : ""}`}
                                >
                                    {getDisplayText(item)}
                                </li>
                            ))
                        ) : (
                            <li className={cx.noResults}>{noResultsText}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;