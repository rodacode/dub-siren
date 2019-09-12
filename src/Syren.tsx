import React, { Component } from 'react'; // let's also import Component

import { Dial } from 'react-nexusui';

export default class Syren extends Component {
    render() {
        return (
            <div className="syren__container">
                    <h1>Dub Siren</h1>
                <div className="dial__container">
                <div className="dial__slot trigger__slot">
                        <div className="trigger">
                        </div>
                        <p>TRIGGER</p>
                    </div>                    
                    <div className="dial__slot volumen">
                        <Dial />
                        <p>VOLUMEN</p>
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
