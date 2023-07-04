import React, { useEffect, Suspense, lazy } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import routes from './routes'

import PrivateRoute from './Components/PrivateRoute'
import PublicRoute from './Components/PublicRoute'
import PrivateUnsubRoute from './Components/PrivateUnsubRoute'
import AppBar from './Components/AppBar'
// import SupportButton from './Components/SupportButton'
import Error from './Components/Error'
import Loading from './Components/Loading'

import userLogo from './images/default-user.png'
import authSelectors from './redux/auth/auth-selectors'
import authOperations from './redux/auth/auth-operations'

const Register = lazy(() =>
  import('./Views/Register' /* webpackChunkName: "register-page-view" */)
)
const LoginPage = lazy(() =>
  import('./Views/LoginPage' /* webpackChunkName: "login-page-view" */)
)
const PasswordRecover = lazy(() =>
  import(
    './Views/PasswordRecover' /* webpackChunkName: "password-recover-page-view" */
  )
)
const ConfirmPasswordRecover = lazy(() =>
  import(
    './Views/ConfirmPasswordRecover' /* webpackChunkName: "confirm-password-recover-page-view" */
  )
)
const PartnerArea = lazy(() =>
  import('./Views/PartnerArea' /* webpackChunkName: "partner-area-page-view" */)
)
const AffiliateDashboard = lazy(() =>
  import(
    './Views/AffiliateDashboard' /* webpackChunkName: "affiliate-dashboard-page-view" */
  )
)
const SettingsPage = lazy(() =>
  import('./Views/SettingsPage' /* webpackChunkName: "settings-page-view" */)
)
const BuyPlan = lazy(() =>
  import('./Views/BuyPlan' /* webpackChunkName: "buy-plan-page-view" */)
)
const Docs = lazy(() =>
  import('./Views/Docs' /* webpackChunkName: "docs-page-view" */)
)

function App() {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)
  const userActivated = useSelector(authSelectors.userActivated)

  const dispatch = useDispatch()

  useEffect(() => {
    // get current user
    dispatch(authOperations.getCurrentUser())
  }, [dispatch])

  return (
    <div>
      {isAuthenticated && userActivated !== 0 && <AppBar userLogo={userLogo} />}
      <Suspense fallback={<Loading />}>
        <Switch>
          <PublicRoute
            path={routes.register}
            restricted
            component={Register}
            redirectTo={routes.partnerArea}
          />
          <PublicRoute
            path={routes.login}
            restricted
            component={LoginPage}
            redirectTo={routes.partnerArea}
          />
          <PublicRoute
            path={routes.recoverConfirm}
            restricted
            component={ConfirmPasswordRecover}
            redirectTo={routes.partnerArea}
          />
          <PublicRoute
            path={routes.recover}
            restricted
            component={PasswordRecover}
            redirectTo={routes.partnerArea}
          />
          <PrivateRoute
            path={routes.partnerArea}
            component={PartnerArea}
            redirectTo={routes.login}
          />
          <PrivateRoute
            path={routes.affiliateDashboard}
            component={AffiliateDashboard}
            redirectTo={routes.login}
          />
          <PrivateRoute
            path={routes.settings}
            component={SettingsPage}
            redirectTo={routes.login}
          />
          <PrivateUnsubRoute path={routes.plan} component={BuyPlan} />
          <Route path={routes.docs} component={Docs} />
          <Redirect to={routes.login} />
        </Switch>
      </Suspense>

      {/* <SupportButton /> */}
      <Loading />
      <Error />
    </div>
  )
}

export default App
