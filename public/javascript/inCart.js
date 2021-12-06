        
  
        let cart = document.querySelector("#cart");
        //let inCart = document.getElementById("inCart");
        let productCase = {
            productName: document.querySelector("#productName").innerHTML,
        };
        
        let parseCartList = JSON.parse(localStorage.getItem("cartList"));   
    
        let cartButton = parseCartList.some(product => product.productName === productCase.productName);
        
        switch (cartButton){
            case true:
                cart.style.display = "none"
                break;
            // case false:
            //     cart.style.color = "blue"
            //     break;
           
        }
   