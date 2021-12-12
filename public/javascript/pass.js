let viewPass = document.getElementById("viewPass")
let viewPassNot = document.getElementById("viewPassNot")
let password = document.getElementById("password")

viewPassNot.style.display = "none"

viewPass.addEventListener("click" , function(){
  //  viewPass.style.color = "red"
    viewPass.style.display = "none"
    viewPassNot.style.display = "inline"
    password.type = "text"


})

viewPassNot.addEventListener("click" , function(){
    //viewPassNot.style.color = "red"
    viewPass.style.display = "inline"
    viewPassNot.style.display = "none"
    password.type = "password"
})
