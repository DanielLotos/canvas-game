import { Player } from "./player";

export class InputHandler {
  player: Player;
  keyDownHandler: (e: KeyboardEvent) => void;
  keyUpHandler: (e: KeyboardEvent) => void;

  constructor(player: Player) {
    this.player = player;

    this.keyDownHandler = (e) => {
      if (e.key === "ArrowRight" || e.key === "Right") {
        this.player.moveRight();
      } else if (e.key === "ArrowLeft" || e.key === "Left") {
        this.player.moveLeft();
      } else if (e.key === "ArrowUp" || e.key === "Up") {
        this.player.moveUp();
      } else if (e.key === "ArrowDown" || e.key === "Down") {
        this.player.moveDown();
      }
    };

    this.keyUpHandler = (e) => {
      if (
        e.key === "ArrowRight" ||
        e.key === "Right" ||
        e.key === "ArrowLeft" ||
        e.key === "Left"
      ) {
        this.player.stopH();
      } else if (
        e.key === "ArrowUp" ||
        e.key === "Up" ||
        e.key === "ArrowDown" ||
        e.key === "Down"
      ) {
        this.player.stopV();
      }
    };

    this.initEventHandlers();
  }

  private initEventHandlers(): void {
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  }
}
