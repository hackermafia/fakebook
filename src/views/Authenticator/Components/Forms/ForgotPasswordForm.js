import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import { Auth, Analytics } from 'aws-amplify';
import { ConfirmCodeForm } from '../'
class ForgotPasswordForm extends React.Component {
    state = { loading: false, showModal: false, componentProps: {}, };
    handleSubmit = async (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        let userChangePasswordData, data, error, errorMessage;
        this.props.form.validateFieldsAndScroll((err, values) => {
            userChangePasswordData = values;
            error = err;
        });
        let { username, newPassword, newPasswordConfirmation } = userChangePasswordData;
        username = username.trim();
        newPassword = newPassword.trim();
        newPasswordConfirmation = newPasswordConfirmation.trim();
        if (!error && newPassword === newPasswordConfirmation) {
            try {
                data = await Auth.forgotPassword(username);
            } catch (e) {
                console.log('[Sign Up]', e)
                errorMessage = e.message;
                Analytics.record({
                    name: 'Error',
                    attributes: {
                        message: e.message,
                        object: JSON.stringify(e),
                        location: 'Sign Up @ Forgot Password Form'
                    }
                });
            } finally {
                this.setState({ loading: false });
                if (data) {
                    this.setState({ showModal: true, componentProps: { password: newPassword, username } })
                } else {
                    Modal.error({
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
                    onCancel={() => this.setState({ showModal: false })}
                    footer={null}
                    visible={this.state.showModal}
                    title='Please confirm your email to continue'
                >
                    <ConfirmCodeForm changePassword {...this.state.componentProps} />
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
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: 'Please input your new password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('newPasswordConfirmation', {
                            rules: [{ required: true, message: 'Please confirm your new password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm New Password" />
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                        <Button loading={this.state.loading} block type="primary" htmlType="submit">Change Password</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    };
};
const WrappedForgotPasswordForm = Form.create()(ForgotPasswordForm);
export default WrappedForgotPasswordForm;