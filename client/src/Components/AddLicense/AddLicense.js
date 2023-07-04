import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AddModalBox from '../../Containers/AddModalBox'
import Input from '../Input'
import InputPhone from '../InputPhone'
import Button from '../Button'
import Select from '../Select'

import styles from './AddLicense.module.css'

import tableSelectors from '../../redux/table-data/table-data-selectors'
import tableOperations from '../../redux/table-data/table-data-operations'

function AddLicense({ onCloseClick }) {
  const allApps = useSelector(tableSelectors.allApps)
  const licensePlans = useSelector(tableSelectors.licensesPlans)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [plans, setPlans] = useState([])
  const [app, setApp] = useState(allApps[0]?.Name)
  const [plan, setPlan] = useState('')

  useEffect(() => {
    const appId = allApps.find(plan => plan.Name === app).Id
    const currentPlans = licensePlans[appId]?.map(plan => plan.name)
    if (currentPlans) {
      setPlans(currentPlans)
      setPlan(currentPlans[0])
    } else {
      setPlans([])
    }
  }, [app, licensePlans, allApps])

  const heandleChange = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value)
        break
      case 'email':
        setEmail(target.value)
        break
      case 'app':
        setApp(target.value)
        break
      case 'plan':
        setPlan(target.value)
        break
      default:
    }
  }

  const dispatch = useDispatch()

  const addLicense = event => {
    event.preventDefault()

    const appId = allApps.find(oneApp => oneApp.Name === app).Id
    const planId = licensePlans[appId].find(onePlan => onePlan.name === plan).id
    dispatch(
      tableOperations.addLicense({
        name,
        email,
        phone,
        appId,
        planId,
        appName: app,
      })
    )
    onCloseClick()
  }

  return (
    <AddModalBox size="medium" title="Add License" onCloseClick={onCloseClick}>
      <form onSubmit={addLicense}>
        <p className={styles.label}>Name</p>
        <Input
          width="100%"
          placeholder="Enter name"
          name="name"
          onChange={heandleChange}
          value={name}
          min="5"
          required
        />
        <p className={styles.label}>Email</p>
        <Input
          type="email"
          width="100%"
          placeholder="Enter email"
          name="email"
          onChange={heandleChange}
          value={email}
          min="6"
          required
        />
        <p className={styles.label}>Full phone number</p>
        <InputPhone value={phone} onChange={phone => setPhone(phone)} />
        <div className={styles.appBox}>
          <p className={styles.label}>Choose app</p>
          <Select
            name="app"
            value={app}
            onChange={heandleChange}
            arrValues={[...allApps.map(app => app.Name)]}
          />
        </div>
        <div className={styles.planBox}>
          <p className={styles.label}>Choose plan</p>
          <Select
            name="plan"
            value={plan}
            onChange={heandleChange}
            arrValues={plans}
          />
        </div>
        <div className={styles.addLicenseButton}>
          <Button type="submit" bgColor="darkBlue" width="100%">
            Add license
          </Button>
        </div>
      </form>
    </AddModalBox>
  )
}

export default AddLicense
