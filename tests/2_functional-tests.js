const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
// const { text } = require('express');
let translator = Translator.prototype.translation
suite('Functional Tests', () => {
		suite('POST / routes',()=>{
			test('POST /api/translate : Translation with text and locale fields',(done)=>{
				chai.request(server)
						.post("/api/translate")
						.send({text:"Mangoes are my favorite fruit.",locale:"american-to-british"})
						.end(function(err,res){
								if(err) return done(err)
								assert.equal(res.status,200)
								assert.propertyVal(res.body,'text',"Mangoes are my favorite fruit.")
								assert.propertyVal(res.body,'translation',"Mangoes are my <span class='highlight'>favourite</span> fruit.")
								done()
						})
			});
			test('POST /api/translate : Translation with text and invalid locale field',(done)=>{
				chai.request(server)
				.post("/api/translate")
				.send({text:"Mangoes are my favorite fruit.",locale:"american-to-indian"})
				.end(function(err,res){
						if(err) return done(err)
						assert.equal(res.status,200)
						assert.propertyVal(res.body,'error','Invalid value for locale field')
						// assert.propertyVal(res.body,'translation',"Mangoes are my <span class='highlight'>favourite</span> fruit.")
						done()
				})
			});
			test('POST /api/translate : Translation with missing text field',(done)=>{
				chai.request(server)
				.post("/api/translate")
				.send({locale:"american-to-british"})
				.end(function(err,res){
						if(err) return done(err)
						assert.equal(res.status,200)
						assert.propertyVal(res.body,'error','Required field(s) missing')
						done()
				})
			});
			test('POST /api/translate : Translation with missing locale field',(done)=>{
				chai.request(server)
				.post("/api/translate")
				.send({text:"Mangoes are my favorite fruit."})
				.end(function(err,res){
						if(err) return done(err)
						assert.equal(res.status,200)
						assert.propertyVal(res.body,'error','Required field(s) missing')
						done()
				})
			})
			test('POST /api/translate : Translation with empty text',(done)=>{
				chai.request(server)
				.post("/api/translate")
				.send({text:'',locale:"american-to-british"})
				.end(function(err,res){
						if(err) return done(err)
						assert.equal(res.status,200)
						assert.propertyVal(res.body,'error','No text to translate')
						done()
				})
			})
			test('POST /api/translate : Translation with text that needs no translation',(done)=>{
				chai.request(server)
				.post("/api/translate")
				.send({text:"Mangoes are my favourite fruit.",locale:"american-to-british"})
				.end(function(err,res){
						if(err) return done(err)
						assert.equal(res.status,200)
						assert.propertyVal(res.body,'translation',"Everything looks good to me!")
						done()
				})
			})
		})
});
