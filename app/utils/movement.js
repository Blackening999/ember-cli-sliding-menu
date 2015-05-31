/**
 * Movement Class
 * Support Hammer and custom horizontal sliding
 */
class Movement {
  constructor(event) {
    this.initiated = false;
    if (event) { this.push(event); }
  }

  /**
   * Save initX and lastX
   * @param event
   */
    push(event) {
    this.speedX = event.velocityX;
    if (!this.initiated) {
      this.initX = event.changedPointers[0].pageX;
      this.initiated = true;
      return;
    }
    this.lastX = event.changedPointers[0].pageX;
  }
}

export default Movement;
