const fs = require('fs');
const path = require('path');
const vistorsDirectory = "visitors";
const visitorParsingOrder = ["select", "from", "join", "where", "group", "order"];

try {
    const inputFilePath = process.argv[2];
    const outputFilePath = process.argv[3];
    const fileContents = fs.readFileSync(inputFilePath, { encoding: "UTF8" });
    const inputJSON = JSON.parse(fileContents);
    const queries = Object.keys(inputJSON.queries);
    const context = queries
        .reduce((map, qKey) => {
            const query = QParser(inputJSON.queries[qKey], map).sql;
            map.set(qKey, query);
            return map;
        }, new Map());
    let finalSql = "";
    context.forEach((query, name) => finalSql += `\r\n --${name} \r\n ${query}`);
    fs.writeFileSync(outputFilePath, finalSql);
    console.log("Conversion Completed :)");
}
catch (err) {
    console.log(`Unexpected error occured: ${err}`);
    console.error(err);
}

function QParser(QNode, context) {
    return visitorParsingOrder
        .reduce((acc, visitorKey) => {
            if (QNode[visitorKey] == null) return acc;
            const visitorAbsolutePath = path.join(__dirname, vistorsDirectory, visitorKey);
            const visitorParser = require(visitorAbsolutePath);
            return visitorParser(acc, QNode[visitorKey], context);
        }, { "sql": "" });

}
