let searchIcon = document.getElementById("searchIcon");
let searchInput = document.getElementById("searchInput");
let searchA = document.getElementById("searchA")

searchA.addEventListener("click" , function(){
   
    searchA.href ="#" + searchInput.value 
})



 searchInput.addEventListener('keypress', function (e) {
//    let searchA = document.getElementById("searchA")

     if (e.key === 'Enter') {
        //let searchA = document.getElementById("searchA")
         alert(searchInput.value)
       //searchA.href ="#" + searchInput.value 
  //     searchA.href ="#1"
     
     }

 })


 function addDivProduct(item){
    let div = document.createElement('div');
    div.className = "card";
    div.style.width = "15rem";
    div.id = item.name
    

    //div.textContent = item.name

    let img = document.createElement('img');
    if(item.image_product == "localhost:8000/img/productImages/null"){
        img.src="/img/logo.jpg"
    } else if (item.image_product != "localhost:8000/img/productImages/ "){
        img.src="/img/logo.jpg"
    } else {
        img.src = item.image_product;
    }
    img.className = "card-img-top";
    img.id = item.id

    
    let img1 = document.createElement('img');
    if(item.image_product_1 == "localhost:8000/img/productImages/null"){
        img1.src="/img/logo.jpg"
    } else if (item.image_product_1 != "localhost:8000/img/productImages/ "){
        img1.src="/img/logo.jpg"
    } else {
        img1.src = item.image_product_1;
    }
    img1.className = "card-img-top";
    img1.id = item.id + "1"
    img1.style.display = "none"

    

    let img2 = document.createElement('img');
    if(item.image_product_2 == "localhost:8000/img/productImages/null"){
        img2.src="/img/logo.jpg"
    } else if (item.image_product_2 != "localhost:8000/img/productImages/ "){
        img2.src="/img/logo.jpg"
    } else {
        img2.src = item.image_product_2;
    }
    img2.className = "card-img-top";
    img2.id = item.id + "3"
    img2.style.display = "none"

    

    let img3 = document.createElement('img');
    if(item.image_product_3 == "localhost:8000/img/productImages/null"){
        img3.src="/img/logo.jpg"
    } else if (item.image_product_3 != "localhost:8000/img/productImages/ "){
        img3.src="/img/logo.jpg"
    } else {
        img3.src = item.image_product_3;
    }
    img3.className = "card-img-top";
    img3.id = item.id + "3"
    img3.style.display = "none"

       
    let secondDiv = document.createElement("div");
    secondDiv.className = "card-body"

    let a = document.createElement("a");
    a.href = "/detail/" + item.id
   
    let h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = item.name

    let p = document.createElement("p")
    p.className ="card-text"
    p.textContent = item.id

    let pPrice = document.createElement("p")
    pPrice.className ="card-text"
    pPrice.textContent = item.price

    let aEdit = document.createElement("a");
    aEdit.href ="/edit/" +item.id
    aEdit.className = "btn btn-primary"
    aEdit.textContent = "Editar producto"

/*
                    <a href="/edit/<%=productosC3[i].id%>" class="btn btn-primary">Editar producto</a>

                    */
    a.append(h5);
    secondDiv.append(a);
    // secondDiv.append(p);
    // secondDiv.append(pPrice);
    // secondDiv.append(aEdit);
  
    div.append(img)
    div.append(img1)
    div.append(img2)
    div.append(img3)
    div.append(secondDiv)
    div.append(p);
    div.append(pPrice);
    div.append(aEdit);
  
    return div
 }

let categoryBozales = document.getElementById("categoryBozales")
let categoryRiendas = document.getElementById("categoryRiendas")
let categoryAccesorios = document.getElementById("categoryAccesorios")
fetch("http://localhost:8000/api/products")
.then(function(r){
    return r.json();
})
.then(function(data){
    for( product of data.products){
        if(product.id_category == 1){
            categoryBozales.appendChild(addDivProduct(product)) 
       
        } else if(product.id_category == 2){ 
            categoryRiendas.appendChild(addDivProduct(product)) 
        } else {
            categoryAccesorios.appendChild(addDivProduct(product))
        }
    }
})
    /*
    for( product of data.products){
    if(product.id_category == 1){
        alert("Bozales");
     //   categoryBozales.appendChild(addDivProduct(product)) 
       // let delivered = document.getElementById(sale.collection_id);
       // let input = document.getElementById("inputActive")
       // delivered.addEventListener("click" , function(e){
        //         input.value = delivered.id
            //     window.location.reload();
        //})
     //   itemToDeliver.appendChild(addMerchantOrderId(sale.merchant_order_id));

    } else if(product.id_category == 2){ 
        alert("Riendas");
     //   categoryRiendas.appendChild(addDivProduct(product)) 
    } else {
        alert("accesorios");
     //   ategoryAccesorios.appendChild(addDivProduct(product))
    }
   // nameSale.innerHTML += sale.collection_id   
    }
  */ 
