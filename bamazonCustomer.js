



const TABLE = require('cli-table');
const INQUIRER = require('inquirer');
const MYSQL = require('mysql');
const PW = require('./pw.js');

const CONNECTION = MYSQL.createConnection({
	host: "localhost",
	port: 3306,

	
	user: 'root',

	
	password: PW.pw,
	database: 'Bamazon_db'
});



function start()
{
	CONNECTION.connect();
	displayProducts();	
}


function displayProducts()
{ 
	CONNECTION.query('SELECT * FROM products', function (error, results, fields) {	
		if (error) throw error;
		
	
		const INVENTORY = results;
		
		
		let table = new TABLE({
    		head: ['Item Id', 'Product Name', 'Price'],
 			colWidths: [10, 20,20]
 		});

		for(let key in INVENTORY)
		{
			table.push([INVENTORY[key].item_id, INVENTORY[key].product_name, "$" + INVENTORY[key].price.toFixed(2)]);
		}	

		
		console.log(table.toString());

		orderPrompt(INVENTORY);		 
	});	
}

function orderPrompt(inventory)
{	
	INQUIRER.prompt([
		{
			type: "input",
			message: "Please Enter the ID of product to purchase.",
			name: "id",
			filter: id => parseInt(id), 
			validate: id => ((inventory.filter(e => e.item_id == id)).length > 0) ?true : console.log("\n There is no ID of", id, "Please Enter ID From Table.")
		}
	
	]).then((data) => {

		let id = data.id;
			
		
		let product = inventory.filter(e => e.item_id == id)[0]
		
		let productQuantity = product.stock_quantity;  

		if (productQuantity == 0)
		{
			console.log("\nSorry", product.product_name, "Is OUT OF STOCK.");

			INQUIRER.prompt([
				{
					type: "confirm",
					message: "Would You Like To Purchase Another Item?",
					name: "confirm"
				}	

				]).then(function(answer){

				if(answer.confirm)
				{
					orderPrompt(inventory);
				}
				else
				{ 
					
					console.log("\nGOODBYE!");
					CONNECTION.end();
				}
			})
		}			
		else
		{	
			INQUIRER.prompt([			
				{
					type: "input",
					message: "Please Enter Quantity:",
					name: "orderQuantity",
					filter: q => parseInt(q), 
					validate: q => (q > 0 && q <= productQuantity) ?true : console.log("\n\nSorry, Quantity Must Be Between 1 -" , productQuantity)
				}
				]).then(function(quantity){

					updateInventory(product, quantity.orderQuantity);			
				});
		}		
	});
} 
function updateInventory(product, orderQuantity)
{		
	
	let totalPrice =  (product.price * orderQuantity).toFixed(2);

	let updateValues = [orderQuantity, totalPrice, totalPrice, product.item_id, product.department_name];

	let query = 'UPDATE products p, departments d  SET p.stock_quantity=stock_quantity-?, p.product_sales=product_sales+?,'
	+ ' d.total_sales=total_sales+? WHERE p.item_id=? AND d.department_name=?' ;
	
	CONNECTION.query(query, updateValues, function (error, results, fields) {	
		if (error) throw error;
		
		console.log("\nThank You For Your Order Of " + orderQuantity + " " + product.product_name + "(s)." );
		console.log("Total Price: $", totalPrice, "\n");
		
		INQUIRER.prompt([
			{
				type: "confirm",
				message: "Would You Like To Purchase Another Item?",
				name: "confirm"
			}	

		]).then(function(answer){

			if(answer.confirm)
			{
				displayProducts();
			}
			else
			{ 
			
				console.log("\nGOODBYE!");
				CONNECTION.end();
			}
		})
	});
	
}
start();

