import React from 'react';
import { Button } from 'antd';
export default class extends React.Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', display: 'block' }} >
                    <h1>View 2</h1>
                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }} >
                    <div style={{ display: 'inline-block' }} >
                        <Button onClick={() => this.props.history.push('/view2/a')} >
                            Go to sub: A
                        </Button>
                    </div>
                    <div style={{ display: 'inline-block' }} >
                        <Button onClick={() => this.props.history.push('/view2/b')} >
                            Go to sub: B
                        </Button>
                    </div>
                </div>
            </div>
        );
    };
};