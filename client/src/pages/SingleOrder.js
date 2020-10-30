import React, { useContext, useState, useRef } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Card, Grid, Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/auth';


export default function SingleOrder(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })
    const commentInputRef = useRef(null)
    const [comment, setComment] = useState('')

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('')
            commentInputRef.current.blur()
        }, variables: {
            postId,
            body: comment
        }
    })

    let postMarkup

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error.</p>
    if (!data.getPost) {
        postMarkup = <p>Loading Post...</p>
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments
        } = data.getPost

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column wdith={1}>
                        < Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    <h1>Order 1</h1>
                                </Card.Header>
                                <Card.Meta>
                                    {createdAt}
                                </Card.Meta>
                                <Card.Description>
                                    {body}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button basic color='green' >
                                            Completed
                                    </Button>
                                        <Button basic color='red'>
                                            Incomplete
                                    </Button>
                                    </div>
                                </Card.Content>
                            </Card.Content>
                        </Card>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    Comments
                                </Card.Header>
                            </Card.Content>
                            {comments && comments.map((comment) => (
                                <Card.Content key={comment.id}>
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{comment.createdAt}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            ))}
                            <Card.Content>
                                <p>Post a comment</p>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment.."
                                            name="comment"
                                            value={comment}
                                            onChange={(event) => setComment(event.target.value)}
                                            ref={commentInputRef}
                                        />
                                        <button
                                            type="submit"
                                            className="ui button teal"
                                            disabled={comment.trim() === ''}
                                            onClick={submitComment}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </Card.Content>

                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body:String!){
        createComment(postId: $postId, body:$body){
            id
            comments{
                id
                body
                createdAt
                username
            }
        }
    }
`
