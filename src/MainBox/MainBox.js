import React, { Component } from "react";
import { Row } from "react-materialize";
import SingleBox from "./SingleBox.js";
import sounds from './sounds.js';
import Buffer from "./Buffer.js";
import Sound from "./Sound.js";

// import Worlds from "../sounds/worlds_mezcla.mp3";

let AudioContext = window.AudioContext || window.webkitAudioContext;

export default class MainBox extends Component {
  constructor(props) {
	super(props);
	this.playSoundA = this.playSoundA.bind(this);
	this.audioContext = new AudioContext();
	this.buffer = new Buffer(this.audioContext, sounds);
	this.buffer.loadAll();
  }
  playSoundA(){
	this.sound = new Sound(this.audioContext,this.buffer.getSoundByIndex(0));
	this.sound.play();
  }
  render() {
    return (
      <div className="container">
        <Row>
          <div className="contenedor valign-wrapper">
            <ul>
              <SingleBox onClick={this.playSoundA} />
              {/*<SingleBox onClick={this.playSoundB} />
              <SingleBox onClick={this.playSoundA} />
              <SingleBox onClick={this.playSoundB} />
              <SingleBox onClick={this.playSoundA} />
              <SingleBox onClick={this.playSoundB} />
              <SingleBox onClick={this.playSoundA} />
              <SingleBox onClick={this.playSoundB} />
              <SingleBox onClick={this.playSoundA} />*/}
            </ul>
          </div>
        </Row>
      </div>
    );
  }
}
