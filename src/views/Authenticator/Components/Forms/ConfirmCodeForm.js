import React from 'react';
import { Form, Icon, Input, Button, Modal, notification } from 'antd';
import { Auth, Analytics } from 'aws-amplify';
class NormalLoginForm extends React.Component {
    state = { loading: false };
    resendCode = async (e) => {
        console.log('resending code')
        this.setState({ loading: true });
        e.preventDefault();
        let userConfirmationData, data;
        this.props.form.validateFieldsAndScroll((err, values) => {
            userConfirmationData = values;
        });
        let { username } = userConfirmationData;
        username = username.trim();
        console.log(userConfirmationData)
        if (username) {
            try {
                data = this.props.changePassword ? await Auth.forgotPassword(username) : await Auth.resendSignUp(username);
            } catch (e) {
                console.log('[Confirm Code]', e);
                Modal.error({ title: 'Ooops!', content: e.message + ' Please try again.' });
                Analytics.record({
                    name: 'Error',
                    attributes: {
                        message: e.message,
                        object: JSON.stringify(e),
                        location: 'Confirm Code @ Confirm Code Form'
                    }
                });
            } finally {
                this.setState({ loading: false });
                console.log(data)
                if (data) { notification.success({ message: 'Success!', description: 'Data successfully sent to email address.' }) };
            };
        } else {
            this.setState({ loading: false });
            Modal.error({ title: 'Ooops!', content: 'There has been an unexpected error. Please try again.' });
        }
    };
    confirmCode = (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        let userConfirmationData, error;
        this.props.form.validateFieldsAndScroll((err, values) => {
            userConfirmationData = values;
            error = err;
        });
        let { username, password, code } = userConfirmationData;
        username = username.trim();
        password = password.trim();
        code = code.trim();
        if (this.props.changePassword && !error) {
            this.confirmNewPasswordCode(username, password, code)
        } else if (!error) {
            this.confirmEmailCode(username, password, code)
        } else {
            this.setState({ loading: false });
        };
    };
    confirmEmailCode = async (username, password, code) => {
        let confirmation = null;
        let user = null;
        try {
            if (username && code) {
                confirmation = await Auth.confirmSignUp(username, code)
            } else {
                throw new Error({ message: 'Username connot be empty.' });
            }
        } catch (e) {
            console.log('[Confirm Code]', e);
            Modal.error({ title: 'Ooops!', content: e.message.replace(' Please try again.', 0) + '  Please try again.' });
        } finally {
            if (confirmation) {
                try {
                    user = await Auth.signIn(username, password);
                } catch (e) {
                    console.log('[Confirm Code Sign In]', e);
                    Modal.error({ title: 'Ooops!', content: e.message + ' Please try to sign in', onOk: () => window.location.replace('/sign-in') });
                    Analytics.record({
                        name: 'Error',
                        attributes: {
                            message: e.message,
                            object: JSON.stringify(e),
                            location: 'Confirm Code Sign In @ Confirm Code Form'
                        }
                    });
                } finally {
                    this.setState({ loading: false });
                    if (user) { window.location.replace('/') };
                };
            } else {
                this.setState({ loading: false });
            };
        };
    };
    confirmNewPasswordCode = async (username, password, code) => {
        let confirmation = true;
        let user = null;
        try {
            //promise will resolove as value undifined, that's why we init confirmation as true and look for its false-ness
            confirmation = await Auth.forgotPasswordSubmit(username, code, password)
        } catch (e) {
            console.log('[Confirm New Password Code]', e);
            Modal.error('Ooops!', e.message.replace('please try again', ' \n lol Please try again.'));
            Analytics.record({
                name: 'Error',
                attributes: {
                    message: e.message,
                    object: JSON.stringify(e),
                    location: 'Confirm New Passcord Code @ Confirm Code Form'
                }
            });
        } finally {
            if (!confirmation) {
                try {
                    user = await Auth.signIn(username, password);
                } catch (e) {
                    console.log('[Confirm New Password Code Sign In]', e);
                    Modal.error({ title: 'Ooops!', content: e.message + ' Please try to sign in', onOk: () => window.location.replace('/sign-in') });
                    Analytics.record({
                        name: 'Error',
                        attributes: {
                            message: e.message,
                            object: JSON.stringify(e),
                            location: 'Confirm New Password Code Sign @ Confirm Code Form'
                        }
                    });
                } finally {
                    this.setState({ loading: false });
                    if (user) { window.location.replace('/') };
                };
            } else {
                this.setState({ loading: false });
            };
        };
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        let { username, password } = this.props;
        username = username ? username.trim() : null;
        password = password ? password.trim() : null;
        return (
            <Form onSubmit={this.confirmCode}>
                <React.Fragment>
                    {
                        username ?
                            <Form.Item
                                style={{ height: '0px', margin: '0px 0px 0px 0px', padding: '0px 0px 0px 0px' }} >
                                {
                                    getFieldDecorator('username', { initialValue: username })(<div />)
                                }
                            </Form.Item> :
                            <Form.Item>
                                {
                                    getFieldDecorator('username', { rules: [{ required: true, message: 'Please input your username!' }] })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username or Email" />)
                                }
                            </Form.Item>
                    }
                </React.Fragment>
                <React.Fragment>
                    {
                        password ?
                            <Form.Item
                                style={{ height: '0px', margin: '0px 0px 0px 0px', padding: '0px 0px 0px 0px' }} >
                                {
                                    getFieldDecorator('password', { initialValue: password })(<div />)
                                }
                            </Form.Item> :
                            <Form.Item>
                                {
                                    getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!' }], })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)
                                }
                            </Form.Item>

                    }
                </React.Fragment>
                <Form.Item>
                    {
                        getFieldDecorator('code', { rules: [{ required: true, message: 'Please input your confirmation code!' }] })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Code" />)
                    }
                </Form.Item>
                <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                    <Button loading={this.state.loading} block type="primary" htmlType="submit">Confirm Code</Button>
                    Or
                    <a style={{ marginLeft: 12 }} onClick={(e) => this.resendCode(e)}>Resend confirmation code</a>
                </Form.Item>
            </Form>
        );
    };
};
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;