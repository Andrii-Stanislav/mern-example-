import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Pen from '../svg/Pen'

import tableOperations from '../../redux/table-data/table-data-operations'

import styles from './InputLicenses.module.css'

function InputLicenses({ count, subPartnerId, disabled }) {
  const [editMode, setEditMode] = useState(false)

  const inputSavedValue = useRef(count)
  const [inputValue, setInputValue] = useState(count)

  const editModeOn = () => {
    inputSavedValue.current = inputValue
    setEditMode(true)
  }

  const heandleCancel = () => {
    setInputValue(inputSavedValue.current)
    setEditMode(false)
  }

  const dispatch = useDispatch()

  const heandleConfirm = () => {
    if (
      inputValue &&
      typeof Number(inputValue) === 'number' &&
      Number(inputValue) > 0 &&
      Math.round(inputValue) === Number(inputValue)
    ) {
      setEditMode(false)
      if (inputValue !== inputSavedValue.current) {
        // send reauest to backend
        dispatch(
          tableOperations.updateSubPartnersLicenses({
            subPartnerId,
            count: inputValue,
          })
        )
      }
    } else {
      console.log('incorrect')
    }
  }

  return (
    <div className={`${styles.container} ${disabled && styles.disabled}`}>
      {!editMode && (
        <div className={styles.showBox}>
          <span onClick={editModeOn} className={styles.showButton}>
            <Pen />
          </span>
          {inputValue}
        </div>
      )}
      {editMode && (
        <div className={styles.editBox}>
          <div onClick={heandleCancel} className={styles.buttonCancel}></div>
          <div className={styles.inputBox}>
            {inputValue}
            <input
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              className={styles.editInput}
              type="number"
              min="1"
              step="1"
              placeholder="*"
            />
          </div>
          <div onClick={heandleConfirm} className={styles.buttonConfirm}></div>
        </div>
      )}
    </div>
  )
}

export default InputLicenses
