// separate business code from framework
// HW: Draw arroys to the axis + 
//     Add numbers to divisions + 
//     *Add multiple graphics +
//     Function толщина линии (custom) +
//     tan(x) draws vertical assimptodes, don't to it. Instead
//     draw it with separated lines - - - - - (canvas can do it itself)
//     
//     ctx.setLineDash([5, 15]);

const app = Vue.createApp({
  // data, functions
  data() {
    return {
      xDistance: 2,
      yDistance: 2,
      x0: 0,  // doesn't work properly
      y0: 0, // doesn't work properly
      funcAmount: 1, 
      color: 'blue',
      lineWidth: 3,
      canvasWidth: 850,
      canvasHeight: 650,
      xMax: 20,
      xMin: -20
    };
  },
  methods:{
    drawFunction(){
      let F = []
      for(let i = 0; i < this.funcAmount; i++){
        let f = function (x) {
          return eval(document.getElementById("funcInput"+i.toString()).value)
        }
        F.push(f)
      }
      this.setupCanvas()
      this.renderFunction(F)
    },

    renderFunction(F){
      let canvas = document.getElementById("canvas")
      let ctx = canvas.getContext("2d")
      let step = (this.xMax - this.xMin) / this.canvasWidth

      ctx.font = "6px serif"
      ctx.lineWidth = this.lineWidth || 2;

      for (let i = 0; i < F.length; i++){
        ctx.beginPath()
        ctx.strokeStyle = this.color || 'red'
        ctx.moveTo(this.xCoord(this.xMin), this.yCoord(F[i](this.xMin)))
        for(let x = this.xMin + step; x <= this.xMax; x += step)
        {
          const y = F[i](x)

          //const yMax = this.xMax * this.canvasHeight / this.canvasWidth
          //if(Math.abs(y) > yMax+10) 
          //  ctx.setLineDash([0.5, 1])

          ctx.lineTo(this.xCoord(x+this.x0), this.yCoord(y+this.y0))
        }
        ctx.stroke()
      }
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
    }
  },
  mounted(){
    this.setupCanvas()
  }
})
app.mount('#app')



