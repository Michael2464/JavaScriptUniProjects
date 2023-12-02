// HW: Function толщина линии (custom) +
//     tan(x) draws vertical assimptodes, don't to it. Instead
//     draw it with separated lines - - - - - (canvas can do it itself)

//     Add canvas to the whole page and resize it depending on the proportion
//     Before that release all the data from canvas

// Color of line (UI)
// zeroes of function

const app = Vue.createApp({
  // data, functions
  data() {
    const main = new Main()

    return {
      main
    };
  },

  mounted() {
    console.log(typeof(this.main))
    window.addEventListener('resize', this.main.getDimensionsHandle)
    //window.addEventListener('keyup', this.keyUpHandle)
    document.querySelector("canvas").onwheel = this.main.wheel
    this.main.render()
  },

  unmounted() {
    window.removeEventListener('resize', this.main.getDimensionsHandle)
  },

  methods: {
    onAddFunction(){
      this.main.onAddFunction()
    },
    onRemoveFunction(index){
      this.main.onRemoveFunction(index)
    }
  }
})
app.mount('#app')



