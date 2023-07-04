import React from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import MainContainer from '../../Containers/MainContainer'
import LeftLinksBlock from '../../Containers/LeftLinksBlock'
import CentrallPartnersBlock from '../../Containers/CentrallPartnersBlock'
import RightPartnerBlock from '../../Containers/RightPartnerBlock'
import Table from '../../Components/Table'
import PrivateRestrictedRoute from '../../Components/PrivateRestrictedRoute'

import styles from './PartnerArea.module.css'
import routes from '../../routes'
import { changeTable, changePage } from '../../redux/filter/filter-actions'
import { filterChanged } from '../../redux/table-data/table-data-actions'

import tableTitles from '../../constants/tableTitles'
import tableNames from '../../constants/tableNames'

function PartnerArea() {
  const dispatch = useDispatch()

  const changePageDispatch = tableName => {
    dispatch(changeTable(tableName))
    dispatch(changePage(1))
    dispatch(filterChanged(Date.now()))
  }

  return (
    <MainContainer>
      <div className={styles.controlsBlock}>
        <LeftLinksBlock title="Partner Area" />
        <CentrallPartnersBlock />
        <RightPartnerBlock />
      </div>
      <Switch>
        <Route
          path={routes.partnerAreaExtensions}
          render={() => {
            changePageDispatch(tableNames.partnerAreaExtensions)
            return <Table titles={tableTitles.partnerAreaExtensions} />
          }}
        />
        <Route
          path={routes.partnerAreaLicenses}
          render={() => {
            changePageDispatch(tableNames.partnerAreaLicenses)
            return <Table titles={tableTitles.partnerAreaLicenses} />
          }}
        />
        <PrivateRestrictedRoute
          redirectTo={routes.partnerAreaExtensions}
          path={routes.partnerAreaSubPartners}
          component={() => {
            changePageDispatch(tableNames.partnerAreaSubPartners)
            return <Table titles={tableTitles.partnerAreaSubPartners} />
          }}
        />
        <Redirect to={routes.partnerAreaExtensions} />
      </Switch>
    </MainContainer>
  )
}

export default PartnerArea
