import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import ThreadItemContainer from '../ThreadItemContainer/ThreadItemContainer'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import Auth from '../../modules/Auth';
import axios from 'axios';

// import './ThreadListPage.css';


const ThreadListPage = React.createClass({

  getInitialState(){
    return {
      threads: undefined
    }
  },

  upvoteThread(idx){
    // make the call to backend which gives back the updated thread
    // use that to update the state

    console.log('upvote has been triggered', idx);
    axios.post('/vote/up/' + this.state.threads[idx]._id, {},
      { headers: {authorization: 'bearer ' + Auth.getToken()} })
      .then((res) => {
        // update that specific thread
        // console.log(res.data, idx);

        var copy = this.state.threads.slice();
        copy[idx] = res.data;
        this.setState({threads: copy});
      })
      .catch((err) => {
        console.log(err);
      })
  },

  downvoteThread(idx){
    console.log('downvote has been triggered', idx);

    axios.post('/vote/down/' + this.state.threads[idx]._id, {},
      { headers: {authorization: 'bearer ' + Auth.getToken()} })
      .then((res) => {
        // update that specific thread
        // console.log(res.data, idx);

        var copy = this.state.threads.slice();
        copy[idx] = res.data;
        this.setState({threads: copy});
      })
      .catch((err) => {
        console.log(err);
      })
  },

  componentDidMount(){
    // populate threads data
    
    const url = '/posts/';
    axios.get(url)
      .then(res => {
        console.log('got the data', res.data);
        this.setState({threads: res.data})
      });
  },

  render: function(){

    return (
        <ThreadItemContainer threads={this.state.threads}
                             onUpvote={this.upvoteThread}
                             onDownvote={this.downvoteThread} />
    );
  }
}); 

export default ThreadListPage;
