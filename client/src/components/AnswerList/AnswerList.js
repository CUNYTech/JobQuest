import Auth from '../../modules/Auth';
import axios from 'axios';
import {Card, CardTitle, CardText}  from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import React, {Component,PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper'; 
import Moment from 'react-moment';

//need to fix the rendering of editing and deleting comments.


export default class AnswerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editopen:false,
            deleteopen:false,
            originalAnswerData: this.props.answer,
            youranswer: this.props.answer.answerText,
        }
        
        //handle open
        this.handleEditInterviewOpen = this.handleEditInterviewOpen.bind(this);
        this.handleDeleteInterviewOpen = this.handleDeleteInterviewOpen.bind(this);
        
        //handle close
        this.handleEditInterviewClose = this.handleEditInterviewClose.bind(this);
        this.handleDeleteInterviewClose = this.handleDeleteInterviewClose.bind(this);

        //handle answer
        this.handleAnswer = this.handleAnswer.bind(this);

        //going to parent call
        this.editInterview = this.editInterview.bind(this);
        this.deleteInterview = this.deleteInterview.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.answer != this.props.answer) {
            this.setState({originalAnswerData: nextProps.answer});
        }

    }

    //handle open
    handleEditInterviewOpen() {
        this.setState({editopen: true});
    }

    handleDeleteInterviewOpen() {
        this.setState({deleteopen: true});
    }


    //handle close
    handleEditInterviewClose() {
        this.setState({editopen: false});
    }

    handleDeleteInterviewClose() {
        this.setState({deleteopen: false});
    }


    //handle input
    handleAnswer(e) {
        this.setState({youranswer: e.target.value});
    }
    


    editInterview() {
        this.setState({editopen: false});
        var finalObject = {
            answerID: this.props.answer._id,
            editedText: this.state.youranswer
        }
        this.props.editAnswer(finalObject);
    }


    deleteInterview() {
        this.setState({deleteopen: false});
        this.props.deleteAnswer(this.props.answer._id);
    }


    render() {

        const actions = [
            //answer
                <TextField value={this.state.youranswer} 
                            onChange={this.handleAnswer} 
                            fullWidth={true} 
                            hintText="Answer" 
                            multiLine={true} rows={3}
                            />,                 

                
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={this.handleEditInterviewClose}
                />,

                <FlatButton
                    label="Submit"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={this.editInterview}
                />,
            ];

            const disactions = [
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={this.handleDeleteInterviewClose}
                />,

                <FlatButton
                    label="Delete"
                    primary={true}
                    onTouchTap={this.deleteInterview}
                />

            ];

        return( 
            <div>   
                {this.props.answer ?
                <Card>
                    <CardTitle title={this.state.originalAnswerData.author} subtitle={<Moment>{this.state.originalAnswerData.created_at}</Moment>} />
                    <CardText>
                        {this.state.originalAnswerData.answerText}
                    </CardText>

                    <div className="menu">
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                            <MenuItem onClick={this.handleEditInterviewOpen} primaryText="Edit" />
                            <MenuItem onClick={this.handleDeleteInterviewOpen} primaryText="Delete" />
                        </IconMenu>
                    </div>

                    <div>
                        <Dialog
                            title="Edit your Interview Answer"
                            actions={actions}
                            modal={false}
                            open={this.state.editopen}
                            onRequestClose={this.handleEditInterviewClose}>
                        </Dialog>
                    </div>

                    <div>
                        <Dialog
                            actions={disactions}
                            modal={false}
                            open={this.state.deleteopen}
                            onRequestClose={this.handleDeleteInterviewClose}
                            >
                            Are you sure about deleting?
                        </Dialog>
                    </div> 
                </Card>

                : null }

            </div>

        );
    }
}

AnswerList.propTypes = {
    answer: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    editAnswer: React.PropTypes.func.isRequired,
    deleteAnswer: React.PropTypes.func.isRequired
};