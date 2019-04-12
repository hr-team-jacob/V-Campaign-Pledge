import React from 'react';
import axios from 'axios';

class RewardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      countries: []
    };

    this.fetchCountries = this.fetchCountries.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchCountries();
  }

  fetchCountries() {
    var path = window.location.pathname;
    axios
      .get(`/countries${path}`)
      .then(response => {
        this.setState({
          countries: response.data
        });
      })
      .catch(error => {
        console.log('error getting countries from API', error);
      });
  }

  handleChange(event) {
    this.setState({ inputVal: event.target.value });
  }

  handleSubmit(event) {
    var path = window.location.pathname;
    var reward = event.target.value;
    axios
      .post(`/reward${path}`, {
        amount: this.state.inputVal,
        reward: event.target.dataset.id
      })
      .then(() => this.props.fetchProduct())
      .then(response => console.log('Added pledge -->'))
      .catch(error => console.log('Error adding pledge -->', error));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {this.props.rewards.map((reward, index) => {
          return (
            <div key={index} className='reward'>
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
              <h6>Shipping destination</h6>
              <select>
                {this.state.countries.map((country, index) => {
                  return (
                    <option value={country.country} key={index}>
                      {country.country} (+$5)
                    </option>
                  );
                })}
              </select>
              <form onSubmit={this.handleSubmit} data-id={reward.id}>
                <label>
                  <h6>Pledge amount</h6>
                  <div>$</div>
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
