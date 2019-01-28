
let self;

export default class Sound {
    constructor(context, buffer) {
        self = this;
        this.context = context;
        this.buffer = buffer;

        this.hasStopped = this.hasStopped.bind(this);
        // this.shouldStopSong = this.shouldStopSong.bind(this);
    }

    init() {
        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
    }

    play(value) {
        this.init();
        this.source.loop = true;
        this.source.start(value);
        console.log("value",value)
    }
    setTimes(duration,currentTime){
        this.duration = duration;
        this.currentTime = currentTime;
    }
    shouldStopSong(elem){
        // Stop looping to achieve when audio has ended
        this.source.loop = false;
        this.source.onended = function() {
            console.log(self)
            self.hasStopped(elem);
        }
    }
    hasStopped(elem){
        console.log("Stopped")
        elem.classList.remove("active");
    }
    stop() {
        // this.gainNode.gain.exponentialRampToValueAtTime(
        //     0.001,
        //     this.context.currentTime + 0.5
        // );
        this.source.stop(this.context.currentTime + 0.5);
    }
}
