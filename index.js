const { ConsoleBot } = require('bottender');
const bot = new ConsoleBot();

var stock = require('././stock/stock.js');
var help = require('././help/help.js');

bot.onEvent(async context => {

	let userSays = context.event.message.text.trim();
	let sentence = userSays.split(' ');
	let caller = sentence.shift().trim().toLowerCase();
	let secondSentence = sentence.join(' ').trim();
	let msg = secondSentence.split(' ');
	let category = msg.shift().trim().toLowerCase();
	let question = msg.join().trim();

	console.log("caller", caller);
	console.log("category", category);
	console.log("question", question);

	if (caller === "ca") {
		switch (category) {
			case "help": 
				let helpMsg = help.helpInfo();
				await context.sendText(helpMsg);
				break;
			case "stock" : 
				try {
					let stockInfoDict = await stock.stockInfo(question);
					let stockInfoMsg = stock.stockInfoMsg(question, stockInfoDict);
					await context.sendText(stockInfoMsg);
				} catch (error) {
					let stockInfoMsg = stock.stockInfoMsg(question, error);
					await context.sendText(stockInfoMsg);
				}
				break;
			default:
				context.sendText("類別錯誤，請輸入 ca help 查看所有類別");
				break;
		}		
	}
});

bot.createRuntime();
