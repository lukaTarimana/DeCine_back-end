module.exports = exports = {
    extends: ["fbjs/strict"],
    env: {
      es6: true,
      browser: false,
      mocha: false
    },
    rules: {
      "one-var": 0,
      "max-len": [
        2,
        {
          code: 150,
          ignorePattern: "maxLenIgnorePattern",
          ignoreUrls: true
        }
      ],
      "no-console": 0,
      "no-extra-parens": false,
      "prettier/prettier": "error",
      
    },
    plugins: ["prettier"]
  };
  