import React, { Component } from 'react';
import { Dial } from 'react-nexusui';
import Tone from 'tone';

//Import Siren interface
import { SirenModel } from '../models/SirenModel';

// Set the model of the state we need so Typescript intellisense works
export interface State {
    volume: number;
    tone: number;
    mod: number;
    isPlaying: Boolean;
}
export default class Syren extends Component<SirenModel, State> {
    osc: any;
    lfo:any;
    ctx: AudioContext;

    constructor(props) {
        super(props);
        // eslint-disable-next-line
        this.ctx = new AudioContext;
        this.osc = new Tone.Oscillator(440, 'sine').toMaster();
        this.lfo = new Tone.LFO(0, 0, 400);
        this.lfo.connect(this.osc.frequency).start();
        this.state = {
            volume: 1,
            tone: 120,
            mod: 0,
            isPlaying: false
        };
        // This binding is necessary to make `this` work in the callback
        this.trigger = this.trigger.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.setTone = this.setTone.bind(this);
        this.setMod = this.setMod.bind(this);

    }

    trigger() {
        if (this.state.isPlaying === false) {
            this.playSound();
        }
        else {
            this.stopSound();
        }
        this.setState( { isPlaying : !this.state.isPlaying })
    }

    playSound() {
        this.osc.start();
    }
    stopSound() {
        this.osc.stop();
    }
    setVolume(v) {
        this.setState( { volume : v })
        return  this.osc.volume.value = v;
    }
    setTone(v) {
        this.setState( { tone : v })
        return  this.osc.frequency.value = v;
    }
    setMod(v) {
        this.setState( { mod : v })
        return  this.lfo.frequency.value = v;
    }

    render() {
        return (
            <div className="syren__container">
                <h1>Dub Siren</h1>
                <div className="dial__container">
                    <div className="dial__slot trigger__slot">
                        <div onClick={this.trigger} className="trigger">
                        </div>
                        <p>TRIGGER</p>
                    </div>
                    <div className="dial__slot volumen">
                        <Dial interaction={"radial"} onChange={this.setVolume} value={this.state.volume} min={-100} max={1}/>
                        <p>VOLUME</p>
                    </div>
                    <div className="dial__slot tone">
                        <Dial interaction={"radial"} onChange={this.setTone} value={this.state.tone} min={0} max={880}/>
                        <p>TONE</p>
                    </div>
                    <div className="dial__slot mod">
                        <Dial interaction={"radial"} onChange={this.setMod} value={this.state.mod} min={0} max={10}/>
                        <p>MOD</p>
                    </div>
                </div>
            </div>
        )
    }
}
