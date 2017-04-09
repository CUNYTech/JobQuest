import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import './AboutPage.css';


const AboutPage = () => (
  <Card className='container'>
    <CardTitle title="About JobQuest" className="title"/>
    <div>
      <p>
      	JobQuest is a web app designed to help users keep track of their job application history, as well as share that history with others.
      </p>
      <p>
      	This site was created during the CUNY Codes program in the Spring of 2017.
      </p>
    </div>
  </Card>
);

export default AboutPage;