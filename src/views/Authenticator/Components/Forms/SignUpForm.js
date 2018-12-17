import React from 'react';
import { Form, Icon, Input, Button, Modal } from 'antd';
import { ConfirmCodeForm } from '../';
import { Auth, Analytics } from 'aws-amplify';
import { objectToArrayWithKeys } from 'utilities';
class NormalSignUpForm extends React.Component {
    state = { loading: false, componentProps: {}, showModal: false };
    handleSubmit = async (e) => {
        this.setState({ loading: true })
        e.preventDefault();
        let userSignUpData, user, fieldError, error, loggedUser, signInError;
        this.props.form.validateFieldsAndScroll((err, values) => {
            userSignUpData = values;
            fieldError = err;
        });
        objectToArrayWithKeys(userSignUpData)
            .map(({ key, value }) => ({ key, value: String(value).trim() }))
            .forEach(({ key, value }) => userSignUpData[key] = value);
        let { username, password, passwordConfirmation, ...attributes } = userSignUpData;
        if (!fieldError && password === passwordConfirmation) {
            try {
                user = await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        ...attributes,
                    }
                });
            } catch (e) {
                console.log('[Sign Up]', e)
                Analytics.record({
                    name: 'Error',
                    attributes: {
                        message: e.message,
                        object: JSON.stringify(e),
                        location: 'Sign Up @ Sign Up Form'
                    }
                });;
                error = e;
            } finally {
                this.setState({ loading: false });
                if (user) {
                    try {
                        loggedUser = await Auth.signIn(username, password);
                    } catch (e) {
                        console.log('[Sign In after account Creation]', e);
                        Analytics.record({
                            name: 'Error',
                            attributes: {
                                message: e.message,
                                object: JSON.stringify(e),
                                location: 'Sign Up (2) @ Sign Up Form'
                            }
                        });
                        signInError = e;
                    } finally {
                        (signInError.code === "UserNotConfirmedException" && !loggedUser) ?
                            this.setState({ showModal: true, componentProps: { password, username } })
                            : Modal.error({
                                title: 'Ooops!',
                                content: 'Ha habido un error inesperado -- signing into your account: ' + error.message
                            });
                    };
                } else {
                    (error.code) ?
                        Modal.error({
                            title: 'Ooops!',
                            content: 'Ha habido un error inesperado -- creating your account: ' + error.message
                        }) : void (0);
                };
            };
        } else if (password !== passwordConfirmation) {
            this.setState({ loading: false });
            Modal.error({
                title: 'Ooops!',
                content: 'Tus contraseñas no coinciden!'
            });
        };
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <Modal
                    visible={this.state.showModal}
                    footer={null}
                    title='Please input your email para continuar'
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
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('family_name', {
                            rules: [{ required: true, message: 'Please input your last name!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('passwordConfirmation', {
                            rules: [{ required: true, message: 'Please input your password again!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '0px', textAlign: 'center' }}>
                        <Button loading={this.state.loading} block type="primary" htmlType="submit">Sign Up</Button>
                        Or
                    <a style={{ marginLeft: 12 }} href='/sign-in'>Already have an account?</a>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    };
};
const WrappedNormalSignUpForm = Form.create()(NormalSignUpForm);
export default WrappedNormalSignUpForm;