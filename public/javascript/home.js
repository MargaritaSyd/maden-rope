window.addEventListener("load" , function(){


    let fav = document.getElementById("fav");
        fav.style.display  = "none"
    // fav.addEventListener("load" , )

     let notFav = document.getElementById("notFav")

     notFav.addEventListener("click" , function(){
     notFav.style.display = "none"
     fav.style.display = "inline"
     })
    

})