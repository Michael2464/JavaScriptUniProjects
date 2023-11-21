class UI {

    constructor (graph, callbacks){
        this.graph = graph;
        this.callbacks = callbacks;
    }    

    keyupHandler() {
      try {
        let f;
        eval(`f = function(x) { return ${this.value}; }`);
        addFunction(f, this.dataset.num - 0);
      } 
      catch (e) {
              
      }
    }

    toggleMenu(){
      this.graph.toggleMenu();
    }

    onRemoveFuncButtonClick(index){
      this.functions.splice(index, 1)
      console.log(this.functions.length);
    }

    onAddFuncButtonClick(){
      this.functions.push("")
      console.log(this.functions.length);
    }
}


