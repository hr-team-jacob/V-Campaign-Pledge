import React from 'react';
import axios from 'axios';

class Pledge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputVal: event.target.value });
  }

  handleSubmit(event) {
    var path = window.location.pathname;
    axios
      .post(`/${path}`, { amount: this.state.inputVal })
      .then(response => console.log('Added pledge -->', response.data))
      .catch(error => console.log('Error adding pledge -->', error));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Make a pledge without a reward
          <input
            type='text'
            value={this.state.inputVal}
            onChange={this.handleChange}
          />
        </label>
        <input type='submit' value='Continue' />
      </form>
    );
  }
}

export default Pledge;
