import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import {
  GET,
  POST
} from './mock-api'

import {
  Card,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap'

const CoffeeBot = () => {
  const welcomeMessage = `Welcome, Player 1! Click up to 3 items to place your order.`
  const loadingMessage = `Loading....`
  const readyMessage = `Yay. Click Confirm to finalize your order!`
  const limitedSelectionMessage = 'No more than 3 items available. Click Confirm to finalize your order!'

  const [isLoading, updateLoading] = useState(true)
  const [cart, updateCart] = useState([])
  const [items, setItems] = useState([])
  const [message, setMessage] = useState(readyMessage)

  /**
   * TODO:
   * - allow unchecking selected items: 3 or less.
   */
  const addToCart = (id, {isSelected}) => {
    let updatedList = [...cart];

    if ( updatedList.length >= 2 ) {
      setMessage(limitedSelectionMessage)
    } else {
      setMessage(readyMessage)
    }

    if ( updatedList.length <= 2 ) {
      updatedList = [...cart, id];
    }

    updateCart(unique(updatedList))
  }

  const unique = (a) => a.filter((item, i, ar) => ar.indexOf(item) === i)
  const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds))

  const isSelected = (i) => cart.includes(i) ? true : false
  const isChecked = (item) => isSelected(item) ? 'selected' : 'not-selected'

  const confirm = async(cart) => {
    console.log('confirm', cart)
    setMessage('Confirming...')
    await wait(1000)
    setMessage('Dispensing...')
    await wait(1000)
    setMessage('Done!')
    // await wait(500)
    // reset()
  }

  const fetchItems = async () => {
    await wait(1000)
    setItems(GET())
  }

  const reset = async () => {
    updateCart([])
    await fetchItems()
  }

  useEffect(() => {
    async function apiGet() {
      updateLoading(true)
      const response = await fetchItems()
      updateLoading(false)

      return response
    }

    apiGet()
  }, [])

  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col>
            {isLoading && <div id="message" className={'p-4 mb-3'}>{loadingMessage}</div>}
            {!isLoading && cart.length < 1 && <div id="message" className={'p-4 mb-3'}>{welcomeMessage}</div>}
            {!isLoading && cart.length > 0 && <div id="message" className={'p-4 mb-3'}>{message}</div>}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button className={cart.length >= 1 ? 'ready' : 'disabled'} onClick={() => confirm(cart)}>Confirm</Button>
          </Col>
        </Row>
        <Row>
            {! isLoading &&
            items.map(({uuid, url, title}) => (
              <Col key={uuid} lg={4}>
                <a href={`#${uuid}`} onClick={(e) => {
                  addToCart(uuid, {
                    isSelected: isSelected(uuid),
                  })

                  return e.preventDefault()
                }}>
                  <Card className={isChecked(uuid)}>
                    <Card.Body>
                      {isSelected(uuid) && <div className="checked"><FontAwesomeIcon icon={faCheckCircle} size="5x" color="#0db0bf" /></div>}
                      <Card.Img variant="top" src={url} />
                      <Card.Title className="pt-3 mb-0">{title}</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            ))}
        </Row>
        <Row>
          <Col>
            <Button className={cart.length >= 1 ? 'ready' : 'disabled'} onClick={() => confirm(cart)}>Confirm</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CoffeeBot
