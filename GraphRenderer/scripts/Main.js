class Main {

  constructor() {
    this.functions = []

    this.WIN = {
      LEFT: -10,
      BOTTOM: -10,
      WIDTH: 20,
      HEIGHT: 20,
    }

    this.zoomStep = 1.5

    this.graph = new Graph({
      id: 'canvas',
      WIN: this.WIN,
      width: 500,
      height: 500,
      callbacks: {
        wheel: () => this.wheel()
      }
    })

    new UI(this.graph, {
      addFunction: (f, num) => this.addFunction(f, num),
      delFunction: (index) => this.delFunction(index)
    })
  }

  wheel(event) {
    const delta = (event.wheelDelta > 0) ? -this.zoomStep : this.zoomStep
    this.WIN.width += delta
    this.WIN.height += delta
    this.WIN.left -= delta * 0.5
    this.WIN.bottom -= delta * 0.5
    this.render() // update canvas view
  }

  addFunction(f, num) {
    this.functions[num] = {
      f,
      color: '#f00',
      width: 2
    };
    render();
  }

  delFunction(index) {
    this.functions.splice(index, 1)
    render()
  }

  // Renders everything
  render(){
    this.graph.clear()
    this.drawAxis();
    this.functions.forEach(func => func && this.drawFunction(func.f, func.color, func.width))
  }

  drayAxis() {
    // X axis
    this.graph.drawLine(this.WIN.LEFT, 0, this.WIN.LEFT + this.WIN.width, 0, 'black')
    // Y axis 
    this.graph.drawLine(this.WIN.BOTTOM, 0, this.WIN.BOTTOM + this.WIN.height, 0, 'black')

    // Subdivisions
    for (var i = Math.ceil(WIN.left); i < WIN.left + WIN.width; i++) 
      graph.line(i, WIN.bottom, i, WIN.bottom + WIN.height, '#0003')
    for (var i = Math.floor(WIN.left); i > WIN.left; i--) 
      graph.line(i, WIN.bottom, i, WIN.bottom + WIN.height, '#0003')
    for (var i = Math.ceil(WIN.bottom); i < WIN.bottom + WIN.height; i++)
      graph.line(WIN.left, i, WIN.left + WIN.width, i, '#0003')
    for (var i = Math.floor(WIN.bottom); i > WIN.bottom; i--)
      graph.line(WIN.left, i, WIN.left + WIN.width, i, '#0003')

  }

  drawFunction(f, color, width, n = 200) {
    let x = this.WIN.LEFT
    const dx = this.WIN.WIDTH / n

    while(x <= this.WIN.width + this.WIN.LEFT){
      const isDashed = Math.abs(f(x + dx) - f(x)) >= this.WIN.height
      this.graph.drawLine(x, f(x), x+dx, f(x+dx), color, width, isDashed)
      x+=dx
    }
    // Draw function name as text here
  }

  getZero(f, a, b, eps = 0.001) {
    if (f(a) * f(b) > 0)
      return null
    if (Math.abs(f(a) - f(b)) <= eps)
      return (a + b) / 2
    const half = (a + b) / 2;
    if (f(a) * f(half) <= eps)
      return this.getZero(f, a, half, eps)
    if (f(half) * f(b) <= eps)
      return this.getZero(f, half, b, eps)
  }

}


