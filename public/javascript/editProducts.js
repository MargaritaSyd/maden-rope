

 let allProductsPrices = document.getElementById("allProductsPrices")
 let inputPrices = document.getElementById("inputPrices")
 let inputThePrice = document.getElementById("inputThePrice").value
 let formEditProduct = document.getElementById("formEditProduct")

 allProductsPrices.addEventListener("click", function(){
     let prices = prompt("Aumentar precios en porcentaje")
     if(prices){
        // alert("ok")
        inputPrices.value = prices/=100
        formEditProduct.submit()
        
     }
 })