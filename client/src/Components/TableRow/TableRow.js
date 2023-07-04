import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'

import {
  StyledTableRow,
  TableData,
  HiddenData,
  HoveredEmail,
} from './StyledTableRow'
import Checkbox from '../Checkbox'
import SelectSimple from '../SelectSimple'
import InputLicenses from '../InputLicenses'
import ButtonAction from '../ButtonAction'

import ActionConfirm from '../ActionConfirm'
import Modal from '../../Containers/Modal'

import tableSelectors from '../../redux/table-data/table-data-selectors'
import tableOperations from '../../redux/table-data/table-data-operations'

import routes from '../../routes'

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
    '& .MuiPaper-rounded': {
      borderRadius: 16,
    },
  },
}))

function TableRow({ rowData, titles, index, onChange, checked }) {
  const [modalConfirmShow, setModalConfirmShow] = useState(false)
  const [currentPlan, setCurrentPlan] = useState('')

  useEffect(() => {
    setCurrentPlan(rowData.Plan)
  }, [rowData, currentPlan])

  const dispatch = useDispatch()
  const licensePlans = useSelector(tableSelectors.licensesPlans)

  let onLicensesPage = useRouteMatch(routes.partnerAreaLicenses)
  let onSubPartnersPage = useRouteMatch(routes.partnerAreaSubPartners)

  const upgradePlan = ({ target }) => {
    const planId = licensePlans[target.id].find(
      plan => plan.name === target.value
    )
    const oldPlan = licensePlans[target.id].find(
      plan => plan.name === currentPlan
    )
    const different = planId.price - oldPlan.price

    dispatch(
      tableOperations.upgradeLicensesPlan(target.name, planId, different)
    )
  }

  const changeStatus = () => {
    const status = rowData['Status'] === 'Inactive' ? 'Active' : 'Inactive'

    if (onLicensesPage?.isExact) {
      dispatch(
        tableOperations.changeLicensesStatus({
          status,
          checkedRows: [String(rowData.Id)],
        })
      )
    }
    if (onSubPartnersPage?.isExact) {
      dispatch(
        tableOperations.changeSubPartnrsStatus({
          status,
          checkedRows: [String(rowData.Id)],
        })
      )
    }
  }

  // Show full tableData info logic
  const [fullInfo, setFullInfo] = useState('')

  const [anchorEl, setAnchorEl] = useState(null)
  const handleClosePopover = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-email-popover' : undefined

  const onHoverEnter = ({ target }) => {
    const { width: emailWidth } = target.getBoundingClientRect()
    const { width: boxWidth } = target.parentNode.getBoundingClientRect()
    const isAllShown = boxWidth - 30 - emailWidth > 0

    setFullInfo(target.textContent)
    if (!isAllShown) {
      setAnchorEl(target.parentNode)
    }
  }

  const onHoverLeave = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()

  return (
    <>
      <Modal show={modalConfirmShow} onHide={() => setModalConfirmShow(false)}>
        <ActionConfirm
          id={rowData.Id}
          title={rowData['Status'] === 'Inactive' ? 'Activate' : 'Deactivate'}
          color={rowData['Status'] === 'Inactive' ? 'darkBlue' : 'black'}
          onConfirm={changeStatus}
          onCancel={() => setModalConfirmShow(false)}
        />
      </Modal>
      <StyledTableRow
        checkBox={titles.includes('checkBox')}
        columns={titles.length}
        checked={titles.includes('checkBox') && checked}
        index={index}
        inactive={rowData['Status'] === 'Inactive'}
      >
        {titles.map((title, index) => {
          // let key = `${title}${rowData[title]}${rowData.Id}`

          if (title === 'checkBox') {
            return (
              <TableData key={index}>
                <Checkbox
                  id={rowData.Id}
                  onChange={onChange}
                  checked={checked}
                />
              </TableData>
            )
          } else if (title === 'Plan') {
            const plans = licensePlans[rowData.AppId]?.map(plan => plan.name)
            return (
              <TableData key={index}>
                <SelectSimple
                  id={rowData.AppId}
                  name={rowData.Id}
                  optionsArr={plans ? plans : []}
                  value={rowData[title]}
                  onChange={upgradePlan}
                />
              </TableData>
            )
          } else if (title === 'Licenses') {
            return (
              <>
                {onSubPartnersPage ? (
                  <InputLicenses
                    key={index}
                    subPartnerId={rowData.Id}
                    count={rowData[title]}
                    disabled={rowData['Status'] === 'Inactive'}
                  />
                ) : (
                  <TableData key={index}>{rowData[title]}</TableData>
                )}
              </>
            )
          } else if (title === 'Status') {
            const dataInfo = rowData[title.replace(' ', '')]

            return (
              <>
                <TableData color={dataInfo === 'Active' && 'green'} key={index}>
                  {dataInfo !== null ? dataInfo : '-'}
                </TableData>
              </>
            )
          } else if (title === 'Email') {
            const dataInfo = rowData[title]

            return (
              <TableData key={index}>
                <HiddenData
                  onPointerEnter={onHoverEnter}
                  onPointerLeave={onHoverLeave}
                >
                  {dataInfo !== null ? dataInfo : '-'}
                </HiddenData>
              </TableData>
            )
          } else if (title === 'Action') {
            const action =
              rowData['Status'] === 'Inactive' ? 'Activate' : 'Deactivate'
            return (
              <TableData key={index}>
                <ButtonAction onClick={() => setModalConfirmShow(true)}>
                  {action}
                </ButtonAction>
              </TableData>
            )
          } else {
            const dataInfo = rowData[title.replace(' ', '')]
            return (
              <TableData key={index}>
                <HiddenData
                  onPointerEnter={onHoverEnter}
                  onPointerLeave={onHoverLeave}
                >
                  {dataInfo !== null ? dataInfo : '-'}
                </HiddenData>
              </TableData>
            )
          }
        })}
      </StyledTableRow>
      <Popover
        id={id}
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <HoveredEmail>{fullInfo}</HoveredEmail>
      </Popover>
    </>
  )
}

export default TableRow
