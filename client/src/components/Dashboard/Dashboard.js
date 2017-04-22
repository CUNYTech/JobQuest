import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import './Dashboard.css'

const style = {
  width:200,
  height:200,
  padding:50
};

//Renders a clickable icon that takes the user to another part of the site
//Uses a bit of CSS magic to make a neat overlay pop up
let renderIcon = (imagePath, title, link) => {
  return <Link to={link}>
    <div className="imagecontainer">
      <img src={imagePath} style={style} className='image' />
      <div className="overlay">
        <div className="overlaytxt">{title}</div>
      </div>
    </div>
  </Link>
};

const Dashboard = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
    
    // I LOVE FLEX CONTAINERS!
    <div className="flexcontainer">
      {renderIcon('icons/ForumIcon.png','Forums','/forum')}
      {renderIcon('icons/ApplicationIcon.png','Applications','/app-log')}
      {renderIcon('icons/InterviewIcon.png','Interview Questions','/interview')}
      {renderIcon('icons/ResourcesIcon.png','Resources','/resources')}
    </div>

  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;