import React from 'react'

import StyledChech from '../svg/StyledChech'

import styles from './PlanColumn.module.css'

function PlanColumn({ name, plan, chousen, payPeriod, onPlanClick }) {
  const monthlyPrice = plan.prices.find(price => price.interval === 'month')
  const yearPrice = plan.prices.find(price => price.interval === 'year')

  const { description = [] } = plan
  const resellerLicensesArr =
    description
      .find(desc => desc?.includes('Reseller Licenses'))
      ?.replace('Reseller Licenses', '')
      .replace('Monthly', '')
      .replace('Annual', '')
      .split('/') || []

  const yearLicenses = resellerLicensesArr[resellerLicensesArr.length - 1]
  const monceLicenses = resellerLicensesArr[
    resellerLicensesArr.length - 2
  ]?.replace('del>', '')

  const zapier = description.find(desc =>
    desc?.toLowerCase().includes('zapier')
  )
  const personalSoftwareLicenses = description.find(desc =>
    desc?.toLowerCase().includes('personal software licenses')
  )
  const funnelBuilder = description.find(desc =>
    desc?.toLowerCase().includes('funnel builder')
  )
  const doneForYouFunnels = description.find(desc =>
    desc?.toLowerCase().includes('done for you funnels')
  )
  const subPartnerAccess = description.find(desc =>
    desc?.toLowerCase().includes('sub-partner access')
  )
  const reSkin = description.find(desc =>
    desc?.toLowerCase().includes('reskin')
  )

  const priceMarkup = (monthlyPrice, yearPrice) => (
    <>
      {(monthlyPrice && yearPrice && (
        <div div className={styles.price}>
          ${payPeriod === 'month' ? monthlyPrice?.price : yearPrice?.price}
          <div className={styles.pricePeriod}>
            {payPeriod === 'month' ? '/month' : '/year'}
          </div>
        </div>
      )) ||
        ((monthlyPrice || yearPrice) && (
          <div div className={styles.price}>
            ${monthlyPrice?.price || yearPrice?.price}
            <div className={styles.pricePeriod}>
              /{monthlyPrice?.interval || yearPrice?.interval}
            </div>
          </div>
        ))}
    </>
  )

  return (
    <div
      onClick={() => onPlanClick(name)}
      name={name}
      className={chousen ? styles.chousenContainer : styles.container}
    >
      <div className={chousen ? styles.chousenHeader : styles.header}>
        <div className={styles.name}>{name}</div>
        {priceMarkup(monthlyPrice, yearPrice)}
      </div>
      <div className={chousen ? styles.chousenPlanDescription : ''}>
        <>
          <div className={styles.planBlock}>
            {payPeriod === 'month'
              ? monceLicenses || yearLicenses
              : yearLicenses || monceLicenses}
          </div>
          <div className={styles.planBlock}>
            {zapier ? <StyledChech checked={chousen} /> : '-'}
          </div>
          <div className={styles.planBlock}>
            {personalSoftwareLicenses ? <StyledChech checked={chousen} /> : '-'}
          </div>
          <div className={styles.planBlock}>
            {funnelBuilder ? <StyledChech checked={chousen} /> : '-'}
          </div>
          <div className={styles.planBlock}>
            {doneForYouFunnels ? <StyledChech checked={chousen} /> : '-'}
          </div>
          <div className={styles.planBlock}>
            {subPartnerAccess ? <StyledChech checked={chousen} /> : '-'}
          </div>
          <div className={styles.planBlock}>
            {reSkin ? <StyledChech checked={chousen} /> : '-'}
          </div>
        </>
      </div>
    </div>
  )
}

export default PlanColumn
