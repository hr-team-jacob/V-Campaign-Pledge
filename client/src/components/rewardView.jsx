import React from 'react';
import axios from 'axios';

class RewardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      countries: [
        'Afghanistan (+$5)',
        'Albania (+$5)',
        'Algeria (+$5)',
        'Angola (+$5)',
        'Argentina (+$5)',
        'Armenia (+$5)',
        'Aruba (+$5)',
        'Australia (+$5)',
        'Austria (+$5)',
        'Azerbaijan (+$5)',
        'Bahrain (+$5)',
        'Bangladesh (+$5)',
        'Barbados (+$5)',
        'Belarus (+$5)',
        'Belgium (+$5)',
        'Belize (+$5)',
        'Benin (+$5)',
        'Bermuda (+$5)',
        'Bhutan (+$5)',
        'Bolivia (+$5)',
        'Bosnia and Herzegovina (+$5)',
        'Botswana (+$5)',
        'Brazil (+$5)',
        'British Virgin Islands (+$5)',
        'Brunei (+$5)',
        'Bulgaria (+$5)',
        'Burkina Faso (+$5)',
        'Burma (+$5)',
        'Burundi (+$5)',
        'Cambodia (+$5)',
        'Cameroon (+$5)',
        'Canada (+$5)',
        'Cayman Islands (+$5)',
        'Central African Republic (+$5)',
        'Chad (+$5)',
        'Chile (+$5)',
        'China (+$5)',
        'Colombia (+$5)',
        'Congo (+$5)',
        'Costa Rica (+$5)',
        'Croatia (+$5)',
        'Cuba (+$5)',
        'Cyprus (+$5)',
        'Czech Republic (+$5)',
        'Denmark (+$5)',
        'Dominican Republic (+$5)',
        'Ecuador (+$5)',
        'Egypt (+$5)',
        'El Salvador (+$5)',
        'Equatorial Guinea (+$5)',
        'Eritrea (+$5)',
        'Estonia (+$5)',
        'Ethiopia (+$5)',
        'Fiji (+$5)',
        'Finland (+$5)',
        'France (+$5)',
        'Gabon (+$5)',
        'Gambia (+$5)',
        'Georgia (+$5)',
        'Germany (+$5)',
        'Ghana (+$5)',
        'Gibraltar (+$5)',
        'Greece (+$5)',
        'Greenland (+$5)',
        'Grenada (+$5)',
        'Guam (+$5)',
        'Guatemala (+$5)',
        'Guernsey (+$5)',
        'Guinea (+$5)',
        'Guinea-Bissau (+$5)',
        'Guyana (+$5)',
        'Haiti (+$5)',
        'Honduras (+$5)',
        'Hong Kong (+$5)',
        'Hungary (+$5)',
        'Iceland (+$5)',
        'India (+$5)',
        'Indonesia (+$5)',
        'Iran (+$5)',
        'Iraq (+$5)',
        'Ireland (+$5)',
        'Israel (+$5)',
        'Italy (+$5)',
        'Jamaica (+$5)',
        'Japan (+$5)',
        'Jersey (+$5)',
        'Jordan (+$5)',
        'Kazakhstan (+$5)',
        'Kenya (+$5)',
        'Korea (+$5)',
        'Kuwait (+$5)',
        'Kyrgyzstan (+$5)',
        'Laos (+$5)',
        'Latvia (+$5)',
        'Lebanon (+$5)',
        'Lesotho (+$5)',
        'Liberia (+$5)',
        'Libya (+$5)',
        'Liechtenstein (+$5)',
        'Lithuania (+$5)',
        'Luxembourg (+$5)',
        'Macau (+$5)',
        'Macedonia (+$5)',
        'Madagascar (+$5)',
        'Malawi (+$5)',
        'Malaysia (+$5)',
        'Maldives (+$5)',
        'Mali (+$5)',
        'Malta (+$5)',
        'Martinique (+$5)',
        'Mauritania (+$5)',
        'Mauritius (+$5)',
        'Mayotte (+$5)',
        'Mexico (+$5)',
        'Moldova (+$5)',
        'Monaco (+$5)',
        'Mongolia (+$5)',
        'Morocco (+$5)',
        'Mozambique (+$5)',
        'Namibia (+$5)',
        'Nepal (+$5)',
        'Netherlands (+$5)',
        'New Zealand (+$5)',
        'Nicaragua (+$5)',
        'Niger (+$5)',
        'Nigeria (+$5)',
        'Norway (+$5)',
        'Oman (+$5)',
        'Pakistan (+$5)',
        'Panama (+$5)',
        'Papua New Guinea (+$5)',
        'Paraguay (+$5)',
        'Peru (+$5)',
        'Philippines (+$5)',
        'Poland (+$5)',
        'Portugal (+$5)',
        'Puerto Rico (+$5)',
        'Qatar (+$5)',
        'Reunion (+$5)',
        'Romania (+$5)',
        'Russia (+$5)',
        'Rwanda (+$5)',
        'Samoa (+$5)',
        'Saudi Arabia (+$5)',
        'Senegal (+$5)',
        'Serbia and Montenegro (+$5)',
        'Seychelles (+$5)',
        'Sierra Leone (+$5)',
        'Singapore (+$5)',
        'Slovakia (+$5)',
        'Slovenia (+$5)',
        'Solomon Islands (+$5)',
        'Somalia (+$5)',
        'South Africa (+$5)',
        'Spain (+$5)',
        'Sri Lanka (+$5)',
        'Sudan (+$5)',
        'Swaziland (+$5)',
        'Sweden (+$5)',
        'Switzerland (+$5)',
        'Syria (+$5)',
        'Taiwan (+$5)',
        'Tajikistan (+$5)',
        'Tanzania (+$5)',
        'Thailand (+$5)',
        'Trinidad and Tobago (+$5)',
        'Tunisia (+$5)',
        'Turkey (+$5)',
        'Turkmenistan (+$5)',
        'Turks and Caicos Islands (+$5)',
        'Tuvalu (+$5)',
        'Uganda (+$5)',
        'Ukraine (+$5)',
        'United Arab Emirates (+$5)',
        'United Kingdom (+$5)',
        'United States (+$5)',
        'Uruguay (+$5)',
        'Uzbekistan (+$5)',
        'Venezuela (+$5)',
        'Vietnam (+$5)',
        'Yemen (+$5)',
        'Zambia (+$5)',
        'Zimbabwe (+$5)'
      ]
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
              <h6>Shipping destination</h6>
              <select>
                {this.state.countries.map(country => {
                  return (
                    <option value={country}>
                      {country}
                    </option>
                  );
                })}
              </select>
              <form onSubmit={this.handleSubmit}>
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
