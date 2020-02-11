import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components/macro';

const MainUserDiv = styled.div `
  border: 10px dashed #FFC914;
  border-radius: 50%;
  width: 25%;
  padding: 7%;
  margin: 3%;
  background-color: rgba(23, 190, 187, 0.5);
  
`
const Header = styled.h1 `
  color: #FFC914;
  font-size: 2.5rem;
`
const Image = styled.img `
  border-radius: 50%;
  border: 10px solid #E4572E;
  box-shadow: 20px 20px #76B041;
  margin: 3%;
`
const FollowerDiv = styled.div `
  width: 25%;
  margin: 2.5%;
  color: #FFC914;
  font-size: 1.7rem;
`


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
        <MainUserDiv>
          <Header>Hello, {this.state.mainUser.name}</Header>
          <Image width="250px" src={this.state.mainUser.avatar_url} alt={this.state.mainUser.name}/>
        </MainUserDiv>
        <Header>Say Hello To Your Followers!</Header>
        <div className="followers">
          {this.state.followersArray.map(followers => (
            <FollowerDiv className="follower-tile" key={followers.id}>
              <Image width="200px" src={followers.avatar_url}  alt={followers.login} />
              <p>{followers.login}</p> 
            </FollowerDiv>
          ))}
        </div>
      </div>
    );
  }

}

export default App;
