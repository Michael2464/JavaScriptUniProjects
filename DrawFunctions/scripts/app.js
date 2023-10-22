const app = Vue.createApp({
  // data, functions
  data() {
    return {
      xDistance: 1,
      yDistance: 1,
      canvasWidth: 900,
      canvasHeight: 600,
      xMax: 10,
      xMin: -10
    };
  },
  methods:{
    drawFunction(){
      let f = function (x) {
        return eval(document.getElementById("funcInput").value)
      }
      console.log(document.getElementById("funcInput").value)
      this.setupCanvas()
      this.renderFunction(f)
    },

    renderFunction(f){
      let step = (this.xMax - this.xMin) / this.canvasWidth
      let canvas = document.getElementById("canvas")
      let ctx = canvas.getContext("2d")

      ctx.beginPath()
      ctx.moveTo(this.xCoord(this.xMin), this.yCoord(f(this.xMin)))
      for(let x = this.xMin + step; x <= this.xMax; x += step){
        const y = f(x)
        ctx.lineTo(this.xCoord(x), this.yCoord(y))
      }
      ctx.stroke()

    },

    xCoord(x){
      return (x - this.xMin) / (this.xMax - this.xMin) * this.canvasWidth
    },

    yCoord(y){
      let yMin = this.xMin * this.canvasHeight / this.canvasWidth
      let yMax = this.xMax * this.canvasHeight / this.canvasWidth
      return this.canvasHeight - ((y - yMin) / (yMax - yMin) * this.canvasHeight)
    },

    setupCanvas() {
      let canvas = document.getElementById("canvas")
      canvas.style.background = "#ff8"
      canvas.width = this.canvasWidth
      canvas.height = this.canvasHeight
      
      let ctx = canvas.getContext("2d")
      ctx.clearRect(0,0,canvas.width, canvas.height)

      let yMin = this.xMin * this.canvasHeight / this.canvasWidth
      let yMax = this.xMax * this.canvasHeight / this.canvasWidth

      ctx.save()
      ctx.lineWidth = 2

      // Y coord
      ctx.beginPath()
      ctx.moveTo(this.xCoord(0), this.yCoord(0))
      ctx.lineTo(this.xCoord(0), this.yCoord(yMax))
      ctx.stroke() // drawing
      
      // -Y coord
      ctx.beginPath()
      ctx.moveTo(this.xCoord(0), this.yCoord(0))
      ctx.lineTo(this.xCoord(0), this.yCoord(yMin))
      ctx.stroke() // drawing

      // Y Divisions
      for (let i = yMin; i < yMax; i++){
        ctx.beginPath()
        ctx.moveTo(this.xCoord(0) - 5, this.yCoord(i))
        ctx.lineTo(this.xCoord(0) + 5, this.yCoord(i))
        ctx.stroke()
      }

      // X coord
      ctx.beginPath()
      ctx.moveTo(this.xCoord(0), this.yCoord(0))
      ctx.lineTo(this.xCoord(this.xMax), this.yCoord(0))
      ctx.stroke() // drawing
      
      // -X coord
      ctx.beginPath()
      ctx.moveTo(this.xCoord(0), this.yCoord(0))
      ctx.lineTo(this.xCoord(this.xMin), this.yCoord(0))
      ctx.stroke() // drawing

      // X Divisions
      for (let i = this.xMin; i < this.xMax; i++){
        ctx.beginPath()
        ctx.moveTo(this.xCoord(i), this.yCoord(0) - 5)
        ctx.lineTo(this.xCoord(i), this.yCoord(0) + 5)
        ctx.stroke()
      }
    }
  },
  mounted(){
    this.setupCanvas()
  }
})
app.mount('#app')