//window.addEventListener("load" , function(){
   // localStorage.clear()

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
if(localStorage){
    for(let i=0; i<localStorage.length; i++){
        //localStorage.getItem(localStorage[i])
        console.log(localStorage)
    }
}
})
