import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import authSelectors from '../../redux/auth/auth-selectors'
import routes from '../../routes'
// userActivated

export default function PrivateUnsubRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <>
            <Redirect to={routes.login} />
          </>
        )
      }
    />
  )
}
