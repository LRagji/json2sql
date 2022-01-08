module.exports = function parse(parsedQueryObject, node) {
    parsedQueryObject.sql += `group by ${node.join(',')} `;
    return parsedQueryObject;
}