const app = Vue.createApp({
  // data, functions
  data() {
    return {
    };
  },
  methods:{
    drawFunction(){
      
    },
    setupCanvas() {
      console.log("greg")
      let canvas = document.getElementById("canvas")
      canvas.style.background = "#ff8"
      let context = canvas.getContext("2d")
      context.fillRect(0,0, 100, 100)
    }
  },
  mounted(){
    this.setupCanvas()
  }
})
app.mount('#app')