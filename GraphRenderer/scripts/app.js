// HW: Function толщина линии (custom) +
//     tan(x) draws vertical assimptodes, don't to it. Instead
//     draw it with separated lines - - - - - (canvas can do it itself)
//     SEPARATE BUSINESS CODE FROM FRAMEWORK
//     Make it beautiful
//     Add canvas to the whole page and resize it depending on the proportion
//     Before that release all the data from canvas

// Color of line (UI)
// zeroes of function

const app = Vue.createApp({
  // data, functions
  data() {
    const main = new Main;

    return {
      main
    };
  },

  mounted() {
    window.addEventListener('resize', this.getDimensionsHandle)
    //window.addEventListener('keyup', this.keyUpHandle)
    document.querySelector("canvas").onwheel = this.wheelEventHandle
    this.setupCanvas()
    this.drawFunction()
  },

  unmounted() {
    window.removeEventListener('resize', this.getDimensionsHandle)
  },

  methods: {
    drawFunction() {
      //this.graph.drawFunction()
    },

    renderFunction(F) {
      //this.graph.renderFunction(F)
    },

    xCoord(x) {
      //return this.graph.xCoord(x)
    },

    yCoord(y) {
      //return this.graph.yCoord(y)
    },

    setupCanvas() {
      //this.graph.setupCanvas()
    },
    drawPoint(ctx, x, y){
      //this.graph.drawPoint(ctx, x, y)
    },
    getDimensionsHandle() {
      //this.graph.getDimensionsHandle()
    },
    toggleMenu(){
      //this.graph.toggleMenu()
    },
    onAddFuncButtonClick(){
      //this.graph.onAddFuncButtonClick()
    },
    onRemoveFuncButtonClick(index){
      //this.graph.onRemoveFuncButtonClick(index)
    },
    wheelEventHandle(event){
      //this.graph.wheelEventHandle(event)
    }
  }
})
app.mount('#app')



