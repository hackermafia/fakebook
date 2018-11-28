import React from 'react';
import { Spin, Icon } from 'antd'
import { colors } from 'styles';
export default class extends React.Component {
    render() {
        const { children, message, loading, inline } = this.props;
        return (
            children && !loading ?
                children :
                inline ?
                    <div
                        style={{
                            textAlign: 'start',
                            borderRadius: 4,
                            marginBottom: 10,
                            padding: '10px 25px',
                            margin: '10px 100px 0',
                            boxShadow: 'rgba(0,0,0,0.15) 0px 0px 5px 1px'
                        }}
                    >
                        <Spin indicator={<Icon type="loading" style={{ fontSize: 24, display: 'inline-block', paddingTop: 5 }} spin />} size='large' />
                        <div style={{ color: colors.main, display: 'inline', marginLeft: 20, lineHeight: '20px' }} >{message ? message : 'Fetching Data...'}</div>
                    </div>
                    :
                    <div
                        style={{
                            textAlign: 'center',
                            borderRadius: 4,
                            marginBottom: 20,
                            padding: '20px 25px',
                            margin: '20px 100px 0',
                            boxShadow: 'rgba(0,0,0,0.15) 0px 0px 5px 1px'
                        }}
                    >
                        <Spin indicator={<Icon type="loading" style={{ fontSize: 32, display: 'block', paddingTop: 5 }} spin />} size='large' />
                        <div style={{ color: colors.main, display: 'block', fontSize: '1.5em', marginTop: 16 }} >{message ? message : 'Fetching Data...'}</div>
                    </div>
        )
    }
};