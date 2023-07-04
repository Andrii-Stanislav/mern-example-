import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import routes from '../../routes'
import styles from './EmptyTable.module.css'

function EmptyTable() {
  let onLicensesPage = useRouteMatch(routes.partnerAreaLicenses)
  let onSubPartnersPage = useRouteMatch(routes.partnerAreaSubPartners)
  let onReferralsPage = useRouteMatch(routes.affiliateDashboardReferrals)
  let onTransactionsPage = useRouteMatch(routes.affiliateDashboardTransaction)

  return (
    <div className={styles.container}>
      {onLicensesPage?.isExact && (
        <div className={styles.licenses}>You have no licenses yet</div>
      )}
      {onSubPartnersPage?.isExact && (
        <div className={styles.subPartners}>You have No Sub-partners Yet</div>
      )}
      {onReferralsPage?.isExact && (
        <div className={styles.referrals}>You have No Refferals Yet</div>
      )}
      {onTransactionsPage?.isExact && (
        <div className={styles.transaction}>You have No Transactions Yet</div>
      )}
    </div>
  )
}

export default EmptyTable
