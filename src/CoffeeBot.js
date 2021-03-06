import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import {
  dispense,
  checkStatus,
  wait,
  fetchAll,
  API,
  baseURL,
} from './Api'

import {
  Card,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap'

import useInterval from './useInterval'

import { useArray } from 'react-hookedup'

const CoffeeBot = () => {
  const welcomeMessage = `Welcome, Player 1! Select up to 3 ingredients to place your order.`
  const loadingMessage = `Loading....`
  const initialMessage = `Yay. Click Confirm to finalize your order!`
  const limitedSelectionMessage = 'No more than 3 ingredients available. Click Confirm to finalize your order!'

  const [isLoading, updateLoading] = useState(true)
  const [isDisabled, updateDisabled] = useState(false)
  const [isDispensing, updateDispensing] = useState(false)
  const [items, setItems] = useState([])
  const [message, setMessage] = useState(initialMessage)
  const {
    add,
    clear,
    value: cart,
    setValue: updateCart,
  } = useArray([])

  const addToCart = (id) => {

    if ( isDisabled ) {
      return setMessage('Arrgh. One moment...');
    }

    let updatedList = [...cart];
    let count = updatedList.length

    if ( updatedList.includes(id) ) {
      updatedList.splice(updatedList.indexOf(id), 1)
      count--
      updateCart(updatedList)
    } else if ( count < 3 ) {
      count++
      add(id)
    }

    if ( count > 2 ) {
      setMessage(limitedSelectionMessage)
    } else {
      setMessage(initialMessage)
    }
  }

  const isSelected = (uuid) => cart.includes(uuid)
  const isChecked = (uuid) => isSelected(uuid) ? 'selected' : 'not-selected'

  /**
   * TODO: replace this with actual API.
   * Send the confirmation to the API and return a 200 OK.
   */
  const confirm = async(cart) => {
    updateDisabled(true)
    setMessage('Confirming...')
    
    // post to api
    dispense(cart).then(({data}) => {
      setMessage('Dispensing...')
      updateDispensing(data.id)
    }).catch(() => {
      updateDisabled(false)
    })
  }

  const fetchItems = async () => {
    await wait(1000)
    setItems(fetchAll())
  }

  useEffect(() => {
    fetchAll()
      .then(({data}) => {
        updateLoading(false)
        setItems(data)
      })
      .catch(err => alert(err))
  }, [!isLoading])

  useInterval(
    () => {
      checkStatus(isDispensing)
      .then((res) => {
        setMessage(res.data.message)
        if (res.data.status == 200) {
          updateDispensing(false)
          updateDisabled(false)
          setMessage('Done!')
        }
      })
      .catch(err => alert(err))
    },
    // Delay in milliseconds or null to stop it
    isDispensing ? 1000 : null,
  )

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
            <Button className={! isDisabled && cart.length >= 1 ? 'ready' : 'disabled'} onClick={() => confirm(cart)}>Confirm</Button>
          </Col>
        </Row>
        <Row className={ ! isDisabled ? '' : 'disabled'}>
            {! isLoading &&
            items.map(({uuid, url, title}) => (
              <Col key={uuid} lg={4}>
                <a href={`#${uuid}`} onClick={(e) => {
                  addToCart(uuid)
                  return e.preventDefault()
                }}>
                  <Card className={isChecked(uuid)}>
                    <Card.Body>
                      {isSelected(uuid) && <div className="checked"><FontAwesomeIcon icon={faCheckCircle} size="5x" color="#0db0bf" /></div>}
                      <Card.Img variant="top" src={url} />
                      <Card.Title className="p-3 mb-0 text-center">{title}</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            ))}
        </Row>
        <Row>
          <Col>
            <Button className={! isDisabled && cart.length >= 1 ? 'ready' : 'disabled'} onClick={() => clear()}>Clear Selection</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CoffeeBot
