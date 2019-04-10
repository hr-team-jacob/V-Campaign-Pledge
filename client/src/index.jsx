import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pledge from './components/pledge.jsx';
import RewardView from './components/rewardView.jsx';

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
      .get(`/product${path}`)
      .then(response => {
        console.log('got this response >>>>>>> ', response);
        this.setState(response.data);
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
