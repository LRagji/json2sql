module.exports = function parse(parsedQueryObject, node) {
    parsedQueryObject.sql += `from ${node} `;
    return parsedQueryObject;
}