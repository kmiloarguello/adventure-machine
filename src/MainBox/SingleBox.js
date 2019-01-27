import React, { Component } from 'react'

export default class MainBox extends Component {
    render() {
        return (
            <li 
                data-sound={this.props.dataSound}
                onClick={this.props.onClick}
                className={this.props.className}
                >
            </li>
        )
    }
}







 