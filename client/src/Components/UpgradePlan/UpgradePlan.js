import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import AddModalBox from '../../Containers/AddModalBox'
import Switch from '../Switch'
import Button from '../Button'
import PlanColumn from '../PlanColumn'
import BuyPlanBlock from '../BuyPlanBlock'

import routes from '../../routes'
import styles from './UpgradePlan.module.css'
import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'

function UpgradePlan({ onCloseClick, signUp }) {
  const userSub = useSelector(authSelectors.currentSubscription)
  const possibleProds = useSelector(authSelectors.possibleProds)
  const isLoading = useSelector(authSelectors.isLoading)
  const authError = useSelector(authSelectors.authError)
  const userActivated = useSelector(authSelectors.userActivated)

  const [payPeriod, setPayPeriod] = useState('month')
  const [chousenPlan, setChousenPlan] = useState('Partner')
  const [openBuyPlanBlock, setOpenBuyPlanBlock] = useState(false)

  const dispatch = useDispatch()
  let history = useHistory()

  useEffect(() => {
    if (
      !isLoading &&
      !authError &&
      userActivated &&
      history.location.pathname === routes.plan
    ) {
      history.push(routes.partnerArea)
    }
  }, [isLoading, authError, history, userActivated])

  const onBuyBtnClick = () => {
    setOpenBuyPlanBlock(true)
  }

  const goBackToAllPlans = () => {
    setOpenBuyPlanBlock(false)
  }

  const skipBuyPlan = () => {
    dispatch(authOperations.skipSubscription())
  }

  const { prices } = possibleProds.find(prod => prod.name === chousenPlan)
  const priceOfTheChosenPlan =
    prices.length === 1
      ? prices[0].price
      : prices.find(price => price.interval === payPeriod).price

  return (
    <>
      {openBuyPlanBlock && (
        <BuyPlanBlock
          onCloseClick={onCloseClick}
          chousenPlan={chousenPlan}
          prices={prices}
          goBackToAllPlans={() => goBackToAllPlans()}
          initPayPeriod={payPeriod}
        />
      )}
      {!openBuyPlanBlock && (
        <AddModalBox
          size="large"
          title={signUp ? 'Choose a plan' : 'Upgrade your plan'}
          onCloseClick={onCloseClick}
        >
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.subHeader}>
                <div>
                  <div className={styles.titleCurrentPlan}>{userSub}</div>
                </div>
                <Switch
                  initTimePeriod={payPeriod}
                  setTimePeriod={value => setPayPeriod(value)}
                />
              </div>
              <div className={styles.buttonsBox}>
                {signUp && (
                  <Button bgColor="transparent" onClick={skipBuyPlan}>
                    Skip
                  </Button>
                )}
                <Button bgColor="lightBlue" onClick={onBuyBtnClick}>
                  Buy (${priceOfTheChosenPlan})
                </Button>
              </div>
            </div>
            <div className={styles.plansBox}>
              <div className={styles.plansDescription}>
                <div className={styles.plansDescriptionItem}>
                  Reseller licenses
                </div>
                <div className={styles.plansDescriptionItem}>Zapier</div>
                <div className={styles.plansDescriptionItem}>
                  Personal Software Licenses
                </div>
                <div className={styles.plansDescriptionItem}>
                  Funnel builder
                </div>
                <div className={styles.plansDescriptionItem}>
                  Done for your Funnels
                </div>
                <div className={styles.plansDescriptionItem}>
                  Sub-Partner Access
                </div>
                <div className={styles.plansDescriptionItem}>ReSkin</div>
              </div>
              {/* // !!! HARDCODE  .slice(0, 3) */}
              {possibleProds.map(prod => (
                <div className={styles.plansColumn}>
                  <PlanColumn
                    key={prod.name}
                    name={prod.name}
                    plan={prod}
                    chousen={chousenPlan === prod.name}
                    payPeriod={payPeriod}
                    onPlanClick={name => setChousenPlan(name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </AddModalBox>
      )}
    </>
  )
}

export default UpgradePlan
