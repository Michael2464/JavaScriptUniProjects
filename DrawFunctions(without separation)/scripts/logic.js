export default class GraphRenderer {
  static Graph(options) {
    options = options || {}

    this.xDistance = 2
    this.yDistance = 2
    this.x0 = 0  // doesn't work properly
    this.y0 = 0  // doesn't work properly
    this.funcAmount = 2
    this.color = 'blue'
    this.lineWidth = 3
    this.width = window.getClientWindowWidth()
    this.height = 800
    this.xMin = -20
    this.xMax = 20
    this.yMin = xMin * height / width //
    this.yMax = xMax * height / width // 
  }

  static drawFunction(funcAmount) {
    let F = []
    for (let i = 0; i < funcAmount; i++) {
      let f = function (x) {
        return eval(document.getElementById("funcInput" + i.toString()).value)
      }
      F.push(f)
    }
    setupCanvas()
    renderFunction(F)
  }

  // Data: xMin, xMax, width
  static xCoord(x, data) {
    data = data || {}
    data.xMin = data.xMin || -20;
    data.xMax = data.xMax || 20;
    data.width = data.width || 950;
    return (x - data.xMin) / (data.xMax - data.xMin) * data.width
  }

  // Data: yMin, yMax, cHeight
  static yCoord(y, data) {
    data = data || {}
    data.yMin = data.yMin || -13.684;
    data.yMax = data.yMax || 13.684;
    data.height = data.height || 950;
    return data.height - (y - data.yMin) / (data.yMax - data.yMin) * data.height
  }

  // Data: xMax, xMin, x0, y0, cWidth, cHeight, lineWidth, color
  static renderFunction(F, data) {
    data = data || {}

    data.xMax = data.xMax || 20
    data.xMin = data.xMin || -20
    data.x0 = data.x0 || 0
    data.y0 = data.y0 || 0
    data.width = data.width || 950
    data.height = data.height || 650
    data.lineWidth = data.lineWidth || 3
    data.color = data.color || 'blue'

    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    let step = (data.xMax - data.xMin) / data.width

    ctx.font = "6px serif"
    ctx.lineWidth = data.lineWidth || 2;

    ctx.beginPath()
    for (let i = 0; i < F.length; i++) {
      ctx.strokeStyle = data.color || 'red'
      ctx.moveTo(xCoord(data.xMin), yCoord(F[i](data.xMin)))
      for (let x = data.xMin + step; x <= data.xMax; x += step) {
        const y = F[i](x)

        const yMax = data.xMax * data.height / data.width

        if (Math.abs(y - F[i](x + step)) > yMax) {
          ctx.setLineDash([5, 15])
          ctx.moveTo(xCoord(0), yCoord(y))
        }
        else
          ctx.setLineDash([])

        ctx.lineTo(xCoord(x + data.x0), yCoord(y + data.y0))
      }
      ctx.stroke()
    }
    ctx.endPath()
  }

  // Data: xDistance, yDistance, wHeight, wWidth, cWidth, cHeigth, 
  //       xMin, xMax, yMin, yMax, x0, y0
  static setupCanvas(data) {
    data = data || {}

    data.xDistance = data.xDistance || 2
    data.yDistance = data.yDistance || 2
    data.x0 = data.x0 || 0
    data.y0 = data.y0 || 0
    data.funcAmount = data.funcAmount || 2
    data.color = data.color || 'blue'
    data.lineWidth = data.lineWidth || 3
    data.width = data.width || 950
    data.height = data.height || 650
    data.xMin = data.xMin || -20
    data.xMax = data.xMax || 20
    data.yMin = data.yMin || data.xMin * data.height / data.width
    data.yMax = data.yMax || data.xMax * data.height / data.width

    let canvas = document.getElementById("canvas")
    canvas.style.background = "#ff8"

    canvas.width = data.Width
    canvas.height = data.Height

    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //ctx.save()
    ctx.lineWidth = 2

    // Y axis
    ctx.beginPath()
    ctx.moveTo(xCoord(data.x0), yCoord(data.y0))
    ctx.lineTo(xCoord(data.x0), yCoord(data.yMax))
    // -Y axis
    ctx.moveTo(xCoord(data.x0), yCoord(data.y0))
    ctx.lineTo(xCoord(data.x0), yCoord(data.yMin))
    ctx.stroke() // drawing

    // Y Divisions
    ctx.beginPath()
    for (let i = data.yDistance; i < data.yMax; i += data.yDistance) {
      ctx.moveTo(xCoord(data.x0) - 4, yCoord(i))
      ctx.lineTo(xCoord(data.x0) + 4, yCoord(i))
      ctx.fillText(i.toString(), xCoord(data.x0) + 8, yCoord(i))
    }
    for (let i = -data.yDistance; i > data.yMin; i -= data.yDistance) {
      ctx.moveTo(xCoord(data.x0) - 4, yCoord(i))
      ctx.lineTo(xCoord(data.x0) + 4, yCoord(i))
      ctx.fillText(i.toString(), xCoord(data.x0) + 8, yCoord(i))
    }
    ctx.stroke()

    // Arrows (Y)
    ctx.beginPath()
    ctx.moveTo(xCoord(data.x0), yCoord(data.yMax))
    ctx.lineTo(xCoord(data.x0 - 0.5), yCoord(data.yMax - 0.5))
    ctx.moveTo(xCoord(data.x0), yCoord(data.yMax))
    ctx.lineTo(xCoord(data.x0 + 0.5), yCoord(data.yMax - 0.5))
    ctx.stroke()


    // X coord
    ctx.beginPath()
    ctx.moveTo(xCoord(data.x0), yCoord(data.y0))
    ctx.lineTo(xCoord(data.xMax), yCoord(data.y0))
    // -X coord
    ctx.moveTo(xCoord(data.x0), yCoord(data.y0))
    ctx.lineTo(xCoord(data.xMin), yCoord(data.y0))
    ctx.stroke()

    // X Divisions
    ctx.beginPath()
    for (let i = data.xDistance; i < data.xMax; i += data.xDistance) {
      ctx.moveTo(xCoord(i), yCoord(data.y0) - 4)
      ctx.lineTo(xCoord(i), yCoord(data.y0) + 4)
      ctx.fillText(i.toString(), xCoord(i), yCoord(data.y0) + 12)
    }
    for (let i = 0; i > data.xMin; i -= data.xDistance) {
      ctx.moveTo(xCoord(i), yCoord(data.y0) - 4)
      ctx.lineTo(xCoord(i), yCoord(data.y0) + 4)
      ctx.fillText(i.toString(), xCoord(i), yCoord(data.y0) + 12)
    }
    ctx.stroke()

    // Arrows (X)
    ctx.beginPath()
    ctx.moveTo(xCoord(data.xMax), yCoord(data.y0))
    ctx.lineTo(xCoord(data.xMax - 0.5), yCoord(data.y0 - 0.5))
    ctx.moveTo(xCoord(data.xMax), yCoord(data.y0))
    ctx.lineTo(xCoord(data.xMax - 0.5), yCoord(data.y0 + 0.5))
    ctx.stroke()


    // Subdivitions
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.strokeStyle = '#0008'
    for (let i = 0; i < data.xMax; i += data.xDistance) {
      ctx.moveTo(xCoord(i), yCoord(data.xMin))
      ctx.lineTo(xCoord(i), yCoord(data.xMax))
    }
    for (let i = 0; i > data.xMin; i -= data.xDistance) {
      ctx.moveTo(xCoord(i), yCoord(data.xMin))
      ctx.lineTo(xCoord(i), yCoord(data.xMax))
    }
    for (let i = 0; i < data.yMax; i += data.yDistance) {
      ctx.moveTo(xCoord(data.xMin), yCoord(i))
      ctx.lineTo(xCoord(data.xMax), yCoord(i))
    }
    for (let i = 0; i > data.yMin; i -= data.yDistance) {
      ctx.moveTo(xCoord(data.xMin), yCoord(i))
      ctx.lineTo(xCoord(data.xMax), yCoord(i))
    }
    ctx.stroke()
  }

  static getClientWindowWidth() {
    return document.documentElement.clientWidth
  }
  
  static getClientWindowHeight() {
    return document.documentElement.clientHeight
  }
}