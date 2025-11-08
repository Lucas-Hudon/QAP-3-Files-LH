window.addEventListener("DOMContentLoaded", function () {

    // Script to pull info out of local data and put it in the table
    const list = document.getElementById("list");
    const storedData = localStorage.getItem("orders");

    if (storedData) {
        const data = JSON.parse(storedData);

        data.forEach(item => {
            const row = document.createElement("tr");

            const mainCell = document.createElement("td");
            mainCell.textContent = item.main;
            row.appendChild(mainCell);

            const sideCell = document.createElement("td");
            sideCell.textContent = item.side;
            row.appendChild(sideCell);

            const drinkCell = document.createElement("td");
            drinkCell.textContent = item.drink;
            row.appendChild(drinkCell);

            list.appendChild(row)
        })
    }

    // Script to take customer information
    class Info{
        constructor(n, p, d) {
            this.name = n;
            this.phoneNum = p;
            this.delivery = d;
        }

        addInfoToList(info) {
            if(info.name === "" || info.phoneNum === "" || info.delivery === ""){
                this.showAlert("No fields should be empty", "error");
            } else{
                    this.clearFields();
                }
        }

        clearFields() {
            document.querySelector("#name").value="";
            document.querySelector("#phoneNum").value="";
            document.querySelector("#delivery").value="";
        }

        showAlert(m, c) {
            let p = document.createElement("p");
            p.innerText = m;
            p.id = "box";
            p.className = c;
            document.querySelector("#notification2").appendChild(p);

            setTimeout(function () {
                document.querySelector("#box").remove();
            }, 2000);
        }
    }

    // Script to store info to local storage
    class Store{
        static addOrder(order) {
            let orders = Store.getOrders();

            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));
        }
        static getOrders() {
            let orders;
            if(localStorage.getItem("orders") == null) {
                orders = [];
            } else {
                orders = JSON.parse(localStorage.getItem("orders"));
            }

            return orders;
        }
        static displayOrders() {
            let orders = Store.getOrders();

            orders.forEach(function(order) {
                let objOrder = new Order();
                objOrder.addBookToList(order);
            });
        }

        static addInfo(info) {
            let infos = Store.getInfo();

            infos.push(info);
            localStorage.setItem("infos", JSON.stringify(infos));
        }
        static getInfo() {
            let infos;
            if(localStorage.getItem("infos") == null) {
                infos = [];
            } else {
                infos = JSON.parse(localStorage.getItem("infos"));
            }

            return infos;
        }

        static displayInfos() {
            let infos = Store.getInfo();

            infos.forEach(function(info) {
                let objInfo = new Info();
            });
        }
    }

    let form = this.document.querySelector("#form2");

    form.addEventListener("submit", function (evt) {

        let name = document.querySelector("#name").value;
        let phoneNum = document.querySelector("#phoneNum").value;
        let delivery = document.querySelector("#delivery").value;

        let info = new Info(name,phoneNum,delivery); 
        info.addInfoToList(info);
        Store.addInfo(info);
        info.showAlert("Information successfully updated", "success");

        function clearTable() {
            const tableBody = document.getElementById("list");
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }
        }

        evt.preventDefault();
    })
        

    Store.displayInfos();
});