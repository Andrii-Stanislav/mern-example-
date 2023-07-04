import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import AddModalBox from '../../Containers/AddModalBox'
import Input from '../Input'
import InputPhone from '../InputPhone'
import Button from '../Button'

import tableOperations from '../../redux/table-data/table-data-operations'

import styles from './AddSubPartner.module.css'

function AddSubPartner({ onCloseClick }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [licenses, setLicenses] = useState(1)

  const heandleChange = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value)
        break
      case 'email':
        setEmail(target.value)
        break
      case 'licenses':
        setLicenses(target.value)
        break

      default:
    }
  }

  const dispatch = useDispatch()

  const addSubPartner = event => {
    event.preventDefault()

    dispatch(tableOperations.addSubPartner({ name, email, phone, licenses }))
    onCloseClick()
  }

  return (
    <AddModalBox
      size="medium"
      title="Add Sub-partner"
      onCloseClick={onCloseClick}
    >
      <form onSubmit={addSubPartner}>
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
          required
        />
        <p className={styles.label}>Full phone number</p>
        <InputPhone value={phone} onChange={phone => setPhone(phone)} />
        <p className={styles.label}>Licenses</p>
        <Input
          type="number"
          min="1"
          step="1"
          width="100%"
          placeholder="Licenses"
          name="licenses"
          onChange={heandleChange}
          value={licenses}
          required
        />
        <div className={styles.addLicenseButton}>
          <Button type="submit" bgColor="darkBlue" width="100%">
            Add sub-partner
          </Button>
        </div>
      </form>
    </AddModalBox>
  )
}

export default AddSubPartner
