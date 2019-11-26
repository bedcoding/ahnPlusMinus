import React, { Component } from 'react';
import './InputBox.css';


class inputbox extends Component {  
  state = {
    focused: false,
  }

  componentDidMount() {
    this.input.addEventListener('focus', this.focus);
    this.input.addEventListener('blur', this.focus);
  }

  focus = () => {    
    this.setState((state) => ({ focused: !state.focused }))  
  }

  blur = () => {
    
  }
 
  
  render() {

    return (
      <div>
        <div>
          <input
            type="number" 
            value={this.props.inputCount} 
            onChange={this.props.onChangeInputCount}
            ref={input => this.input = input}
            className={['input', this.state.focused && 'input-focused'].join(' ')}
          />
        </div>
      </div>
    );
  }
}

export default inputbox;
