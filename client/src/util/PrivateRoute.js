import React, { useContext } from 'react'

import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function PrivateRoute({ component: NewComponent, ...rest }) {
    const { user } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={(props) => !user ? <Redirect to="/" /> : <NewComponent {...props} />
            }
        />
    )
}



export default PrivateRoute;