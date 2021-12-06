
window.addEventListener("load" , function(){
    //localStorage.clear()

let cart = document.querySelector("#cart");

//let inCart = document.querySelector("#inCart");
//inCart.style.display = "none"

 
//clear.addEventListener('click' , function(){
//    localStorage.clear()
//})
cart.addEventListener("click" , function(){  
    let productInfo = {
        productId: window.location.pathname.slice(8),
        productName: document.querySelector("#productName").innerHTML,
        productDescription: document.querySelector("#productDescription").innerHTML,
        productImg: document.querySelector("#detail-img").src,
        productPrice: document.querySelector("#productPrice").innerHTML,
        selectedColor: document.getElementById("colorSelected").value
      
    }
       localStorage.setItem("productForCart" , JSON.stringify(productInfo))
    
       window.location.href = "http://localhost:8000/user/cart"
})


})
let cartList = [];

if(localStorage.getItem("cartList") == null){

if(localStorage.getItem("productForCart") != null){
    
    let parseProductForCart = JSON.parse(localStorage.getItem("productForCart"));
    
    localStorage.removeItem('productForCart')

    
    cartList.push(parseProductForCart)

    localStorage.setItem("cartList" , JSON.stringify(cartList))
} 
} else {

    let productDetailName = document.querySelector("#productName").innerHTML;
    let cart = document.querySelector("#cart");
    let inCart = document.getElementById("inCart");

    let parseCartList = JSON.parse(localStorage.getItem("cartList"));   
    for(let i=0; i<parseCartList.length; i++){
    if (parseCartList[i].productName == productDetailName){
       
        alert(productDetailName)
      //  cart.style.display = "none"
      // inCart.style.display = "inline"
    } else {
        alert("hola")
      //
      //  cart.style.display = "inline"
      // inCart.style.display = "none"
    }
    }

    if(localStorage.getItem("productForCart") != null){
        let parseProductForCart = JSON.parse(localStorage.getItem("productForCart"));
     
        localStorage.removeItem('productForCart')

        let parseCartList = JSON.parse(localStorage.getItem("cartList"));

        parseCartList.push(parseProductForCart)

    localStorage.setItem("cartList" , JSON.stringify(parseCartList))
    }
}

let nameProductCart = document.querySelector("#nameProductCart");

let inputsProduct = document.querySelector("#inputsProduct");

let quantity = document.querySelector('#quantity');

let productsInCart = document.getElementById("productsInCart");
let noProductsInCart = document.getElementById("noProductsInCart");

if(localStorage.getItem("cartList") == null){
    productsInCart.style.display = "none"
} else {
    noProductsInCart.style.display = "none"
//if(localStorage.getItem("cartList") != null){

    function addProductName(item){
       let p = document.createElement('p');
       p.className = "cart-product-name"
       p.textContent = item;

        return p;
    };

    
     function addProductNameInput(item){

         let inputName = document.createElement('input');
         inputName.type = "hidden";
         inputName.value = item;
         inputName.name = 'name';

        return inputName
    }

    function addProductDescription(item){
    
        let p = document.createElement('p');
        p.className = "cart-product-description"
        p.textContent = item;
        return p;
    };

    function addProductPrice(item){
    
        let p = document.createElement('p');
        p.className = "cart-product-price"
        p.textContent = "$" + item;
        return p;
    
    };
     function addProductPriceInput(item){
         let input = document.createElement('input');
         input.type = "hidden";
         input.value = item;
         input.name = 'price';
         input.className = item

         return input
     };

    function addProductImg(imgProduct){
        let img = document.createElement('img');
        img.src = imgProduct;
        img.className="card-img-top"
        return img
    }
    
     function addProductQuantityInput(){
         let input = document.createElement('input');
         input.type = "number";
         input.value = 1;
         input.name = 'quantity';
        
        
         return input
     };
     
     

      function addProductColor(item){
    
         let p = document.createElement('p');
         p.className = "cart-product-price"
         p.textContent = "Elegiste el color: " + item;
         return p;
    
     };

     function addDeleteButton(item){
         let button = document.createElement('button');
         button.className = 'btn btn-primary';
         button.id = item
         button.textContent = "Borrar item"

         return button
     };
    let parseCartList = JSON.parse(localStorage.getItem("cartList"));
     let totalPrice = 0
   
    for(let i=0; i<parseCartList.length; i++){
        
        nameProductCart.appendChild(addProductName(parseCartList[i].productName));
        nameProductCart.appendChild(addProductImg(parseCartList[i].productImg));
        nameProductCart.appendChild(addProductDescription(parseCartList[i].productDescription));
        nameProductCart.appendChild(addProductPrice(parseCartList[i].productPrice));
        nameProductCart.appendChild(addProductColor(parseCartList[i].selectedColor));
        nameProductCart.appendChild(addProductQuantityInput(quantity));
        nameProductCart.appendChild(addDeleteButton(parseCartList[i].productName));

        inputsProduct.appendChild(addProductNameInput(parseCartList[i].productName));
        inputsProduct.appendChild(addProductPriceInput(parseCartList[i].productPrice));
       
        totalPrice = totalPrice + parseInt(parseCartList[i].productPrice)
        
    };

    let importeTotal = document.getElementById("importe-total");
    importeTotal.innerHTML = "Tu total hasta ahora: " + totalPrice 

    let clear = document.querySelector('#clear')

    clear.addEventListener("click" , function(){
        localStorage.clear();
        window.location.reload();
    })

    let submit = document.getElementById("submit");
    submit.addEventListener("click" , function(){
        localStorage.clear();
    })

        for(let i=0; i<parseCartList.length; i++){
            let remove = document.getElementById(parseCartList[i].productName);

            remove.addEventListener("click" , function(e){
                     e.preventDefault();
                    
                    let idName = parseCartList[i].productName;
                    let removeItem = parseCartList.filter((item) => item.productName != idName);
                     localStorage.setItem("cartList" , JSON.stringify(removeItem))
                     window.location.reload();


                     
            })
         
        }

        

    
    






}

