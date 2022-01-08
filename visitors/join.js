const whereConditionParser = require('./where');
module.exports = function parse(parsedQueryObject, node) {
    const joiningTables = Object.keys(node);
    parsedQueryObject.sql += joiningTables.reduce((acc, tableKey) => {
        const creteria = node[tableKey];
        acc += ` ${creteria.type} join ${tableKey} as '${creteria.alias}' on `;
        const condition = { sql: "" };
        whereConditionParser(condition, creteria);
        acc += condition.sql.substr(6);
        return acc;
    }, "");
    return parsedQueryObject;
}