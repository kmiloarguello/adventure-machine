import React, { Component } from 'react'
import {Row} from 'react-materialize'
import SingleBox from './SingleBox.js'

export default class MainBox extends Component {
  render() {
    return (
      <div className="container">
        <Row>
          <div className='contenedor valign-wrapper'>
            <ul>
              <SingleBox />
            </ul>
          </div>
        </Row>
      </div>
    )
  }
}

 