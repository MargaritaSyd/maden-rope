window.addEventListener("load" , function(){


let clickFav = document.getElementById("clickFav");

clickFav.style.color = "violet"


        function addDivFav(item){
           let div = document.createElement("div");
           div.className = "card"
           div.style.width = "30%"
           let img = document.createElement("img")
           img.src = item.favImg;
           img.className = "card-img-top"
           let p = document.createElement("p");
           p.className = "card-title"
           p.textContent = item.favName;
           let button = document.createElement('button');
           button.textContent = "Agregar al carrito"
           button.className = "btn btn-primary"
           button.style.width = "90%"
            
           div.append(img);
           div.append(p)
           return div

        }

        clickFav.addEventListener("click" , function(){
            if(clickFav.style.color == "violet"){
            if(localStorage.getItem("favList") != null){
                clickFav.style.color = "red"
            
        
                let parseFavList = JSON.parse(localStorage.getItem("favList"));
                    for(let i=0; i<parseFavList.length; i++){
        
                    clickFav.appendChild(addDivFav(parseFavList[i]));
            
                    };
            
            }
        } else {
            window.location.reload()
            }
    
})
/*
<div class="card" style="width: 30%">
<img src="..." class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <a href="#" class="btn btn-primary" style="width: 90%" >Go somewhere</a>
</div>
</div>
*/
})