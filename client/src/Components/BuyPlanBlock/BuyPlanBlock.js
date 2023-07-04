import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import StripeCardField from '../StripeCardField'
import AddModalBox from '../../Containers/AddModalBox'
import Switch from '../Switch'
import Input from '../Input'
import Button from '../Button'
import Checkbox from '../Checkbox'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import api from '../../services/api'
import authSelectors from '../../redux/auth/auth-selectors'
import { setAuthError } from '../../redux/auth/auth-actions'

import routes from '../../routes'
import styles from './BuyPlanBlock.module.css'
import loadingGif from '../../images/spinner.gif'

function BuyPlanBlock({
  onCloseClick,
  chousenPlan,
  prices,
  goBackToAllPlans,
  initPayPeriod,
}) {
  const userid = useSelector(authSelectors.id)
  const dispatch = useDispatch()
  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState(null)

  const [payPeriod, setPayPeriod] = useState(initPayPeriod)
  const [cardName, setCardName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [street, setStreet] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [agreeWithPolicy, setAgreeWithPolicy] = useState(false)

  useEffect(() => {
    if (prices.length === 1) {
      setPayPeriod(prices[0].interval)
    }
  }, [prices])

  const priceOfTheChosenPlan =
    prices.length === 1
      ? prices[0].price
      : prices.find(onePrice => onePrice.interval === payPeriod).price

  const heandleInputChange = ({ target }) => {
    switch (target.name) {
      case 'cardName':
        setCardName(target.value)
        break
      case 'city':
        setCity(target.value)
        break
      case 'state':
        setState(target.value)
        break
      case 'street':
        setStreet(target.value)
        break
      case 'zipCode':
        setZipCode(target.value)
        break
      default:
    }
  }

  const heandleBuyPlan = async event => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }

    if (error) {
      elements.getElement('card').focus()
      return
    }

    if (!agreeWithPolicy) {
      dispatch(setAuthError(`Please agree with the No-refund Policy`))
      return
    }

    if (cardComplete) {
      setProcessing(true)
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (payload.error) {
      setError(payload.error)
      return
    }

    try {
      const { data } = await api.subscription.create(userid, {
        paymentMethodId: payload.paymentMethod.id,
        plan: chousenPlan,
        price: priceOfTheChosenPlan,
        interval: payPeriod,
        // quantity: 1,
        // productType: 'membership',
        name: cardName,
        city,
        state,
        street,
        zipCode,
      })
      setPaymentResult(data)
      setProcessing(false)
    } catch (error) {
      setProcessing(false)
      onCloseClick()
    }

    // onCloseClick()
  }

  return (
    <AddModalBox
      size="medium"
      title={`Buy "${chousenPlan}" plan`}
      onCloseClick={onCloseClick}
    >
      {processing && (
        <div className={styles.loading}>
          <img src={loadingGif} alt="loading" width="200px" />
        </div>
      )}
      {paymentResult ? (
        <div className={styles.infoBox}>
          <p className={styles.infoTitle} role="alert">
            Payment successful
          </p>
          <div>
            <div className={styles.invoiceLink}>
              <a
                href={paymentResult.invoice.hosted_invoice_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button bgColor="transparent" width="100%">
                  Get payment receipt
                </Button>
              </a>
            </div>

            <Button
              bgColor="lightBlue"
              width="100%"
              type="button"
              onClick={() => history.push(routes.partnerArea)}
            >
              Go to main page
            </Button>
          </div>
        </div>
      ) : (
        <>
          {prices.length > 1 && (
            <Switch
              initTimePeriod={initPayPeriod}
              setTimePeriod={value => setPayPeriod(value)}
            />
          )}

          <form className={styles.form} onSubmit={heandleBuyPlan}>
            <div className={styles.creditCardForm}>
              <p className={styles.label}>Credit card </p>

              <StripeCardField
                // externalError={error}
                error={error}
                setError={setError}
                setCardComplete={event => setCardComplete(event)}
                required
              />
              <p className={styles.label}>Name</p>
              <Input
                name="cardName"
                value={cardName}
                onChange={heandleInputChange}
                width="100%"
                placeholder="Enter cardholder name"
                required
              />
              <div className={styles.inputsGrid}>
                <Input
                  name="city"
                  value={city}
                  onChange={heandleInputChange}
                  width="100%"
                  placeholder="City"
                  required
                />
                <Input
                  name="state"
                  value={state}
                  onChange={heandleInputChange}
                  width="100%"
                  placeholder="State"
                  required
                />
                <Input
                  name="street"
                  value={street}
                  onChange={heandleInputChange}
                  width="100%"
                  placeholder="Street"
                  required
                />
                <Input
                  name="zipCode"
                  value={zipCode}
                  onChange={heandleInputChange}
                  width="100%"
                  placeholder="Zip Code"
                  required
                />
              </div>
              <div className={styles.checkboxContainer}>
                <Checkbox
                  id={Date.now()}
                  labelText="I agree with the No-refund Policy"
                  onChange={({ target }) => setAgreeWithPolicy(target.checked)}
                  checked={agreeWithPolicy}
                />
              </div>
              <div className={styles.buttonBox}>
                <Button
                  bgColor="lightBlue"
                  width="100%"
                  type="submit"
                  disabled={processing}
                >
                  {processing
                    ? 'Processing...'
                    : `Buy $(${priceOfTheChosenPlan})`}
                </Button>
              </div>
              <div className={styles.buttonBox}>
                <Button
                  bgColor="white"
                  width="100%"
                  type="button"
                  onClick={goBackToAllPlans}
                  disabled={processing}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </AddModalBox>
  )
}

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_SECRET)

export default function StripeBuyPlanBlock({ ...props }) {
  return (
    <Elements stripe={stripePromise}>
      <BuyPlanBlock {...props} />
    </Elements>
  )
}
