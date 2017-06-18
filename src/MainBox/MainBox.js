import React, { Component } from 'react'
import {Row} from 'react-materialize'
import SingleBox from './SingleBox.js'
import Worldsbeat from '../sounds/01.mp3'
import Worlds from '../sounds/worlds_mezcla.mp3'


function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount === loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

let context, bufferLoader;

function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      Worldsbeat,
      Worlds
    ],
    finishedLoading
    )

  bufferLoader.load();
}

function finishedLoading() {
}

function playSound(buffer, time){
  let source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source.start(time)
}

function startPlayingRhythm(bufferList, song) {
  let beat = bufferList[song]
  let startTime = context.currentTime + 0.001
  let tempo = 150
  let quarterNoteTime = 60 / tempo

  playSound(beat, startTime)

}

export default class MainBox extends Component {
  constructor(props){
      super(props)
      this.playSoundA = this.playSoundA.bind(this)
  }
  componentDidMount(){
      init()
  }
  playSoundA(){
      startPlayingRhythm(bufferLoader.bufferList, 0)
  }
  playSoundB(){
      startPlayingRhythm(bufferLoader.bufferList, 1)
  }    
  render() {
    return (
      <div className="container">
        <Row>
          <div className='contenedor valign-wrapper'>
            <ul>
              <SingleBox onClick={this.playSoundA}/>
              <SingleBox onClick={this.playSoundB}/>
              <SingleBox onClick={this.playSoundA}/>
              <SingleBox onClick={this.playSoundB}/>
              <SingleBox onClick={this.playSoundA}/>
              <SingleBox onClick={this.playSoundB}/>
              <SingleBox onClick={this.playSoundA}/>
              <SingleBox onClick={this.playSoundB}/>
              <SingleBox onClick={this.playSoundA}/>

            </ul>
          </div>
        </Row>
      </div>
    )
  }
}

 