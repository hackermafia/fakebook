import React from 'react';
import { Button, Modal, Icon, Row, Col, Collapse, List, Input } from 'antd';
import { Loader } from 'components';
import { objectToArrayWithKeys, snakeToString } from 'utilities';
import { Auth, Analytics } from 'aws-amplify';
import { colors } from 'styles';
export default class Account extends React.Component {
    state = { loading: false, name: '', family_name: '', userAttributes: [], unmodifiedUserAttributes: {} };
    async componentDidMount() { await this.fetchData() };
    fetchData = async () => {
        let user;
        this.setState({ loading: true });
        try {
            user = await Auth.currentUserInfo();
        } catch (e) {
            console.log('[Fetch User Data]', e);
            Modal.error({
                title: 'Ooops!',
                content: "There has been an error fetching your account's data",
                onOk() { this.props.history.goBack() },
            });
            Analytics.record({
                name: 'Error',
                attributes: {
                    message: e.message,
                    object: JSON.stringify(e),
                    location: 'Fetch User Data @ Account Screen'
                }
            });
        } finally {
            if (user && user.attributes) {
                const { name, family_name } = user.attributes;
                this.setState({
                    name,
                    family_name,
                    userAttributes: [
                        { key: 'username', value: user.username },
                        ...objectToArrayWithKeys(user.attributes)
                    ],
                    unmodifiedUserAttributes: user.attributes
                });
            } else {
                Modal.error({
                    title: 'Ooops!',
                    content: "Your account data was not successfully retrieved. Procede with your normal use but consider most functionality requieres internet connection.",
                    onOk() { this.props.history.push('/') },
                });
            };
            await this.setState({ loading: false });
        };
    };
    logOut = async () => {
        let error;
        try {
            await Auth.signOut();
        } catch (e) {
            console.log('[Log Out]:', e);
            error = e;
            Modal.error({
                title: 'Ooops!',
                content: e.message + ' Please try again.',
                onOk() { },
            });
            Analytics.record({
                name: 'Error',
                attributes: {
                    message: e.message,
                    object: JSON.stringify(e),
                    location: 'Log Out @ Account Screen'
                }
            });
        } finally {
            if (!error) {
                window.location.reload()
            };
        };
    };
    markEditingAttribute = (i) => {
        let { userAttributes } = this.state;
        userAttributes[i]['editing'] = true;
        this.setState({ userAttributes });
    };
    updateAttribute = (value, i) => {
        let { userAttributes } = this.state;
        userAttributes[i]['value'] = value.trim();
        this.setState({ userAttributes })
    };
    saveAttribute = async (i) => {
        let { userAttributes } = this.state;
        userAttributes[i]['editing'] = false;
        this.setState({ userAttributes, loading: true });
        let { unmodifiedUserAttributes } = this.state;
        let currentUser, response;
        try {
            unmodifiedUserAttributes[this.state.userAttributes[i]['key']] = this.state.userAttributes[i]['value'];
            currentUser = await Auth.currentAuthenticatedUser();
            response = await Auth.updateUserAttributes(currentUser, unmodifiedUserAttributes)
        } catch (e) {
            console.log('[Saving Account Attribute]', e)
        } finally {
            this.setState({ loading: false });
            if (!response) {
                Modal.error({
                    title: 'Ooops!',
                    content: "There has been an error at trying to update your user attributes. Please try again later.",
                    onOk() { },
                });
            }
        };
    };
    renderCollapseHeader = (text, icon) =>
        <div style={{ width: '100%', textAlign: 'end', color: 'black', paddingRight: 24 }} >
            <h1 style={{ color: 'inherit' }} >{text}</h1>
            <Icon type={icon} theme="filled" style={{ fontSize: '4em', }} />
        </div>;
    render() {
        return (
            <Loader loading={this.state.loading} message='Fetching User Data' >
                <Row style={{ marginBottom: 50 }}>
                    <Col span={4}  >
                        <Icon type='smile' style={{ fontSize: '8vw' }} theme='twoTone' twoToneColor={colors.main} />
                    </Col>
                    <Col span={14} style={{ fontSize: '3em', fontWeight: 'bold', color: 'black', textAlign: 'start', paddingTop: '1vw' }} >
                        Hello there, {this.state.name} {this.state.family_name}
                    </Col>
                    <Col span={6} style={{ paddingTop: '4vw' }} >
                        <Button type='danger' onClick={this.logOut}>Sign Out ?</Button>
                    </Col>
                </Row>
                <Collapse bordered={false} style={{ backgroundColor: 'whitesmoke', width: '90%', margin: 'auto', }} >
                    <Collapse.Panel header={this.renderCollapseHeader("We hold this much data about you", 'idcard')} >
                        <List
                            style={{ backgroundColor: 'whitesmoke', paddingLeft: 10 }}
                            itemLayout="horizontal"
                            dataSource={this.state.userAttributes}
                            renderItem={(item, i) => (
                                <List.Item
                                    actions={
                                        (item.key === 'username' || item.key.includes('custom:'))
                                            ? [<div style={{ width: 25 }} />]
                                            : [
                                                item.editing
                                                    ? <a onClick={() => this.saveAttribute(i)} >save</a>
                                                    : <a onClick={() => this.markEditingAttribute(i)} >edit</a>
                                            ]
                                    }
                                >
                                    <List.Item.Meta
                                        title={snakeToString(item.key.replace('custom:', ''))}
                                        description={
                                            item.editing
                                                ? <Input value={item.value} onChange={e => this.updateAttribute(e.target.value, i)} />
                                                : String(item.value)
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Collapse.Panel>
                    <Collapse.Panel header={this.renderCollapseHeader("We value your Privacy", "like")}>
                        <div style={{ backgroundColor: 'whitesmoke', padding: 30, }}>
                            <h1>We believe you own all your data</h1>
                            <div style={{ textAlign: 'start', fontSize: '1.4em' }}> And because of that we want to tell you that we never plan to share the data we own about you with anybody and, we work hard to need as little data of you as we can. <br /> We ask for your username and password so only you can sign into your account. <br /> We ask for your email so you can change your password on the case you forget it and so you can sign into your account easier. <br /> We ask for your name, last name, and gender so we can find proper ways to name you. <br /> And, most importantly, we don't ask anything else of you, not even payment information. We run all our paymets through Apple's and Google's API's and tools; and because of that, we have made our web app completely free to use. <br /> <bold>Why?</bold> <br /> Because we don't want to own your payment information if we can outsource it. <br /> <bold>Why?</bold> <br /> Because that's what we love when we use online services <br /> We dont believe our personal information should have a copy on every startup's database. And so we believe of your personal information. <br /> We believe and wish to be a utility app that makes your life easier and, we think that as such, we are entitled to as little information of our users as possible for we only want to make their lives easier, not harder or any more stressful, and so are willing to miss out on all that possible revenue (coming from selling user data) to make a slightly better world and, we look to profit only on giving you the best user experience possible. <br /> You are our user, and we owe it all to you personally.</div>
                        </div>
                    </Collapse.Panel>
                    <Collapse.Panel header={this.renderCollapseHeader("We want to build the best for you", 'heart')}>
                        <div style={{ backgroundColor: 'whitesmoke', padding: 30, }}>
                            <h1>We are a very young team, and proudly so</h1>
                            <div style={{ textAlign: 'start', fontSize: '1.4em' }}> Before making this app we knew nothing about coding and we're really proud about having been able to build the necessary infrastructure to make this app happen in a bit under 5 months. And we're not only young as being a new team, the ages of our team members are: 16, 16, and 16. <br /> We really wanted to build this and tried hard until getting it done, discovering that more often than not, we didn't even know what we didn't know. <br /> Althought truth be told that we learnt fast only by failing fast and the fact that you're reading this is the very reason this has been all worth it. <br /> Thank you and now let us tell you this: <br /> We want to build the best user experience for you and we hope you will share your thought and opinions on how we might imporve the overall experience of the app. For this, please go on to the next section of this web page. </div>
                        </div>
                    </Collapse.Panel>
                    <Collapse.Panel header={this.renderCollapseHeader("We want to hear you", 'customer-service')}>
                        <div style={{ backgroundColor: 'whitesmoke', padding: 30, }}>
                            <h1>We are always looking for ways to make your expereince better, {this.state.name}</h1>
                            <div style={{ textAlign: 'start', fontSize: '1.4em' }}> We are always worried about finding the best way to show a piece of information, or the most pleasing way to build the interface of a given page or screen and, by definition, you have the last word. <br /> So, {this.state.name}, let us share with you the contact information of each person in the team. <br /> Felipe Acosta, CEO — acosta_jf@icloud.com <br /> Ana Laura Díaz, Head of Marketing — arualanasdr@gmail.com <br /> Víctor Puga, Head of Engineering — victorpugaruiz@live.com.mx <br /> We're completely okay sharing this information with you {this.state.name} becasue being frank, we don't have that many users for this to be inherently dangerous, and — perhaps most importantly — because we really deeply care of what you feel when using our product. <br /> We believe technology is good only so far as to when it is used to help other people. And it feels really good to think we're making other people's lives easier. <br /> For that feeling, thank you.</div>
                        </div>
                    </Collapse.Panel>
                </Collapse>
            </Loader >
        );
    };
};