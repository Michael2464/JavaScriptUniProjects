class Graph {

  xDistance = 2
  yDistance = 2
  x0 = 0  // doesn't work properly
  y0 = 0  // doesn't work properly
  color = "blue"
  lineWidth = 3
  width = window.innerWidth
  height = window.innerHeight
  xMax = 20
  xMin = -20
  yMax = this.xMax * this.height / this.width
  yMin = this.xMin * this.height / this.width
  zoomStep = 1.5
  dotSize = 4
  canMove = true
  functions = ["x*x", "x+5"]

  drawFunction() {
    const F = []
    for (let i = 0; i < this.functions.length; i++) {
      const f = function (x) {
        return eval(this.functions[i])
      }
      F.push(f)
    }
    this.setupCanvas()
    this.renderFunction(F)
  }

  // Data: xMin, xMax, width
  xCoord(x, data) {
    data = data || {}
    data.xMin = data.xMin || this.xMin;
    data.xMax = data.xMax || this.xMax;
    data.width = data.width || this.width;
    return (x - data.xMin) / (data.xMax - data.xMin) * data.width
  }

  /*
  function xs(x) {
        return (((x - win.left) * canvas.width) / win.width);
    }

    function ys(y) {
        return (((-y - win.bottom) * canvas.height) / win.height);
    }
  */

  // Data: yMin, yMax, cHeight
  yCoord(y, data) {
    data = data || {}
    data.yMin = data.yMin || this.yMin;
    data.yMax = data.yMax || this.yMax;
    data.height = data.height || this.height;
    return data.height - (y - data.yMin) / (data.yMax - data.yMin) * data.height
  }

  xScreen(x, data) {
    data = data || {}
    data.xMin = data.xMin || this.xMin;
    data.xMax = data.xMax || this.xMax;
    data.width = data.width || this.width;
    return (x - data.xMin) / (data.xMax - data.xMin) * data.width
  }

  // Data: yMin, yMax, cHeight
  yScreen(y, data) {
    data = data || {}
    data.yMin = data.yMin || this.yMin;
    data.yMax = data.yMax || this.yMax;
    data.height = data.height || this.height;
    return data.height - (y - data.yMin) / (data.yMax - data.yMin) * data.height
  }

  // Data: xMax, xMin, x0, y0, cWidth, cHeight, lineWidth, color
  renderFunction(F, data) {
    data = data || {}

    data.xMax = data.xMax || this.xMax
    data.xMin = data.xMin || this.xMin
    data.x0 = data.x0 || this.x0
    data.y0 = data.y0 || this.y0
    data.width = data.width || this.width
    data.height = data.height || this.height
    data.lineWidth = data.lineWidth || this.lineWidth
    data.color = data.color || this.color

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    const step = (data.xMax - data.xMin) / data.width

    ctx.font = "6px serif"
    ctx.lineWidth = data.lineWidth || 2;

    ctx.beginPath()
    for (let i = 0; i < F.length; i++) 
    {
      ctx.strokeStyle = data.color || 'red'
      ctx.moveTo(this.xCoord(data.xMin), this.yCoord(F[i](data.xMin)))
      for (let x = data.xMin + step; x <= data.xMax; x += step) 
      {
        const y = F[i](x)

        ctx.lineTo(this.xCoord(x + this.x0), this.yCoord(y + this.y0))
      }
      const x = this.getZero(F[i], this.xCoord(data.xMin), this.xCoord(data.xMax));
      this.drawPoint(ctx, x, F[i](x))
      
      ctx.stroke()
    }
  }

  // Data: xDistance, yDistance, wHeight, wWidth, cWidth, cHeigth, 
  //       xMin, xMax, yMin, yMax, x0, y0
  setupCanvas(data) {
    data = data || {}

    data.xDistance = data.xDistance || this.xDistance
    data.yDistance = data.yDistance || this.yDistance
    data.x0 = data.x0 || this.x0
    data.y0 = data.y0 || this.y0
    data.funcAmount = data.funcAmount || this.funcAmount
    data.color = data.color || this.color
    data.lineWidth = data.lineWidth || this.lineWidth
    data.width = data.width || this.width
    data.height = data.height || this.height
    data.xMin = data.xMin || this.xMin
    data.xMax = data.xMax || this.xMax

    this.yMax = data.xMax * data.height / data.width
    this.yMin = data.xMin * data.height / data.width

    data.yMin = data.yMin || this.yMin
    data.yMax = data.yMax || this.yMax

    const canvas = document.getElementById("canvas")
    canvas.style.background = "#ff8"

    canvas.width = data.width
    canvas.height = data.height

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //ctx.save()
    ctx.lineWidth = data.lineWidth

    // Y axis
    ctx.beginPath()
    ctx.moveTo(this.xCoord(data.x0), this.yCoord(data.y0))
    ctx.lineTo(this.xCoord(data.x0), this.yCoord(data.yMax))
    // -Y axis
    ctx.moveTo(this.xCoord(data.x0), this.yCoord(data.y0))
    ctx.lineTo(this.xCoord(data.x0), this.yCoord(data.yMin))
    ctx.stroke() // drawing

    // Y Divisions
    ctx.beginPath()
    for (let i = data.yDistance; i < data.yMax; i += data.yDistance) {
      ctx.moveTo(this.xCoord(data.x0) - 4, this.yCoord(i))
      ctx.lineTo(this.xCoord(data.x0) + 4, this.yCoord(i))
      ctx.fillText(i.toString(), this.xCoord(data.x0) + 8, this.yCoord(i))
    }
    for (let i = -data.yDistance; i > data.yMin; i -= data.yDistance) {
      ctx.moveTo(this.xCoord(data.x0) - 4, this.yCoord(i))
      ctx.lineTo(this.xCoord(data.x0) + 4, this.yCoord(i))
      ctx.fillText(i.toString(), this.xCoord(data.x0) + 8, this.yCoord(i))
    }
    ctx.stroke()

    // Arrows (Y)
    ctx.beginPath()
    ctx.moveTo(this.xCoord(data.x0), this.yCoord(data.yMax))
    ctx.lineTo(this.xCoord(data.x0 - 0.5), this.yCoord(data.yMax - 0.5))
    ctx.moveTo(this.xCoord(data.x0), this.yCoord(data.yMax))
    ctx.lineTo(this.xCoord(data.x0 + 0.5), this.yCoord(data.yMax - 0.5))
    ctx.stroke()


    // X coord
    ctx.beginPath()
    ctx.moveTo(this.xCoord(data.x0), this.yCoord(data.y0))
    ctx.lineTo(this.xCoord(data.xMax), this.yCoord(data.y0))
    // -X coord
    ctx.moveTo(this.xCoord(data.x0), this.yCoord(data.y0))
    ctx.lineTo(this.xCoord(data.xMin), this.yCoord(data.y0))
    ctx.stroke()

    // X Divisions
    ctx.beginPath()
    for (let i = data.xDistance; i < data.xMax; i += data.xDistance) {
      ctx.moveTo(this.xCoord(i), this.yCoord(data.y0) - 4)
      ctx.lineTo(this.xCoord(i), this.yCoord(data.y0) + 4)
      ctx.fillText(i.toString(), this.xCoord(i), this.yCoord(data.y0) + 12)
    }
    for (let i = 0; i > data.xMin; i -= data.xDistance) {
      ctx.moveTo(this.xCoord(i), this.yCoord(data.y0) - 4)
      ctx.lineTo(this.xCoord(i), this.yCoord(data.y0) + 4)
      ctx.fillText(i.toString(), this.xCoord(i), this.yCoord(data.y0) + 12)
    }
    ctx.stroke()

    // Arrows (X)
    ctx.beginPath()
    ctx.moveTo(this.xCoord(data.xMax), this.yCoord(data.y0))
    ctx.lineTo(this.xCoord(data.xMax - 0.5), this.yCoord(data.y0 - 0.5))
    ctx.moveTo(this.xCoord(data.xMax), this.yCoord(data.y0))
    ctx.lineTo(this.xCoord(data.xMax - 0.5), this.yCoord(data.y0 + 0.5))
    ctx.stroke()


    // Subdivitions
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.strokeStyle = '#0008'
    for (let i = 0; i < data.xMax; i += data.xDistance) {
      ctx.moveTo(this.xCoord(i), this.yCoord(data.xMin))
      ctx.lineTo(this.xCoord(i), this.yCoord(data.xMax))
    }
    for (let i = 0; i > data.xMin; i -= data.xDistance) {
      ctx.moveTo(this.xCoord(i), this.yCoord(data.xMin))
      ctx.lineTo(this.xCoord(i), this.yCoord(data.xMax))
    }
    for (let i = 0; i < data.yMax; i += data.yDistance) {
      ctx.moveTo(this.xCoord(data.xMin), this.yCoord(i))
      ctx.lineTo(this.xCoord(data.xMax), this.yCoord(i))
    }
    for (let i = 0; i > data.yMin; i -= data.yDistance) {
      ctx.moveTo(this.xCoord(data.xMin), this.yCoord(i))
      ctx.lineTo(this.xCoord(data.xMax), this.yCoord(i))
    }
    ctx.stroke()
  }

  drawPoint(ctx, x, y){
    ctx.arc(this.xCoord(x + this.x0), this.yCoord(y + this.y0), this.dotSize, 0, 2*Math.PI);
  }

  onRemoveFuncButtonClick(index){
    this.functions.splice(index, 1)
    console.log(this.functions.length);
  }

  onAddFuncButtonClick(){
    this.functions.push("")
    console.log(this.functions.length);
  }

  toggleMenu(){
    const subMenu = document.getElementById("menuWrap")
    subMenu.classList.toggle("open-menu")
    console.log("toggleMenu")
  }

  getZero(f, a, b, eps=0.001){
    if(f(a) * f(b) > 0)
      return null
    if(Math.abs(f(a)-f(b)) <= eps)
      return (a+b)/2
    const half = (a+b)/2;
    if(f(a) * f(half) <= eps)
      return this.getZero(f, a, half, eps)
    if(f(half) * f(b) <= eps)
      return this.getZero(f, half, b, eps)
  }

  getDimensionsHandle() {
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight*0.7
    this.setupCanvas()
    this.drawFunction()
  }

  wheelEventHandle(event){
    const delta = event.wheelDelta > 0 ? -this.zoomStep : this.zoomStep
    this.xMax += delta
    this.xMin -= delta
    this.setupCanvas()
    this.drawFunction()
  }

  getClientWindowWidth() {
    return document.documentElement.clientWidth
  }

  getClientWindowHeight() {
    return document.documentElement.clientHeight
  }
}


