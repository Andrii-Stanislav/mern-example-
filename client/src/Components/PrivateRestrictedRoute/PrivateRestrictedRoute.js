import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import authSelectors from '../../redux/auth/auth-selectors'
import accountTypes from '../../constants/accountTypes'

export default function PrivateRestrictedRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)
  const isNotRestricted =
    useSelector(authSelectors.plan).trim() === accountTypes.partner.trim()

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated && isNotRestricted ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect to={redirectTo} />
          </>
        )
      }
    />
  )
}
