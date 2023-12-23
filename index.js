function Bank() {
    this.loginArea = document.getElementById("login-area");
    this.recentLogins = document.getElementById("recent-logins");
    this.dashboard = document.getElementById("dashboard");
    this.userInfo = document.getElementById("message-area");
    this.deposit = document.getElementById("deposit");
    this.withdraw = document.getElementById("withdraw");
    this.balance = document.getElementById("balance");
    this.depositBox = document.getElementById("deposit-box");
    this.withdrawBox = document.getElementById("withdraw-box");
    this.depositInput = document.getElementById("deposit-input");
    this.withdrawInput = document.getElementById("withdraw-input");
    this.depositBtn = document.getElementById("deposit-btn");
    this.withdrawBtn = document.getElementById("withdraw-btn");
    this.submitBtn = document.getElementById("submit-btn");
    this.logoutBtn = document.getElementById("logout-btn");

    this.bankAccounts = [
      { name: "Greta", balance: 200, PIN: 1234 },
      { name: "Alexa", balance: 290, PIN: 1020 },
      { name: "Abigail", balance: 67, PIN: 6789 }
    ];
  
    this.submitBtn.addEventListener("click", () => this.handleLogin());
    this.depositBtn.addEventListener("click", () => this.handleDeposit());
    this.withdrawBtn.addEventListener("click", () => this.handleWithdraw());
    this.logoutBtn.addEventListener("click", () => this.handleLogout());
}

Bank.prototype.handleLogin = function () {
    
    const inputName = document.getElementById("username-input").value;
    const inputPIN = document.getElementById("pin-input").value;

    const account = this.bankAccounts.find(
        account => account.name === inputName && account.PIN == inputPIN
    );
          
    if (account) {
        this.loginArea.style.display = "none";
        this.recentLogins.style.display = "none";
        this.dashboard.style.display = "flex";
        this.displayUserInfo(account);
    } else {
        getError(inputName, inputPIN, this.bankAccounts);
    }
};

Bank.prototype.displayUserInfo = function (cuenta) {
    this.userInfo.innerHTML = "";
    const message = document.createElement("h1");
    message.innerHTML = `Bienvenida a tu cuenta, ${cuenta.name}`;
    this.userInfo.appendChild(message);
    this.balance.innerText = cuenta.balance;
};

Bank.prototype.handleDeposit = function () {
    const value = this.depositInput.value;
    const total = Number(this.balance.innerText) + Number(value);
    if (total <= 990 && value!="" && value>0) {;
        this.depositBox.classList.remove("hidden");
        this.deposit.innerText = value;
        this.balance.innerText = total;
        confetti();     
    } else if (value<0) {
        showErrors("Negative");
    }else if (value!=""){
        showErrors("Deposit");      
    }
    this.depositInput.value = "";  
    setTimeout(()=>{
        this.depositBox.classList.add("hidden");
    }, 6000)
};
  
Bank.prototype.handleWithdraw = function () {
    const value = this.withdrawInput.value;
    const total = Number(this.balance.innerText) - Number(value);
    if (total >= 10 && value!="" && value>0) {
        this.withdrawBox.classList.remove("hidden");
        this.withdraw.innerText = value;
        this.balance.innerText = total;
        confetti();    
    } else if (value<0){
        showErrors("Negative");
    } else if (value!=""){
        showErrors("Withdraw");    
    }
    this.withdrawInput.value = "";
    setTimeout(()=>{
        this.withdrawBox.classList.add("hidden");
    }, 6000)  
};

Bank.prototype.handleLogout = function () {
    this.loginArea.style.display = "flex";
    this.recentLogins.style.display = "flex";
    this.dashboard.style.display = "none";

    const inputName = document.getElementById("username-input").value = "";
    const inputPIN = document.getElementById("pin-input").value = "";
};

function showErrors(tipo){
    let error = document.getElementById(`error${tipo}`)

    error.classList.remove("hidden")
    error.classList.add("error")
    setTimeout(()=>{
        error.classList.remove("error")
        error.classList.add("hidden")
    }, 6000)   
}

function getError(name, pin, array){    
    let nameFound = false;
    let pinFound = false;
    
    for (let i = 0; i < 3; i++) {
        if(array[i].name==name){
            nameFound = true;
        }
        if (array[i].pin==pin) {
            pinFound = true;
        }        
    }
    
    if(name == "" && pin == ""){
        showErrors("Null")   
    } else if (nameFound==false) {
            showErrors("Name")
    } else if (pinFound==false) {
            showErrors("Pin")
        }
}
  
const bank = new Bank();