 
 -- InnerJoin 
 select C1 as 'A1',C2 as 'A2',C3 as 'A3' from TableA  inner join TableB as 'TB' on   B1 = '10'   
 -- SelfJoin 
 select * from TableA  self join TableA as 'self' on   B1 = '10'  