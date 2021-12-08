//const { shoppingRecord } = require("../../src/controller/indexController");

window.addEventListener("load" , function(){

    
   // localStorage.clear()
    let params = new URLSearchParams(document.location.search);
    let collection_status = params.get("collection_status"); 
    if(collection_status == "approved"){

         if(localStorage.getItem("shopingRecord") == null){
             localStorage.setItem("shopingRecord" , localStorage.getItem("cartList"))
             localStorage.removeItem("cartList")
         } else {
             let parseShopingRecord = JSON.parse(localStorage.getItem("shopingRecord"));
             let parseCartList = JSON.parse(localStorage.getItem("cartList"));
             for(let i=0; i<parseCartList.length; i++) {
                parseShopingRecord.push(parseCartList[i])
                localStorage.setItem("shopingRecord" , JSON.stringify(parseShopingRecord))
                localStorage.removeItem("cartList")
             }
        }
    }
          
    

    function addProductName(item){
        let p = document.createElement('p');
        p.className = "cart-product-name"
        p.textContent = item;
 
         return p;
     };

     function addProductImg(item){
        let img = document.createElement('img');
        img.src = item.imgProduct;
        img.className="card-img-top"
        return img
    }

    function addAHref(item){
        let a = document.createElement("a");
        a.textContent = "ver producto"
        a.href = "http://localhost:8000/detail/" + item.productId
        return a
    }


    
    theShoppingRecord = this.document.getElementById("theShoppingRecord");
    noShoppingRecord = this.document.getElementById("noShoppingRecord");    
    let parseShoppingRecord = JSON.parse(localStorage.getItem("shopingRecord"));
    let shoppingRecordName = document.getElementById("shoppingRecordName");

    if(!localStorage.getItem("shopingRecord")){
        theShoppingRecord.style.display = "none"
    } else {

        noShoppingRecord.style.display ="none"
    
      
    for(let i=0; i<parseShoppingRecord.length; i++){
        
        shoppingRecordName.appendChild(addProductName(parseShoppingRecord[i].productName));

        shoppingRecordName.appendChild(addProductImg(parseShoppingRecord[i]));
        
        shoppingRecordName.appendChild(addAHref(parseShoppingRecord[i]));
    };

}
})