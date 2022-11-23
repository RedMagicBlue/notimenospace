AFRAME.registerComponent('audio', {
  schema: {
    src: { type: 'audio' },
    loop: { type: 'boolean' },
    volume: { type: 'int', default: 0.1 },
    distance: { type: 'int', default: 1000 },
    fade: { type: 'int', default: 5000 },
  },

  init: function() {
    this.sound = new Howl({
      src: [ this.data.src ],
      loop: this.data.loop,
      volume: this.data.volume
    });

    this.camera = document.getElementById('rig');
  },

  tick: function() {
    const objPos = this.el.object3D.position;
    const camPos = this.camera.object3D.position;
    const distance = objPos.distanceTo(camPos);

    if (!this.audioId && distance < this.data.distance) {
      this.audioId = this.sound.play();
      this.sound.fade(0, 1, this.data.fade, this.audioId);
    }
    else if (this.audioId && distance >= this.data.distance) {
      this.sound.fade(1, 0, this.data.fade, this.audioId);
      this.audioId = null;
    }
  }
});