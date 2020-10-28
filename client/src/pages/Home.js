import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

export default function Home() {
    const { loading, data } = useQuery(FETCH_POST_QUERY)
    const { getPosts: posts } = data ? data : [];
    return (
        <Grid columns={1}>
            <Grid.Row className="page-title">
                <h1>Orders</h1>
            </Grid.Row>
            {loading ? (<h1>Loading posts..</h1>) : (
                posts &&
                posts.map(post => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                    </Grid.Column>
                ))
            )}
            <Grid.Row></Grid.Row>
        </Grid>
    )
}

const FETCH_POST_QUERY = gql`
    {
        getPosts{
        id
        body
        createdAt
        username
        }
    }`
