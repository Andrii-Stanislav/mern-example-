import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import AddModalBox from '../../Containers/AddModalBox'
import Input from '../Input'
import TextArea from '../TextArea'
import Button from '../Button'
import Logo from '../Logo'

import styles from './SupportBlock.module.css'
import authOperations from '../../redux/auth/auth-operations'

function Support({ onCloseClick }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')

  const heandleChange = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value)
        break
      case 'email':
        setEmail(target.value)
        break
      case 'query':
        setQuery(target.value)
        break

      default:
    }
  }

  const dispatch = useDispatch()
  const connectToSupport = () => {
    onCloseClick()
    dispatch(authOperations.sendSupport({ name, email, query }))
  }

  return (
    <AddModalBox
      size="medium"
      bgColor="darkBlue"
      title="CloudKi support"
      icon={<Logo />}
      onCloseClick={onCloseClick}
    >
      <p className={styles.label}>Your Name*</p>
      <Input
        width="100%"
        placeholder="Enter name"
        name="name"
        onChange={heandleChange}
        value={name}
        require
      />
      <p className={styles.label}>Your Email</p>
      <Input
        type="email"
        width="100%"
        placeholder="Enter email"
        name="email"
        onChange={heandleChange}
        value={email}
      />
      <p className={styles.label}>What can we help you with?*</p>
      <TextArea
        width="100%"
        placeholder="I’m looking for a help with..."
        name="query"
        onChange={heandleChange}
        value={query}
        require
      />
      <div className={styles.buttonBox}>
        <Button bgColor="lightBlue" width="100%" onClick={connectToSupport}>
          Connect to support agent
        </Button>
        <Button bgColor="white" width="100%" onClick={() => onCloseClick()}>
          Cancel
        </Button>
      </div>
    </AddModalBox>
  )
}

export default Support
