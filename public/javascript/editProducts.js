

 let allProductsPrices = document.getElementById("allProductsPrices")
 let inputPrices = document.getElementById("inputPrices")
 let inputThePrice = document.getElementById("inputThePrice").value

 allProductsPrices.addEventListener("click", function(){
     let prices = prompt("numero")
     if(prices){
         alert("ok")
        //inputPrices.value = inputThePrice * prices/100
     }
 })