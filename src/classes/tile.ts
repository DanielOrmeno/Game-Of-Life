import { GridPosition } from './gridPosition';

export class Tile {
    public alive: boolean;
    public position?: GridPosition;

    constructor(public x: number, public y: number, size: number) {
        this.alive = false;
        this.setPosition(size - 1);
    }

    get isAlive() {
        return this.alive;
    }

    private setPosition(max: number) {
        if (this.x === 0) {
            this.position = this.y === 0 ? GridPosition.TopLeftCorner :
                            this.y === max ? GridPosition.TopRightCorner :
                            GridPosition.TopEdge;
        } else if (this.x === max) {
            this.position = this.y === 0 ? GridPosition.BottomLeftCorner :
                            this.y === max ? GridPosition.BottomRightCorner :
                            GridPosition.BottomEdge;
        } else {
            this.position = this.y === 0 ? GridPosition.LeftEdge :
                            this.y === max ? GridPosition.RightEdge :
                            GridPosition.Inner;
        }
    }
  }

