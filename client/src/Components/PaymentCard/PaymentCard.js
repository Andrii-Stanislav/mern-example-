import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

import ConfirmCancelButtons from '../ConfirmCancelButtons'
import StripeCardField from '../StripeCardField'

import Pen from '../svg/Pen'

import styles from './PaymentCard.module.css'
import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'

function PaymentCard() {
  const stripe = useStripe()
  const elements = useElements()

  const cardBrand = useSelector(authSelectors.cardBrand)
  const cardCountry = useSelector(authSelectors.cardCountry)
  const cardNumberLast = useSelector(authSelectors.cardNumberLast)
  const cardExpiryMonth = useSelector(authSelectors.cardExpiryMonth)
  const cardExpiryYear = useSelector(authSelectors.cardExpiryYear)

  const [editCard, setEditCard] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)
  const [error, setError] = useState(null)

  const [loading, setLoading] = useState(false)

  const heandleEditCard = () => {
    setEditCard(true)
  }

  const heandleCancelEditCard = () => {
    setEditCard(false)
  }

  const dispatch = useDispatch()
  const heandleConfirmEditCard = async event => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }

    if (!cardComplete) {
      elements.getElement('card').focus()
      return
    }

    setLoading(true)
    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })
    setLoading(false)

    console.log('paymentMethod: ', payload)

    if (payload.error) {
      setError(payload.error)
      return
    }

    dispatch(
      authOperations.updatePaymentInfo({ paymentId: payload.paymentMethod.id })
    )
    setEditCard(false)
  }

  return (
    <div className={styles.main}>
      <div className={styles.subTitle}>Card Details</div>

      <div className={styles.container}>
        {editCard && !loading && (
          <div className={styles.editButton}>
            <ConfirmCancelButtons
              confirm={heandleConfirmEditCard}
              cancel={heandleCancelEditCard}
            />
          </div>
        )}
        {!editCard && (
          <div className={styles.editButton} onClick={heandleEditCard}>
            <Pen fill="#252020" />
            <span>Edit</span>
          </div>
        )}

        {!editCard && (
          <>
            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>Brand:</div>
              <div className={styles.cardInfo}>{cardBrand}</div>
            </div>
            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>Country:</div>
              <div className={styles.cardInfo}>{cardCountry}</div>
            </div>
            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>Card</div>
              <div className={styles.cardInfo}>
                **** **** **** {cardNumberLast}
              </div>
            </div>
            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>Card Expiry:</div>
              <div className={styles.cardInfo}>
                {cardExpiryMonth}/{cardExpiryYear}
              </div>
            </div>
          </>
        )}

        {loading && <p>Loading...</p>}

        {editCard && (
          <form className={styles.editForm} onSubmit={heandleConfirmEditCard}>
            <StripeCardField
              externalError={error}
              setCardComplete={event => setCardComplete(event)}
            />
          </form>
        )}
      </div>
    </div>
  )
}

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_SECRET)

export default function StripePaymentCard({ ...props }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentCard {...props} />
    </Elements>
  )
}
