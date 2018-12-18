import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import { API, graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react';
import Post from './Components/Post';
import PostInput from './Components/PostInput';
import { Loader } from 'components';
import { CREATE_POST, LIST_POSTS } from './Backend/graphql';
export default class Posts extends React.Component {
    state = {
        imgUrlInput: "",
        captionInput: "",
        loading: false
    };
    render() {
        console.log(this.props.childProps.name, this.props.childProps.family_name)
        return (
            <div>
                <h1>Hello from Posts tab</h1>
                <Row>
                    <Col span={16} >
                        <Connect
                            query={graphqlOperation(LIST_POSTS, { limit: 20 })}
                        >
                            {({ data }) => {
                                const posts = data.listPosts
                                    ? data.listPosts
                                    : null;
                                return (
                                    posts
                                        ? (
                                            <React.Fragment>
                                                {
                                                    posts.items.map(
                                                        post =>
                                                            <Post
                                                                post={post}
                                                                key={post.id}
                                                            />
                                                    )
                                                }
                                            </React.Fragment>
                                        )
                                        : (
                                            <Loader
                                                message='Retrieving group data'
                                            />
                                        )
                                )
                            }}
                        </Connect>
                    </Col>
                    <Col span={8} >
                        <PostInput
                            captionInput={this.state.captionInput}
                            imgUrlInput={this.state.imgUrlInput}
                            createPost={this._createPost}
                            loading={this.state.loading}
                            changeInput={
                                (newValue, inputName) => {
                                    const state = this.state;
                                    state[inputName] = newValue;
                                    this.setState(state);
                                }
                            }
                        />
                    </Col>
                </Row>
            </div>
        )
    }
    _createPost = async () => {
        let post;
        const { imgUrlInput, captionInput } = this.state;
        this.setState({ loading: true })
        const variables = {
            imgUrl: imgUrlInput,
            caption: captionInput,
            name: this.props.childProps.name,
            lastname: this.props.childProps.family_name,
        };
        console.log(variables)
        try {
            post = await API.graphql(
                graphqlOperation(CREATE_POST, variables)
            );
        } catch (e) {
            console.log(e)
            alert('An error has ocurred', e);
        } finally {
            if (post) console.log('new post', post);
            this.setState({
                loading: false, imgUrlInput: "", captionInput: ""
            })
        }
    }
}