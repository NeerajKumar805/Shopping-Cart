class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class ShoppingCart {
  constructor() {
    this.products = {
      "Product A": new Product("Product A", 20),
      "Product B": new Product("Product B", 40),
      "Product C": new Product("Product C", 50),
    };
    this.cart = {};
    this.rules = {
      flat_10_discount: this.flat_10_discount.bind(this),
      bulk_5_discount: this.bulk_5_discount.bind(this),
      bulk_10_discount: this.bulk_10_discount.bind(this),
      tiered_50_discount: this.tiered_50_discount.bind(this),
    };
    this.discountApplied = null;
    this.subtotal = 0;
    this.totalQuantity = 0;
    this.shippingFee = 0;
    this.giftWrapFee = 1;
  }

  add_to_cart(productName, quantity, isGiftWrapped) {
    const product = this.products[productName];
    let totalAmount = quantity * product.price;
    if (isGiftWrapped) {
      totalAmount += this.giftWrapFee * quantity;
    }

    this.cart[productName] = { quantity, totalAmount };
    this.subtotal += totalAmount;
    this.totalQuantity += quantity;
  }

  apply_discount() {
    for (const [ruleName, ruleFunc] of Object.entries(this.rules)) {
      const discountAmount = ruleFunc();
      if (discountAmount) {
        if (!this.discountApplied || discountAmount > this.discountApplied[1]) {
          this.discountApplied = [ruleName, discountAmount];
        }
      }
    }
  }

  flat_10_discount() {
    return this.subtotal > 200 ? 10 : 0;
  }

  bulk_5_discount() {
    for (const [productName, productData] of Object.entries(this.cart)) {
      if (productData.quantity > 10) {
        return productData.totalAmount * 0.05;
      }
    }
    return 0;
  }

  bulk_10_discount() {
    return this.totalQuantity > 20 ? this.subtotal * 0.1 : 0;
  }

  tiered_50_discount() {
    if (this.totalQuantity > 30) {
      for (const [productName, productData] of Object.entries(this.cart)) {
        if (productData.quantity > 15) {
          return productData.totalAmount * 0.5;
        }
      }
    }
    return 0;
  }

  calculate_shipping_fee() {
    this.shippingFee = Math.floor(this.totalQuantity / 10) * 5;
  }

  print_receipt() {
  for (const [productName, productData] of Object.entries(this.cart)) {
    console.log(`Product: ${productName}, Quantity: ${productData.quantity}, Total Amount: $${productData.totalAmount}`);
  }

  console.log(`\nSubtotal: $${this.subtotal}`);
  this.apply_discount();

  if (this.discountApplied) {
    console.log(`Discount Applied (${this.discountApplied[0]}): $${this.discountApplied[1]}`);
  }

  this.calculate_shipping_fee();
  console.log(`Shipping Fee: $${this.shippingFee}`);
  console.log(`Gift Wrap Fee: $${this.giftWrapFee * this.totalQuantity}`);
  console.log(`Total: $${this.subtotal - this.discountApplied[1] + this.shippingFee + this.giftWrapFee * this.totalQuantity}`);
}

}

// Example usage
const cart = new ShoppingCart();
cart.add_to_cart("Product A", 8, true);
cart.add_to_cart("Product B", 12, false);
cart.print_receipt();