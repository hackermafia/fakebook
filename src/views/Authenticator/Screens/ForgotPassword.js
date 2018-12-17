import React from 'react';
import { Row, Col, } from 'antd';
import { ForgotPasswordForm, } from '../Components'
export default class extends React.Component {
    render() {
        return (
            <Row justify='center' type="flex">
                <Col xs={22} sm={18} md={16} lg={14} xl={10} span={12} >
                    <div className='hover-card' style={{ width: '100%' }}>
                        <h1 style={{ width: '100%', textAlign: 'start' }}>Change your Password </h1>
                        <ForgotPasswordForm />
                    </div>
                </Col>
            </Row>
        );
    };
};