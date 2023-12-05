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

    this.canvas;
    //this.canvas = document.getElementById(this.id)
    // JUST CREATE THE CANVAS (CODE BELOW)
    this.canvas = document.createElement('canvas')
    document.querySelector('body').appendChild(this.canvas)

    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
    this.callbacks = options.callbacks;
    this.canvas.addEventListener('wheel', this.callbacks.wheel)
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

    this.ctx.strokeStyle = isDash ? '#ff0' : color
    this.ctx.lineWidth = width || 2
    if (isDash)
      this.ctx.setLineDash([5, 15])
    else
      this.ctx.setLineDash([])

    this.ctx.moveTo(xs(x1), ys(y1))
    this.ctx.lineTo(xs(x2), ys(y2))
    this.ctx.stroke()

    this.ctx.closePath()
  }

  // 25.11.2023
  drawPolygon(points, color="#f805") {
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    this.ctx.moveTo(xs(points[0].x), ys(points[0].y))
    for(let i = 1; i < points.lenght; i++){
      this.ctx.lineTo(xs(points[i].x), ys(points[i].y))
    }
    this.ctx.lineTo(xs(points[0].x), ys(points[0].y))
    this.ctx.closePath()
    this.ctx.fill()
  }

  drawPoint(x, y, color, radius) {
    context.beginPath();
    context.strokeStyle = color || '#f00';
    context.arc(xs(x), ys(y), radius || 2, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  drawText(text, x, y, color) {
    this.ctx.fillStyle = color || '#000'
    this.ctx.font = '20px Arial'
    this.ctx.fillText(text, xs(x), ys(y))
  }

}


