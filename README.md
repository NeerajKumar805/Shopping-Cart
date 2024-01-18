# Shopping Cart Program

This simple JavaScript program simulates a shopping cart with discount rules, fees, and a receipt generation feature. The program calculates the total amount considering various discounts and fees based on the given scenario.

## Usage

1. Clone the Repository:
   ```bash
   git clone https://github.com/your-username/shopping-cart.git
   ```

2. Navigate to the Project Directory:
   ```bash
   cd shopping-cart
   ```

3. Run the Program:
   Open the `program.js` file in a JavaScript runtime environment, such as Node.js or a browser console.

4. Modify Cart Items:
   Edit the `add_to_cart` calls to customize the items in the cart. Example:
   ```javascript
   cart.add_to_cart("Product A", 8, true);
   cart.add_to_cart("Product B", 12, false);
   ```

5. View Receipt:
   Run the `print_receipt` function to view the generated receipt.
   ```javascript
   cart.print_receipt();
   ```

## Program Structure

- **Product Class:**
  Defines a `Product` class to represent each item in the catalog.

- **ShoppingCart Class:**
  Implements the shopping cart logic, including adding items, applying discounts, calculating fees, and generating a receipt.

- **Discount Rules:**
  Various discount rules are applied based on the provided scenario.

- **Usage Example:**
  An example usage is provided in the code for reference.

## Discount Rules

1. **Flat 10 Discount:**
   Applied if the cart total exceeds $200.

2. **Bulk 5 Discount:**
   Applied if the quantity of any single product exceeds 10 units.

3. **Bulk 10 Discount:**
   Applied if the total quantity exceeds 20 units.

4. **Tiered 50 Discount:**
   Applied if the total quantity exceeds 30 units and any single product quantity is greater than 15.

Note: Only one rule can be applied per purchase, and the most beneficial one for the customer is chosen.

## Fees

- **Gift Wrap Fee:**
  $1 per unit.

- **Shipping Fee:**
  10 units can be packed in one package, and the shipping fee for each package is $5.
