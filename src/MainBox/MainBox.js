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
			this.sound = new Sound(this.audioContext, this.buffer.getSoundByIndex(0));
			var hasActive = e.target.classList.contains("active");

			if(!hasActive){
				this.sound.play();
				this.setState({
					hasEnded : this.sound
				})
				e.target.classList.add("active");

			}else{
				this.state.hasEnded.shouldStopSong(e.target)
			}

			break;
		case 1:
			this.sound1 = new Sound(this.audioContext, this.buffer.getSoundByIndex(1));
			this.sound1.play()
			if(e.target.classList.contains("active")){
				this.sound1.shouldStopSong(e.target);
			}else{
				e.target.classList.add("active");
			}
			break;
		case 3:
			this.sound2 = new Sound(this.audioContext, this.buffer.getSoundByIndex(2));
			this.sound2.play()
			if(e.target.classList.contains("active")){
				this.sound2.shouldStopSong(e.target);
			}else{
				e.target.classList.add("active");
			}
		default:
			this.sound = new Sound(this.audioContext, this.buffer.getSoundByIndex(0));
			this.sound.play()
			if(e.target.classList.contains("active")){
				this.sound.shouldStopSong(e.target);
			}else{
				e.target.classList.add("active");
			}
			break;
	}

	





	











	// // let activeClass = document.querySelectorAll("li.active"); 
	// let index = parseInt(e.target.getAttribute("data-sound"));
	
	// if(!this.state["isPlaying" + index]){

	// 	console.log("Sound" + index)
	// 	this.sound = new Sound(this.audioContext, this.buffer.getSoundByIndex(index));

	// 	if(e.target.classList.contains("active")){
	// 		e.target.classList.remove("active");
	// 		this.sound.stop()
	// 	}

	// 	this.sound.play();
	
	// 	e.target.classList.add("active");

	// 	this.setState({
	// 		["isPlaying" + index ] : true
	// 	})
		
	
	// }else{
	// 	e.target.classList.remove("active");
	// 	//this.sound.setTimes(this.sound.buffer.duration,this.sound.context.currentTime);
	// 	//if(this.sound) this.sound.stop();
	// 	// 	e.target.classList.add("disabled");
	// }
	
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
