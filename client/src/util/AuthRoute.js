import React, { useContext } from 'react'

import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function AuthRoute(props) {
    const { user } = useContext(AuthContext)
    if (props.authenticated && !user) {
        return <Redirect to="/" />
    } else if (props.guest && user) {
        return <Redirect to="/home" />
    } else {
        return <Route component={props.component} {...props} />
    }
    // return (
    //     <Route
    //         {...rest}
    //         render={(props) => user ? <Redirect to="/home" /> : <NewComponent {...props} />
    //         }
    //     />
    // )
}



export default AuthRoute;