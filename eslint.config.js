import js from "@eslint/js";
import globals from "globals";
import astro from "eslint-plugin-astro";

export default [
  { ignores: ["dist/", ".astro/", "node_modules/"] },

  js.configs.recommended, // standard JS rules
  ...astro.configs.recommended, // parses .astro files + Astro-specific rules

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
];
