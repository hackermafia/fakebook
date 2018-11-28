import React from 'react';
import { Button } from 'antd';
export default class NoDataView extends React.Component {
    render() {
        const { noDataMessage, callToAction, callback } = this.props;
        return (
            <div
                style={{
                    padding: '20px 30px 25px 30px',
                    borderRadius: 4,
                    margin: 'auto',
                    minWidth: '35%',
                    marginTop: 45,
                    marginBottom: 45,
                    backgroundColor: 'rgba(0,0,0,0.025)'
                }}
                className='hover-card'
            >
                <span style={{ fontSize: '1.4em', marginBottom: 5, display: 'block' }} >{noDataMessage}</span>
                <Button type='primary' onClick={callback} icon='plus' >{callToAction}</Button>
            </div>
        )
    };
};