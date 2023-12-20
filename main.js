const form = document.getElementById("form");

const button = document.getElementById("btn-login");

const accounts = [
    {name:"Greta", balance: 200, PIN:3641},
    {name:"Alexa", balance: 290, PIN:1234},
    {name:"Abigail", balance: 67, PIN:8107}
]

function validate(username, pin){
    let verified = false;
    pin = parseInt(pin);

    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].name===username && accounts[i].PIN===pin) {
            verified = true;
            return verified;
        }
    }
    
    return verified;
}

function showErrors(tipo){
    let error = document.getElementById(`error${tipo}`)

    error.classList.remove('hiden')
    error.classList.add('error')
    setTimeout(()=>{
        error.classList.remove('error')
        error.classList.add('hiden')
    }, 4000)   
}


function getError(name, pin){    
    let nameFound = false;
    let pinFound = false;
    
    for (let i = 0; i < accounts.length; i++) {
        if(accounts[i].name==name){
            nameFound = true;
        }
        if (accounts[i].pin==pin) {
            pinFound = true;
        }        
    }
    
    if(name == "" && pin == ""){
        showErrors('Null')   
    } else{
        if (nameFound==false) {
            showErrors("Name")
        }
        if (pinFound==false) {
            showErrors("Pin")
        }
    }
    
}

function replacePage(){
    window.location.replace("logged-account/index.html");
}

form.addEventListener('submit', (evento) => {

    evento.preventDefault();

    let username = document.getElementById('input-username').value;

    let pin = document.getElementById('input-pin').value;

    if(validate(username, pin)==true){
        replacePage();
    } else{
        getError(username, pin);
    }
})