let searchBar = document.getElementById('searchBar')

searchBar.addEventListener('click', function(){

    fetch('http://localhost:3000/api/products')
    .then(function(respuesta){
        return respuesta.json();
    })
    .then(function(data){
        let product = data.products
        for(let i=o; i<product.length; i++){
            console.log('alg')
        }
        
    })
    
    
})
