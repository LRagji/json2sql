# json2sql

Package to convert json to sql queries.

Supports
1. Selections of columns
2. Aliasing of columns
3. Simple and complex where queries
4. Aggregations of columns with group by clause.
5. Support of Ordering ascending and descinding.
6. Subquery support.

Syntax:
## `queries`:
A object which contains queries defined by table name object.
Eg:
``` 
"queries":{
            "myTable":{}
          }
```

## `alias`:
Name for this query, used to refer in subquery and joins.

## `select`: 
Array of column names or aggregate functions.
1. `$sum` : Aggregation of column values by summation.

## `column-alias`:
Used to provide a user defined name to selected columns.