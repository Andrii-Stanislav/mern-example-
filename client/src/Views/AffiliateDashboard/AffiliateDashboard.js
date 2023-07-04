import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import MainContainer from '../../Containers/MainContainer'
import LeftLinksBlock from '../../Containers/LeftLinksBlock'
import AffiliateStats from '../../Containers/AffiliateStats'
import RightAffiliateBlock from '../../Containers/RightAffiliateBlock'

import Table from '../../Components/Table'

import styles from './AffiliateDashboard.module.css'
import routes from '../../routes'
import {
  changeTable,
  changePage,
  changeDateStart,
  changeDateEnd,
} from '../../redux/filter/filter-actions'
import { filterChanged } from '../../redux/table-data/table-data-actions'
import authOperations from '../../redux/auth/auth-operations'

import tableTitles from '../../constants/tableTitles'
import tableNames from '../../constants/tableNames'

function AffiliateDashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authOperations.getAffiliateStats())
  }, [dispatch])

  const changePageDispatch = tableName => {
    dispatch(changeDateStart(''))
    dispatch(changeDateEnd(''))
    dispatch(changeTable(tableName))
    dispatch(changePage(1))
    dispatch(filterChanged(Date.now()))
  }

  return (
    <MainContainer>
      <div className={styles.controlsBlock}>
        <LeftLinksBlock title="Affiliate Dashboard" />
        <div className={styles.rightBlock}>
          <AffiliateStats
            visitorsNumber={7}
            earnedNumber={20}
            dueNumber={10}
            totalPaidNumber={100}
          />
          <RightAffiliateBlock />
        </div>
      </div>
      <Switch>
        <Route
          path={routes.affiliateDashboardReferrals}
          render={() => {
            changePageDispatch(tableNames.affiliateDashboardReferrals)
            return <Table titles={tableTitles.affiliateDashboardReferrals} />
          }}
        />
        <Route
          path={routes.affiliateDashboardTransaction}
          render={() => {
            changePageDispatch(tableNames.affiliateDashboardTransaction)
            return <Table titles={tableTitles.affiliateDashboardTransaction} />
          }}
        />
        <Redirect to={routes.affiliateDashboardReferrals} />
      </Switch>
    </MainContainer>
  )
}

export default AffiliateDashboard
