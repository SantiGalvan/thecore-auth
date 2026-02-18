import { useState, useEffect } from "react";

const SwitchRadio = ({ value, defaultValue = false, onChange }) => {
  // Determina se il componente è controllato dal genitore
  const isControlled = value !== undefined;

  // Stato interno solo per modalità uncontrolled
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Il valore effettivo: controlled prende il prop, uncontrolled prende lo stato interno
  const on = isControlled ? value : internalValue;

  // Funzione di toggle
  const toggle = () => {
    const next = !on;

    if (!isControlled) setInternalValue(next); // solo se uncontrolled
    onChange && onChange(next); // callback sempre chiamata
  };

  // Se il componente è uncontrolled e defaultValue cambia, aggiorna lo stato interno
  useEffect(() => {
    if (!isControlled) setInternalValue(defaultValue);
  }, [defaultValue, isControlled]);

  return (
    <button
      type="button"
      onClick={toggle}
      className={`w-14 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
        on ? "bg-blue-500" : "bg-gray-300"
      }`}
      aria-pressed={on} // accessibilità
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          on ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default SwitchRadio;