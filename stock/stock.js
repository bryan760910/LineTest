const request = require('request');
const stock = {};

stock.getStockInfo = (code) => {
    const options = {
		uri: 'https://servicerd.sinotrade.com.tw/api/v1/codeList/StockInfo',
		method: 'POST',
		json: {
			"stockidList": [code]
		}
	};

    const sendRequest = () => {
        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200 && body.success == "True" && body.result[code].Name !== null) {
                    const stockInfo = body;
                    resolve(stockInfo);
                } else {
                    const errorText = {
                        success: "False",
                        result: {
                            msg : "查詢錯誤"
                        }
                    }
                    reject(errorText);
                }
            });
        });
    }

    const info = sendRequest();
    return info;
    
}
stock.InfoToMsg = (code, stockInfo) => {
    let msg;
    if (stockInfo.success == "True") {
        msg = `現 : ${stockInfo.result[code].Close} \n` +
        `開 : ${stockInfo.result[code].Open} \n` + 
        `高 : ${stockInfo.result[code].High} \n` +
        `低 : ${stockInfo.result[code].Low} \n` +
        `收 : ${stockInfo.result[code].Reference} \n`;
    } else {
        msg = stockInfo.result.msg;
    }
    
    return msg;


}

module.exports = {
    stockInfo: stock.getStockInfo,
    stockInfoMsg: stock.InfoToMsg
};