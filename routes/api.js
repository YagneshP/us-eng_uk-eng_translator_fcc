"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    let str;
    if (text && locale) {
      if (
        locale === "american-to-british" ||
        locale === "british-to-american"
      ) {
        str = translator.translation(text, locale);
        if (text === str) {
          return res
            .status(200)
            .json({
              text: req.body.text,
              translation: "Everything looks good to me!",
            });
        }
        return res.status(200).json({ text: req.body.text, translation: str });
      } else {
        return res
          .status(200)
          .json({ error: "Invalid value for locale field" });
      }
    } else {
      if (text === "" && locale) {
        return res.status(200).json({ error: "No text to translate" });
      } else {
        return res.status(200).json({ error: "Required field(s) missing" });
      }
    }
  });
};
