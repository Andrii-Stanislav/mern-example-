import React, { useState } from 'react'

import Modal from '../../Containers/Modal'
import SupportBlock from '../SupportBlock'

import Chat from '../svg/Chat'

import styles from './SupportButton.module.css'

function SupportButton({}) {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <div onClick={() => setModalShow(true)} className={styles.button}>
        <Chat />
        <span className={styles.text}>Chat with us</span>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <SupportBlock onCloseClick={() => setModalShow(false)} />
      </Modal>
    </>
  )
}

export default SupportButton
