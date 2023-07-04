import React from 'react'

import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: 'none',
    '& .MuiPaper-rounded': {
      borderRadius: 16,
      boxShadow: '0px 8px 36px rgba(0, 74, 73, 0.26)',
    },
  },
}))

export default function CustomPopover({
  anchorEl,
  handleClosePopover,
  children,
}) {
  const classes = useStyles()

  const open = Boolean(anchorEl)
  const id = open ? 'simple-register-popover' : undefined

  return (
    <Popover
      id={id}
      className={classes.popover}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      {children}
    </Popover>
  )
}
