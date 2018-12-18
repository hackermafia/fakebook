import React from 'react';
import { Input, Button, Row, Col } from 'antd';
const PostInput = ({
    captionInput, imgUrlInput, loading, createPost, changeInput
}) =>
    !loading
        ? (
            <div style={{ position: 'sticky', top: 30 }} >
                <div className="hover-card" >
                    <h2>Create a post</h2>
                    <Input
                        placeholder="Image Url"
                        value={imgUrlInput}
                        onChange={
                            ({ target: { value: newValue } }) =>
                                changeInput(newValue, 'imgUrlInput')
                        }
                    />
                    <Input
                        placeholder="Caption"
                        value={captionInput}
                        onChange={
                            ({ target: { value: newValue } }) =>
                                changeInput(newValue, 'captionInput')
                        }
                    />
                    <Button
                        type="primary"
                        block
                        onClick={createPost}
                    >
                        Click me, Bitch!
                </Button>
                </div>
            </div>
        )
        : (
            <div>Loading!</div>
        );
export default PostInput;