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
    "no-console": "off",
    "no-alert": "off",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        js: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".js"],
      },
    },
  },
};
