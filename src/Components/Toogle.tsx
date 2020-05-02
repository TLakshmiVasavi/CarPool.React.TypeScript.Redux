import React, { Component } from "react";
import '../StyleSheets/Toogle.css';

interface IProps
{
  isChecked:Boolean
  handleChecked():void
}

class ToggleSwitch extends Component<IProps,{}> {
  constructor(props:IProps) {
    super(props);
  }
  
  render() {
    return (
      <label className="switch">
        <input
          type="checkbox"
          className="checkbox"
          onChange={this.props.handleChecked}
        />
        <span className="slider round"></span>
      </label>
    );
  }
}

export default ToggleSwitch;