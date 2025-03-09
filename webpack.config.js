const path = require("path");

module.exports = {
  // ... другие настройки
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      Store: path.resolve(__dirname, "src/store/"),
    },
  },
  // ... другие настройки
};
