import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Balls from '../components/Balls/Balls';
import Action from '../components/Action/Action';

import profile from '../mocks/profile.json';
import profileSuccess from '../mocks/profileSuccess.json';
import esferas from '../mocks/esferas.json';
import esferasSuccess from '../mocks/esferasSuccess.json';

const profileBalls = process.env.REACT_APP_PROFILE === 'SUCCESS' ? profileSuccess.profile : profile.profile 
const dragonBalls = process.env.REACT_APP_PROFILE === 'SUCCESS' ? esferasSuccess : esferas

const Manager = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Action balls={profileBalls.balls}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Balls dragonBalls={dragonBalls.balls} profile={profileBalls}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Manager;
