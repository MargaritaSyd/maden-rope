window.addEventListener("load" , function(){

//localStorage.clear()
let clickFav = document.getElementById("clickFav");

clickFav.style.color = "#6AA2A3"

//Agregar producto favorito
        function addDivFav(item){
           let div = document.createElement("div");
           
           div.className = "conteiner-fav"
//contenedor de cada producto:           
           let divCard = document.createElement("div");
           divCard.className = "divCard"
//imagen:
           let img = document.createElement("img")
           img.src = item.favImg;
           img.className = "imgFav"
//titulo de producto:
         //  let p = document.createElement("p");
         //  p.className = "favs-title"
         //  p.textContent = item.favName;
//Agregar a carrito:
         //  let button = document.createElement('button');
         //  button.textContent = "Agregar al carrito"
         //  button.className = "btn btn-primary"
         //  button.style.width = "100px"
           div.append(divCard); 
           divCard.append(img);
           //divCard.append(p)
           //divCard.append(button)
           return div

        }
// Si no hay productos favoritos:
//  function addDivNoFav(){
//            let div = document.createElement("div");
//            div.className = "card"
//            div.style.width = "30%"
//            let p = document.createElement("p");
//            p.className = "card-title"
//            p.textContent = "No tienes favoritos";
            
//            div.append(p)
//            return div

//         }

//Evento click favs

let parseFavList = JSON.parse(localStorage.getItem("favList"));

if(localStorage.getItem("favList") != null){
    
clickFav.addEventListener('click' , function(){

    
    for(i of parseFavList){
                
            clickFav.appendChild(addDivFav(i));
            }
        
    //        for (i of parseFavList){
      //          clickFav.appendChild(addDivFav(i));
            
            })
        }
        //             for(let i=0; i<parseFavList.length; i++){
        
        //             clickFav.appendChild(addDivFav(parseFavList[i]));
            
        //             };

        //}
    //})

        // clickFav.addEventListener("click" , function(){
        //     if(clickFav.style.color == "#6AA2A3"){
        //     if(localStorage.getItem("favList") != null){
        //         clickFav.style.color = "red"
            
        
        //         let parseFavList = JSON.parse(localStorage.getItem("favList"));
        //             for(let i=0; i<parseFavList.length; i++){
        
        //             clickFav.appendChild(addDivFav(parseFavList[i]));
            
        //             };
                
            
        //     } else {
        //         clickFav.style.color = "blue"
        //         clickFav.appendChild(addDivNoFav());
            
        //     }
        // } else {
        //     window.location.reload()
        //     }
    
//})

})