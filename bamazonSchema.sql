create database bamazon;
use bamazon;

create table products(
	item_id integer (9) auto_increment,
    product_name varchar (30),
    department_name varchar (30),
    price decimal (10,2),
    stock_quantity integer (9),
    primary key (item_id)
    );
    
insert into products (product_name, department_name, price, stock_quantity)
values ("Light Saber", "space_weapons", 1800.00, 14);

insert into products (product_name, department_name, price, stock_quantity)
values ("T1000", "robotics", 428000.00, 8000);

insert into products (product_name, department_name, price, stock_quantity)
values ("Magic Conch", "toys", 19.95, 400);

insert into products (product_name, department_name, price, stock_quantity)
values ("Novelty Drink Hat", "clothing", 6, 17000);

insert into products (product_name, department_name, price, stock_quantity)
values ("Skooma", "parmaceuticals", 200, 2000);

insert into products (product_name, department_name, price, stock_quantity)
values ("Golden Spatula", "divine_cookware", 10000000, 1);

insert into products (product_name, department_name, price, stock_quantity)
values ("Canned Bread", "food", 6, 90);

insert into products (product_name, department_name, price, stock_quantity)
values ("Krabby Patty", "food", 5, 200);

insert into products (product_name, department_name, price, stock_quantity)
values ("Sweet Roll", "food", 2, 60);

insert into products (product_name, department_name, price, stock_quantity)
values ("Asparagus Water", "food", 14, 100);

