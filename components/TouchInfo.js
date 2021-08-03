class TouchInfo {
    constructor(target){
        this.targetClass = target
        this.touchStart = false
        this.isTouched = false
        this.isMultitouched = false
        this.vectorDistance = 0
        this.startVectorDistance = 0
        this.remapedDistance = 0
        this.rem = this.createRemap(50,300,0,2)
        this.infoBlockStyle = `style = "
        width: 300px;
        height: 400px;
        background-color: burlywood;
        border-radius: 10px
        "`
        this.init()
       
  
    }
  
    init(){
      document.querySelector(this.targetClass).insertAdjacentHTML('beforeend',`<div class="info_block" ${this.infoBlockStyle}></div>`)
      this.binding()
  
    }
    binding(){
      const testBox = document.querySelector(`${this.targetClass} .info_block`)
      testBox.addEventListener('touchmove',(e)=>{this.updateTouchState(e,testBox)})
  
      testBox.addEventListener('touchstart',(e)=>{
        this.setTouchState(true)
        this.updateTouchState(e,testBox)
      })
  
      testBox.addEventListener('touchend',(e)=>{
        this.setTouchState(false)
        this.updateTouchState(e,testBox)
      })
    }
  
    updateTouchState(e,$target){
      e.stopPropagation()
      e.preventDefault()
    
      if(e.touches.length > 0){
        this.isTouched = true
      } else {this.isTouched = false}
    
      if(e.touches.length >= 2){
        this.isMultitouched = true
      } else {
        this.isMultitouched = false
      }
    
      if(this.isMultitouched){
        let a = e.touches[0].clientX - e.touches[1].clientX
        let b = e.touches[0].clientY - e.touches[1].clientY
        this.vectorDistance = Math.sqrt(a*a+b*b)
      } else {
        this.vectorDistance = 0
      }
      
      if(this.isMultitouched){
        this.remapedDistance = (rem(vectorDistance))
      } else {
        this.remapedDistance = 0
      }
      
      $target.innerHTML=""
      $target.innerHTML= `<div>${e.target}</div>
      <div>Touches length:${e.touches.length}</div>
      <div>Changed Touches Length: ${e.changedTouches.length}</div>
      <div> Event type: ${e.type}</div>
      <div>Start Distance: ${this.startVectorDistance}</div>
      <div>Vector Distance: ${Math.floor(this.vectorDistance)}</div>
      <div>Distance Remap: ${this.remapedDistance}</div>
      <div>Touch start: ${this.touchStart}</div>
      <div>Touched: ${this.isTouched}</div>
      <div>MultiTouch: ${this.isMultitouched}</div>
      <div>Changed CleintX:${Math.floor(e.changedTouches[0].clientX)} CleintY: ${Math.floor(e.changedTouches[0].clientY)}</div>
      `

      if(this.isMultitouched){
        for(let i=0; i < e.touches.length; i++){
          $target.innerHTML+= `<div>Touch:${i} ClientX: ${Math.floor(e.touches[i].clientX)} ClientY: ${Math.floor(e.touches[i].clientY)}</div>`
        }
        // e.touches.forEach((item) => {
        //   testBox.innerHTML+= `<div>Touch:${index} ClientX: ${Math.floor(item.clientX)}</div>`
        // })
      } else {
        try{$target.innerHTML+= `<div>CleintX: ${Math.floor(e.touches[0].clientX)} CleintY: ${Math.floor(e.touches[0].clientY)}</div>`}
        catch{console.log('It is not multi touch!')}
      }

    }
  
    createRemap(inMin, inMax, outMin, outMax) {
      return function remaper(x) {
          return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
      };
    }
    
    setTouchState(value){
        if (value){
            this.touchStart = true; 
            if(this.isMultitouched){
            this.startVectorDistance = 2
            }
        } else {
        this.touchStart = false;
        if(!this.isMultitouched){
            this.startVectorDistance = 0
            }
        }
    }
  
  
  }