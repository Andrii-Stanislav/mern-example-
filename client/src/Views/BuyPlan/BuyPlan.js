import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UpgradePlan from '../../Components/UpgradePlan'
import LoginContainer from '../../Containers/LoginContainer'

import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'

function BuyPlan() {
  const dispatch = useDispatch()
  const possibleProds = useSelector(authSelectors.possibleProds)

  useEffect(() => {
    dispatch(authOperations.getPlans())
  }, [dispatch])
  return (
    <LoginContainer
      mainTitle="Congratulations!"
      subTitle="Your account is already created. Please, choose a plan to continue"
    >
      {possibleProds && <UpgradePlan signUp />}
    </LoginContainer>
  )
}

export default BuyPlan
