import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CartPage() {
  const [items, setItems] = useState([]);

  const handleCheckout = async () => {
    // Check if there are items in the cart
    if (items.length === 0) {
        alert('The cart is empty. Unable to proceed with checkout.');
        return;
    }

    // Simulate calculating the total purchase amount
    const total = calculateTotal(items);

    try {
        // Simulate processing payment (can be replaced with a real API call)
        await processPayment(total);
        // Clear items from the cart after successful checkout
        setItems([]);
        alert('Checkout successful!');
    } catch (error) {
        // Handle errors during payment processing
        console.error('Error during payment processing:', error);
        alert('An error occurred during checkout. Please try again later.');
    }
};

// Function to calculate the total purchase amount based on items in the cart
const calculateTotal = (items) => {
    let total = 0;
    for (const item of items) {
        total += item.quantity * item.price;
    }
    return total;
};

// Function to simulate payment processing (can be replaced with a real API call)
const processPayment = async (amount) => {
    // Simulate payment processing with a small delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate a successful payment 90% of the time
            if (Math.random() < 0.9) {
                resolve();
            } else {
                reject(new Error('Payment processing failure. Please try again.'));
            }
        }, 2000); // Simulate a 2-second delay for payment processing
    });
};

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCheckout}>Checkout</button>
      <br />
      <Link to="/products">Back to Products</Link>
    </div>
  );
}

export default CartPage;
