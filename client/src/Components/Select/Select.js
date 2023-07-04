import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../styles/variables'

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '100%',
    '& *': {
      color: colors.darkBlue,
    },
  },

  root: {
    fontSize: '16px',

    '& > *:first-child': {
      padding: '10px 32px 10px 10px',
    },
  },
}))

function SelectCustom({ arrValues, value, onChange, name }) {
  const classes = useStyles()

  return (
    <>
      {Array.isArray(arrValues) && (
        <FormControl className={classes.formControl} variant="outlined">
          <Select
            className={classes.root}
            name={name}
            id={`select_${name}`}
            value={value}
            onChange={onChange}
          >
            {arrValues.map(value => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  )
}

export default SelectCustom
