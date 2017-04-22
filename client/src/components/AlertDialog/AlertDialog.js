import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Response from '../../modules/Response';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class AlertDialog extends React.Component {
  state = {
    openstate: false,
  };


  handleOpen = () => {
    this.setState({openstate: true});
  };

  handleClose = () => {
    Response.resetError();
    this.setState({openstate: false});
  };

    shouldComponentUpdate(nextProps){
    if(nextProps.open === true){
    this.setState({ openstate: nextProps.open});
    //console.log('this',this.props);
    //console.log('nextprops',nextProps);
    //console.log('nextstate',nextState);
    return true;
  }
  else{
    return false;
  }
  }

  render() {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title={this.props.errorMsg.title}
          actions={actions}
          modal={false}
          open={this.state.openstate}
          onRequestClose={this.handleClose}
        >
          {this.props.errorMsg.text}
        </Dialog>
      </div>
    );
  }
}

AlertDialog.PropTypes = {
  errorMsg: React.PropTypes.object.isRequired,
};