const request = require('request');
const help = {};

help.getlist = () => {
    return [
        { category : "help", desc : "ca help", descCHZN: "幫助"},
        { category : "stock", desc : "ca stock 股票代碼", descCHZN: "查詢股價"},
    ];
}

help.InfoToMsg = () => {
    
    let helpLists =  help.getlist();
    let msg = "";
    
    helpLists.forEach(function(element) {
        msg = msg + `${element.descCHZN} : ${element.desc} \n`;
    }, this);
    return msg;
}
module.exports = {
    helpInfo : help.InfoToMsg
};