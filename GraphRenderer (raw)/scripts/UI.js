class UI {
  constructor(functions, callbacks) {
    this.functions = functions;
    this.callbacks = callbacks;
  }

  keyupHandler() {
    try {
      let f
      eval(`f = function(x) { return ${this.value}; }`)
      this.callbacks.addFunction(f, this.functions.lenght - 0)
      //this.callbacks.addFunction(f, this.dataset.num - 0)
    }
    catch (e) {
      console.log("EXCEPTION: ", e)
    }
  }

  toggleMenu() {
    this.graph.toggleMenu()
  }
}


