import React from "react";

export default class SecondComponent extends React.Component {
    constructor (props){
        super(props);
    }
    
    render () {
        return (
            <h1>
                <p>Hi - {this.props.name}</p>
                <p>Youre welcomed by {this.props.newpropsname}</p>
            </h1>
        );
    }
}