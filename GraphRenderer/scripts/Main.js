class Main {

    constructor() {
        this.functions = []

        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
        }

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
            addFunction: (f, num) => this.addFunction(f, num)
        })
    }

    wheel() {
    }

    addFunction(f, num) {
        this.funcs[num] = {
            f,
            color: '#f00',
            width: 2
        };
        render();
    }

    renderFunction() {
      data = data || {}

    data.xMax = data.xMax || this.xMax
    data.xMin = data.xMin || this.xMin
    data.x0 = data.x0 || this.x0
    data.y0 = data.y0 || this.y0
    data.width = data.width || this.width
    data.height = data.height || this.height
    data.lineWidth = data.lineWidth || this.lineWidth
    data.color = data.color || this.color

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    const step = (data.xMax - data.xMin) / data.width

    ctx.font = "6px serif"
    ctx.lineWidth = data.lineWidth || 2;

    ctx.beginPath()
    for (let i = 0; i < F.length; i++) 
    {
      ctx.strokeStyle = data.color || 'red'
      ctx.moveTo(this.xCoord(data.xMin), this.yCoord(F[i](data.xMin)))
      for (let x = data.xMin + step; x <= data.xMax; x += step) 
      {
        const y = F[i](x)

        ctx.lineTo(this.xCoord(x + this.x0), this.yCoord(y + this.y0))
      }
      const x = this.getZero(F[i], this.xCoord(data.xMin), this.xCoord(data.xMax));
      this.drawPoint(ctx, x, F[i](x))
      
      ctx.stroke()
    }
    }

    getZero(f, a, b, eps=0.001){
      if(f(a) * f(b) > 0)
        return null
      if(Math.abs(f(a)-f(b)) <= eps)
        return (a+b)/2
      const half = (a+b)/2;
      if(f(a) * f(half) <= eps)
        return this.getZero(f, a, half, eps)
      if(f(half) * f(b) <= eps)
        return this.getZero(f, half, b, eps)
  }

}


