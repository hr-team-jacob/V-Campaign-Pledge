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
      .post(`/product${path}`, { amount: this.state.inputVal })
      .then(() => this.props.fetchProduct())
      .then(response => console.log('Added pledge -->'))
      .catch(error => console.log('Error adding pledge -->', error));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='pledge'>
          <h4>Make a pledge without a reward</h4>
          <input
            type='text'
            value={this.state.inputVal}
            onChange={this.handleChange}
          />
          <input type='submit' value='Continue' />
        </form>
      </div>
    );
  }
}

export default Pledge;
