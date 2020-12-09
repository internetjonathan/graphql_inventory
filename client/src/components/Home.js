import React, { useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Tab } from 'semantic-ui-react';

import PostCard from './PostCard';

export default function Home(props) {
    const [posts, setPost] = useState([])
    const { loading, data } = useQuery(FETCH_POST_QUERY)
    const { getPosts: post } = data ? data : [];

    const { data: messageData, error: messageError } = useSubscription(POST_SUB)


    // useEffect(() => {
    //     setPost(post)
    // }, [])

    // if (messageError) {
    //     console.log(messageError)
    // }
    // useEffect(() => {
    if (!messageError && messageData) {
        post.push(messageData.newPost)
        console.log(post)
        // setPost(post)
    }
    // }, [messageData])

    // console.log(posts)
    return (
        <Tab.Pane>
            <Grid columns={1}>
                <Grid.Row>
                    <Grid.Column >
                        <h1>Orders</h1>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {loading ? (<h1>Loading posts..</h1>) : (
                        post &&
                        post.filter(post => post.status === props.status).map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )}
                </Grid.Row>
            </Grid>
        </Tab.Pane>
    )
}

const FETCH_POST_QUERY = gql`
    {
        getPosts{
        id
        body
        createdAt
        username
        status
        }
    }`
const POST_SUB = gql`
    subscription {
        newPost{
        id
        body
        createdAt
        username
        status
        }
    }`
