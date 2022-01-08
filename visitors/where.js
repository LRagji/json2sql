const operatorMap = new Map([["$and", "and"], ["$or", "or"]]);

module.exports = function parse(parsedQueryObject, node) {
    const precedence = node.precedence;
    delete node.precedence;
    const conditions = precedence.trim().split(" ");
    parsedQueryObject.sql += " where " + conditions
        .reduce((acc, e) => {
            if (e.startsWith("$")) {
                acc += ` ${operatorMap.get(e)} `;
            }
            else {
                const condition = node[e];
                acc += ` ${e} ${condition.operator}`;
                if (Array.isArray(condition.value)) {
                    condition.value = condition.value
                        .map(valueFormatting)
                    acc += `(${condition.value.join(",")})`;
                }
                else {
                    acc += ` ${valueFormatting(condition.value)} `;
                }
            }
            return acc;
        }, "");
    parsedQueryObject.sql += ` `;
    return parsedQueryObject;
}

function valueFormatting(value) {
    if (typeof (value) == 'string' && !value.startsWith("$")) {
        return `'${value}'`;
    }
    else if (typeof (value) == 'string' && value.startsWith("$")) {
        return `${value.substr(1)}`;
    }
    return value;
}