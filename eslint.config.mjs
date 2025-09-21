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
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/generated/**/*",
      "prisma/generated/**/*",
      "**/generated/**/*",
      "**/@prisma/**/*",
      "**/prisma/client.js",
      "**/runtime/**/*.js",
      "**/wasm*.js",
    ],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
    },
  },
  // Disable strict TypeScript rules for generated files (Prisma client, runtime, wasm, etc.)
  {
    files: [
      "src/generated/**",
      "prisma/generated/**",
      "**/generated/**",
      "**/.prisma/**",
      "**/prisma/**/runtime/**",
      "src/generated/prisma/**",
    ],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
