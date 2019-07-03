# Bamazon Node App

In this activity, I created an Amazon-like storefront using MySQL and JavaScript. 

When the app is launched, a list of products will be displayed including: 

* item_id (unique id for each product)
* product_name (Name of product)
* department_name
* price (cost to customer)
* stock_quantity (how much of the product is available in stores)

![Products List Screenshot](/images/Display1.png)

The app will request an id for the item that the customer wishes to purchase and request the quanitity. 

If the items stock-quantity is more than the amount ordered, the app will display "Good News" and calculate the total owed.

If there are not enough items available, the app will display "Insufficient Quantity" and the product list once more. 
