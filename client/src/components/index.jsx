import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pledge from './pledge';
import RewardView from './rewardView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      rewards: []
    };

    this.fetchProduct = this.fetchProduct.bind(this);
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct() {
    var path = window.location.pathname;
    axios
      .get(`/${path}`)
      .then(response => {
        console.log('got this response >>>>>>> ', response);
        this.setState(JSON.parse(response));
      })
      .catch(error => {
        console.log('error getting product info from API', error);
      });
  }

  render() {
    return (
      <div className='app'>
        <h2>Hackstarter</h2>
        <div className='summary'>
          <h3>Dolla Dolla Bills Yall</h3>
        </div>
        <div className='pledge'>
          <Pledge />
        </div>
        <div className='rewards'>
          <RewardView rewards={this.state.rewards} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
