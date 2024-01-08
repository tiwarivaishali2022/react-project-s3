import React, { Component } from 'react';
import SingleSide from './SingleSide';
import Error from './Error';

class Sidenews extends Component {
    constructor(props) {
        super(props);
        this.state = {
           Sidenews: [], 
           error: false,

        };
    }

    componentDidMount() {
        // const url = `https://newsapi.org/v2/top-headlines/sources=bbc-news?apiKey=${process.env.REACT_APP_API}`
        const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=62bc698ff0984c78bc81e58d4093ae90`
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
           this.setState({
            Sidenews: data.articles
           }) 
        })
        .catch((error) => {
            this.setState({
                error: true,
            })
        });
    }
    renderItems() {
        if (!this.state.error) {
        return this.state.Sidenews.map((item) => (
            <SingleSide key={item.url} item={item} />
        ));
        } else{
           return <Error /> 
        }
      }
  render() {
    return (
        <div className="row">
            {this.renderItems()}
        </div>
    )
  }
}

export default Sidenews