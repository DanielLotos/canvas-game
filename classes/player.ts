type TPlayerParams = {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  dx: number;
  dy: number;
};

export class Player {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: TPlayerParams;
  playerImage: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    // Get character source image
    this.playerImage = document.getElementById("source") as HTMLImageElement;

    // Style for drawing
    this.ctx.fillStyle = "green";

    // Character params
    this.player = {
      x: 100,
      y: 100,
      w: 80,
      h: 125,
      speed: 5,
      dx: 0,
      dy: 0,
    };
  }

  // UPDATE
  public update(): void {
    this.draw();
    this.updateCharacterPosition();
  }

  // MOVING
  public moveRight(): void {
    this.player.dx = this.player.speed;
  }

  public moveLeft(): void {
    this.player.dx = -this.player.speed;
  }

  public moveUp(): void {
    this.player.dy = -this.player.speed;
  }

  public moveDown(): void {
    this.player.dy = this.player.speed;
  }

  public stopV(): void {
    this.player.dy = 0;
  }

  public stopH(): void {
    this.player.dx = 0;
  }

  private updateCharacterPosition(): void {
    this.player.x += this.player.dx;
    this.player.y += this.player.dy;

    this.detectWall();
  }

  // COLLISION
  private detectWall(): void {
    if (this.player.x < 0) {
      this.player.x = 0;
    }

    if (this.player.x + this.player.w > this.canvas.width) {
      this.player.x = this.canvas.width - this.player.w;
    }

    if (this.player.y < 0) {
      this.player.y = 0;
    }

    if (this.player.y + this.player.h > this.canvas.height) {
      this.player.y = this.canvas.height - this.player.h;
    }
  }

  // DRAWING PLAYER
  private draw(): void {
    this.ctx.drawImage(
      this.playerImage,
      this.player.x,
      this.player.y,
      this.player.w,
      this.player.h
    );
  }
}
