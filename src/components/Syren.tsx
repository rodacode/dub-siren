import React, { Component } from 'react';
import { Dial } from 'react-nexusui';
import Tone from 'tone';

//import { Siren } from '../engines/siren';

interface State {
    volume: number;
    tone: number;
    mod: number;
    mod_rate: number;
    playing: Boolean;
}
interface SirenProps {

}

export default class Syren extends Component {
    osc: any;
    ctx: AudioContext;
    playing: Boolean = false;

    constructor(props) {
        super(props);
        // eslint-disable-next-line
        this.ctx = new AudioContext;
        this.osc = new Tone.Oscillator(440, 'sine').toMaster()
        this.state = {
            volume: 1,
            tone: 120,
            mod: 0,
            mod_rate: 0,
        };
        // This binding is necessary to make `this` work in the callback
        this.trigger = this.trigger.bind(this);
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
                        <Dial />
                        <p>VOLUME</p>
                    </div>
                    <div className="dial__slot tone">
                        <Dial />
                        <p>TONE</p>
                    </div>
                    <div className="dial__slot mod">
                        <Dial />
                        <p>MOD</p>
                    </div>
                    <div className="dial__slot rate">
                        <Dial />
                        <p>RATE</p>
                    </div>
                </div>
            </div>
        )
    }
}
