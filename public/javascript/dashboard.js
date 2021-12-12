
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

    let input= document.createElement('input');
    input.type = 'hidden';
   // input.value = item.collection_id;
    input.name = "delivered"
    input.id = "inputActive";


    let button = document.createElement('button');
    button.textContent = 'Entregado';
    button.type = "submit"
    button.className = "btn btn-primary";
    button.id = item.collection_id


    div.append(pMerchant);
    div.append(pPaymentId);
    div.append(pUserMail);
    div.append(pUserAdress);
    div.append(input);
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
        let delivered = document.getElementById(sale.collection_id);
        let input = document.getElementById("inputActive")
        delivered.addEventListener("click" , function(e){
                 input.value = delivered.id
            //     window.location.reload();
        })
     //   itemToDeliver.appendChild(addMerchantOrderId(sale.merchant_order_id));

    } else { 
        itemDelivered.appendChild(addDivDelivered(sale)) 
    }
   // nameSale.innerHTML += sale.collection_id   
    }
    
})
/*
fetch("http://localhost:8000/api/sales")
.then(function(r){
    return r.json();
})
.then(function(data){
    for( sale of data.sales){
    let delivered = document.getElementById(sale.collection_id);
    
    delivered.addEventListener("click" , function(e){
             e.preventDefault();
            //let items = data.sales
            alert(sale.collection_id)
            //let submitItem = items.filter((item) => item.collection_id != idItem)
            // let idName = parseCartList[i].productName;
            // let removeItem = parseCartList.filter((item) => item.productName != idName);
            //  localStorage.setItem("cartList" , JSON.stringify(removeItem))
            //  window.location.reload();


             
    })
 
}
})
*/