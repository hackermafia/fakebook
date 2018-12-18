import React from 'react';
import { Card, Avatar } from 'antd';
const { Meta } = Card;
export default class Post extends React.Component {
    render() {
        const { post } = this.props;
        return (
            <Card
                style={{ width: 300 }}
                key={Math.random()}
                cover={
                    <img
                        alt="example"
                        src={post.imgUrl}
                    />
                }
            >
                <Meta
                    avatar={
                        <Avatar
                            style={{
                                backgroundColor: "#7265e6"
                            }}
                        >
                            {post.username[0]}
                        </Avatar>
                    }
                    title={post.caption}
                    description={
                        '@' + post.username + ' - ' + post.name + ' ' + post.lastName
                    }
                />
            </Card>
        )
    }
}