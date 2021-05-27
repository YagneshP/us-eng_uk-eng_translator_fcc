'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
			const{text,locale} = req.body
			const str = translator.translation(text, locale);
			// console.log("str",str);
      if(text === str){
				return res.status(200).json({text:req.text,translation:"Everything looks good to me!"})
			}
			return res.status(200).json({text:req.body.text,translation:str})

    });
};
