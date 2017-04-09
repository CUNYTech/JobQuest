import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../../modules/Auth';


const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">JobQuest</IndexLink> |
        <Link to="/forum">Forum</Link> |
        <Link to="/resources">Resources</Link> |
        <Link to="/about">About</Link>
      </div>

      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/app-log">App-Log</Link>
          <Link to="/interview">Interview Questions</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Log out</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}
    </div>

    {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
