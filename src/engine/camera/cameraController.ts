import { Container } from "pixi.js";

export class CameraController {

  private isDragging = false;
  private lastPointerX = 0;
  private lastPointerY = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly target: Container
  ) {
    this.canvas.addEventListener("contextmenu", this.handleContextMenu);
    this.canvas.addEventListener("pointerdown", this.handlePointerDown);
    window.addEventListener("pointermove", this.handlePointerMove);
    window.addEventListener("pointerup", this.handlePointerUp);
  }

  private handleContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  private handlePointerDown = (event: PointerEvent): void => {
    // Right mouse button
    if (event.button !== 2) {
      return;
    }

    this.isDragging = true;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    console.log('Pointer down at:', event.clientX, event.clientY);
    
  };

  private handlePointerMove = (event: PointerEvent): void => {
    if (!this.isDragging) {
      return;
    }

    const deltaX = event.clientX - this.lastPointerX;
    const deltaY = event.clientY - this.lastPointerY;

    this.target.position.x += deltaX;
    this.target.position.y += deltaY;

    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
  };

  private handlePointerUp = (): void => {
    this.isDragging = false;
  };

  public destroy(): void {
    this.canvas.removeEventListener("contextmenu", this.handleContextMenu);
    this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerup", this.handlePointerUp);
  }
}