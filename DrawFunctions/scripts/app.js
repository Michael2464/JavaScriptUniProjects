// HW: Function толщина линии (custom) +
//     tan(x) draws vertical assimptodes, don't to it. Instead
//     draw it with separated lines - - - - - (canvas can do it itself)
//     SEPARATE BUSINESS CODE FROM FRAMEWORK
//     Make it beautiful
//     Add canvas to the whole page and resize it depending on the proportion
//     Before that release all the data from canvas

const app = Vue.createApp({
  // data, functions
  data() {
    return {
      xDistance: graph.xDistance,
      yDistance: graph.yDistance,
      x0: graph.x0,  // doesn't work properly
      y0: graph.y0, // doesn't work properly
      width: getClientWindowWidth(),
      height: getClientWindowHeight(),
      funcAmount: graph.funcAmount, 
      color: graph.color,
      lineWidth: graph.lineWidth,
      canvasWidth: graph.width,
      canvasHeight: graph.height,
      xMax: graph.xMax,
      xMin: graph.xMin,
      yMax: graph.yMax,
      yMin: graph.yMin
    };
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions)
    this.setupCanvas()
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions)
  },
  methods:{
    drawFunction(){
      drawFunction(graph.funcAmount)
    },

    renderFunction(F){
      renderFunction(F, {})
    },

    xCoord(x){
      return (x - this.xMin) / (this.xMax - this.xMin) * this.canvasWidth
    },

    yCoord(y){
      let yMin = this.xMin * this.canvasHeight / this.canvasWidth
      let yMax = this.xMax * this.canvasHeight / this.canvasWidth
      return this.canvasHeight - ((y- yMin) / (yMax - yMin) * this.canvasHeight)
    },

    // 
    setupCanvas() {
      let canvas = document.getElementById("canvas")
      canvas.style.background = "#ff8"
    
      const diff = this.wHeight / this.wWidth
      canvas.width = this.canvasWidth
      canvas.height = this.canvasHeight
      
      let ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let yMin = this.xMin * this.canvasHeight / this.canvasWidth
      let yMax = this.xMax * this.canvasHeight / this.canvasWidth

      ctx.save()
      ctx.lineWidth = 2

      // Y axis
      ctx.beginPath()
      ctx.moveTo(this.xCoord(this.x0), this.yCoord(this.y0))
      ctx.lineTo(this.xCoord(this.x0), this.yCoord(yMax))
      // -Y axis
      ctx.moveTo(this.xCoord(this.x0), this.yCoord(this.y0))
      ctx.lineTo(this.xCoord(this.x0), this.yCoord(yMin))
      ctx.stroke() // drawing

      // Y Divisions
      ctx.beginPath()
      for (let i = this.yDistance; i < yMax; i+=this.yDistance){
        ctx.moveTo(this.xCoord(this.x0) - 4, this.yCoord(i))
        ctx.lineTo(this.xCoord(this.x0) + 4, this.yCoord(i))
        ctx.fillText(i.toString(), this.xCoord(this.x0) + 8, this.yCoord(i))
      }
      for (let i = -this.yDistance; i > yMin; i-=this.yDistance){
        ctx.moveTo(this.xCoord(this.x0) - 4, this.yCoord(i))
        ctx.lineTo(this.xCoord(this.x0) + 4, this.yCoord(i))
        ctx.fillText(i.toString(), this.xCoord(this.x0) + 8, this.yCoord(i))
      }
      ctx.stroke()
      
      // Arrows (Y)
      ctx.beginPath()
      ctx.moveTo(this.xCoord(this.x0), this.yCoord(yMax))
      ctx.lineTo(this.xCoord(this.x0 - 0.5), this.yCoord(yMax-0.5))
      ctx.moveTo(this.xCoord(this.x0), this.yCoord(yMax))
      ctx.lineTo(this.xCoord(this.x0 + 0.5), this.yCoord(yMax-0.5))
      ctx.stroke() 


      // X coord
      ctx.beginPath()
      ctx.moveTo(this.xCoord(this.x0), this.yCoord(this.y0))
      ctx.lineTo(this.xCoord(this.xMax), this.yCoord(this.y0))
      // -X coord
      ctx.moveTo(this.xCoord(this.x0), this.yCoord(this.y0))
      ctx.lineTo(this.xCoord(this.xMin), this.yCoord(this.y0))
      ctx.stroke() 
      
      // X Divisions
      ctx.beginPath()
      for (let i = this.xDistance; i < this.xMax; i+=this.xDistance) {
        ctx.moveTo(this.xCoord(i), this.yCoord(this.y0) - 4)
        ctx.lineTo(this.xCoord(i), this.yCoord(this.y0) + 4)
        ctx.fillText(i.toString(), this.xCoord(i), this.yCoord(this.y0) + 12)
      }
      for (let i = 0; i > this.xMin; i-=this.xDistance) {
        ctx.moveTo(this.xCoord(i), this.yCoord(this.y0) - 4)
        ctx.lineTo(this.xCoord(i), this.yCoord(this.y0) + 4)
        ctx.fillText(i.toString(), this.xCoord(i), this.yCoord(this.y0) + 12)
      }
      ctx.stroke()

      // Arrows (X)
      ctx.beginPath()
      ctx.moveTo(this.xCoord(this.xMax), this.yCoord(this.y0))
      ctx.lineTo(this.xCoord(this.xMax-0.5), this.yCoord(this.y0-0.5))
      ctx.moveTo(this.xCoord(this.xMax), this.yCoord(this.y0))
      ctx.lineTo(this.xCoord(this.xMax-0.5), this.yCoord(this.y0+0.5))
      ctx.stroke()

      
      // Subdivitions
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.strokeStyle = '#0008'
      for (let i = 0; i < this.xMax; i += this.xDistance) {
        ctx.moveTo(this.xCoord(i), this.yCoord(this.xMin))
        ctx.lineTo(this.xCoord(i), this.yCoord(this.xMax))
      }
      for (let i = 0; i > this.xMin; i -= this.xDistance) {
        ctx.moveTo(this.xCoord(i), this.yCoord(this.xMin))
        ctx.lineTo(this.xCoord(i), this.yCoord(this.xMax))
      }
      for (let i = 0; i < yMax; i += this.yDistance) {
        ctx.moveTo(this.xCoord(this.xMin), this.yCoord(i))
        ctx.lineTo(this.xCoord(this.xMax), this.yCoord(i))
      }
      for (let i = 0; i > yMin; i -= this.yDistance) {
        ctx.moveTo(this.xCoord(this.xMin), this.yCoord(i))
        ctx.lineTo(this.xCoord(this.xMax), this.yCoord(i))
      }
      ctx.stroke()
    },
    getDimensions() {
      this.width = getClientWindowWidth()
      this.height = getClientWindowHeight()
    }
  },
  mounted(){
    var graph = new Graph()
    setupCanvas();
  }
})
app.mount('#app')



