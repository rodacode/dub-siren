import React, { Component } from 'react';
import { Dial } from 'react-nexusui';
import Tone from 'tone';

export default class Syren extends Component {
    osc: any;
    mod:any;
    ctx: AudioContext;
    playing: Boolean = false;

    constructor(props) {
        super(props);
        // eslint-disable-next-line
        this.ctx = new AudioContext;
        this.osc = new Tone.Oscillator(440, 'sine').toMaster();
        this.mod = new Tone.LFO(0, 0, 400);
        this.mod.connect(this.osc.frequency).start();
        this.state = {
            volume: 1,
            tone: 120,
            mod: 0,
            mod_rate: 0,
        };
        //SEt intial volume
        this.osc.volume.value = -10;
        // This binding is necessary to make `this` work in the callback
        this.trigger = this.trigger.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.setTone = this.setTone.bind(this);
        this.setMod = this.setMod.bind(this);

    }

    trigger() {
        console.log('sound!!!');
        if (this.playing === false) {
            this.playSound();
        }
        else {
            this.stopSound();
        }
        this.playing = !this.playing;
    }

    playSound() {
        this.osc.start();
    }
    stopSound() {
        this.osc.stop();
    }
    setVolume(value) {
        return  this.osc.volume.value = value;
    }
    setTone(value) {
        return  this.osc.frequency.value = value;
    }
    setMod(value) {
        return  this.mod.frequency.value = value;
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
                        <Dial interaction={"radial"} onChange={this.setVolume} value={-100} min={-100} max={1}/>
                        <p>VOLUME</p>
                    </div>
                    <div className="dial__slot tone">
                        <Dial interaction={"radial"} onChange={this.setTone} value={200} min={0} max={880}/>
                        <p>TONE</p>
                    </div>
                    <div className="dial__slot mod">
                        <Dial interaction={"radial"} onChange={this.setMod} value={0} min={0} max={10}/>
                        <p>MOD</p>
                    </div>
                </div>
            </div>
        )
    }
}
