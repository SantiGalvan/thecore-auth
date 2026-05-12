import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginForm } from "../../contexts/login/LoginFormContext";
import { useConfig } from "../../contexts/config/ConfigContext";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useAuthStorage } from "../../hooks/auth/useAuthStorage";
import { useViewportHeight } from "../../hooks/viewport/useViewportHeight";
import { useOrientation } from "../../hooks/orientation/useOrientation";
import InputLabel from "../../components/inputs/InputLabel";
import Input from "../../components/inputs/Input";
import "./SmartLogin.css";

/**
 * @param {React.ComponentType} Logo           - Componente SVG logo aziendale
 * @param {string}  backgroundSrc              - URL immagine di sfondo custom (default: usa --bg-image da CSS)
 * @param {number}  overlayOpacity             - Opacità overlay sfondo (0.0–1.0, default: 0.5)
 * @param {string}  overlayColor               - Colore overlay sfondo (default: '#f1f1f1')
 * @param {'solid'|'glass'|'minimal'} cardVariant  - Stile card (default: 'solid')
 * @param {'center'|'left'|'right'} cardPosition   - Posizione orizzontale card (default: 'center')
 * @param {'left'|'top'} logoPosition          - Posizione logo su desktop (default: 'left')
 * @param {boolean} showPasswordToggle         - Mostra toggle mostra/nascondi password (default: true)
 * @param {boolean} animateEntrance            - Anima la card al mount (default: true)
 */
const SmartLogin = ({
  Logo,
  backgroundSrc,
  overlayOpacity = 0.5,
  overlayColor = "#f1f1f1",
  cardVariant = "solid",
  cardPosition = "center",
  logoPosition = "left",
  showPasswordToggle = true,
  animateEntrance = true,
}) => {
  const {
    title,
    label,
    type,
    placeholder,
    buttonText,
    formData,
    changeData,
    styleCardForm,
    styleContainerLogo,
    styleLogo,
    overrideStyle,
    customVersion,
  } = useLoginForm();

  const { firstPrivatePath, version, clearLoginFormOnError } = useConfig();
  const { login } = useAuth();
  const { token, user } = useAuthStorage();
  const navigate = useNavigate();
  const orientation = useOrientation();
  useViewportHeight();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect se già loggato — dipendenze corrette (fix bug useEffect con [])
  useEffect(() => {
    if (token && user?.id) navigate(`${firstPrivatePath}${user.id}`);
  }, [token, user?.id, navigate, firstPrivatePath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await login(null, formData);
    } finally {
      setIsSubmitting(false);
      if (clearLoginFormOnError) changeData("password", "");
    }
  };

  // Il logo va sopra se: orientamento portrait OPPURE prop logoPosition='top'
  const isLogoTop = orientation === "portrait" || logoPosition === "top";
  const effectiveLogoPos = isLogoTop ? "top" : "left";

  // Background: inline style sovrascrive il CSS var(--bg-image) se passato
  const bgStyle = backgroundSrc
    ? { backgroundImage: `url(${backgroundSrc})`, opacity: overlayOpacity, backgroundColor: overlayColor }
    : { opacity: overlayOpacity, backgroundColor: overlayColor };

  // Classe variante card
  const cardVariantClass =
    cardVariant === "glass"
      ? "lp-card-glass"
      : cardVariant === "minimal"
      ? "lp-card-minimal"
      : "";

  // Allineamento orizzontale card
  const cardAlignClass =
    cardPosition === "left"
      ? "justify-start pl-6 sm:pl-14"
      : cardPosition === "right"
      ? "justify-end pr-6 sm:pr-14"
      : "justify-center";

  return (
    <section
      id="smart-login-page"
      data-logo-pos={effectiveLogoPos}
      role="main"
      aria-label="Pagina di accesso"
    >
      {/* Background layer — separato dal DOM per non interferire con i re-render del form */}
      <div className="lp-bg" style={bgStyle} aria-hidden="true" />

      {/* Badge versione */}
      {(version || customVersion) && (
        <div className="lp-version text-primary" aria-label="Versione applicazione">
          {customVersion ?? version}
        </div>
      )}

      {/* Container principale */}
      <div className={`container mx-auto flex items-center ${cardAlignClass}`}>
        {/* Card */}
        <div
          className={[
            "bg-form card-style card-size",
            "flex items-center justify-center",
            isLogoTop ? "flex-col" : "flex-row",
            cardVariantClass,
            animateEntrance ? "lp-animate" : "",
            overrideStyle.cardForm ?? styleCardForm ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Logo */}
          {Logo && (
            <div
              className={[
                "login-logo-container flex items-center justify-center",
                isLogoTop ? "w-full" : "basis-1/2",
                overrideStyle.containerLogo ?? styleContainerLogo ?? "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Logo
                className={[
                  "login-logo",
                  overrideStyle.logo ?? styleLogo ?? "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                role="img"
                aria-label="Logo aziendale"
              />
            </div>
          )}

          {/* Divisore verticale — solo desktop/landscape side-by-side */}
          {Logo && !isLogoTop && (
            <div className="lp-divider hidden sm:block" aria-hidden="true" />
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={overrideStyle.form ?? "form-size"}
            aria-label="Form di accesso"
            noValidate
          >
            <h1
              className={
                overrideStyle.title ??
                "text-form-title-size show-title title-position m-form-title"
              }
            >
              {title}
            </h1>

            {/* Email / Username */}
            <div
              className={
                overrideStyle.containerEmail ??
                "flex justify-center flex-col gap-1 m-input-form input-size mx-auto"
              }
            >
              <InputLabel labelId="sl-email" label={label} />
              <Input
                inputType={type}
                inputId="sl-email"
                inputPlaceholder={placeholder}
                inputValue={formData.email}
                inputChange={(e) => changeData("email", e.target.value)}
                inputName="email"
                autoFocus={true}
                disabled={isSubmitting}
              />
            </div>

            {/* Password */}
            <div
              className={
                overrideStyle.containerPassword ??
                "flex justify-center flex-col gap-1 my-4 input-size mx-auto"
              }
            >
              <InputLabel labelId="sl-password" label="Password" />
              <div className="relative">
                <Input
                  inputType={showPassword ? "text" : "password"}
                  inputId="sl-password"
                  inputPlaceholder="Password"
                  inputValue={formData.password}
                  inputChange={(e) => changeData("password", e.target.value)}
                  inputName="password"
                  disabled={isSubmitting}
                />
                {showPasswordToggle && (
                  <button
                    type="button"
                    className="lp-pw-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                    tabIndex={0}
                  >
                    {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                )}
              </div>
            </div>

            {/* Submit */}
            <div
              className={
                overrideStyle.containerButton ??
                "flex button-position items-center m-primary-button"
              }
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={[
                  "font-bold cursor-pointer",
                  "shadow-(--shadow-primary)",
                  "transition-all duration-200",
                  "hover:shadow-(--shadow-primary-hover)",
                  "active:shadow-(--shadow-primary-active) active:translate-y-[2px]",
                  "p-primary-button rounded-primary-button",
                  "bg-primary hover:bg-primary-hover text-primary-text",
                  isSubmitting ? "lp-btn-loading" : "",
                  overrideStyle.button ?? "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={isSubmitting ? "Accesso in corso…" : buttonText}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="lp-spinner" aria-hidden="true" />
                ) : (
                  buttonText
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SmartLogin;
