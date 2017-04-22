import React, { Component } from 'react';
import axios from 'axios';
import { FlatButton, TextField} from 'material-ui';

var EditThreadForm = React.createClass({

  getInitialState(){
    return {
      titleInput: this.props.title || '',
      descInput: this.props.desc || '',
      titleInputError: '',
      descInputError: ''
    };
  },

  handleChange(e){
    // name filed is undefined for e.target...

    // for multiple inputs, attach a name to the tag
    // update with [name]: value
    var name = e.target.name;

    //Checks to see if the new value is empty, returns an error string if it is
    if(e.target.value == ''){
     this.setState({[name + 'Error']:'This field cannot be empty.'});
    }
    else{
      this.setState({[name + 'Error']:''});
    }

    this.setState({[name]: e.target.value});
  },

  handleClick(){
    // pack title and desc into an obj
    var newPost = {title: this.state.titleInput, thread: this.state.descInput}
    this.props.handleEdit(newPost);
    this.props.handleToggle();
  },

  render(){
    return (
      <div>
        <TextField
          id="editTitle"
          name="titleInput"
          style={{width:'100%'}}
          errorText={this.state.titleInputError}
          value={this.state.titleInput}
          onChange={this.handleChange}
        />
        <TextField
          id="editDesc"
          name="descInput"
          style={{width:'100%'}}
          errorText={this.state.descInputError}
          multiLine={true}
          rows={8}
          value={this.state.descInput}
          onChange={this.handleChange}
        />
        <div style={{float:"right"}}>
          <FlatButton labelStyle={{color:'#8f1bc1'}} label="Save" onTouchTap={this.handleClick} />
          <FlatButton labelStyle={{color:'#8f1bc1'}} label="Cancel" onTouchTap={this.props.handleToggle} />
        </div>
      </div>
    );
  }

}); 

EditThreadForm.PropTypes = {
  title: React.PropTypes.string.isRequired,
  desc: React.PropTypes.string.isRequired,
  handleEdit: React.PropTypes.func.isRequired,
  handleToggle: React.PropTypes.func.isRequired
}

export default EditThreadForm;