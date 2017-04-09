import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { Link } from 'react-router';
import Reddit from '../Reddit/Reddit'

import './ResourcePage.css';


const ResourcePage = () => (
  <div>

    <Card className="container">
      <CardTitle title="Additional Resources"  />
    </Card>

    <div className="flex-container">
      <div className="mainbar">
        <Reddit  />
    </div>

    <div className="sidebar">
    </div>

  </div>

  </div>
);

export default ResourcePage;