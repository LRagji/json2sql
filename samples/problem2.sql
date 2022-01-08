
 --InnerJoin 
 select * from basket_a  inner join basket_b as TB on   fruit_a = fruit_b  
 --SelfJoin 
 select * from basket_a   join basket_a as Self on   basket_a.a = Self.a  
 --Parent 
 select * from (select * from basket_a ) as Child  where  a > 0  