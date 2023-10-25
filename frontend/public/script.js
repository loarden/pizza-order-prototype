const body = document.querySelector("body");
const landingContent = `
<main class="home flex">
    <!-- welcomeContainer -->
    <div class="flex welcomeContainer">
      <h2 class="logoText welcomeText">Pizza</h2>
      <img class="welcomeImg" src='public/img/pizzaSlice.png' alt="">
      <h2 class="logoText welcomeText">delivery</h2>
    </div>
    <!-- end of welcomeContainer -->
  </main>
`;

const navContent = `
<!-- nav -->
<nav class="navBar flex">
  <!-- logo -->
  <div class="logo flex">
    <h2 class="logoText">Pizza</h2>
    <img class="logoImg" src='public/img/pizzaSlice.png' alt="">
    <h2 class="logoText">delivery</h2>
  </div>
  <!-- end of logo -->

  <!-- navMenu -->
  <div class="navMenu">
    <ul class="flex">
      <li onclick="navigateHome()">home</li>
      <li onclick="navigateMyCart()">my cart</li>
      <li onclick="navigateContact()">contact</li>
    </ul>
  </div>
  <!-- end of navMenu -->

  <!-- burgerMenu -->
  <div class="burgerMenu flex">
    <div class="burgerElement"></div>
  </div>
  <!-- end of burgerMenu -->
</nav>
<!-- end of nav -->
`;

function navigateHome() {
  //Array.from = makes an array from the node list. getElementsByClassName gives a node list. Then the forEach runs on the array.//
  Array.from(document.getElementsByClassName("mainContent")).forEach(element => {
    element.classList.add("disappear");
  });  
  document.getElementById("homeContent").classList.remove("disappear");
}

function navigateMyCart() {
  Array.from(document.getElementsByClassName("mainContent")).forEach(element => {
    element.classList.add("disappear");
  });  
  document.getElementById("myCartContent").classList.remove("disappear");
}

function navigateContact() {
  Array.from(document.getElementsByClassName("mainContent")).forEach(element => {
    element.classList.add("disappear");
  });  
  document.getElementById("contactContent").classList.remove("disappear");
}

const homeContent = `
<!-- main -->
  
  <main id="homeContent" class="mainContent flex">

${navContent}

    <!-- sectionCenter -->
    <section class="sectionCenter flex">

    </section>
    <!-- end of sectionCenter -->

    <div class="order-section">
      <p class="your-order-button">Your Order</p>
      <form class="order-form" method="POST">
        <div class="pizza-order">
          <h2 class="empty-cart">Your cart is empty</h2>
        </div>
        <div>
        <div class="input-section">
          <input type="text" name="name" placeholder="Your Name">
          <input type="text" name="zip" placeholder="Your Zip Code">
          <input type="text" name="city" placeholder="Your City">
          <input type="text" name="street" placeholder="Your Street">
          <input type="text" name="house" placeholder="Your House Number">
          <input type="text" name="phone" placeholder="Your Phone Number">
          <input type="email" name="email" placeholder="Your Email Address">
        </div>
        <button>Order</button>
        </div>
      </form>
    </div>
  </main>
  <!-- end of main --> 
    `;

const myCartContent = `
<!-- my cart --> 
<main id="myCartContent" class="mainContent flex">

${navContent}
<!-- WRITE THE MY CART PART HERE --> 
</main>    
<!-- end of my cart --> 
`;
    
// CONTACT PAGE //

const contactContent = `
      <main id="contactContent" class="mainContent flex">
        <!-- contactContainer -->
       
      ${navContent}

      <section class="contactContainer flex">
        <article class="contactText">
          <h2 class="logoText welcomeText">Contact Details:</h2>
          <h2 class="logoText">Phone:</h2>
          <p class="logoText">0123456789</p>
          <h2 class="logoText">Address:</h2>
          <p class="logoText">Kensington Gardens, London W8 4PX, UK</p>
          <h2 class="logoText">Email:</h2>
          <p class="logoText">info@pizzagardens.com</p>
        </article>
        
        <div class="contactInput flex">
          <h2 class="logoText">Get in touch:</h2>  
          <textarea name="" id="" ></textarea>
          <button>Submit</button>
        </div>
       </section>
      
        <!-- end of contactContainer -->
      </main>
    `;

body.insertAdjacentHTML("beforeend", landingContent);

const home = document.querySelector(".home");
const welcomeContainer = document.querySelector(".welcomeContainer");
welcomeContainer.addEventListener("click", () => {
  home.classList.add("disappear");
  body.insertAdjacentHTML("beforeend", homeContent);
  body.insertAdjacentHTML("beforeend", myCartContent);
  body.insertAdjacentHTML("beforeend", contactContent);
  navigateHome();

  const orderElement = document.querySelector(".order-section");
  const formElement = document.querySelector(".order-form");
  const yourOrder = document.querySelector(".your-order-button");
  const main = document.querySelector(".mainContent");
  const homeMenu = document.getElementById("homeMenu");
  const homeContact =
    document.getElementById("homeContact"); /* contact button constant */

  // homeMenu.addEventListener("click", () => {
  //   main.classList.add("disappear");
  //   body.insertAdjacentHTML("beforeend", homeContent);
  // });

  // homeContact.addEventListener("click", () => {
  //   main.classList.add("disappear");
  //   body.insertAdjacentHTML("beforeend", contactContent);
  // });

  const navBtn = document.querySelector(".burgerMenu");
  const navMenu = document.querySelector(".navMenu");
  const img = document.querySelector("img");
  const sectionCenter = document.querySelector(".sectionCenter");
  let priceCounter = 0;

  function pizzaComponent(id, name, price, img, topping) {
    sectionCenter.insertAdjacentHTML(
      "beforeend",
      `<!-- contentContainer -->
      <article class="contentContainer">
        <img src="${img}"alt="">
        <div class="dataContainer flex">
          <div class="descriptionContainer">
            <h3 class="title">${name}</h3>
            <p class="description">${topping}</p>
          </div>
          <h3 class="price">$${price}</h3>
        </div>
        <div class='add-button'>
          <i class="fa-solid fa-cart-shopping pizza${id}"></i>
        </div>
      </article>
        <!-- end of contentContainer -->`
    );
  }

  navBtn.addEventListener("click", () => {
    navMenu.classList.toggle("appear");
  });

  const pizzaArr = [];

  fetch("/data")
    .then((res) => {
      if (res.status !== 200) {
        console.log("Fetch hiba");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      const orderListElement = document.querySelector(".pizza-order");
      const isEmpty = document.querySelector(".empty-cart");

      data.forEach((element) => {
        pizzaComponent(
          element.id,
          element.name,
          element.price,
          element.img,
          element.topping
        );

        document
          .querySelector(`.fa-solid.pizza${element.id}`)
          .addEventListener("click", () => {
            orderListElement.insertAdjacentHTML(
              "afterbegin",
              `
          <div class='items-section item${element.id}'>
            <div>
              <input type='button' class='less' value='-'>
              <input type='text' name='quantity' value=1>
              <input type='button' class='more' value='+'>
            </div>
            <h3 class="pizzaName">${element.name}</h3>
            <p class="pizzaPrice">$${element.price}</p>
            </div>
            `
            );

            let itemPrice = 0;

            const amount = document.querySelector(`input[name='quantity']`);

            const elementPrice = document.querySelector(".items-section > p");

            const actualPizza = {
              name: element.name,
              quantity: 1,
              price: 0,
            };
            document.querySelector(".less").addEventListener("click", () => {
              amount.value--;
              itemPrice = element.price * amount.value;
              console.log(itemPrice);
              elementPrice.innerHTML = `$${itemPrice}`;
              if (amount.value < 1) {
                document.querySelector(`.item${element.id}`).remove();
              }
              actualPizza.quantity = amount.value;
              actualPizza.price = itemPrice;
              console.log(actualPizza.price);
              console.log(actualPizza.quantity);
              console.log(actualPizza);
            });

            document.querySelector(".more").addEventListener("click", () => {
              amount.value++;
              itemPrice = element.price * amount.value;
              console.log(itemPrice);
              elementPrice.innerHTML = `$${itemPrice}`;
              actualPizza.quantity = amount.value;
              actualPizza.price = itemPrice;
              console.log(actualPizza.price);
              console.log(actualPizza.quantity);
              console.log(actualPizza);
            });

            if (orderListElement !== null) {
              isEmpty.remove();
            }

            const pizzaNameCount = pizzaArr.push(actualPizza);
          });
        
      });
      const date = new Date();
        const orderDate = date.toLocaleDateString("en-ca");
        const orderForm = document.querySelector(".order-form");
        orderForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const orderData = {
            pizzaData: {
              pizzaName: pizzaArr,
            },
            customerData: {
              name: document.querySelector(`input[name="name"]`).value,
              city: document.querySelector(`input[name="city"]`).value,
              houseNumber: document.querySelector(`input[name="house"]`).value,
              email: document.querySelector(`input[name="email"]`).value,
              zipCode: document.querySelector(`input[name="zip"]`).value,
              street: document.querySelector(`input[name="street"]`).value,
              phoneNumber: document.querySelector(`input[name="phone"]`).value,
            },
            date: orderDate,
          };
          // console.log(customerData);
          fetch("/picked", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(orderData),
          });
        });
    });

  yourOrder.addEventListener("click", () => {
    orderElement.classList.toggle("active");
  });
});
