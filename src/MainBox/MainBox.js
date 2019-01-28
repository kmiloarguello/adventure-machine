import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import SingleBox from "./SingleBox.js";
import sounds from "./sounds.js";
import Buffer from "./Buffer.js";
import Sound from "./Sound.js";

// import Worlds from "../sounds/worlds_mezcla.mp3";

let AudioContext = window.AudioContext || window.webkitAudioContext;

export default class MainBox extends Component {
  constructor(props) {
	super(props);
	this.state = {
		isPlaying0: false,
		isPlaying1: false,
		isPlaying2: false,
		isPlaying3: false,
		isPlaying4: false,
		isPlaying5: false,
		isPlaying6: false,
		isPlaying7: false,
		isPlaying8: false,
		hasEnded: false,
		shouldEnd: false,
		counter: 0,
		tInicialCancion: 0,
		tFinalCancion: 0,
		currentTime: 0
	}
    this.playSoundA = this.playSoundA.bind(this);
    this.audioContext = new AudioContext();
    this.buffer = new Buffer(this.audioContext, sounds);
    this.buffer.loadAll();
  }
  playSoundA(e) {
	
	let index = parseInt(e.target.getAttribute("data-sound"), 10);

	switch (index) {
		case 0:
			this.handleSound(0,e);
			break;
		case 1:
			this.handleSound(1,e)
			break;
		case 2:
			this.handleSound(2,e)
			break;
		case 3:
			this.handleSound(3,e)
			break;
		case 4:
			this.handleSound(4,e)
			break;
		case 5:
			this.handleSound(5,e)
			break;
		case 6:
			this.handleSound(6,e)
			break;
		case 7:
			this.handleSound(7,e)
			break;
		case 8:
			this.handleSound(8,e)
			break;
		default:
			this.handleSound(0,e)
			break;
	}
	this.setState({
		counter: this.state.counter + 1
	})


  }
  handleSound(index,e){
	var sound = new Sound(this.audioContext, this.buffer.getSoundByIndex(index));
	var hasActive = e.target.classList.contains("active");

	if(!hasActive){
		// console.log("",sound.buffer.duration)
		if(this.state.counter > 0){

			this.setState({
				tInicialCancion : sound.context.currentTime,
				tFinalCancion: this.state.tInicialCancion + sound.buffer.duration,
				currentTime: this.state.tFinalCancion - sound.context.currentTime
			})

			// TODO: Setear el valor que debe esperar la nueva cancion antes de reproducir
			sound.play(Math.round(Math.abs(this.state.currentTime)));	
			
		}else{
			sound.play(0);
		}
		
		this.setState({
			["isPlaying" + index] : sound
		})
		e.target.classList.add("active");

	}else{
		this.state["isPlaying" + index].shouldStopSong(e.target);
		// console.log("duracion", this.state["isPlaying" + index].buffer.duration )
	}
  }
  render() {
    return (
      <div className="container">
        <Row>
          <div className="contenedor valign-wrapper">
            <ul>
              <SingleBox dataSound={0} className={"box-green"} onClick={this.playSoundA} />
              <SingleBox dataSound={1} className={"box-red"} onClick={this.playSoundA} />
              <SingleBox dataSound={2} className={"box-red"} onClick={this.playSoundA} />
              <SingleBox dataSound={3} className={"box-blue"} onClick={this.playSoundA} />
              <SingleBox dataSound={4} className={"box-green"} onClick={this.playSoundA} />
              <SingleBox dataSound={5} className={"box-red"} onClick={this.playSoundA} />
              <SingleBox dataSound={6} className={"box-blue"} onClick={this.playSoundA} />
              <SingleBox dataSound={7} className={"box-blue"} onClick={this.playSoundA} />
              <SingleBox dataSound={8} className={"box-green"} onClick={this.playSoundA} />
            </ul>
          </div>
        </Row>
        <Row>
          <Col s={12} m={6} >
            <p className="range-field left">
              <label>
                <input
                  type="range"
                  id="volume-control"
                  min="0"
                  max="100"
                  className="slider-control"
                />
                <span>Volume</span>
              </label>
            </p>
          </Col>
          <Col s={12} m={6} >
            <p className="range-field right">
              <a href="#">About</a>
            </p>
          </Col>
        </Row>
		<Row>
			<Col s={12} className="legals">
				<small>{new Date().getFullYear()} | Camilo Λrguello ®</small>
			</Col>
		</Row>
      </div>
    );
  }
}
