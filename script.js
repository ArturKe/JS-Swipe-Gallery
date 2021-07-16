//--------------------------TapGallery----

const glrImg =[
    {link:'./img/g4haiwkwu7jqrhh65c804phjt-q.jpeg', desc:"Image 1 Kabanchiki" },
    {link:'./img/mothman-frank-frazetta.jpg', desc:'Image 2 "Motman" by Frank Frazetta' },
    {link:'./img/The-Art-of-Frank-Frazetta-9.jpeg', desc:"Image 3 Frank Frazetta" },
    {link:'./img/StudioLightTest_21.jpg', desc:"Image 4 Red sphere" }
    
  ]
  let curentStep = 0
  const glr = document.querySelector('.gallery__item')
  const counter = document.querySelector('.gallery__counter')
  glr.addEventListener('click', glrAction)
  glrImgRender()
  // glrCounter()
  glrCheckLength()
  glrCheckUpdate()
  
  
  function glrAction (e){
    if (e.target.classList.contains('item__right')){
      glrForward()
    } else if (e.target.classList.contains('item__left')){
      glrBackward()
    }
  }  // Обрабатывает события, вызывает обновление кадра в зависимости от направления
  
  function glrForward(){
    if (curentStep >= (glrImg.length-1)){
      curentStep = 0
    } else { 
      curentStep++
    } 
    
    glrImgRender()
    // glrCounter()
    glrCheckUpdate()
  } //Обрабатывае событие вперед
  
  function glrBackward(){
    if (curentStep == 0){
      curentStep = glrImg.length-1
    } else { 
      curentStep--
      }
    
    glrImgRender()
    // glrCounter()
    glrCheckUpdate()
  } //Обрабатывае событие назад
  
  function glrImgRender(){
    glr.style.background = `url('${glrImg[curentStep].link}') center/cover no-repeat`
  } //Обновляет изображение
  
  function glrCounter(){
    counter.innerHTML =`<div class="gallery__style"> ${curentStep+1} из ${glrImg.length} </div>`
  } //Обрабатывае значение счетчика
  
  function glrCheckLength(){
    if(glrImg.length <= 5){
      for(let i=0; i < glrImg.length; i++){
        counter.innerHTML +=`<div class="gallery__dots"></div>`
  
      }
    } else {
        glrCounter()
      }
  
    } // Проверяет длинну массива изображений, если меньше 5 отрисовывает точки, если больше цифровой счетчик
  
    function glrCheckUpdate(){
      if(glrImg.length <= 5){
        glrDotsUpdate()
      } else {
        glrCounter()
      }
    }  //Проверяет длинну массива изображений в зависимости от нее вызывает апдейт Счетчика или Дотера
  
    function glrDotsUpdate() {
      console.log('DotsUpdate')
      const allDots = counter.querySelectorAll('.gallery__dots')
      allDots.forEach((dot)=>{
        dot.style.background = "grey"
        dot.style.transform = "scale(1)"
      
      }) // Сбрасывает стили у всех точек
      
      allDots[curentStep].style.background = "red"
      allDots[curentStep].style.transform = "scale(1.5)"
    } // Берёт все точки и обновляет цвет и размер в соответствии с текущим номером изображения

//------------------------------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------------ Gallery class -----------------------

class TouchGallery {
  constructor(target='body', imgArray = ['Hello'], width=300,height=300){
    this.iArray = imgArray;
    this.lenghtArr = this.iArray.length;
    this.width = width;
    this.height = height;
    this.target = target;
    this.startX = 0;
    this.endX = 0;
    this.curentStep = 0;
    this.touchStart = false;
    this.multiTouch = false;

    this.init();
    this.renderImg();
    this.eventBind();

  }

  init(){
    document.querySelector(this.target).innerHTML+=`
    <div class="glrT">
        <div class="glrT__body">  
            <div class="glrT__content">
                <div class="glrT__imageContent"></div>
                <div class="glrT__counter">Counter</div>
                <div class="glrT__desc">Descripstion</div>
            </div>          
      </div>
    </div>` 
    document.querySelector(`${this.target} .glrT__imageContent`).style.width =`${this.width}px`
    document.querySelector(`${this.target} .glrT__imageContent`).style.height =`${this.height}px`
    document.querySelector(`${this.target} .glrT__desc`).style.width =`${this.width}px`
    this.glrTCheckLength()
  } // Отрисовка шаблона

  renderImg(){
    let offsetX = parseInt(`-${this.width}`)
    this.glrTBackward()

    for(let i=0; i<3; i++){
        document.querySelector(`${this.target} .glrT__imageContent`).innerHTML+=`<div style="background:url('${this.iArray[this.curentStep].link}') center/cover no-repeat; width:${this.width}px; height:${this.height}px; transform:translateX(${offsetX}px)" class="glrT__imageItem"></div>`
        offsetX += this.width
        this.glrTForward()
    }
    this.glrTBackward()
    this.glrTBackward()
    this.glrTCheckUpdate()
    this.glrTDescUpdate()
  } //Создает 3 блока в шаблоне и выводит в них первые 3 изображения из массива 

  eventBind(){
    this.imgContent = document.querySelector(`${this.target} .glrT__imageContent`) 
    this.imgContent.addEventListener("touchmove",(e)=>{
      e.preventDefault()
      e.stopPropagation()
     
      
      this.curentPosX = Math.floor(e.touches[0].clientX)
     
      if(e.touches.length >= 2){
        this.curentPosXtouch2 = Math.floor(e.touches[1].clientX)
        this.scalePicture(this.curentPosX,this.curentPosXtouch2)
      } else {
        this.moveAllBoxes(this.curentPosX,this.startX)
      }


      
    })

    this.imgContent.addEventListener("touchstart",(e)=>{
      this.startX = Math.floor(e.touches[0].clientX)
      document.body.style.overflow = "hidden"
      this.allBoxesStyle(false)
      this.touchStart = true
      if(e.touches.length >= 2){
        this.multiTouch = true
      }

    })

    this.imgContent.addEventListener("touchend",(e)=>{
      this.endX = Math.floor(e.changedTouches[0].clientX)
      this.allBoxesStyle(true)
      this.swipeInfo()
      document.body.style.overflow = ""
      this.touchStart = false
      this.multiTouch = false
      this.scalePictureReset()

    })

    this.imgContent.addEventListener("mouseup",(e)=>{
      // this.endX = Math.floor(e.changedTouches[0].clientX)
      // console.log(e)
      let MouseEndX = Math.floor(e.layerX)
      // console.log(this.endX)
      

      if((MouseEndX <= this.width/2) && !this.touchStart && !this.multiTouch){
        this.actionMoveForward()
      } 
      
      if((MouseEndX >= this.width/2) && !this.touchStart && !this.multiTouch){
        this.actionMoveBackward()
      }

      this.allBoxesStyle(true)
      this.swipeInfo()
      document.body.style.overflow = ""

    })

  } // Добавляет слушатели на разные элементы

  scalePicture(x1,x2){
    document.querySelectorAll(`${this.target} .glrT__imageItem`)[1].style.transform=`scale(${(x2-x1)/100})`
    

  }
  scalePictureReset(){
    document.querySelectorAll(`${this.target} .glrT__imageItem`)[1].style.transform=`scale(1)`
    // document.querySelectorAll(`${this.target} .glrT__imageItem`)[1].style.background="blue"

  }


  moveAllBoxes(positionX,startTouch){
    const allImg = document.querySelectorAll(`${this.target} .glrT__imageItem`)
    let offsetPosX = 0
    allImg.forEach(item=>{
      item.style.transform =`translate(${positionX - this.width + offsetPosX - startTouch}px, 0px)`
      offsetPosX += this.width
    }) 
  } // двигает все боксы относительно их начала кооринат

  swipeInfo(){
  let state
  if(Math.abs(this.startX-this.endX) >= 80){
      if(this.startX > this.endX){
        this.actionMoveBackward()
        
      } else {
        this.actionMoveForward()
      }
    } else { 
      console.log("Stay")
      this.moveAllBoxes(0,0)
      }
  } //-----------------------------------------------------------------------------------------------------------------------------Swipe

  actionMoveBackward(){
    console.log("<<<<")
        this.moveAllBoxes(-this.width,0)
        this.glrTForward()

        this.removeBox(true)
        this.addBox(true)
        
        this.glrTCheckUpdate()
        this.glrTDescUpdate()
  }

  actionMoveForward(){
    console.log(">>>>")
    this.moveAllBoxes(this.width,0)
    this.glrTBackward()

    this.removeBox(false)
    this.addBox(false) 
    
    this.glrTCheckUpdate()
    this.glrTDescUpdate()

  }

  allBoxesStyle(state){
    if(state){
      document.querySelectorAll(`${this.target} .glrT__imageItem`).forEach(item=>{
        item.style.transition ="all 0.3s"
      })
    } else {
      document.querySelectorAll(`${this.target} .glrT__imageItem`).forEach(item=>{
        item.style.transition =""
      })
    }
  } //добавляет и убирает свойство транзишн
  
  

  removeBox(first){
    // const lChild = document.querySelector(target).lastChild
    let lChild 
    if(first){
      lChild= document.querySelectorAll(`${this.target} .glrT__imageItem`)[0]
    } else {
      lChild= document.querySelectorAll(`${this.target} .glrT__imageItem`)[2]
    }
    console.log(lChild)
    // lChild.style.background="green"
    document.querySelector(`${this.target} .glrT__imageContent`).removeChild(lChild)
  } //Удаляет первый или последний элемент

  addBox(first){
    if(first){
      this.glrTForward()
      document.querySelector(`${this.target} .glrT__imageContent`).insertAdjacentHTML('beforeend', `<div style="background:url('${this.iArray[this.curentStep].link}') center/cover no-repeat; width:${this.width}px; height:${this.height}px" class="glrT__imageItem"></div>`)
      document.querySelectorAll(`${this.target} .glrT__imageItem`)[2].style.transform = `translate(${this.width}px, 0px)`
      this.glrTBackward()
    
      
    } else {
      this.glrTBackward()
      document.querySelector(`${this.target} .glrT__imageContent`).insertAdjacentHTML('afterbegin', `<div style="background:url('${this.iArray[this.curentStep].link}') center/cover no-repeat; width:${this.width}px; height:${this.height}px" class="glrT__imageItem"></div>`)
      document.querySelectorAll(`${this.target} .glrT__imageItem`)[0].style.transform = `translate(${-this.width}px, 0px)`
      this.glrTForward()
    }

  }  //добавляет один блок в начало или конец списка в зависимости условия

  //--------------------------------------------------------------------------------------

  glrTForward(){
    if (this.curentStep >= (this.lenghtArr-1)){
      this.curentStep = 0
    } else { 
      this.curentStep++
    } 
    
  } //Обрабатывае событие вперед
  
  glrTBackward(){
    if (this.curentStep == 0){
      this.curentStep = this.lenghtArr-1
    } else { 
      this.curentStep--
      }
    
  } //Обрабатывае событие назад

  //------------------------------------------------------------------------Counter

  glrTCheckLength(){
    document.querySelector(`${this.target} .glrT__counter`).innerHTML ='' //очистка содержимого
    if(this.lenghtArr <= 5){
      for(let i=0; i < this.lenghtArr; i++){
        document.querySelector(`${this.target} .glrT__counter`).innerHTML +=`<div class="gallery__dots"></div>`
  
      }
    } else {
        this.glrTCounter()
      }
  
    } // Проверяет длинну массива изображений, если меньше 5 отрисовывает точки, если больше цифровой счетчик
  
  glrTCheckUpdate(){
      if(this.lenghtArr <= 5){
        this.glrTDotsUpdate()
      } else {
        this.glrTCounter()
    }
  }  //Проверяет длинну массива изображений в зависимости от нее вызывает апдейт Счетчика или Дотера
  
  glrTDotsUpdate() {
      const allDots = document.querySelectorAll(`${this.target} .gallery__dots`)
      allDots.forEach((dot)=>{
        dot.style.background = "grey"
        dot.style.transform = "scale(1)"
      
      }) // Сбрасывает стили у всех точек
      
      allDots[this.curentStep].style.background = "red"
      allDots[this.curentStep].style.transform = "scale(1.5)"
    } // Берёт все точки и обновляет цвет и размер в соответствии с текущим номером изображения

  glrTCounter(){
    document.querySelector(`${this.target} .glrT__counter`).innerHTML =`<div class="glrT__counterContent"> ${this.curentStep+1}/${this.lenghtArr} </div>`
  } //Обрабатывае значение счетчика

  glrTDescUpdate(){
    document.querySelector(`${this.target} .glrT__desc`).innerHTML =`<div class="glrT__descText"> ${this.iArray[this.curentStep].desc} </div>`
  } //Обновляет значение Description



}

const a = new TouchGallery('.glwrap', glrImg);
const b = new TouchGallery('.glwrap2', glrImg,350,200);
const c = new TouchGallery('.glwrap3', glrImg,150,150);


//---------------------------------------------------------TestInfo
let touchStart = false
let isTouched = false
let isMultitouched = false
let vectorDistance = 0,
  startVectorDistance = 0,
  remapedDistance = 0
let rem = createRemap(50,300,0,2)


// const bumBox = document.querySelector('.test_box')
// console.log(bumBox.children.length)
// console.log(bumBox.childNodes)


function binding(target){
  const testBox = document.querySelector(target)

  testBox.addEventListener('touchmove',(e)=>{updateTouchState(e,testBox)})
  testBox.addEventListener('touchstart',(e)=>{
    setTouchState(true)
    updateTouchState(e,testBox)
  })
  testBox.addEventListener('touchend',(e)=>{
    setTouchState(false)
    updateTouchState(e,testBox)
  })
}
binding('.test_box')

function updateTouchState(e,$target){
  // console.log(e)
  e.stopPropagation()
  e.preventDefault()
  // console.log($target)

  if(e.touches.length > 0){
    isTouched = true
  } else {isTouched = false}

  if(e.touches.length >= 2){
    isMultitouched = true
  } else {
    isMultitouched = false
  }

  if(isMultitouched){
    let a = e.touches[0].clientX - e.touches[1].clientX
    let b = e.touches[0].clientY - e.touches[1].clientY
    vectorDistance = Math.sqrt(a*a+b*b)
  } else {
    vectorDistance = 0
  }
  
  if(isMultitouched){
    remapedDistance = (rem(vectorDistance))
  } else {
    remapedDistance = 0
  }
  
  $target.innerHTML=""
  $target.innerHTML= `<div>${e.target}</div>
  <div>Touches length:${e.touches.length}</div>
  <div>Changed Touches Length: ${e.changedTouches.length}</div>
  <div>${e.type}</div>
  <div>Start Distance: ${startVectorDistance}</div>
  <div>Vector Distance: ${Math.floor(vectorDistance)}</div>
  <div>Distance Remap: ${remapedDistance}</div>
  <div>Touch start: ${touchStart}</div>
  <div>Touched: ${isTouched}</div>
  <div>MultiTouch: ${isMultitouched}</div>
  <div>Changed CleintX:${Math.floor(e.changedTouches[0].clientX)} CleintY: ${Math.floor(e.changedTouches[0].clientY)}</div>
  `

  if(isMultitouched){
    for(let i=0; i < e.touches.length; i++){
      $target.innerHTML+= `<div>Touch:${i} ClientX: ${Math.floor(e.touches[i].clientX)} ClientY: ${Math.floor(e.touches[i].clientY)}</div>`
    }
    // e.touches.forEach((item) => {
    //   testBox.innerHTML+= `<div>Touch:${index} ClientX: ${Math.floor(item.clientX)}</div>`
    // })
  } else {
    try{$target.innerHTML+= `<div>CleintX: ${Math.floor(e.touches[0].clientX)} CleintY: ${Math.floor(e.touches[0].clientY)}</div>`}
    catch{console.log('oh oh')}

  }

}

function createRemap(inMin, inMax, outMin, outMax) {
  return function remaper(x) {
      return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  };
}

function setTouchState(value){
  if (value){
    touchStart = true; 
    if(isMultitouched){
     startVectorDistance = 2
    }
  } else {
    touchStart = false;
    if(!isMultitouched){
      startVectorDistance = 0
     }
  }

}

//------------------------------old
// const testBox = document.querySelector('.test_box')
// let touchStart = false
// testBox.addEventListener('touchmove',moveFunc)
// testBox.addEventListener('touchstart',(e)=>{setTouchState(true)
//   moveFunc(e)
// })
// testBox.addEventListener('touchend',(e)=>{setTouchState(false)
//  moveFunc(e)
// })

// function moveFunc(e){
//   console.log(e)
//   e.preventDefault()
//   testBox.innerHTML=""
//   testBox.innerHTML= `<div>${e.target}</div>
//   <div>Touches length:${e.touches.length}</div>
//   <div>Changed Touches Length: ${e.changedTouches.length}</div>
//   <div>${e.type}</div>
//   <div>Touch start: ${touchStart}</div>
//   <div>Changed CleintX:${Math.floor(e.changedTouches[0].clientX)} CleintY: ${Math.floor(e.changedTouches[0].clientY)}</div>
//   `
//   if(e.touches.length >= 2){
//     for(let i=0; i < e.touches.length; i++){
//       testBox.innerHTML+= `<div>Touch:${i} ClientX: ${Math.floor(e.touches[i].clientX)} ClientY: ${Math.floor(e.touches[i].clientY)}</div>`
//     }
//     // e.touches.forEach((item) => {
//     //   testBox.innerHTML+= `<div>Touch:${index} ClientX: ${Math.floor(item.clientX)}</div>`
//     // })
//   } else {
//     testBox.innerHTML+= `<div>CleintX: ${Math.floor(e.touches[0].clientX)} CleintY: ${Math.floor(e.touches[0].clientY)}</div>
//     `
//   }

// }
// function setTouchState(value){
//   if (value){
//     touchStart = true; 
//   } else {
//     touchStart = false;
//   }
 

// }