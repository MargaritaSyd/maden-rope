window.addEventListener("load" , function(){
 //localStorage.clear()

    let fav = document.getElementById("fav");
        fav.style.display  = "none"
    // fav.addEventListener("load" , )

     let notFav = document.getElementById("notFav")

     notFav.addEventListener("click" , function(){
     notFav.style.display = "none"
     fav.style.display = "inline"
/*
     let favInfo = {
        favId: window.location.pathname.slice(8),
        favName: document.querySelector("#productName").innerHTML,
        favDescription: document.querySelector("#productDescription").innerHTML,
        favImg: document.querySelector("#detail-img").src,
        favPrice: document.querySelector("#productPrice").innerHTML,
          
        }
       localStorage.setItem("productFav" , JSON.stringify(favInfo))

       let favList = [];
       if(localStorage.getItem("favList") == null){

        if(localStorage.getItem("productFav") != null){
            
            let parseProductFav = JSON.parse(localStorage.getItem("productFav"));
    
            localStorage.removeItem('productFav')

    
            favList.push(parseProductFav)

            localStorage.setItem("favList" , JSON.stringify(favList))
            
            }
        
       } else {

        if(localStorage.getItem("favList") != null){
        let parseProductFav = JSON.parse(localStorage.getItem("productFav"));

        let parseFavList = JSON.parse(localStorage.getItem("favList"));

        localStorage.removeItem('productFav')

       // localStorage.removeItem('favList')

        parseFavList.push(parseProductFav)

        localStorage.setItem("favList" , JSON.stringify(parseCartList))

       }
       }
  */          
     })
    

})