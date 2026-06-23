# ModalMain

> [English](../../../docs/en/components/ModalMain.md) | [Versione italiana](../../../docs/it/components/ModalMain.md)

> ⚙️ **Componente interno** — no importable directamente. Usado dentro de `DefaultLayout`. Interactúa con el sistema modal a través de [`useModal`](../../contexts/ModalProvider.md).

## Descripción general

`ModalMain` renderiza el área de contenido desplazable del modal. Envuelve `children` en un elemento `<main>` con altura máxima fija y scroll vertical.

Cuando `type === 'delete'`, el `<main>` completo se suprime — los modales de eliminación no contienen cuerpo, solo la pregunta de confirmación del encabezado y los botones de acción del pie de página.

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|---|---|---|---|---|
| `type` | `string` | — | ✅ | Tipo del modal: `'submit'` \| `'delete'` \| `'custom'`. Cuando es `'delete'`, no se renderiza nada |
| `children` | `ReactNode` | `undefined` | — | Contenido renderizado dentro del área `<main>` desplazable |
| `item` | `object` | `undefined` | — | Elemento sobre el que se actúa; cuando `type === 'delete'` e `item` está ausente, se muestra un mensaje de error en lugar de `children` |
| `overrideStyle` | `string` | `undefined` | — | Reemplaza la cadena de clases por defecto (`my-8 max-h-[600px] overflow-y-auto overflow-x-hidden`) cuando se proporciona |

## Notas

- La altura máxima por defecto es `600px`; se puede cambiar con `overrideStyle` (mediante `style.overrideStyle` en `Modal`).
- El estado de error interno (`type === 'delete'` sin `item`) es una comprobación defensiva que no es visible en el uso normal — `Modal` siempre proporciona `item` para los modales de eliminación.
- La API completa de `useModal` está documentada en [`docs/modal.md`](../modal.md).
