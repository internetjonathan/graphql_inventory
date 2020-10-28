import React from 'react'
import { Card, Icon, Label, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function PostCard({ post: { body, createdAt, id, comment, username } }) {
    function completeOrder() {
        console.log('order complete')
    }
    return (
        <div>
            <Card fluid color='red'>
                <Card.Content>
                    <Card.Header as={Link} to={`/posts/${id}`}>{username}</Card.Header>
                    <Card.Meta>{id}</Card.Meta>
                    <Card.Description>
                        {body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green' onClick={completeOrder}>
                            Completed
                        </Button>
                        <Button basic color='red'>
                            Incomplete
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}
