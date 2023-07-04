import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import Modal from '../Modal'
import AddSubPartner from '../../Components/AddSubPartner'
import AddLicense from '../../Components/AddLicense'

import Button from '../../Components/Button'

import tableSelectors from '../../redux/table-data/table-data-selectors'

import styles from './CentrallPartnersBlock.module.css'
import routes from '../../routes'

function CentrallPartnersBlock() {
  const [modalShow, setModalShow] = useState(false)
  const [blockInModal, setBlockInModal] = useState('')

  const totalCount = useSelector(tableSelectors.total)
  const isLoading = useSelector(tableSelectors.isLoading)

  const addLicense = () => {
    setBlockInModal('addLicense')
    setModalShow(true)
  }

  const addSubPartner = () => {
    setBlockInModal('addSubPartner')
    setModalShow(true)
  }

  let oLicensessPage = useRouteMatch(routes.partnerAreaLicenses)
  let onSubPartnersPage = useRouteMatch(routes.partnerAreaSubPartners)
  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        {blockInModal === 'addLicense' && (
          <AddLicense onCloseClick={() => setModalShow(false)} />
        )}
        {blockInModal === 'addSubPartner' && (
          <AddSubPartner onCloseClick={() => setModalShow(false)} />
        )}
      </Modal>
      <div className={styles.centrallBlock}>
        {oLicensessPage && (
          <div className={styles.totalLicense}>
            {!isLoading && (
              <div className={styles.partnerCounter}>
                <span className={styles.partnerCounterNumber}>
                  {totalCount}
                </span>
                Total License
              </div>
            )}
            <Button
              onClick={addLicense}
              bgColor="transparent"
              color="#004AAD"
              width="185px"
            >
              Add License
            </Button>
          </div>
        )}
        {onSubPartnersPage && (
          <div className={styles.totalPartners}>
            {!isLoading && (
              <div className={styles.partnerCounter}>
                <span className={styles.partnerCounterNumber}>
                  {totalCount}
                </span>
                Total partners
              </div>
            )}

            <Button
              onClick={addSubPartner}
              bgColor="transparent"
              color="#004AAD"
              width="185px"
            >
              Add Sub-partner
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default CentrallPartnersBlock
