import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndeces: [],
    mappings: {},
    index: "",
  };

  componentDidMount() {
    this.fetchMappings();
    this.fetchSeenIndeces();
  }

  async fetchMappings() {
    const result = await axios.get("/api/fib_mappings");
    this.setState({ mappings: result.data });
  }

  async fetchSeenIndeces() {
    const result = await axios.get("/api/fib_indeces");
    this.setState({
      seenIndeces: result.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault(); // event.preventDefault() is used to prevent the form from being submitted in the traditional way (which would result in a page reload) so that we can handle the submission using our custom logic instead.

    await axios.post("/api/fib_indices", {
      fib_index: parseInt(this.state.index),
    });
    this.setState({ index: "" });
  };

  renderSeenIndeces() {
    return this.state.seenIndeces.map(({ number }) => number).join(", ");
  }

  renderMappings() {
    const entries = [];

    for (let key in this.state.mappings) {
      entries.push(
        <div key={key}>
          For index {key}, value is {this.state.mappings[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div className="App">
        <h1>Fib Calculator</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <strong>Enter a fib index: </strong>
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
            required
          />
          <button>
            <strong>Submit</strong>
          </button>
        </form>
        <hr />

        <h3>Already seen fib indeces</h3>
        {this.renderSeenIndeces()}
        <hr />

        <h3>Calculated fib values</h3>
        {this.renderMappings()}
        <hr />
      </div>
    );
  }
}

export default Fib;
