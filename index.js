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
    const sql = queries
        .reduce((sql, qKey) => `${sql} \r\n -- ${qKey} \r\n ${QParser(inputJSON.queries[qKey]).sql}`, "");
    console.log(sql);
    fs.writeFileSync(outputFilePath, sql);

}
catch (err) {
    console.log(`Unexpected error occured: ${err}`);
    console.error(err);
}

function QParser(QNode) {
    return visitorParsingOrder
        .reduce((acc, visitorKey) => {
            if (QNode[visitorKey] == null) return acc;
            const visitorAbsolutePath = path.join(__dirname, vistorsDirectory, visitorKey);
            const visitorParser = require(visitorAbsolutePath);
            return visitorParser(acc, QNode[visitorKey]);
        }, { "sql": "" });

}
