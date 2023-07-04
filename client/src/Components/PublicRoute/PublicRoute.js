import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import authSelectors from '../../redux/auth/auth-selectors'
import routes from '../../routes'

export default function PublicRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)
  const userActivated = useSelector(authSelectors.userActivated)

  return (
    <Route
      {...routeProps}
      render={props =>
        userActivated === 0 ? (
          <Redirect to={routes.plan} />
        ) : isAuthenticated && routeProps.restricted ? (
          <Redirect to={redirectTo} />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}
