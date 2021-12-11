
let nameSale = document.getElementById("nameSale");

function addDivSale(item){
    let div = document.createElement('div');
    div.className = "card"

    let pMerchant = document.createElement('p');
    pMerchant.textContent = item.merchant_order_id;
    pMerchant.className = "card-title";

    let pPaymentId = document.createElement('p');
    pPaymentId.textContent = item.payment_id;
    pPaymentId.className = "card-text";

    let pUserMail = document.createElement('p');
    pUserMail.textContent = item.user_mail;
    pUserMail.className = "card-text";

    let pUserAdress = document.createElement('p');
    pUserAdress.textContent = item.adress;
    pUserAdress.className = "card-text";

    let button = document.createElement('button');
    button.textContent = 'Entregado';
    button.className = "btn btn-primary";


    div.append(pMerchant);
    div.append(pPaymentId);
    div.append(pUserMail);
    div.append(pUserAdress);
    div.append(button);

    return div

 
}
function addDivDelivered(item){
    let div = document.createElement('div');
    div.className = "card"

    let pMerchant = document.createElement('p');
    pMerchant.textContent = item.merchant_order_id;
    pMerchant.className = "card-title";

    let pPaymentId = document.createElement('p');
    pPaymentId.textContent = item.payment_id;
    pPaymentId.className = "card-text";

    let pUserMail = document.createElement('p');
    pUserMail.textContent = item.user_mail;
    pUserMail.className = "card-text";

    let pUserAdress = document.createElement('p');
    pUserAdress.textContent = item.adress;
    pUserAdress.className = "card-text";


    div.append(pMerchant);
    div.append(pPaymentId);
    div.append(pUserMail);
    div.append(pUserAdress);
   

    return div

 
}


/*
function addMerchantOrderId(item){

    let p = document.createElement('p');
    p.textContent = item;
    p.className = "card-title";

   return p
}
function addPaymentId(item){

    let p = document.createElement('p');
    p.textContent = item;
    p.className = "card-text";

   return p
}
function addUserMail(item){

    let p = document.createElement('p');
    p.textContent = item;
    p.className = "card-text";

   return p
}
function addUserAdress(item){

    let p = document.createElement('p');
    p.textContent = item;
    p.className = "card-text";

   return p
}

function addDeliveredButton(item){

    let button = document.createElement('button');
    button.textContent = 'Entregado';
    button.className = "btn btn-primary";

   return button
}
*/

let itemToDeliver = document.getElementById("itemToDeliver")
let itemDelivered = document.getElementById("itemDelivered")

fetch("http://localhost:8000/api/sales")
.then(function(r){
    return r.json();
})
.then(function(data){
    for( sale of data.sales){
    if(sale.active == 1){
        itemToDeliver.appendChild(addDivSale(sale)) 
     //   itemToDeliver.appendChild(addMerchantOrderId(sale.merchant_order_id));

    } else { 
        itemDelivered.appendChild(addDivDelivered(sale)) 
    }
   // nameSale.innerHTML += sale.collection_id   
    }
    
})
