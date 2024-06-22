JavaScript
const menuList = document.getElementById("menu-list");
const orderList = document.getElementById("order-list");
const orderStatus = document.getElementById("order-status");
const getMenuButton = document.getElementById("get-menu-btn");
const placeOrderButton = document.getElementById("place-order-btn");

const menuScreen = document.getElementById("menu-screen");
const orderScreen = document.getElementById("order-screen");

const menuItems = [
  "Cheeseburger",
  "Bacon Burger",
  "Veggie Burger",
  "Fries",
  "Onion Rings",
  "Drinks",
];

function getMenu() {
  menuList.innerHTML = "";
  menuItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    menuList.appendChild(listItem);
  });
}

function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const selectedBurgers = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * menuItems.length);
        if (menuItems[randomIndex].includes("Burger")) {
          selectedBurgers.push(menuItems[randomIndex]);
        }
      }
      resolve({ order: selectedBurgers });
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

getMenuButton.addEventListener("click", () => {
  getMenu();
  menuScreen.style.display = "none";
  orderScreen.style.display = "block";
});

placeOrderButton.addEventListener("click", async () => {
  try {
    const order = await takeOrder();
    orderList.innerHTML = "";
    order.order.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      orderList.appendChild(listItem);
    });
    orderStatus.textContent = "Order Placed! Preparing your food...";

    const prepStatus = await orderPrep();
    if (prepStatus.order_status) {
      orderStatus.textContent = "Food is ready!";
    }

    const paymentStatus = await payOrder();
    if (paymentStatus.paid) {
      thankyouFnc();
    }
  } catch (error) {
    console.error(error);
    orderStatus.textContent = "An error occurred. Please try again.";
  }
});

function getMenu() {
    fetch('menu.json') // Replace 'menu.json' with your actual JSON file path
      .then(response => response.json())
      .then(data => {
        // Update UI with menu items from data
        const menuList = document.getElementById('menu-list');
        data.forEach(item => {
          const menuItem = document.createElement('li');
          menuItem.textContent = `${item.name} - ${item.price}`;
          menuList.appendChild(menuItem);
        });
      })
      .catch(error => console.error(error));
  }
  function takeOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const menuItems = document.querySelectorAll('#menu-list li');
        const selectedBurgers = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * menuItems.length);
          selectedBurgers.push(menuItems[randomIndex].textContent);
        }
        resolve({ order: selectedBurgers }); // Resolve with randomly chosen burgers
      }, 2500); // Simulate order taking time (2.5 seconds)
    });
  }