import React, { PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';

class NotFoundPage extends React.Component {

	render() {
	    return(
        <Card>
            <CardTitle title='404 Error: Resource Not Found' />
        </Card>
        );
	};
}

export default NotFoundPage;