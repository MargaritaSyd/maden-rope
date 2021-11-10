/*
let cart = document.querySelector("#cart");
cart.addEventListener("click" , function(){

    let productId=  window.location.pathname.slice(8); 
    let productName = document.querySelector("#productName").innerHTML
    let productDescription = document.querySelector("#productDescription").innerHTML
    let productImg = document.querySelector("#detail-img").src
    let productPrice = document.querySelector("#productPrice").innerHTML
    let productInfo = [productName, productDescription, productImg, productPrice]

       localStorage.setItem("producto" + productId , productInfo)
    
})

window.addEventListener("load" , function(){
    let productCart = []
localStorage.clear()
if(localStorage){
   for(let i=0; i<localStorage.length; i++){
       let productForCart = JSON.parse(localStorage.getItem(localStorage[i]))
       productCart.push(productForCart)
   }
    console.log(productCart)
    } 

})
*/
window.addEventListener("load" , function(){
  //  localStorage.clear()

let cart = document.querySelector("#cart");
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

if(localStorage.getItem("cartList") != null){

    function addProductName(item){
        let p = document.createElement('p');
        p.className = "cart-product-name"
        p.textContent = item;
        return p;
    };

    function addProductDescription(item){
        let p = document.createElement('p');
        p.className = "cart-product-description"
        p.textContent = item;
        return p;
    };

    function addProductPrice(item){
        let p = document.createElement('p');
        p.className = "cart-product-price"
        p.textContent = item;
        return p;
    };

    function addProductImg(imgProduct){
        let img = document.createElement('img');
        img.src = imgProduct;
        return img
    }

    let parseCartList = JSON.parse(localStorage.getItem("cartList"));
    for(let i=0; i<parseCartList.length; i++){
        nameProductCart.appendChild(addProductName(parseCartList[i].productName))
        nameProductCart.appendChild(addProductImg(parseCartList[i].productImg))
        nameProductCart.appendChild(addProductDescription(parseCartList[i].productDescription))
        nameProductCart.appendChild(addProductPrice(parseCartList[i].productPrice))
        
    }
}