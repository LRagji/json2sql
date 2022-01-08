# json2sql

Package to convert json to sql queries.(thought experiment)

Supports
1. Selections of columns
2. Aliasing of columns
3. Support for simple and complex WHERE clause.
4. Aggregations of columns with GROUP BY clause.
5. Support of ordering ascending and descinding.
6. Subquery support.

## Syntax:

### `queries`:
A object which contains queries defined by name.
Eg:
``` 
"queries":{
            "myTable":{
              //...more query details
            }
          }
```

### `from`:
A single value text field used to describe the table or subquery it was built on.(`$` as the first character refers to alies of query in the same file.) 

### `select`: 
Object containing columns and aliases to be used, it can also contain aggregate functions used by groupby cluase. 
1. Empty columns array means it will fetch all columns like `*`.
2. `alias` array is indexed with `columns` array directly.
3. `$sum` , `$count` : Aggregation are currently supported functions.

### `join`:
Allows to define a join statement in the query.
1. `object.key` has to be name of the table to join with.
2. `alias` used to define alias.
3. `type` type of join Eg: inner, left outer.
4. `precedence` order in which operators have to logically combined currently support `$and` , `$or`.
5. `operator` supports different operators like `>,<,=,!=,Like,In`.
6. `value` operand against which operator has to be executed, support array, single value; `$` as first character states as column name.

### `where`:
Allows to define a where clause for the query.
1. `precedence` order in which operators have to logically combined currently support `$and` , `$or`.
2. `operator` supports different operators like `>,<,=,!=,Like,In`.
3. `value` operand against which operator has to be executed, support array, single value; `$` as first character states as column name.

### `group`:
Allows to define a group by clause for the query. Supports array of column names to group by on.

## `order`:
Supports `$asc` & `$desc` oders for the given columns.

## Running 
1. Git clone the project.
2. Copy full path of input and output files to generate in following command.
3. Run `node index.js input.json output.sql
4. Samples folder containing input and output [Samples](https://github.com/LRagji/json2sql/tree/master/samples).

## Highlights
1. No NPM packages pure JS code.
2. Implemented on visitor pattern can be optimized further using ast.

## References & Tools
1. [SQL Fiddle](http://sqlfiddle.com/)
2. [Joins Visual Explanation and Schema](https://www.postgresqltutorial.com/postgresql-joins/)
