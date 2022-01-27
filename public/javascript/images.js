
window.addEventListener("load" , function(){
   
  let thumbImg1 = document.getElementById("thumb-img-1");
  let thumbImg1Src = thumbImg1.src;
  let thumbImg2 = document.getElementById("thumb-img-2");
  let thumbImg2Src = thumbImg2.src;
  let thumbImg3 = document.getElementById("thumb-img-3");
  let thumbImg3Src = thumbImg3.src;
  let detailImg = document.getElementById("detail-img");
  let detailImgSrc = detailImg.src;

  let modelo = document.getElementById("modelo")
  modelo.innerHTML = "Modelo A"
  modelo.style.color = "white"

thumbImg1.addEventListener("mouseover" , function(){
  
  if(detailImg.src == thumbImg1Src){
    detailImg.src = detailImgSrc 
    thumbImg1.src = thumbImg1Src
    thumbImg2.src = thumbImg2Src
    thumbImg3.src = thumbImg3Src 
    modelo.innerHTML = "Modelo A"
    

  } else {
  detailImg.src = thumbImg1Src
  thumbImg1.src = detailImgSrc
  thumbImg2.src = thumbImg2Src
  thumbImg3.src = thumbImg3Src
  modelo.innerHTML = "Modelo B"
  }
})

thumbImg2.addEventListener("mouseover" , function(){
  if(detailImg.src == thumbImg2Src){
    detailImg.src = detailImgSrc
    thumbImg2.src = thumbImg2Src
    thumbImg1.src = thumbImg1Src
    thumbImg3.src = thumbImg3Src

    modelo.innerHTML = "Modelo A"
  } else {
  detailImg.src = thumbImg2Src
  thumbImg2.src = detailImgSrc
  thumbImg1.src = thumbImg1Src
  thumbImg3.src = thumbImg3Src
  modelo.innerHTML = "Modelo C"
  }
})
thumbImg3.addEventListener("mouseover" , function(){
  if(detailImg.src == thumbImg3Src){
    detailImg.src = detailImgSrc
    thumbImg3.src = thumbImg3Src
    thumbImg2.src = thumbImg2Src
    thumbImg1.src = thumbImg1Src

    modelo.innerHTML = "Modelo A"
  } else {
  detailImg.src = thumbImg3Src
  thumbImg3.src = detailImgSrc
  thumbImg2.src = thumbImg2Src
  thumbImg1.src = thumbImg1Src

  modelo.innerHTML = "Modelo D"
  }
})

/*
detailImg.addEventListener("mouseover" , function(){
  detailImg.src = detailImgSrc
  thumbImg3.src = thumbImg3Src
  thumbImg2.src = thumbImg2Src
  thumbImg1.src = thumbImg1Src
})
*/
})