import React from 'react';
import { Layout, Menu, notification, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { stringToKebab, getUrlPathAtPosition } from 'utilities';
import LogoSvg from 'assets/logo.svg';
import { colors } from 'styles';
const { Header, Content, Footer } = Layout;
export default class AppLayout extends React.Component {
    componentDidMount() {
        notification.config({ top: 80 });
    };
    render() {
        const { items, children, ...rest } = this.props;
        const { theme } = rest;
        const color = theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)';
        const antdStd = theme === 'dark' ? '#202020' : '#F0F2F5';
        const txtColor = theme === 'dark' ? '#F0F2F5' : 'rgba(0, 0, 0, 0.65)';
        const currentRoute = getUrlPathAtPosition(1)
            ? getUrlPathAtPosition(1)
            : 'home';
        console.log(color)
        return (
            <Layout
                style={{ backgroundColor: antdStd }}
            >
                <Header
                    style={{
                        position: 'fixed',
                        zIndex: 10000,
                        width: '100%',
                        padding: 0,
                        backgroundColor: color,
                    }}
                >
                    {
                        items.includes('Home') ?
                            <Link to='/'>
                                <img
                                    src={LogoSvg}
                                    alt="Logo"
                                    height='60px'
                                    width='60px'
                                    style={{
                                        background: '#282c34',
                                        borderRadius: 4,
                                        float: 'left',
                                        margin: '2px 50px',
                                        marginRight: '10px',
                                        border: currentRoute === 'home'
                                            ? '2px solid ' + colors.main
                                            : null
                                    }}
                                />
                            </Link>
                            : null
                    }
                    <Menu
                        {...rest}
                        selectedKeys={[currentRoute]}
                        style={{
                            backgroundColor: 'transparent',
                            lineHeight: theme === 'dark' ? '64px' : '62px',
                        }}
                    >
                        {
                            items.map(item => item === 'Home' ? null :
                                <Menu.Item
                                    key={stringToKebab(item)}
                                    style={{
                                        width: '6em',
                                        textAlign: 'center',
                                        margin: '0px 15px',
                                        marginRight: item === 'Account' ? '50px' : '15px',
                                        float: item === 'Account' ? 'right' : 'left'
                                    }}
                                >
                                    <Link
                                        to={'/' + stringToKebab(item)}
                                        key={stringToKebab(item)}
                                    >
                                        {
                                            item === 'Account'
                                                ? <Icon
                                                    type='user'
                                                    style={{ margin: 'auto' }}
                                                />
                                                : item
                                        }
                                    </Link>
                                </Menu.Item>
                            )
                        }
                    </Menu>
                </Header>
                <Content
                    style={{
                        padding: currentRoute === 'home' ? '0px' : '40px',
                        marginTop: 64,
                        overflow: 'initial',
                        backgroundColor: antdStd
                    }}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: currentRoute === 'home' ? '0px' : '48px',
                            textAlign: 'center',
                            overflow: 'initial',
                            minHeight: '88vh',
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor: antdStd, color: txtColor }}>
                    Checkr ©2018 Created by Ampersand Labs
                </Footer>
            </Layout >
        );
    };
};
AppLayout.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
};
AppLayout.defaultProps = {
    items: [],
};