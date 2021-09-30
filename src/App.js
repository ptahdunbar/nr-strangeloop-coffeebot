import React, { useEffect } from 'react'

import logo from './assets/NewRelic-logo-bug-w.svg'
import drinkbot from './assets/drinkbot.svg'

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'

import CoffeeBot from './CoffeeBot'

const App = () => {
  return (
    <>
      <Container fluid className="header">
        <Container>
          <Row>
            <Col>
              <a href="/">
                <img src={drinkbot} className="wat drinkbot ml-auto" alt="logo" />
              </a>
            </Col>
            <Col className="text-right">
              <a href="/">
              <img src={logo} className="logo" alt="logo" />
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid>
        <CoffeeBot />
      </Container>
    </>
  )
}

export default App
