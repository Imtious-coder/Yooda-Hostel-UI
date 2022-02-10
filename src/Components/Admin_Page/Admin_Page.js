import React from 'react';
import { Card } from 'react-bootstrap';
import Header from '../Header/Header';
import Side_Navigation from '../Side_Navigation/Side_Navigation';
const PageLayout = ({ children, pageTitle = 'Page Title' }) => {
  return (
    <div>
      <Header />
      <div className="container my-4">
        <div className="row">
          {/* Sidenavigation... */}
          <Side_Navigation />
          <div className="col-md-8 my-2">
            {/* Cards... */}
            <Card>
              <Card.Header className='text-center py-3 fw-bold text-uppercase text-success' as="h5">{pageTitle}</Card.Header>
              <Card.Body>{children}</Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
