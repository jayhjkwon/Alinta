import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

export default props => (
  <Grid >
    <Row>
      <Col sm={6} smPush={3}>
        {props.children}
      </Col>
    </Row>
  </Grid>
);
