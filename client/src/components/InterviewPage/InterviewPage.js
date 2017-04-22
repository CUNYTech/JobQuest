import './InterviewPage.css';
import Auth from '../../modules/Auth';
import AnswerBox from '../AnswerBox/AnswerBox';
import AnswerList from '../AnswerList/AnswerList';
import axios from 'axios';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';
import {purple500, grey50,blue300, pink300, purple300, yellow300, orange300, grey300,indigo900} from 'material-ui/styles/colors';
import Response from '../../modules/Response';
import AlertDialog from '../AlertDialog/AlertDialog';
import Moment from 'react-moment';


export default class InterviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thisQuestion: {},

            editopen: false,
            deleteopen: false,
            
            value: '', 
            title: '', 
            question:'', 
            originalAnswer:''
        };

        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);

        this.addAnswer = this.addAnswer.bind(this);

        this.editAnswer = this.editAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);

        //just changing the state to true
        this.handleDeleteInterviewOpen = this.handleDeleteInterviewOpen.bind(this);
        this.handleEditInterviewOpen = this.handleEditInterviewOpen.bind(this);

        //just changing the state to false
        this.handleDeleteInterviewClose = this.handleDeleteInterviewClose.bind(this);
        this.handleEditInterviewClose = this.handleEditInterviewClose.bind(this);

        //last stage in editing or deleting
        this.editInterview = this.editInterview.bind(this);
        this.deleteInterview = this.deleteInterview.bind(this);
    }

    interceptError(err){
      Response.setError(err);
      //Force rerendering components
      //Apparently one forceUpdate is not enough to show the dialog on the first call
      //This is a dirty hack to get it to work the first time
      this.forceUpdate();
      this.forceUpdate();
  }

    componentDidMount() {
        const url = '/interviewQuestions/' + this.props.params.id + '/show';
        axios.get(url)
        .then(res => {
            console.log('the response went through', res.data);
            this.setState({thisQuestion: res.data});
        });
    }

    color() {
        var colorType;
        switch(this.state.thisQuestion.topic) {
        case 'Software Engineering':
            colorType = blue300;
            break;
        case 'Algorithm':
            colorType = pink300;
            break;
        case 'Database':
            colorType = purple300;
            break;
        case 'Shell':
            colorType = yellow300;
            break;
        case 'System Design':
            colorType = orange300;
            break;
        default:
            colorType = grey300;
            break; 
        }
        return colorType;
    }
    
    //for current interview thread

    handleTopic = (event, index, value) => this.setState({value});

    handleTitle(event) {
        this.setState({title: event.target.value});
    }

    handleQuestion(event) {
        this.setState({question: event.target.value});
    }

    handleAnswer(event) {
        this.setState({originalAnswer: event.target.value});
    }



    handleEditInterviewOpen () {
        this.setState({editopen: true});
        this.setState({value: this.state.thisQuestion.value});
        this.setState({title: this.state.thisQuestion.title});
        this.setState({question: this.state.thisQuestion.question});
        this.setState({originalAnswer: this.state.thisQuestion.originalAnswer});
    }

    handleDeleteInterviewOpen () {
        this.setState({deleteopen: true});
    }

    handleEditInterviewClose () {
        this.setState({editopen: false});
    }

    handleDeleteInterviewClose () {
        this.setState({deleteopen: false});
    }


    editInterview() {
        
        this.setState({editopen: false});
        var newEditSubmit = {topic: this.state.value, title: this.state.title, question: this.state.question, originalAnswer: this.state.originalAnswer};

        const editURL = '/interviewQuestions/' + this.props.params.id + '/edit';
        axios.post(editURL, newEditSubmit, {headers: {authorization: 'bearer ' + Auth.getToken()} })
        .then((res) => {
            console.log('sucess, edited', res);
            this.setState({thisQuestion: res.data});
            this.props.router.replace('/interviewQuestions/' + this.props.params.id + '/show');
        })
        .catch((err) => {
            console.log(err);
            this.interceptError(err);
        });
    }

    deleteInterview() {

        this.setState({deleteopen: false});
        
        const deleteURL = '/interviewQuestions/' + this.props.params.id + '/remove';
        axios.delete(deleteURL, {headers: {authorization: 'bearer ' + Auth.getToken()} })
        .then(res => {
            console.log('sucess, deleted', res);
            // the problem arises here 
            this.props.router.replace('/interview');
        })
        .catch(err => {
            console.log(err);
            this.interceptError(err);
        });

    }


    //for additional answers
    
    addAnswer(comment) {
        // might need to do an update on that whole object
        const url = '/interviewQuestions/' + this.props.params.id + '/answers/create';
        
        axios.post(url, {answerText: comment})
        .then((res) => {
        // no way to update the UI here, need to rework the app architecture
            console.log('success', res);
            this.setState({thisQuestion: res.data});
        })
        .catch((err) => {
            console.log(err);
        });
    }


    //properties of comments

    editAnswer(obj) {
        const editURL = '/interviewQuestions/' + this.props.params.id + '/answers/' + obj.answerID + '/edit';
        axios.post(editURL, {answerText: obj.editedText}, {headers: {authorization: 'bearer ' + Auth.getToken()} })
        .then((res) => {
            console.log('sucess, edited', res);
            this.setState({thisQuestion: res.data});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteAnswer(answerid) {
        const deleteURL = '/interviewQuestions/' + this.props.params.id + '/answers/' + answerid + '/remove';
        axios.delete(deleteURL, {headers: {authorization: 'bearer ' + Auth.getToken()} })
        .then(res => {
            console.log('sucess, deleted.', res);
            this.setState({thisQuestion: res.data});
        })
        .catch((err) => {
            console.log(err);
            this.interceptError(err);
        });
    }



    

    render() {
        const styleHeading = {
        color: 'purple'
        }

        const styleButton = {
        marginTop: '50px',
        marginBottom: '50px',
        width: '40%',
        }

        const styleCustomWidth = {
        width: 400
        }

        const styleTextField = {
        errorStyle: {
            color: purple500,
        },
        underlineStyle: {
            borderColor: purple500,
        },
        hintStyle: {
            color: purple500,
        },
        floatingLabelFocusStyle: {
            color: purple500,
        }
        }

        const styles = {
            chip: {
                margin: 'auto', 
                marginTop: '20px'
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap'
            }
        }

        const stylePaper = {
            comment: {
                marginTop: '20px'

            }
        }

        const actions = [
            //title, topic, question, answer
                <DropDownMenu style={styleCustomWidth} value={this.state.value} onChange={this.handleTopic} autoWidth={false} openImmediately={true}>
                  <MenuItem value={'Algorithm'} primaryText="Algorithm" />
                  <MenuItem value={'Database'} primaryText="Database" />
                  <MenuItem value={'Shell'} primaryText="Shell" />
                  <MenuItem value={'Software Engineering'} primaryText="Software Engineering" />
                  <MenuItem value={'System Design'} primaryText="System Design" />
                </DropDownMenu>,

                <TextField value={this.state.title} 
                            onChange={this.handleTitle} 
                            fullWidth={true} 
                            hintText="Title" 
                            hintStyle={styleTextField.hintStyle}
                            underlineFocusStyle={styleTextField.underlineStyle}
                            multiLine={true} rows={1}
                            />,

                <TextField value={this.state.question} 
                            onChange={this.handleQuestion} 
                            fullWidth={true} 
                            hintText="Question" 
                            hintStyle={styleTextField.hintStyle}
                            underlineFocusStyle={styleTextField.underlineStyle}
                            multiLine={true} rows={2}
                            />,

                <TextField value={this.state.originalAnswer} 
                            onChange={this.handleAnswer} 
                            fullWidth={true} 
                            hintText="Answer" 
                            hintStyle={styleTextField.hintStyle}
                            underlineFocusStyle={styleTextField.underlineStyle}
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

            <div className="container">
                <AlertDialog errorMsg={Response.getError()} isOpen={Response.isErrorSet()} />
                <Paper>
                    <div className="titlee">
                        {this.state.thisQuestion.title}   
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
                    </div>

                    <div>
                        <Dialog
                            title="Edit your Interview Question"
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



                    <div className="info">
                        submitted at <Moment>{this.state.thisQuestion.created_at}</Moment> by {this.state.thisQuestion.author}
                    </div>

                    <div className="topic">
                        <Chip backgroundColor={this.color()} style={styles.chip}>
                            {this.state.thisQuestion.topic}                                       
                        </Chip>
                    </div>

                    <div className="question">
                        <strong>Question: </strong> {this.state.thisQuestion.question}                
                    </div>

                    <div className="answer">
                        <strong>Answer: </strong> {this.state.thisQuestion.originalAnswer}                
                    </div>
                </Paper>
                    
                <Paper style={stylePaper.comment}>
                    <div className="newAnswer">
                        <AnswerBox onSubmit={this.addAnswer} />
                    </div>
                </Paper>

                <Paper style={stylePaper.comment}>
                    <div className="answerList">    
                        {this.state.thisQuestion.otherAnswers ? this.state.thisQuestion.otherAnswers.map((individualAnswer, idx) => {
                            return <AnswerList editAnswer={this.editAnswer} deleteAnswer={this.deleteAnswer} answer={individualAnswer} question={this.props.params.id}/>
                        }) : null}
                    </div>
                </Paper>

            </div>


       );
    }

}

InterviewPage.PropTypes = {
    router: React.PropTypes.object.isRequired
};