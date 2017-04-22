import './InterviewItemContainer.css'
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link, IndexLink } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import InterviewItem from '../InterviewItem/InterviewItem'
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper';
import {purple500, blue500, grey50} from 'material-ui/styles/colors';


export default class InterviewItemContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      interviewQuestion: []
    };
}

  componentDidMount() {
    const url = '/interviewQuestions/'; 
    axios.get(url)
      .then(res => {
        this.setState({interviewQuestion: res.data.reverse()});
      });
  }


  render(){

    const styleCard = {
      left: {
        marginUp: '50px',
        marginLeft: '50px',
        marginRight: '50px'
      },

      title: {
        paddingTop: '35px'
      },

      right: {
        marginUp: '50px',
        marginRight: '50px',
        marginBottom: '50px' 
      },
    }

    const styleFont = {
      left: {
        fontSize: '40px',
        fontWeight: 'bold', 
        color: 'purple',
        marginLeft: '20px'
      },

      description: {
        fontSize: '25px'
      },

      contributor: {
        fontSize: '15px'
      }

    }

    const styleLabel = {
      fontSize: '25px', 
      fontFamily:'<Sans-serif></Sans-serif>',
      color: grey50
    }



    return (
      <div id="shell">
        <GridList cols={12}>
          <GridTile cols={8} rows={'auto'}>
            <Card zDepth={2} style={styleCard.left}>
              <CardTitle title="Technical Interview Preparation Questions" titleStyle={styleFont.left} style={styleCard.title} />
              <CardText style={styleFont.description}>
                {this.state.interviewQuestion ? this.state.interviewQuestion.map((question,idx) => {
                  return <InterviewItem data={question}/>
                }) : null}
              </CardText>
            </Card>
          </GridTile>

          <GridTile cols={4} rows={'auto'}>
            <Card zDepth={2} style={styleCard.right}>
              <Link to='/postNewInterview'>
                <RaisedButton backgroundColor={purple500} labelStyle={styleLabel} label="Submit a New Question" fullWidth={true}/>
              </Link>
              <CardText 
                style={styleFont.description}>
                <b>Welcome, one and all, to Interview Questions!</b>
                <br />
                <br />
                Here we discuss interview questions in Computer Science, Computer Engineering, Software Engineering, 
                and related fields. Please keep the conversation professional.
                <br />
                </CardText>
            </Card>
          </GridTile>
        </GridList>
      </div>
    );
  }

}