
import React, { Component } from 'react';
import VoteCounter from '../VoteCounter/VoteCounter';
import Paper from 'material-ui/Paper'
import { Link } from 'react-router';
import EditThreadForm from '../EditThreadForm/EditThreadForm';
import axios from 'axios';
import Auth from '../../modules/Auth';
import Moment from 'react-moment';
import FlatButton from 'material-ui/FlatButton';

import '../ThreadItem/ThreadItem.css';

const ThreadPageItem = React.createClass({

  getInitialState() {
    return {
      edit: false
    };
  },

  toggleEdit() {
    this.setState({edit: !this.state.edit})
  },

  render() {
    // make date contain only MM/DD/YYYY

    // hacking the height for singular page
    const style = {
      minHeight: 80,
      padding: 15,
      margin: 20,
      modify: {
        display: 'inline-block',
        float:'right'
      },
      content: {
        padding: 3,
        display: 'inline-block',
        width: '95%'
      }
    };

    return (
      <Paper style={style} zDepth={1}>

        {this.props.data ? 
          <div>
            <VoteCounter votes={this.props.data.votes}
                          onUpvote={this.props.onUpvote}
                          onDownvote={this.props.onDownvote} />

            <div style={style.content} >

              {this.state.edit ? 
                <EditThreadForm  title={this.props.data.title} 
                                 desc={this.props.data.thread} 
                                 handleEdit={this.props.handleEdit} 
                                 handleToggle={this.toggleEdit} />
                :
                <div> 
                  <div className="title">
                    {this.props.data.title}    
                  </div>

                  <div style={style.modify} >
                    <FlatButton labelStyle={{color:'#8f1bc1'}} id="editThread" label="Edit" onTouchTap={this.toggleEdit} />
                    <FlatButton labelStyle={{color:'#8f1bc1'}} id="deleteThread" label="Delete" onTouchTap={this.props.handleDelete} />
                  </div>           

                  <div className="desc">
                    <div> {this.props.data.thread} </div>
                  </div>
                </div>
              }
              
              <div className="details">
                <span className="author">Author - {this.props.data.author}</span> |
                <span className="numOfComments">{this.props.data.comments.length} comments</span> |
                <span className="date">Posted <Moment>{this.props.data.created_at}</Moment></span>
              </div>
            </div>
          </div>
          : null
        }
      
      </Paper>
    );
  }

});
  
ThreadPageItem.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default ThreadPageItem;
