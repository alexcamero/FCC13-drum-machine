import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import $ from "jquery";

const letters = ['Q','W','E','A','S','D','Z','X','C'];

const audioConnection = [{'Q':'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
'W': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
'E': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
'A': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
'S': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
'D': 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
'Z': 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
'X': 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
'C': 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'},

{'Q': 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
'W': 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
'E': 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
'A': 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
'S': 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
'D': 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
'Z': 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
'X': 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
'C': 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'}];

const namesOfThings = [{'Q':'hot one', 'W': 'baddybone', 'E': 'jumbo trombone', 'A': 'haze fx', 'S': 'killme', 'D': 'lazer', 'Z': 'zzzz', 'X': 'The Hapsburg', 'C': 'Clive Owen'},{'Q':'rascal', 'W': 'The Dancer', 'E': 'whiskers', 'A': 'mix it up', 'S': 'UHOH', 'D': 'Bring Me Back', 'Z': 'God Effect', 'X': 'work', 'C': 'believeIT'}];

const Logo = () => {
  return (
    <div id="logo"><p>Alexander <i class="fa fa-line-chart"></i></p></div>
  );
}

const DrumPad = (props) => {
  
  const what = () => props.what(props.letter);
  
  return (
    <button id={props.letter + "AUDIO"} className="drum-pad" style={{gridArea: props.letter}} onClick={what}>
      {props.letter}
      <audio id={props.letter} className="clip" preload="auto" src={audioConnection[props.style][props.letter]} />
    </button>
  );
}

const Pad = (props) => {
  return (<div id="pad">{letters.map(l => (<DrumPad letter={l} style={props.style} power={props.power} what={props.what} volume={props.volume} />))}</div>)
}

const Controls = (props) => {
  return (
    <div id="controls">
      <Switch name="Power" response={props.power} value={props.powerVal} />
      <WordArea display="hey everyone" what={props.what} />
      <input type="range" min="0" max="1" step="0.1" value={props.volume} className="volumeSlider" onChange={props.volumeChange} />
      <Switch name="Bank" response={props.bank} value={props.styleVal} />
    </div>
  );
}

const Switch = (props) => {
  return (
    <div className="switchAndName">
      <h2>{props.name}</h2>
      <label class="switch">
        <input type="checkbox" onChange={props.response} checked={props.value} />
        <span class="slider"></span>
      </label>
    </div>
  );
}

const WordArea = (props) => {
  return (
    <div className="wordArea"><h3>{props.what}</h3></div>
  );
}


class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      style: false,
      mostRecent: '',
      volume: 0.6
    }
    this.power = this.power.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.whatPlayedLast = this.whatPlayedLast.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
  }
  
  power() {
    this.setState(state => {
      return state.power ? {power: false, mostRecent: ''} : {power: true, mostRecent: ''};
    });
  }
  
  changeStyle() {
    this.setState(state => {
      return state.style ? {style: false, mostRecent: 'Main Stack'} : {style: true, mostRecent: 'Organic Fun'};
    });
  }
  
  whatPlayedLast(letter) {
    this.setState(state => {
      return {mostRecent: namesOfThings[state.style ? 0 : 1][letter]};
    });
  }
  
  volumeChange(event) {
    this.setState({volume: event.target.value});
    for (let i = 0; i < letters.length; i++) {
      document.getElementById(letters[i]).volume = event.target.value;
    }
  }
  
  componentDidMount() {
    
    for (let i=0; i< letters.length; i++) {
      $("#"+letters[i]+'AUDIO').click(() => {
        document.getElementById(letters[i]).play();
      });
    }
    $(document).keypress(e => {
        if (letters.includes(e.key.toUpperCase())) {
          $("#" + e.key.toUpperCase() + "AUDIO").click();
        }
      });
  }
  
  componentDidUpdate() {
    
    for (let i=0; i< letters.length; i++) {
      $("#"+letters[i]+'AUDIO').off();
      if (this.state.power) {
        $("#"+letters[i]+'AUDIO').click(() => {
          document.getElementById(letters[i]).play();
        });
      }
    }
  }
  
  render() {
    return (
      <div id="display">
        <Logo />
        <div id="subdisplay">
          <Pad style={this.state.style ? 1 : 0} power={this.state.power} what={this.whatPlayedLast} volume={this.state.volume} />
          <Controls power={this.power} bank={this.changeStyle} powerVal={this.state.power} styleVal={this.state.style} what={this.state.mostRecent} volume={this.state.volume} volumeChange={this.volumeChange} />
        </div>
      </div>
    );
  }
}
      
      
ReactDOM.render(<Display />, document.getElementById('drum-machine'));
