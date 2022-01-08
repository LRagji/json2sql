const operatorMap = new Map([["$sum", "sum"], ["$count", "count"]]);


module.exports = function parse(parsedQueryObject, node) {
    if (node.columns.length === 0) {
        parsedQueryObject.sql += `select * `;
        return parsedQueryObject;
    }
    else {
        const columns = node.columns.map(operatorReplace);
        const columnsWithAlias = columns.map((c, idx) => `${c} as ${node.alias[idx]}`);
        parsedQueryObject.sql += `select ${columnsWithAlias.join(",")} `;
        return parsedQueryObject;
    }
}

function operatorReplace(operator) {
    if (operator.startsWith("$")) {
        const index = operator.indexOf("(");
        const cmd = operator.substr(0, index);
        let column = operator.substr(index + 1);
        column = column.substr(0, column.length - 1);
        return `${operatorMap.get(cmd)}(${column})`;
    }
    return operator;
}