import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import SearchAndDownload from '../SearchAndDownload'

import ButtonActions from '../../Components/ButtonActions'
import ActionConfirm from '../../Components/ActionConfirm'
import Modal from '../Modal'

import Play from '../../Components/svg/Play'
import Stop from '../../Components/svg/Stop'
import Delete from '../../Components/svg/Delete'

import tableSelectors from '../../redux/table-data/table-data-selectors'
import tableOperations from '../../redux/table-data/table-data-operations'

import styles from './RightPartnerBlock.module.css'
import routes from '../../routes'

function RightPartnerBlock() {
  const dispatch = useDispatch()
  // const [modalConfirmShow, setModalConfirmShow] = useState(false)

  const [modalConfirmActivateAll, setModalConfirmActivateAll] = useState(false)
  const [modalConfirmDeactivateAll, setModalConfirmDeactivateAll] =
    useState(false)
  const [modalConfirmRemoveAll, setModalConfirmRemoveAll] = useState(false)

  const isSelectedAnyRows = useSelector(tableSelectors.isSelectedAnyRows)

  const isAllSelectedRowsActive = useSelector(
    tableSelectors.isAllSelectedRowsActive
  )
  const isAllSelectedRowsInactive = useSelector(
    tableSelectors.isAllSelectedRowsInactive
  )

  const checkedRows = useSelector(tableSelectors.checkedData)

  let onLicensesPage = useRouteMatch(routes.partnerAreaLicenses)
  let onSubPartnersPage = useRouteMatch(routes.partnerAreaSubPartners)

  const activateAll = () => {
    setModalConfirmActivateAll(false)
    if (onLicensesPage?.isExact) {
      dispatch(
        tableOperations.changeLicensesStatus({ status: 'Active', checkedRows })
      )
    }
    if (onSubPartnersPage?.isExact) {
      dispatch(
        tableOperations.changeSubPartnrsStatus({
          status: 'Active',
          checkedRows,
        })
      )
    }
  }

  const deactivateAll = () => {
    setModalConfirmDeactivateAll(false)
    if (onLicensesPage?.isExact) {
      dispatch(
        tableOperations.changeLicensesStatus({
          status: 'Inactive',
          checkedRows,
        })
      )
    }
    if (onSubPartnersPage?.isExact) {
      dispatch(
        tableOperations.changeSubPartnrsStatus({
          status: 'Inactive',
          checkedRows,
        })
      )
    }
  }

  const removeAll = () => {
    setModalConfirmRemoveAll(false)
    if (onLicensesPage?.isExact) {
      dispatch(tableOperations.deleteLicenses(checkedRows))
    }
    if (onSubPartnersPage?.isExact) {
      dispatch(tableOperations.deleteSubPartners(checkedRows))
    }
  }

  return (
    <>
      <div className={styles.actionBlock}>
        <div className={styles.topActionsBlock}>
          {isAllSelectedRowsInactive && isSelectedAnyRows && (
            <ButtonActions
              onClick={() => setModalConfirmActivateAll(true)}
              icon={<Play />}
            >
              {checkedRows.length > 1 ? 'Activate selected' : 'Activate'}
            </ButtonActions>
          )}
          {isAllSelectedRowsActive && isSelectedAnyRows && (
            <ButtonActions
              onClick={() => setModalConfirmDeactivateAll(true)}
              icon={<Stop />}
            >
              {checkedRows.length > 1 ? 'Deactivate selected' : 'Deactivate'}
            </ButtonActions>
          )}
          {isSelectedAnyRows && (
            <ButtonActions
              onClick={() => setModalConfirmRemoveAll(true)}
              icon={<Delete />}
            >
              {checkedRows.length > 1 ? 'Delete all' : 'Delete'}
            </ButtonActions>
          )}
        </div>
        <SearchAndDownload />
      </div>

      <Modal
        show={modalConfirmActivateAll}
        onHide={() => setModalConfirmActivateAll(false)}
      >
        <ActionConfirm
          id={checkedRows}
          title="Activate"
          color="darkBlue"
          onConfirm={activateAll}
          onCancel={() => setModalConfirmActivateAll(false)}
        />
      </Modal>
      <Modal
        show={modalConfirmDeactivateAll}
        onHide={() => setModalConfirmDeactivateAll(false)}
      >
        <ActionConfirm
          id={checkedRows}
          title="Deactivate"
          color="black"
          onConfirm={deactivateAll}
          onCancel={() => setModalConfirmDeactivateAll(false)}
        />
      </Modal>
      <Modal
        show={modalConfirmRemoveAll}
        onHide={() => setModalConfirmRemoveAll(false)}
      >
        <ActionConfirm
          id={checkedRows}
          title="Delete"
          color="red"
          onConfirm={removeAll}
          onCancel={() => setModalConfirmRemoveAll(false)}
        />
      </Modal>
    </>
  )
}

export default RightPartnerBlock
