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
      .get(`http://ec2-54-243-6-104.compute-1.amazonaws.com/product${path}`)
      .then(response => {
        this.setState(response.data);
      })
      .catch(error => {
        console.log('error getting product info from API', error);
      });
  }

  render() {
    return (
      <div className='app'>
        <div className='summary'>
          <h2>${this.state.product.total}</h2>
          <h6> pledged of ${this.state.product.goal} goal</h6>
          <h2>{this.state.product.backers}</h2>
          <h6> backers </h6>
          <h2>{this.state.product.deadline}</h2>
          <h6> days to go </h6>
        </div>
        <div>
          <h3> Support </h3>
          <Pledge fetchProduct={this.fetchProduct} />
        </div>
        <div>
          <RewardView
            rewards={this.state.rewards}
            fetchProduct={this.fetchProduct}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('pledgeApp'));
