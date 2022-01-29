window.addEventListener("load" , function(){
    let carouselClick = document.getElementById("carouselClick")
    let carouselClick2 = document.getElementById("carouselClick2")
    carouselClick2.style.display = "none"
    let carouselClick3 = document.getElementById("carouselClick3")
    carouselClick3.style.display = "none"
    let carouselClick4 = document.getElementById("carouselClick4")
    carouselClick4.style.display = "none"
    let carouselClick5 = document.getElementById("carouselClick5")
    carouselClick5.style.display = "none"
    

//carousel cabaña

    carouselClick.addEventListener("click" , function(){
        carouselClick.style.display = "none"
        carouselClick2.style.display = "inline"  
      
    })
    carouselClick2.addEventListener("click" , function(){
        carouselClick.style.display = "none"
        carouselClick2.style.display = "none"  
        carouselClick3.style.display = "inline"
   
    })
    carouselClick3.addEventListener("click" , function(){
        carouselClick4.style.display = "inline"
        carouselClick.style.display = "none"
        carouselClick2.style.display = "none"  
        carouselClick3.style.display = "none" 
   
    })
    carouselClick4.addEventListener("click" , function(){
        carouselClick5.style.display = "inline"
        carouselClick2.style.display = "none"  
        carouselClick3.style.display = "none" 
        carouselClick4.style.display = "none"
        carouselClick.style.display = "none"
       
    })
    carouselClick5.addEventListener("click" , function(){
        carouselClick.style.display = "inline"
        carouselClick2.style.display = "none"  
        carouselClick3.style.display = "none" 
        carouselClick4.style.display = "none"
        carouselClick5.style.display = "none"
       
    })
//carousel instalaciones:

let instalacionesClick = document.getElementById("instalacionesClick")
let instalacionesClick2 = document.getElementById("instalacionesClick2")
instalacionesClick2.style.display = "none"
let instalacionesClick3 = document.getElementById("instalacionesClick3")
instalacionesClick3.style.display = "none"
let instalacionesClick4 = document.getElementById("instalacionesClick4")
instalacionesClick4.style.display = "none"
let instalacionesClick5 = document.getElementById("instalacionesClick5")
instalacionesClick5.style.display = "none"
let instalacionesClick6 = document.getElementById("instalacionesClick6")
instalacionesClick6.style.display = "none"

    instalacionesClick.addEventListener("click" , function(){
        instalacionesClick.style.display = "none"
        instalacionesClick2.style.display = "inline"  
      
    })
    instalacionesClick2.addEventListener("click" , function(){
        instalacionesClick.style.display = "none"
        instalacionesClick2.style.display = "none"  
        instalacionesClick3.style.display = "inline"
   
    })
    instalacionesClick3.addEventListener("click" , function(){
        instalacionesClick4.style.display = "inline"
        instalacionesClick.style.display = "none"
        instalacionesClick2.style.display = "none"  
        instalacionesClick3.style.display = "none" 
   
    })
    instalacionesClick4.addEventListener("click" , function(){
        instalacionesClick5.style.display = "inline"
        instalacionesClick2.style.display = "none"  
        instalacionesClick3.style.display = "none" 
        instalacionesClick4.style.display = "none"
        instalacionesClick.style.display = "none"
       
    })
    instalacionesClick5.addEventListener("click" , function(){
        instalacionesClick6.style.display = "inline"
        instalacionesClick.style.display = "none"
        instalacionesClick2.style.display = "none"  
        instalacionesClick3.style.display = "none" 
        instalacionesClick4.style.display = "none"
        instalacionesClick5.style.display = "none"
       
    })

    instalacionesClick6.addEventListener("click" , function(){
        instalacionesClick.style.display = "inline"
        instalacionesClick2.style.display = "none"  
        instalacionesClick3.style.display = "none" 
        instalacionesClick4.style.display = "none"
        instalacionesClick5.style.display = "none"
        instalacionesClick6.style.display = "none"
        
       
    })

 

})