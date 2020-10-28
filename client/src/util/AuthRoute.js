import React, { useContext } from 'react'

import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function AuthRoute({ component: NewComponent, ...rest }) {
    const { user } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={(props) => user ? <Redirect to="/home" /> : <NewComponent {...props} />
            }
        />
    )
}



export default AuthRoute;