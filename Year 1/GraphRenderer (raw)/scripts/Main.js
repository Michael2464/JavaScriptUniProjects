class Main {
  constructor() {
    this.functions = []

    this.canMove = false;

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
        wheel: () => this.wheel(),
        mouseUp: () => this.mouseUp(),
        mouseDown: () => this.mouseDown(),
        mouseMove: () => this.mouseMove(),
        mouseLeave: () => this.mouseLeave()
      }
    })

    this.ui = new UI(this.functions, {
      addFunction: (f, num) => this.addFunction(f, num),
      delFunction: (index) => this.delFunction(index)
    })
  }

  wheel(event) {
    const delta = (event.wheelDelta > 0) ? -this.zoomStep : this.zoomStep
    this.WIN.width += delta;
    this.WIN.height += delta;
    this.WIN.left -= delta * 0.5;
    this.WIN.bottom -= delta * 0.5;

    this.render(); 
  }

  mouseUp() { canMove = false; }
  mouseDown() { canMove = true; }
  mouseMove(event){
    if(this.canMove) {
      this.WIN.LEFT -= this.graph.sx(event.movementX);
      this.WIN.BOTTOM -= this.graph.sy(event.movementY);
      this.render();
    }
  }
  mouseLeave() { canMove = false; }

  onAddFunction(f, num, tan = false) {
    this.functions[num] = {
      f,
      color: '#f00',
      width: 2,
      tangent: tan
    }
    render()
  }

  onDeleteFunction(index) {
    this.functions.splice(index, 1)
    render()
  }

  toggleMenu() {
    const subMenu = document.getElementById("menuWrap")
    subMenu.classList.toggle("open-menu")
  }

  // Renders everything
  render() {
    this.graph.clear()
    this.drawAxis()
    this.functions.forEach(func => func && this.drawFunction(func.f, func.color, func.width, func.tangent))
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

  drawFunction(f, color, width, tan = false, isDashed = false, n = 200) {
    let x = this.WIN.LEFT
    const dx = this.WIN.WIDTH / n

    while (x <= this.WIN.width + this.WIN.LEFT) {
      const dash = isDashed || Math.abs(f(x + dx) - f(x)) >= this.WIN.height
      this.graph.drawLine(x, f(x), x + dx, f(x + dx), color, width, dash)
      x += dx
    }
    // Draw function name as text here
    if (tan)
      this.drawTangentFunction(f, 1) // test, actually pass mouseX coordinate here
  }

  drawTangentFunction(f, x, dx = 0.001) {
    // y = ax + b
    const a = (f(x + dx) - f(x)) / dx
    const b = f(x) - a * x
    let tanF = (x) => a * x + b

    this.drawFunction(tanF, 'blue', 2, true)
  }

  // 25.11.2023
  getIntegral(f, a, b, subDiv=1000){
    const dx = (b-a)/subDiv
    let x = a
    let sum = 0;
    while(x <= b){
      sum += 0.5 * dx * (Math.abs(f(x)) + Math.abs(f(x+dx)))
    }
    return sum;
  }  

  drawIntegral(f, a, b, subDiv=100){
    if(a == b)
      return

    const dx = (b-a)/subDiv
    let x = a
    const points = [{x, y:0}]
    while(x <= b){
      x += dx
      points.push({x, y:f(x)})
    }
    points.push({x:b, y:0})
    this.graph.drawPolygon(points)
  }

  getDimensionsHandle() {
    this.graph.width = window.innerWidth
    this.graph.height = window.innerHeight
    render()
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
