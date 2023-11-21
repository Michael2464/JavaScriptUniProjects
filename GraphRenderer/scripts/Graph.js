// HOMEWORK: FIX CODE STRUCTURE, GRAPH MOVING, 
// COLOR AND LINE WIDTH, ADD DERIVATIVE!!!!!!!
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA


// y = kx + b
// it is lim (f(x + dx) - f(x)) / dx = k
// + draw dot there


class Graph {

  constructor(options) {
    options = options || {}

    this.id = options.id || 'canvas'
    this.width = options.width || 500
    this.height = options.height || 500
    this.WIN = options.WIN || {}
    this.canvas

    if (this.id)
      canvas = document.getElementById(this.id)
    else {
      canvas = document.createElement('canvas')
      document.querySelector('body').appendChild(canvas)
    }

    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
    this.callbacks = options.callbacks;
    this.canvas.addEventListener('wheel', callbacks.wheel)
  }

  xs(x) {
    return (x - this.WIN.left) / this.WIN.width * this.canvas.width;
  }

  ys(y) {
    return this.canvas.height - (y - this.WIN.bottom) / this.WIN.height * this.canvas.height;
  }

  clear() {
    this.ctx.fillStyle = '#ffe'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawLine(x1, y1, x2, y2, color, width, isDash) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = isDash ? color + '3' : color
    this.ctx.lineWidth = width || 1
    if (isDash) {
      this.ctx.setLineDash([12, 10])
    } else {
      this.ctx.setLineDash([])
    }
    this.ctx.moveTo(xs(x1), ys(y1))
    this.ctx.lineTo(xs(x2), ys(y2))
    this.ctx.stroke()
    this.ctx.closePath()
  }

  drawPoint(x, y, color, radius) {
    context.beginPath();
    context.strokeStyle = color || '#f00';
    context.arc(xs(x), ys(y), radius || 2, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  drawText(text, x, y, color){
    this.ctx.fillStyle = color || '#000'
    this.ctx.font = '20px Arial'
    this.ctx.fillText(text, xs(x), ys(y))
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

  // Data: xDistance, yDistance, wHeight, wWidth, cWidth, cHeigth, 
  //       xMin, xMax, yMin, yMax, x0, y0
  setupCanvas(data) {
    console.log(typeof (this.functions[0]))
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

  onRemoveFuncButtonClick(index) {
    this.functions.splice(index, 1)
    console.log(this.functions.length);
  }

  onAddFuncButtonClick() {
    this.functions.push("")
    console.log(this.functions.length);
  }

  toggleMenu() {
    const subMenu = document.getElementById("menuWrap")
    subMenu.classList.toggle("open-menu")
    console.log("toggleMenu")
  }

  getDimensionsHandle() {
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
    this.setupCanvas()
    this.drawFunction()
  }

  wheelEventHandle(event) {
    const delta = event.wheelDelta > 0 ? -this.zoomStep : this.zoomStep
    this.xMax += delta
    this.xMin -= delta
    this.setupCanvas()
    this.drawFunction()
  }
}


