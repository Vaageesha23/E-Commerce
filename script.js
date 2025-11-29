let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
} catch (e) {
  console.warn("Couldn't parse cart from localStorage, starting fresh.", e);
  cart = [];
}

// Add item
function addtocart(name, price) {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    alert("Invalid price for " + name);
    return;
  }
  let user = localStorage.getItem("loginUser");
  if(!user){
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  cart.push({ name, price: numericPrice });
  localStorage.setItem("cart", JSON.stringify(cart));

  // Show correct product name in alert
  alert(name + " added to cart!");

  showCart();
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Show cart
function showCart() {
  const box = document.getElementById("cart-items");
  if (!box) return;

  let total = 0;
  box.innerHTML = "";

  cart.forEach((item, index) => {
    box.innerHTML += `
      <p>
        ${item.name} - ₹${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
      </p>
    `;
    total += item.price;
  });

  document.getElementById("total").innerText = "Total: ₹" + total.toFixed(2);
}

showCart();