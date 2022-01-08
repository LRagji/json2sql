const operatorMap = new Map([["$asc", "asc"], ["$desc", "desc"]]);

module.exports = function parse(parsedQueryObject, node) {
    node = node.map(operatorReplace);
    parsedQueryObject.sql += ` order by ${node.join(",")} `;
    return parsedQueryObject;
}

function operatorReplace(operator) {
    if (operator.startsWith("$")) {
        const index = operator.indexOf("(");
        const cmd = operator.substr(0, index);
        let column = operator.substr(index + 1);
        column = column.substr(0, column.length - 1);
        return `${column} ${operatorMap.get(cmd)}`;
    }
    return operator;
}