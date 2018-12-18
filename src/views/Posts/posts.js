import React from 'react';
import { Card, Input, Avatar, Button } from 'antd';
const { Meta } = Card;
export default class Posts extends React.Component {
    state = {
        posts: [
            {
                lastName: "Jobs",
                name: "Steve",
                username: "Mecho",
                imgUrl: "https://i.pinimg.com/originals/81/86/12/81861270ab1fdaef303c0040e2b702d3.jpg",
                caption: "This is a great thing"
            }
        ],
        imgUrlInput: "",
        captionInput: ""
    };
    render() {
        console.log(this.props.childProps.name, this.props.childProps.family_name)
        return (
            <div>
                <h1>Hello from Posts tab</h1>
                {
                    this.state.posts.map(
                        post => <Card
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
                <Input
                    placeholder="Image Url"
                    value={this.state.imgUrlInput}
                    onChange={({ target: { value: imgUrlInput } }) => this.setState({ imgUrlInput })}
                />
                <Input
                    placeholder="Caption"
                    value={this.state.captionInput}
                    onChange={({ target: { value: captionInput } }) => this.setState({ captionInput })}
                />
                <Button
                    onClick={
                        () => {
                            const { imgUrlInput, captionInput, posts: oldPosts } = this.state;
                            const newPost = {
                                imgUrl: imgUrlInput,
                                caption: captionInput,
                                name: 'Steve',
                                lastName: 'Jobs',
                                username: 'mecho'
                            };
                            const posts = oldPosts.concat(newPost);
                            this.setState({ posts });
                        }
                    }
                >Click me, Bitch!</Button>
            </div>
        )
    }
}