import type { Config } from "tailwindcss";

const config = {
  // En Tailwind CSS v4 ya no es necesario configurar `content` para que funcione.
  // Usa este archivo para personalizar el tema (colores, fuentes, etc.) o añadir plugins.
  theme: {
    extend: {
      // Ejemplo: aquí podrás añadir tus propios colores, tipografías, etc.
    },
  },
  plugins: [],
} satisfies Config;

export default config;
