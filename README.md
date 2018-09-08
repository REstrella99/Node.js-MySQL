# MySQL & Node Store-front (Bamazon)
	
MySQL-Node-Store-front (a.k.a. Bamazon) is an Node.js based Amazon-like storefront utilizing MySQL. The app is broken down into three modes for customers, managers, and supervisors.  The modes are each conatained in their modules bamazonCustomer.js, bamazonManager.js, and bamazonSupervisor.js. See below for more details of each. 

	


### Prereqs

* [Node.js](https://nodejs.org) 
* [MySQL](https://www.mysql.com/)


### Installation 

1. Download and install Node.js (if not installed already). 
[Node.js Download Page](https://nodejs.org/en/download/)

2. Using [MySQL](https://www.mysql.com/) Workbench/Community Server  create 'Bamazon_db' database 
and 'products' and 'departments' tables. 
You can use the following schema/seeds files in this repository:
	
	* `bamazon-schema.sql`
	* `bamazon-departments-seeds.sql`
	* `bamazon-product-seeds`

3. Clone MySQL-Node-Store repository. 

```
$ git clone https://github.com/REstrella99/Node.js-MySQL
```

4. Within cloned repository run the following to install all npm packages.

```
$ npm install
```

###### NPM Packages

* [mysql](https://www.npmjs.com/package/mysql)	- This is a node.js driver for mysql.
* [inquirer](https://www.npmjs.com/package/inquirer) - Library of common interactive command line user interfaces.
* [cli-table](https://www.npmjs.com/package/cli-table)	- Library to render tables on the command line.


## Usage
#### bamazonCustomer.js

* Displays a table of products with product's ids, names, and prices available for purchase. Prompts user to ender the ID of the product they would like to purchase followed a prompt for quantity.

* The user's total purchase is then calculated then displayed to the console.

* Then the following is updated in the database using MySQL.
	* In the products table the product's stock_quantity and product_sales based on product's item_id.
	* In the departments table total_sales based on product's department_name. 

<img src="/images/customer.png" alt="bamazonCustomer screenshot" width="640">

 


## Built With

* [Sublime Text](https://www.sublimetext.com/) - Text Editor.
* [Node.js](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MySQL](https://www.mysql.com/) - Open Source SQL Database.




## Author

* **Rafael Estrella** - [https://github.com/REstrella99](https://github.com/REstrella99)
