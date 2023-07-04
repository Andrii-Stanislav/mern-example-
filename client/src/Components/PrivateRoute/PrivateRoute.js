import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import authSelectors from '../../redux/auth/auth-selectors'
import routes from '../../routes'

export default function PrivateRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)
  const userActivated = useSelector(authSelectors.userActivated)
  const needRedirect = useSelector(authSelectors.needRedirect)

  return (
    <Route
      {...routeProps}
      render={props =>
        !userActivated ? (
          <Redirect to={routes.plan} />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <>
            {needRedirect ? <Redirect to={redirectTo} /> : <></>}
            {/* {!(isLoadingTable || isLoadingAuth) && <Redirect to={redirectTo} />} */}
          </>
        )
      }
    />
  )
}
