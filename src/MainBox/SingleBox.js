import React, { Component } from 'react'
import Sound from '../sounds/01.mp3'


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
      Sound,
      Sound
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading() {
}

function playSound(buffer, time){
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(time);  
}


function startPlayingRhythm(bufferList) {
    var beat = bufferList[0];
    var startTime = context.currentTime + 0.100;
    console.log(beat)

    playSound(beat, startTime);
}

export default class MainBox extends Component {
    constructor(props){
        super(props)
        this.playSound = this.playSound.bind(this)
    }
    componentDidMount(){
        init()
    }
    playSound(){
        startPlayingRhythm(bufferLoader.bufferList)
    }
    render() {
        return (
            <li onClick={this.playSound}></li>
        )
    }
}







 