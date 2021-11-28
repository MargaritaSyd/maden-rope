
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

let nameProductCart = document.querySelector("#nameProductCart");

let inputsProduct = document.querySelector("#inputsProduct")

let quantity = document.querySelector('#quantity')

if(localStorage.getItem("cartList") != null){

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
    
/*
        let inputPrice = document.createElement('input');
        inputPrice.type = "hidden";
        inputPrice.value = item;
        inputPrice.name = 'price';

        let inputQuantity = document.createElement('input');
        inputQuantity.type = "number";
        inputQuantity.value = 1;
        inputQuantity.name = 'quantity';

        let inputs = {inputName, inputPrice ,inputQuantity}
*/

        return inputName
    }

    function addProductDescription(item){
    
        let p = document.createElement('p');
        p.className = "cart-product-description"
        p.textContent = item;
        return p;
    };

    // function addProductDescriptionInput(item){
    //     let input = document.createElement('input');
    //     input.type = "hidden";
    //     input.value = item;
    //     input.name = 'Description';

    //     return input
    // };

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

     function addDeleteButton(){
         let button = document.createElement('button');
         button.className = 'btn btn-primary';
         button.id = "remove"
         button.textContent = "Borrar item"

         return button
     };
/*
     function addForm(item){
         let form = document.createElement('form');
         form.action = "/checkout";
         form.method = "POST"
         form.type = "hidden"
         form.className = "submitForm"

         const inputName = document.createElement('input');

         inputName.type = "hidden";
         inputName.value = item.productName;
         inputName.name = 'name';

         
        const input = document.createElement('input');
        input.type = "hidden";
        input.value = item.productPrice;
        input.name = 'price';

        // const submit = document.createElement('button');
        // submit.type = "submit";
        // submit.className = "submitForm"
        
       


         form.append(inputName)
         
         form.append(input)

         //form.append(submit)

         

         return form
     }
*/
    let parseCartList = JSON.parse(localStorage.getItem("cartList"));

    function Object (title, unit_price, quantity) {
        this.title = title;
        this.unit_price = unit_price;
        this.quantity = quantity;
    };

    let items = [];

   
    for(let i=0; i<parseCartList.length; i++){
        
        nameProductCart.appendChild(addProductName(parseCartList[i].productName));
        nameProductCart.appendChild(addProductImg(parseCartList[i].productImg));
        nameProductCart.appendChild(addProductDescription(parseCartList[i].productDescription));
        nameProductCart.appendChild(addProductPrice(parseCartList[i].productPrice));
        nameProductCart.appendChild(addProductQuantityInput(quantity));
        nameProductCart.appendChild(addDeleteButton());
      //  nameProductCart.appendChild(addForm(parseCartList[i]));

        inputsProduct.appendChild(addProductNameInput(parseCartList[i].productName));
        inputsProduct.appendChild(addProductPriceInput(parseCartList[i].productPrice));
       
      //  items.push( new Object (parseCartList[i].productName , parseInt(parseCartList[i].productPrice) , 1));
    
        
    };
    let submit = document.getElementById('submit');
      
      let submitForm = document.getElementById('submitForm');
    //   submit.addEventListener('click' , function(e){
    //     //   e.preventDefault();
    //     //   console.log(items)
    //        submit(items)
    //   })       
      
      

    

    //    function submitForms(){
    //     let submitForm = document.getElementsByClassName("submitForm")
    //     submitForm.submit()
    //    }
    // let products = req.body

    // function Object(title, unit_price, quantity) {
    //     this.title = title;
    //     this.unit_price = unit_price;
    //     this.quantity = quantity;
    // }

    // let items = [];

    
    // items.push( new Object (req.body.name , parseInt(req.body.price) , parseInt(req.body.quantity)))
    


}


// mercadopago.preferences.create(preference)
// .then(function(response){
//     res.redirect(response.body.init_point);
// })
// .catch(function(e){
//     console.log(e)
// })