window.addEventListener("load" , function(){
    
    if(localStorage.getItem("producto") == null){
        //let cart = document.querySelector("#cart");
        let productName = document.querySelector("#productName").innerHTML
        let productDescription = document.querySelector("#productDescription").innerHTML
        let productImg = document.querySelector("#detail-img").src
       // let productId = req.params.id ????
       let productPrice = document.querySelector("#productPrice").innerHTML
        localStorage.setItem("producto" , productPrice)
    } 
})



cart.addEventListener("click" , function(){
    localStorage.clear()
})