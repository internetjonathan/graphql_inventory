import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'

export default function Home() {
    const { loading, data } = useQuery(FETCH_POST_QUERY);

    if (loading) {
        return <h1>Loading posts...</h1>;
    }
    console.log()

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Pposts</h1>
            </Grid.Row>
            <Grid.Row>
                {data.getPosts &&
                    data.getPosts.map((post) => (
                        <Grid.Column key={post.id}>
                            {/* <PostCard post={post} /> */}
                        </Grid.Column>
                    ))}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POST_QUERY = gql`
    {
        getPosts{
        id
        body
        createdAt
        }
    }`
