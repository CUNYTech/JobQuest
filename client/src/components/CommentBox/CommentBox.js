
import React, { Component } from 'react';
import { Paper, TextField } from 'material-ui';
import CommentList from '../CommentList/CommentList';
import RaisedButton from 'material-ui/RaisedButton';
import './CommentBox.css';

class CommentBox extends Component {

  // this component will receive comments list from parent to render
  // in addition it'll also get a function
  // will test that the add function has been clicked once

  constructor(props){
    super(props);

    this.state = {
      text: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e){
    this.setState({error: ''});
    this.setState({text: e.target.value});
  }

  handleClick(){
    if(this.state.text === ''){
      this.setState({error: 'This field cannot be blank.'});
    }
    else{
      this.props.onSubmit(this.state.text);
      this.setState({text: ''}); // clear input
    }
  }

  render() {
    return (
      <div>
        <h3> Comments </h3>

        <TextField
          id="AddComment"
          name="AddComment"
          floatingLabelText="Enter a comment"
          fullWidth={true}
          errorText={this.state.error}
          multiLine={true}
          rows={3}
          value={this.state.text}
          onChange={this.handleChange}
        />
        <div>
          <RaisedButton label="Add Comment" onClick={this.handleClick} primary />
        </div>

        <CommentList comments={this.props.comments} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
      </div>
    );
  }

}

CommentBox.PropTypes = {
  comments: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};

export default CommentBox;


