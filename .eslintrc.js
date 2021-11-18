module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["jest", "@typescript-eslint"],
  rules: {
    "max-len": [
      "error",
      {
        ignoreComments: true,
      },
    ],
    "import/prefer-default-export": "off",
  },
};
