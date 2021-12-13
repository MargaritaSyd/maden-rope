let searchIcon = document.getElementById("searchIcon");
let searchInput = document.getElementById("searchInput");
let searchA = document.getElementById("searchA")

searchA.addEventListener("click" , function(){
   
    searchA.href ="#" + searchInput.value 
})



 searchInput.addEventListener('keypress', function (e) {
//    let searchA = document.getElementById("searchA")

     if (e.key === 'Enter') {
        //let searchA = document.getElementById("searchA")
         alert(searchInput.value)
       //searchA.href ="#" + searchInput.value 
  //     searchA.href ="#1"
     
     }

 })