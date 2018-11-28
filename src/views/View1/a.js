import React from 'react';
export default class extends React.Component {
    static routeConfigs = () => ({ params: ['id'] });
    render() {
        return (
            <div>
                <span>
                    <p>
                        Hello from screen A of View 1
                    </p>
                </span>
            </div>
        );
    };
};