module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "node": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
  ],
  "overrides": [
  ],
  "ignorePatterns": ["dist/*"],
  "plugins": [
      "@typescript-eslint",
  ],
  "rules": {
      "@typescript-eslint/ban-ts-comment": ["error", {
          "ts-ignore": "allow-with-description"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-namespace": "off"
  }
}
