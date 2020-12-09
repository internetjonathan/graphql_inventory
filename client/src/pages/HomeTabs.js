import React, { useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import Home from '../components/Home'
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useMessageDispatch } from '../context/message';

export default function HomeTabs() {


    const panes = [
        { menuItem: 'Pending Orders', render: () => <Home status="pending" /> },
        { menuItem: 'Incomplete Orders', render: () => <Home status="incomplete" /> },
        { menuItem: 'Completed Orders', render: () => <Home status="complete" /> },
        { menuItem: 'By Material', render: () => <Home status="complete" /> },
    ]
    return (
        <Tab panes={panes} />
    )
}

