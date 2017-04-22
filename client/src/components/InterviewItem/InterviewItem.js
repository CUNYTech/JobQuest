import React, { PropTypes,Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import './InterviewItem.css'
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Moment from 'react-moment';
import {blue300, pink300, purple300, yellow300, orange300, grey300, indigo900, grey900} from 'material-ui/styles/colors';


export default class InterviewItem extends Component {
  constructor(props){
    super(props);
  }

  color() {
    var colorType;
    switch(this.props.data.topic) {
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



  render() {
    // make date contain only MM/DD/YYYY

    var linkToThread = this.props.data ? "interview/" + this.props.data._id : null;

    const stylePaper = {
      minHeight: this.props.showDesc ? 150 : 80,
      maxWidth: 'auto',
      margin: 10
    }

    const styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };

  

    return (
      <div>        
        <GridList cols={12}>
          <GridTile cols={12} rows={'auto'}>
          <Paper className="interviewItem" style={stylePaper} zDepth={3}>
            <div className="interviewContent">
              <div className="interviewTitle">
                <Link to={linkToThread}>{this.props.data.title}</Link>
              </div>
              
              <div className="interviewTopic">
                <Chip backgroundColor={this.color()} style={styles.chip} labelColor={grey900}>
                  {this.props.data.topic}
                </Chip>
              </div>

              <div className="interviewInfo">
                <i>submitted at <Moment>{this.props.data.created_at}</Moment> by {this.props.data.author}</i>
              </div>

              <div className="interviewQuestion">
                <strong>Question: </strong>{this.props.data.question}
              </div>
            </div>
          </Paper>
          </GridTile>
        </GridList>
      </div>
    );  
  }
}

InterviewItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};