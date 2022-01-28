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
    
    let domaClick1 = document.getElementById("domaClick1")
    let domaClick2 = document.getElementById("domaClick2")
    domaClick2.style.display = "none"
    let domaClick3 = document.getElementById("domaClick3")
    domaClick3.style.display = "none"
   

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


    
    domaClick1.addEventListener("click" , function(){
        domaClick1.style.display = "none"
        domaClick2.style.display = "inline"  
      
    })
    domaClick2.addEventListener("click" , function(){
        domaClick1.style.display = "none"
        domaClick2.style.display = "none"  
        domaClick3.style.display = "inline"
   
    })
    domaClick3.addEventListener("click" , function(){
        domaClick1.style.display = "inline"
        domaClick2.style.display = "none"  
        domaClick3.style.display = "none" 
   
    })


})