const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
		translation(text, locale){
			//highlight func
			function highlight(str){
				return `<span class="highlight">${str}</span>`
			}
			/**
			 *  Translate American-to-British
			 */
			if(locale === 'american-to-british'){
			/**
			 * Regex for the american-to-british conditions
			 */
				let regexAmericanToBritishTitle = new RegExp(Object.keys(americanToBritishTitles).map(el=>  el.slice(0,el.indexOf("."))+"\\"+ el.slice(el.indexOf("."))).join("|"),"gi"); //AmericanToBritishTitle
				let regexAmericanToBritishTime = new RegExp('(\\d{1,2}:\\d{1,2})\\b','gi');
				/**
				* matches spell or titles
			  */
					let americanOnlyMatch =Object.keys(americanOnly).filter(el => text.match(new RegExp(`${el}\\b`,'gi')));
					let spellMatch =  Object.keys(americanToBritishSpelling).filter(el => text.match(new RegExp(`${el}\\b`,'gi')));
					let titleMatch =   text.match(regexAmericanToBritishTitle);
					let timeMatch = text.match(regexAmericanToBritishTime);
				/**
				 *  conditions if matching found
				 * */   
				let translateString = text ;
				if(americanOnlyMatch){
					translateString = americanOnlyMatch.reduce((acc,curr)=>{
								return acc.replace(new RegExp(`${curr}`,'i'), highlight(americanOnly[curr]) )
						},translateString);
				} 
				if(spellMatch){
					translateString = spellMatch.reduce((acc,curr)=>{
						return acc.replace(new RegExp(`${curr}`,'i'), highlight(americanToBritishSpelling[curr]))
					},translateString);
				}
				if(titleMatch){
					translateString = titleMatch.reduce((acc,curr)=>{
							let title = curr.toLowerCase();
							let capitalized =  americanToBritishTitles[title].charAt(0).toUpperCase() + americanToBritishTitles[curr.toLowerCase()].slice(1)
						return acc.replace(new RegExp(`${curr}`,'i'),highlight(capitalized) );
					}, translateString);
				}
				if(timeMatch){
					translateString = timeMatch.reduce((acc,curr)=>{
						let changedTime =  curr.replace(':','.')
						return acc.replace(curr,highlight(changedTime) )
					},translateString)
				}
				// console.log("translate american to british",translateString);
				return translateString;
			}
			/**
			 *  Translate American-to-British
			 */
			else if(locale === 'british-to-american'){
			/**
			 * Regex for the british-to-american conditions
			 */	
			//  let regexBritishToAmericanSpelling = new RegExp(Object.values(americanToBritishSpelling).join("|"),'gi'); //BritishToAmericanSpelling
			//  let regexBritishToAmericanTitle = new RegExp(Object.values(americanToBritishTitles).join("|"),"gi"); //BritishToAmericanTitles
			//  let regexOnlyBritishSpelling = new RegExp(Object.keys(britishOnly).join("|"),'gi'); //BritishOnly
			 let regexBritishToAmericanTime = new RegExp('(\\d{1,2}.\\d{1,2})\\b','gi'); //time

	  	/**
		   *  match spell and title
		   */
			
			 let spellMatch =  Object.values(americanToBritishSpelling).filter(el => text.match(new RegExp(`${el}\\b`,'gi')));
			 let titleMatch =  Object.values(americanToBritishTitles).filter(el => text.match(new RegExp(`${el}\\b`,'gi')));
			 let britishOnlyMatch =  Object.keys(britishOnly).filter(el => text.match(new RegExp(`${el}\\b`,'gi')));
			 let timeMatch = text.match(regexBritishToAmericanTime);
			/**
			 * getKeys from value
			 */
			 function getKeyByValue(object, value) {
				return Object.keys(object).find(key => object[key] === value);
			}

				 let translateString = text ;
				 if(britishOnlyMatch){
					 translateString = britishOnlyMatch.reduce((acc,curr)=>{
						return acc.replace(new RegExp(`${curr}`,'i'),highlight(britishOnly[curr]))
					},translateString);
				 } 
				 if(spellMatch){
					 translateString = spellMatch.reduce((acc,curr)=>{
						return acc.replace(new RegExp(`${curr}`,'i'),highlight(getKeyByValue(americanToBritishSpelling,curr)))
					},translateString);
				 }
				 if(titleMatch){
					 translateString = titleMatch.reduce((acc,curr)=>{
							let title = getKeyByValue(americanToBritishTitles,curr.toLowerCase());
							let capitalizedtitle = title.charAt(0).toUpperCase() + title.slice(1);
						return acc.replace(new RegExp(`${curr}`,'i'),highlight(capitalizedtitle));
					}, translateString);
				 }
				 if(timeMatch){
					translateString = timeMatch.reduce((acc,curr)=>{
						let changedTime =  curr.replace('.',':')
						return acc.replace(curr,highlight(changedTime) )
					},translateString)
				}
				// console.log("translate british to american",translateString);
				 return translateString;
			}
		}
}

module.exports = Translator;