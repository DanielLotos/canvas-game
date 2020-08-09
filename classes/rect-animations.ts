type RectParams = {
  x: number;
  y: number;
  w: number;
  h: number;
  dx: number;
  dy: number;
};

export class RectAnimations {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  rectParams: RectParams;

  constructor() {
    const canvasNode = document.createElement("canvas");
    canvasNode.setAttribute("id", "game");
    document.body.appendChild(canvasNode);

    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.canvas.width = window.innerWidth - 40;
    this.canvas.height = window.innerHeight - 40;
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle = "green";

    this.rectParams = {
      x: 10,
      y: 20,
      w: 50,
      h: 50,
      dx: 5,
      dy: 5,
    };
  }

  public update(time?: number): void {
    this.clear();

    this.drawRect();

    this.rectParams.x += this.rectParams.dx;
    this.rectParams.y += this.rectParams.dy;

    if (
      this.rectParams.x + this.rectParams.w > this.canvas.width ||
      this.rectParams.x < 0
    ) {
      this.rectParams.dx *= -1;
    }

    if (
      this.rectParams.y + this.rectParams.h > this.canvas.height ||
      this.rectParams.y < 0
    ) {
      this.rectParams.dy *= -1;
    }

    requestAnimationFrame(() => this.update());
  }

  private drawRect(): void {
    this.ctx.fillRect(
      this.rectParams.x,
      this.rectParams.y,
      this.rectParams.w,
      this.rectParams.h
    );
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const rectAnimations = new RectAnimations();
rectAnimations.update();
