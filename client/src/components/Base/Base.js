import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Auth from '../../modules/Auth';
import { AppBar, FlatButton } from 'material-ui';
import Response from '../../modules/Response';
import AlertDialog from '../AlertDialog/AlertDialog';

// I wanted to seperate the non-authenticaton required tabs from the authentication ones
// But the stupid parent <div> requirement prevented me from doing that as it messes up the layout
var RenderAllTabs = (props) => {
  return (
    <div style={{paddingTop: 5}} >
      {props.auth ? (
          <div>
            <FlatButton label="Forum" containerElement={<Link to="/forum"/>}/>
            <FlatButton label="Resources" containerElement={<Link to="/resources" />}/>
            <FlatButton label="Interview" containerElement={<Link to="/interview" />}/>
            <FlatButton label="About" containerElement={<Link to="/about" />}/>
            <FlatButton label="App Log" containerElement={<Link to="/app-log" />}/>
            <FlatButton label="Logout" containerElement={<Link to="/logout" />}/>
          </div>
        ) : (
          <div>
            <FlatButton label="Forum" containerElement={<Link to="/forum"/>}/>
            <FlatButton label="Resources" containerElement={<Link to="/resources" />}/>
            <FlatButton label="Interview" containerElement={<Link to="/interview" />}/>
            <FlatButton label="About" containerElement={<Link to="/about" />}/>
            <FlatButton label="Log In" containerElement={<Link to="/login" />}/>
            <FlatButton label="Sign Up" containerElement={<Link to="/signup" />}/>
          </div>
        )}
    </div>
  );
}

const Base = ({ children }) => (
  <div>
      <div>
        {Auth.checkTokenExpiration()}
        <AppBar
          title={<Link to="/"><img src="JobquestLogo.png"  /></Link>}
          showMenuIconButton={false}
          iconElementRight={<RenderAllTabs auth={Auth.isUserAuthenticated()} />} />
        <div>
          {children}
        </div>
      </div>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
