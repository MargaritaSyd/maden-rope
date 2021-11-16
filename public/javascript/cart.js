
window.addEventListener("load" , function(){
  //  localStorage.clear()

let cart = document.querySelector("#cart");
let clear = document.querySelector('#clear')

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
      
    }
       localStorage.setItem("productForCart" , JSON.stringify(productInfo))
    

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

    if(localStorage.getItem("productForCart") != null){
        let parseProductForCart = JSON.parse(localStorage.getItem("productForCart"));
    
        localStorage.removeItem('productForCart')

        let parseCartList = JSON.parse(localStorage.getItem("cartList"));

        parseCartList.push(parseProductForCart)

    localStorage.setItem("cartList" , JSON.stringify(parseCartList))
    }
}

let nameProductCart = document.querySelector("#nameProductCart")

let quantity = document.querySelector('#quantity')

if(localStorage.getItem("cartList") != null){

    function addProductName(item){
       let p = document.createElement('p');
       p.className = "cart-product-name"
       p.textContent = item;

        return p;
    };

    function addProductNameInput(item){
        let input = document.createElement('input');
        input.type = "hidden";
        input.value = item;
        input.name = 'name';

        return input
    }

    function addProductDescription(item){
    
        let p = document.createElement('p');
        p.className = "cart-product-description"
        p.textContent = item;
        return p;
    };

    function addProductDescriptionInput(item){
        let input = document.createElement('input');
        input.type = "hidden";
        input.value = item;
        input.name = 'Description';

        return input
    };

    function addProductPrice(item){
    
        let p = document.createElement('p');
        p.className = "cart-product-price"
        p.textContent = item;
        return p;
    
    };
    function addProductPriceInput(item){
        let input = document.createElement('input');
        input.type = "hidden";
        input.value = item;
        input.name = 'Price';

        return input
    };

    function addProductImg(imgProduct){
        let img = document.createElement('img');
        img.src = imgProduct;
        return img
    }
    
    function addProductQuantityInput(item){
        let input = document.createElement('input');
        input.type = "number";
        input.value = 1;
        input.name = 'quantity';

        return input
    };

    let parseCartList = JSON.parse(localStorage.getItem("cartList"));
    for(let i=0; i<parseCartList.length; i++){
        nameProductCart.appendChild(addProductName(parseCartList[i].productName))
        nameProductCart.appendChild(addProductNameInput(parseCartList[i].productName))
        nameProductCart.appendChild(addProductImg(parseCartList[i].productImg))
        nameProductCart.appendChild(addProductDescription(parseCartList[i].productDescription))
        nameProductCart.appendChild(addProductPrice(parseCartList[i].productPrice))
        nameProductCart.appendChild(addProductPriceInput(parseCartList[i].productPrice))
        nameProductCart.appendChild(addProductQuantityInput(quantity))
        
    }
}