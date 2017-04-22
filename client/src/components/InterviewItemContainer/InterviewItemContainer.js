import './InterviewItemContainer.css'
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { Link, IndexLink } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import InterviewItem from '../InterviewItem/InterviewItem'
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper';
import {purple500, grey50,blue300, pink300, purple300, yellow300, orange300, grey300, indigo900, grey900} from 'material-ui/styles/colors';


export default class InterviewItemContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      interviewQuestion: []
    };

    this.handleTopicAlgorithm = this.handleTopicAlgorithm.bind(this);
    this.handleTopicDatabase = this.handleTopicDatabase.bind(this);
    this.handleTopicShell = this.handleTopicShell.bind(this);
    this.handleTopicSoftwareEngineering = this.handleTopicSoftwareEngineering.bind(this);
    this.handleTopicSystemDesign = this.handleTopicSystemDesign.bind(this);
    this.handleTopicMiscellaneous = this.handleTopicMiscellaneous.bind(this);
}

  componentDidMount() {
    const url = '/interviewQuestions/'; 
    axios.get(url)
      .then(res => {
        this.setState({interviewQuestion: res.data.reverse()});
      });
  }

  handleTopicAlgorithm() {
    function isAlgorithm(value) {
      return value == "Algorithm";
    }

    // let filtered = this.state.interviewQuestion.topic.filter(isAlgorithm);
    // console.log(filtered);

  }

  handleTopicDatabase() {

  }

  handleTopicShell() {

  }

  handleTopicSoftwareEngineering() {

  }

  handleTopicSystemDesign() {

  }

  handleTopicMiscellaneous() {

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

    const styleFilter = {
      display: 'flex',
      flexWrap: 'wrap'
    }

    const styleChip = {
      algorithm: {
        backgroundColor: pink300
      },

      database: {
        backgroundColor: purple300
      },

      shell: {
        backgroundColor: yellow300      

      },

      softwareengineering: {
        backgroundColor: blue300

      },

      systemdesign: {
        backgroundColor: orange300

      },

      miscellaneous: {
        backgroundColor: grey300

      }
    }



    return (
      <div id="shell">
        <GridList cols={12}>
          <GridTile cols={8} rows={'auto'}>
            <Card zDepth={2} style={styleCard.left}>
              <CardTitle title="Technical Interview Preparation Questions" titleStyle={styleFont.left} style={styleCard.title} />
              <div style={styleFilter} id="filter">
                <div className="filter_gap">
                  <Chip style={styleChip.algorithm} onTouchTap={this.handleTopicAlgorithm} labelColor={grey900}>Algorithm</Chip>
                </div>
                <div className="filter_gap">        
                  <Chip style={styleChip.database} onTouchTap={this.handleTopicDatabase} labelColor={grey900}>Database</Chip>
                </div>
                <div className="filter_gap">
                  <Chip style={styleChip.shell} onTouchTap={this.handleTopicShell} labelColor={grey900}>Shell</Chip>
                </div>
                <div className="filter_gap">
                  <Chip style={styleChip.softwareengineering} onTouchTap={this.handleTopicSoftwareEngineering} labelColor={grey900}>Software Engineering</Chip>
                </div>
                <div className="filter_gap">
                  <Chip style={styleChip.systemdesign} onTouchTap={this.handleTopicSystemDesign} labelColor={grey900}>System Design</Chip>
                </div>
                <div className="filter_gap">  
                  <Chip style={styleChip.miscellaneous} onTouchTap={this.handleTopicMiscellaneous} labelColor={grey900}>Miscellaneous</Chip>
                </div>
                </div>              
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