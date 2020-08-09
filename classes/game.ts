import { Player } from "./player";
import { InputHandler } from "./input-handler";

export class Game {
  canvasID: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;

  constructor(canvasID: string) {
    this.canvasID = canvasID;
    this.init();

    this.player = new Player(this.canvas, this.ctx);
    new InputHandler(this.player);

    this.loop();
  }

  private init(): void {
    this.createCanvasElement();
    this.getContext();
  }

  private createCanvasElement(): void {
    const canvasNode = document.createElement("canvas");
    canvasNode.setAttribute("id", this.canvasID);
    document.body.appendChild(canvasNode);
  }

  private getContext(): void {
    this.canvas = document.getElementById(this.canvasID) as HTMLCanvasElement;
    this.canvas.width = window.innerWidth - 40;
    this.canvas.height = window.innerHeight - 40;
    this.ctx = this.canvas.getContext("2d");
  }

  private loop(): void {
    this.clear();
    this.player.update();

    requestAnimationFrame(() => this.loop());
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
