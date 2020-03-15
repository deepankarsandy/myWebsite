
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HomeLayout extends PureComponent{
  constructor(props){
    super(props);
    // eslint-disable-next-line no-unused-vars
    const { body } = props;
    // set body data to model
    // model will fire event, which will update corresponding components
  }

  render(){
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" />
          <link rel="stylesheet" href="./css/home.css" />
          <title>Home</title>
        </head>

        <body className="has-navbar-fixed-top">
          <div id="root" />
          {/* <div>{JSON.stringify(body)}</div> */}
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <script src="./javascripts/home_bundle.js" />
        </body>
      </html>
    );
  }
}

export default HomeLayout;

HomeLayout.propTypes = {
  body:  PropTypes.object.isRequired,
};
