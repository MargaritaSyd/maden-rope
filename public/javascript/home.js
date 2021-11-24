let searchBar = document.getElementById('searchBar');


searchBar.addEventListener('change', function(){

    fetch('http://localhost:3000/api/products')
    .then(function(respuesta){
        return respuesta.json();
    })
    .then(function(data){
        let product = data.products
        function linkSearchBar(product){
            let a = document.createElement('a');
            a.href = "'http://localhost:3000/api/products'"
            a.textContent = product;
            return a;
        }
        for(let i=0; i<product.length; i++){
            if(searchBar.value == product[i].name){
            searchBar.appendChild(linkSearchBar(product[i].name))
            };
            
            }
        //    (console.log(product[i].name)

        
        
    })
    
    
})
