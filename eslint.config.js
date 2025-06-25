import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // Astro-specific rules for better development experience
      "astro/no-set-html-directive": "error",
      "astro/no-unused-define-vars-in-style": "error",

      // General JavaScript best practices
      "no-console": "warn",
      "prefer-const": "error",
    },
  },
  // Must be last to override other configs
  eslintConfigPrettier,
];
