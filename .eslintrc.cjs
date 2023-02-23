module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      rules: {
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],

        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
      },
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts", "*.tsx"],
    },
    {
      files: ["src/**/models/**/*.ts"],
      rules: { "@typescript-eslint/naming-convention": "off" },
    },
    {
      files: ["src/**/routers/**/*.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-call": "off",
      },
    },
    {
      files: ["src/**/**/*.test.ts"],
      rules: {
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "new-cap": ["error", { capIsNewExceptions: ["Router"] }],
    "no-implicit-coercion": "off",
  },
};
