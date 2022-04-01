module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "webextensions": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2020
    },
    "rules": {
        "no-trailing-spaces": 1,
        "linebreak-style": 0,
        "indent": [
            "error",
            "tab",
            {
              "SwitchCase": 1,
              "ignoreComments": true
            }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
