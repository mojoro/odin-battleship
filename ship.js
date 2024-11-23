class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.sunk = false;
    this.coords = [];
    this.direction = null;
    this.previousDirection = null;
    this.previousCoords = [];
  }

  hit() {
    this.hits++;
    return this;
  }

  isSunk() {
    if (this.hits >= this.size) {
      return true;
    } else return false;
  }

  addCoords(coords) {
    this.coords.push(coords);
    this.previousCoords = this.coords;
  }

  clearCoords() {
    this.coords = [];
  }

  addDirection(direction) {
    this.direction = direction;
    this.previousDirection = direction;
  }

  clearDirection() {
    this.direction = null;
  }
}

export { Ship };
