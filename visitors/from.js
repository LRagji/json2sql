module.exports = function parse(parsedQueryObject, node, context) {
    if (node.startsWith("$")) {
        const keyName = node.substr(1);
        const subQuery = context.get(keyName);
        parsedQueryObject.sql += `from (${subQuery}) as ${keyName} `;
        context.delete(keyName);
    }
    else {
        parsedQueryObject.sql += `from ${node} `;
    }
    return parsedQueryObject;
}