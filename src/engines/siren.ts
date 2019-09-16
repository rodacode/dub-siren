import { SirenEngine } from './engines';

export class Siren implements SirenEngine {
    private ctx: AudioContext;
    public tone: number;
    public mod: number;
    private osc: any;
    public volume: number;
    public mod_rate: number;
    private gain: any;


    constructor(ctx: AudioContext) {
        this.ctx = ctx;
        this.tone = 167.1;
        this.volume = 1;
        this.mod = 0.5;
        this.mod_rate = 0;
        this.gain = 9;


    }
    setup() {
        this.osc = this.ctx.createOscillator();
        this.osc.type = 'sine'
        this.gain = this.ctx.createGain();
        this.osc.connect(this.gain);
    }
    trigger(time: number) {
        if (this.volume === 0) { return };
        this.osc.start(time);
        this.osc.stop(time);
    }

    setTone = (tone: number) => {
        this.tone = tone;
    }

    setVolume = (vol: number) => {
        this.volume = vol;
    }
    setMod = (mod: number) => {
        this.mod = mod;
    }
    setMod_rate = (mod_rate: number) => {
        this.mod_rate = mod_rate;
    }
}