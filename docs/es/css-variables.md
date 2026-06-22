# Variables CSS — thecore-auth

> 🇬🇧 [CSS Variables in English](../css-variables.md) | 🇮🇹 [Variabili CSS in Italiano](./it/css-variables.md)

Todos los aspectos visuales de `thecore-auth` se controlan mediante propiedades personalizadas de CSS (variables).
Sobreescríbalas en su propio bloque `:root {}` después de importar el CSS del paquete para adaptar la apariencia a su marca.

## Configuración

### 1. Importar el CSS del paquete

En su archivo CSS principal (p. ej. `src/index.css`):

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');
```

O en `src/main.jsx`:

```jsx
import 'thecore-auth/dist/thecore-auth.css';
```

### 2. Sobreescribir las variables

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-text: #ffffff;
  --height-card-form: 60vh;
}
```

Los cambios se aplican de inmediato a todos los componentes que usan esas variables — no se requiere recompilación.

---

## Referencia de Variables

### Color Principal y Botón

Controla el color de marca utilizado en botones y elementos interactivos.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--color-primary` | `#f56907` | Color de marca principal |
| `--color-primary-hover` | `#f88b29` | Color de marca al pasar el cursor |
| `--color-primary-text` | `#fff` | Color del texto en elementos con color primario |
| `--shadow-primary` | `0 4px 10px rgba(245,105,7,0.3)…` | Sombra de caja para elementos primarios |
| `--shadow-primary-hover` | `0 6px 14px rgba(245,105,7,0.4)…` | Sombra de caja al pasar el cursor |
| `--shadow-primary-active` | `0 2px 5px rgba(245,105,7,0.3)` | Sombra de caja al hacer clic/presionar |
| `--shadow-primary-input` | `inset 0 1px 1px …, 0 0 8px rgba(245,105,7,0.6)` | Sombra del anillo de enfoque en los inputs |
| `--padding-primary-button` | `8px 16px` | Relleno del botón de envío del login |
| `--margin-primary-button` | `20px 0px` | Margen alrededor del botón de envío del login |
| `--radius-primary-button` | `calc(infinity * 1px)` | Radio de borde del botón de envío del login (píldora por defecto) |
| `--justify-primary` | `center` | Alineación horizontal del botón de login (`flex-start`, `center`, `flex-end`) |

---

### Tarjeta de Login — Dimensiones

Controla el tamaño y la forma de la tarjeta de login que contiene el logo y el formulario.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--height-card-form` | `70vh` | Altura de la tarjeta en escritorio |
| `--height-card-form-landscape` | `80vh` | Altura de la tarjeta en orientación horizontal |
| `--width-card-form` | `85vw` | Ancho de la tarjeta |
| `--max-width-card-form` | `1136px` | Ancho máximo de la tarjeta |
| `--border-form-size` | `2px` | Grosor del borde de la tarjeta |
| `--form-radius` | `2em` | Radio de borde de la tarjeta |

---

### Tarjeta de Login — Colores

Controla el color de fondo y el color del borde de la tarjeta de login.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--color-form` | `#fff` | Color de fondo de la tarjeta |
| `--color-form-border` | `#D3D3D3` | Color del borde de la tarjeta |

---

### Estilo de los Inputs

Controla la apariencia de los campos de formulario dentro de la tarjeta de login.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--color-input-bg` | `#f9fafb` | Color de fondo del input |
| `--color-input-border` | `#d1d5db` | Color del borde del input |
| `--color-input-text` | `#111827` | Color del texto del input |
| `--padding-input` | `10px` | Relleno interno del input (controla la altura del input) |
| `--input-radius` | `8px` | Radio de borde del input |
| `--text-input-label` | `14px` | Tamaño de fuente de las etiquetas del input |
| `--text-input-placeholder` | `14px` | Tamaño de fuente del texto de marcador de posición del input |
| `--color-color-label` | `#111827` | Color del texto de las etiquetas del input |
| `--label-display` | `block` | Visibilidad de la etiqueta: `block` la muestra, `none` la oculta |

---

### Diseño del Formulario

Controla las proporciones internas de la sección del formulario dentro de la tarjeta.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--basis-form` | `50%` | Ancho de la sección del formulario (flex-basis) |
| `--input-form-width` | `70%` | Ancho de cada campo de input relativo al formulario |
| `--margin-input-form` | `16px 0` | Margen vertical entre campos de input |

---

### Título del Formulario

Controla el texto del título que se muestra sobre los campos del formulario.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--text-form-title-size` | `2.25rem` | Tamaño de fuente del título |
| `--margin-form-title` | `32px 0` | Margen superior e inferior del título |
| `--title-display` | `none` | Visibilidad del título: `block` lo muestra, `none` lo oculta |
| `--title-position` | `center` | Alineación del texto del título (`left`, `center`, `right`) |

---

### Fondo del Login

Controla la imagen de fondo que se muestra detrás de la tarjeta de login.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--bg-image` | `url(../assets/login-background.svg)` | Imagen de fondo de la página de login (`url(…)` o `none`) |

---

### Logo del Login

Controla el tamaño del logo que se muestra dentro de la tarjeta de login.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--login-logo-width` | `40vw` | Ancho del logo en modo retrato/escritorio |
| `--login-logo-max-width` | `300px` | Ancho máximo del logo en modo retrato/escritorio |
| `--login-logo-landscape-width` | `20vw` | Ancho del logo en orientación horizontal |
| `--login-logo-landscape-max-width` | `250px` | Ancho máximo del logo en orientación horizontal |

---

### Colores de Alertas

Controla la paleta de colores de los cuatro tipos de alerta: `danger`, `info`, `success` y `warning`.
Cada tipo tiene cuatro variantes: fondo, texto, fondo al pasar el cursor y barra de progreso.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--color-danger` | `#FEE2E2` | Fondo de alerta de peligro |
| `--color-danger-text` | `#B91C1C` | Color del texto de alerta de peligro |
| `--color-danger-hover` | `#FECACA` | Fondo de alerta de peligro al pasar el cursor |
| `--color-danger-progress` | `#F87171` | Color de la barra de progreso de alerta de peligro |
| `--color-info` | `#EFF6FF` | Fondo de alerta informativa |
| `--color-info-text` | `#1D4ED8` | Color del texto de alerta informativa |
| `--color-info-hover` | `#BFDBFE` | Fondo de alerta informativa al pasar el cursor |
| `--color-info-progress` | `#60A5FA` | Color de la barra de progreso de alerta informativa |
| `--color-success` | `#ECFDF5` | Fondo de alerta de éxito |
| `--color-success-text` | `#15803D` | Color del texto de alerta de éxito |
| `--color-success-hover` | `#A7F3D0` | Fondo de alerta de éxito al pasar el cursor |
| `--color-success-progress` | `#34D399` | Color de la barra de progreso de alerta de éxito |
| `--color-warning` | `#F9FAEB` | Fondo de alerta de advertencia |
| `--color-warning-text` | `#D97706` | Color del texto de alerta de advertencia |
| `--color-warning-hover` | `#FDE047` | Fondo de alerta de advertencia al pasar el cursor |
| `--color-warning-progress` | `#FACC15` | Color de la barra de progreso de alerta de advertencia |

---

### Componente de Carga

Controla la apariencia de la superposición de carga a pantalla completa.

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--color-loading-bg` | `#4B556366` | Color de fondo de la superposición de carga (admite canal alfa) |
| `--color-spinner` | `#fff` | Color del ícono del spinner |

---

### Componentes SPOT RFID

Variables para la familia de componentes SPOT RFID (`SpotRfidHeader`, `InputGroup`, `CardInputTag`, `CardInputRange`).

| Variable | Valor por defecto | Descripción |
|----------|---------|-------------|
| `--header-height` | `60px` | Altura del componente `SpotRfidHeader` |
| `--width-logo-size` | `48px` | Ancho del logo dentro de `SpotRfidHeader` |
| `--color-primary-accent` | `#f56907` | Color de acento usado en `CardInputRange` |
| `--color-save-button` | `#16A34A` | Color del botón guardar en `CardInputRange` |
| `--color-write-button` | `#0284C7` | Color del botón escribir en `CardInputTag` |
| `--color-focus-ring` | `#f5690780` | Color del anillo de enfoque para inputs SPOT RFID |
| `--color-focus-error` | `rgba(255,0,0,0.5)` | Color del anillo de enfoque en caso de error |
| `--color-spot-rfid-input-border` | `#f56907` | Color del borde de los inputs SPOT RFID |
| `--shadow-spot-rfid-input` | `0 0 0 4px var(--color-focus-ring)` | Sombra de caja al enfocar un input SPOT RFID |
| `--shadow-spot-rfid-error` | `0 0 0 4px var(--color-focus-error)` | Sombra de caja en error de input SPOT RFID |

---

## Ejemplo Completo

Un bloque de sobreescritura `:root` completo para una marca personalizada:

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');

:root {
  /* Brand colors */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-primary-text: #ffffff;

  /* Login card */
  --height-card-form: 65vh;
  --form-radius: 1.5rem;
  --color-form: #f8fafc;

  /* Inputs */
  --input-radius: 0.5rem;
  --padding-input: 12px;

  /* Alerts */
  --color-danger: #fef2f2;
  --color-success: #f0fdf4;
  --color-info: #eff6ff;
  --color-warning: #fffbeb;

  /* Loading */
  --color-spinner: #6366f1;
}
```
