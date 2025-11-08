window.addEventListener("DOMContentLoaded", function () {

  // Script for the dropdown menu
  const selected = document.querySelector(".selected");
  const sideSelected = document.getElementById("side");
  const drinkSelected = document.getElementById("drink");
  const mainContainer = document.querySelector(".main-container");
  const sideContainer = document.querySelector(".side-container");
  const drinkContainer = document.querySelector(".drink-container");
  const mainOptions = document.querySelectorAll(".main-option");
  const sideOptions = document.querySelectorAll(".side-option");
  const drinkOptions = document.querySelectorAll(".drink-option");

  selected.setAttribute("autocomplete", "off");
  document.querySelector(".selected").readOnly = true;
  sideSelected.setAttribute("autocomplete", "off");
  document.querySelector(".sideSelected").readOnly = true;
  drinkSelected.setAttribute("autocomplete", "off");
  document.querySelector(".drinkSelected").readOnly = true;

  selected.addEventListener("click", () => {
    mainContainer.classList.toggle("active");
  })

  mainOptions.forEach(
    (item)=> item.onclick = ()=> { 
      selected.value = item.innerText;
  });

  sideSelected.addEventListener("click", () => {
    sideContainer.classList.toggle("active");
  })

  sideOptions.forEach(
    (item)=> item.onclick = ()=> {
      sideSelected.value = item.innerText;
  });

  drinkSelected.addEventListener("click", () => {
    drinkContainer.classList.toggle("active");
  })

  drinkOptions.forEach(
    (item)=> item.onclick = ()=> {
      drinkSelected.value = item.innerText;
  });

  // Script to save orders
  class Order {
    constructor(m, s, d) {
      this.main = m;
      this.side = s;
      this.drink = d;
    }

    addOrderToList(order) {
      
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${order.main}</td> <td>${order.side}</td> <td>${order.drink}</td>`;

      this.clearFields();
      
    }

    clearFields() {
      document.querySelector("#main").value = "";
      document.querySelector("#side").value = "";
      document.querySelector("#drink").value = "";
    }

    showAlert(m, c) {
      let p = document.createElement("p");
      p.innerText = m;
      p.id = "box";
      p.className = c;
      document.querySelector("#notification").appendChild(p);

      setTimeout(function () {
        document.querySelector("#box").remove();
      }, 2000);
    }
  }

  //Script to store orders in local storage
  class Store {
    static addOrder(order) {
      let orders = Store.getOrders();

      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
    static getOrders() {
      let orders;
      if (localStorage.getItem("orders") == null) {
        orders = [];
      } else {
        orders = JSON.parse(localStorage.getItem("orders"));
      }

      return orders;
    }
    static displayOrders() {
      let orders = Store.getOrders();

      orders.forEach(function (order) {
        let objOrder = new Order();
        objOrder.addOrderToList(order);
      });
    }
  }

  let form = this.document.querySelector("#form1");

  form.addEventListener("submit", function (evt) {
    let main = document.querySelector("#main").value;
    let side = document.querySelector("#side").value;
    let drink = document.querySelector("#drink").value;

    let order = new Order(main, side, drink);
    order.addOrderToList(order);
    Store.addOrder(order);
    order.showAlert("Successfully added to order!", "success");

    evt.preventDefault();
  });

  Store.displayOrders();
});
