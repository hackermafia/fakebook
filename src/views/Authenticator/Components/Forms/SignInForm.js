import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import { ConfirmCodeForm } from '../';
import { Auth, Analytics } from 'aws-amplify';
class NormalLoginForm extends React.Component {
    state = { loading: false, componentProps: {}, showModal: false };
    handleSubmit = async (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        let userSignInData, user, error, errorMessage;
        this.props.form.validateFieldsAndScroll((err, values) => {
            userSignInData = values;
            error = err;
        });
        let { username, password } = userSignInData;
        username = username.trim();
        password = password.trim();
        if (!error) {
            try {
                user = await Auth.signIn(username, password);
            } catch (e) {
                console.log('[Sign In]', e)
                errorMessage = e.message;
                Analytics.record({
                    name: 'Error',
                    attributes: {
                        message: e.message,
                        object: JSON.stringify(e),
                        location: 'Sign In @ Sign In Form'
                    }
                });
            } finally {
                this.setState({ loading: false });
                if (user) {
                    window.location.replace('/');
                } else {
                    errorMessage === 'User is not confirmed.' ?
                        this.setState({ showModal: true, componentProps: { password, username } })
                        : Modal.error({
                            title: 'Ooops!',
                            content: 'There has been an unexpected error signing into your account: ' + errorMessage
                        });
                };
            };
        } else {
            this.setState({ loading: false });
        };
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <Modal
                    visible={this.state.showModal}
                    footer={null}
                    title='Please confirm your email to continue'
                    onCancel={() => this.setState({ showModal: false })}
                    destroyOnClose
                >
                    <ConfirmCodeForm {...this.state.componentProps} />
                </Modal>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username or Email" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                        <Button loading={this.state.loading} block type="primary" htmlType="submit">Sign in</Button>
                        Or
                    <a style={{ marginLeft: 12 }} href='/forgot-password'>Forgot your password?</a>
                        <a style={{ marginLeft: 12 }} href='/sign-up'>Register now!</a>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    };
};
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;