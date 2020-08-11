import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushis: [],
    displayIndex: 0,
    eaten: [],
    wallet: 100
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(sushis => this.setState({
      sushis: sushis
    }))
  }

  render() {
    return (
      <div className="app">
        <SushiContainer eaten={this.state.eaten} eatSushi={this.eatSushi} nextFour={this.nextFour} sushis={this.displaySushis()} />
        <Table wallet={this.state.wallet} eaten={this.state.eaten} />
      </div>
    );
  }

  nextFour = () => {
    if (this.state.displayIndex + 4 < this.state.sushis.length)
      this.setState({
        displayIndex: this.state.displayIndex + 4,
      })
    else {
      this.setState({
        displayIndex: 0,
      })
    }
  }
  displaySushis = () => {
    return this.state.sushis.slice(this.state.displayIndex, this.state.displayIndex + 4)
  }

  eatSushi = (eatenSushi) => {
    if (eatenSushi.price < this.state.wallet) {
      this.setState({
        eaten: [...this.state.eaten, eatenSushi],
        wallet: this.state.wallet - eatenSushi.price
      })
    }
  }
}

export default App;