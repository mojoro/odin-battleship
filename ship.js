class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.sunk = false;
    this.coords = [];
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
  }

  clearCoords() {
    this.coords = [];
  }
}

export { Ship };
