import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    mainUser: [],
    followersArray: []

  };

  componentDidMount() {
    axios
      .get('https://api.github.com/users/tatek1993')
      .then(res => {
        this.setState({
          mainUser: res.data
        });
      })
      .catch(err => console.log(err));

    axios
    .get(`https://api.github.com/users/tatek1993/followers`)
    .then(res => {
      this.setState({
        followersArray: res.data
        
      });
      console.log('The new one!', this.state.followersArray);
    })
    
    .catch(err => 
      this.setState({
        error: 'We could not grab that user.'
      }));
  }

 
  

  render() {
    console.log('this is the followersArray??', this.state.followersArray);
    return (
      <div className="App">
        <div>
          <h1>Hello, {this.state.mainUser.name}</h1>
          <img width="250px" src={this.state.mainUser.avatar_url} alt={this.state.mainUser.name}/>
        </div>
        <h1>Say Hello To Your Followers!</h1>
        <div className="followers">
          {this.state.followersArray.map(followers => (
            <div className="follower-tile" key={followers.id}>
              <img width="200px" src={followers.avatar_url}  alt={followers.login} />
              <p>{followers.login}</p> 
            </div>
          ))}
        </div>
      </div>
    );
  }

}

export default App;
