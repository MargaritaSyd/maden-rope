let card1 = document.getElementById("card1");

let divImg1 = document.getElementById("divImg1");

divImg1.addEventListener("mouseover" , function(){
    divImg1.style.display = "none"
    card1.style.display = "inline"
})

card1.addEventListener("mouseover" , function(){
    card1.style.display = "none"
    divImg1.style.display = "inline"
})

