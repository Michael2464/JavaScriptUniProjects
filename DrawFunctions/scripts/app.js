// HW: Function толщина линии (custom) +
//     tan(x) draws vertical assimptodes, don't to it. Instead
//     draw it with separated lines - - - - - (canvas can do it itself)
//     SEPARATE BUSINESS CODE FROM FRAMEWORK
//     Make it beautiful
//     Add canvas to the whole page and resize it depending on the proportion
//     Before that release all the data from canvas

//var graph = new Graph()

import GraphRenderer from './logic.js'


const app = Vue.createApp({
  // data, functions
  data() {
    return {
      graph: new GraphRenderer.Graph(),
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
      GraphRenderer.drawFunction(graph.funcAmount)
    },
    
    renderFunction(F){
      GraphRenderer.renderFunction(F, {})
    },
    
    xCoord(x){
      GraphRenderer.xCoord(x)
    },

    yCoord(y){
      GraphRenderer.yCoord(y)
    },

    // 
    setupCanvas() {
      GraphRenderer.setupCanvas()
    },
    getDimensions() {
      this.width = GraphRenderer.getClientWindowWidth()
      this.height = GraphRenderer.getClientWindowHeight()
    }
  },
  mounted(){
    this.setupCanvas();
  }
})
app.mount('#app')



