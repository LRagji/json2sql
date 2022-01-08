 
 -- Math Operators 
 select * from TableA  where  C1 > 10  and  C2 < 20  or  C3 = 100  and  C4 != 200   order by C1 asc,C2 desc  
 -- String Operators 
 select EmpName as Name,sum(Salary) as Total Salary from TableB  where  EmpName Like '%ABC'  or  Area IN('Mumbai','Delhi','Banglore') 