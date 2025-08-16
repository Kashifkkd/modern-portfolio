import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable TypeScript any type errors
      "@typescript-eslint/no-explicit-any": "off",
      // Disable prefer-const warnings
      "prefer-const": "off",
      // Disable React Hook dependency warnings
      "react-hooks/exhaustive-deps": "off",
      // Disable Next.js img element warnings
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
