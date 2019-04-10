import React from 'react';
import axios from 'axios';

class RewardView extends React.Component {
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
      .post(`/${path}`, {
        amount: this.state.inputVal,
        reward: (reward.id = null)
      })
      .then(response => console.log('Added pledge -->', response.data))
      .catch(error => console.log('Error adding pledge -->', error));
    event.preventDefault();
  }

  render() {
    return (
      <div className='reward'>
        {this.props.rewards.map((reward, index) => {
          return (
            <div key={index}>
              <div className='rewardMin'>
                <h2>Pledge ${reward.minimum} or more</h2>
              </div>
              <div className='rewardTitle'>
                <h3>{reward.title}</h3>
              </div>
              <div className='rewardDesc'>
                <p>{reward.description}</p>
              </div>
              <div className='rewardDeliv'>
                <h6>ESTIMATED DELIVERY</h6>
                <h4>{reward.estDelivery}</h4>
              </div>
              <div className='shipsTo'>
                <h6>SHIPS TO</h6>
                <h4>Anywhere in the world</h4>
              </div>
              <div className='numBackers'>
                <h6>{reward.backers} backers</h6>
              </div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Pledge amount
                  <input
                    type='text'
                    value={this.state.inputVal}
                    onChange={this.handleChange}
                  />
                </label>
                <input type='submit' value='Continue' />
              </form>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RewardView;
