const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = Translator.prototype
suite('Unit Tests', () => {
		suite('Check americanToBritish translation',()=>{
			test('Mangoes are my favorite fruit.',()=>{ //<span class="highlight">10:30</span>
				assert.equal(translator.translation("Mangoes are my favorite fruit.",'american-to-british'),'Mangoes are my <span class="highlight">favourite</span> fruit.')
			});
			test("I ate yogurt for breakfast.",()=>{
				assert.equal(translator.translation("I ate yogurt for breakfast.",'american-to-british'),'I ate <span class="highlight">yoghurt</span> for breakfast.')
			})
			test("We had a party at my friend's condo.",()=>{
				assert.equal(translator.translation("We had a party at my friend's condo.",'american-to-british'),'We had a party at my friend\'s <span class="highlight">flat</span>.')
			})
			test("Can you toss this in the trashcan for me?",()=>{
				assert.equal(translator.translation("Can you toss this in the trashcan for me?",'american-to-british'),'Can you toss this in the <span class="highlight">bin</span> for me?')
			})
			test("The parking lot was full.",()=>{
				assert.equal(translator.translation("The parking lot was full.",'american-to-british'),'The <span class="highlight">car park</span> was full.')
			})
			test("Like a high tech Rube Goldberg machine.",()=>{
				assert.equal(translator.translation("Like a high tech Rube Goldberg machine.",'american-to-british'),'Like a high tech <span class="highlight">Heath Robinson device</span>.')
			})
			test("To play hooky means to skip class or work.",()=>{
				assert.equal(translator.translation("To play hooky means to skip class or work.",'american-to-british'),'To <span class="highlight">bunk off</span> means to skip class or work.')
			})
			test("No Mr.Bond, I expect you to die.",()=>{
				assert.equal(translator.translation("No Mr. Bond, I expect you to die.",'american-to-british'),'No <span class="highlight">Mr</span> Bond, I expect you to die.')
			})
			test("Dr.Grosh will see you now.",()=>{
				assert.equal(translator.translation("Dr. Grosh will see you now.",'american-to-british'),'<span class="highlight">Dr</span> Grosh will see you now.')
			})
			test("Lunch is at 12:15 today.",()=>{
				assert.equal(translator.translation("Lunch is at 12:15 today.",'american-to-british'),'Lunch is at <span class="highlight">12.15</span> today.')
			})
			test("We watched the footie match for a while.",()=>{
				assert.equal(translator.translation("We watched the footie match for a while.",'british-to-american'),'We watched the <span class="highlight">soccer</span> match for a while.')
			})
			test("Paracetamol takes up to an hour to work.",()=>{
				assert.equal(translator.translation("Paracetamol takes up to an hour to work.",'british-to-american'),'<span class="highlight">Tylenol</span> takes up to an hour to work.')
			})
			test("First, caramelise the onions.",()=>{
				assert.equal(translator.translation("First, caramelise the onions.",'british-to-american'),'First, <span class="highlight">caramelize</span> the onions.')
			})
			test("I spent the bank holiday at the funfair.",()=>{
				assert.equal(translator.translation("I spent the bank holiday at the funfair.",'british-to-american'),'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.')
			})
			test("I had a bicky then went to the chippy.",()=>{
				assert.equal(translator.translation("I had a bicky then went to the chippy.",'british-to-american'),'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.')
			})
			test("I've just got bits and bobs in my bum bag.",()=>{
				assert.equal(translator.translation("I've just got bits and bobs in my bum bag.",'british-to-american'),'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.')
			})
			test("The car boot sale at Boxted Airfield was called off.",()=>{
				assert.equal(translator.translation("The car boot sale at Boxted Airfield was called off.",'british-to-american'),'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.')
			})
			test("Have you met Mrs Kalyani?",()=>{
				assert.equal(translator.translation("Have you met Mrs Kalyani?",'british-to-american'),'Have you met <span class="highlight">Mrs.</span> Kalyani?')
			})
			test("Prof Joyner of King's College, London.",()=>{
				assert.equal(translator.translation("Prof Joyner of King's College, London.",'british-to-american'),'<span class="highlight">Prof.</span> Joyner of King\'s College, London.')

			})
			test("Tea time is usually around 4 or 4.30.",()=>{
				assert.equal(translator.translation("Tea time is usually around 4 or 4.30.",'british-to-american'),'Tea time is usually around 4 or <span class="highlight">4:30</span>.')
			})
		
			});
			suite('Check for "Hightlight" translated text',()=>{
				test('Mangoes are my favorite fruit.',()=>{
					assert.include(translator.translation('Mangoes are my favorite fruit.','american-to-british'),"<span class=\"highlight\">favourite</span>",'should wrap the "favourite" in span with class = "highlight"')
				})
				test('I ate yogurt for breakfast.',()=>{
					assert.include(translator.translation('I ate yogurt for breakfast.','american-to-british'),"<span class=\"highlight\">yoghurt</span>",'should wrap the "yoghurt" in span with class = "highlight"')
				})
				test('We watched the footie match for a while.',()=>{
					assert.include(translator.translation('We watched the footie match for a while.','british-to-american'),"<span class=\"highlight\">soccer</span>",'should wrap the "soccer" in span with class = "highlight"')
				})
				test('Paracetamol takes up to an hour to work.',()=>{
					assert.include(translator.translation('Paracetamol takes up to an hour to work.','british-to-american'),"<span class=\"highlight\">Tylenol</span>",'should wrap the "Tylenol" in span with class = "highlight"')
				})
			})
			// test('Check Highlight translation',()=>{
			// 	assert.equal(translator.translation("Prof Joyner of King's College, London.",'british-to-american'),"Prof. Joyner of King's College, London.")
			// 	assert.equal(translator.translation('The car boot sale at Boxted Airfield was called off.','british-to-american'),'The swap meet at Boxted Airfield was called off.')
			// })
		})
// });
