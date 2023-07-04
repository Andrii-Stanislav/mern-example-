import React from 'react'

import Select from '../svg/Select'

import styles from './SelectSimple.module.css'

/*
              id={rowData.AppId}
              name={rowData.Id}
              optionsArr={plans ? plans : []}
              value={rowData[title]}
              onChange={upgradePlan}

*/
function SelectSimple({ id, name, optionsArr, value, onChange }) {
  return (
    <div className={styles.box}>
      <div className={styles.visibleSelect}>{value}</div>
      <Select />
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.select}
      >
        {optionsArr.map(value => (
          <option key={value} className={styles.option} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
export default SelectSimple
