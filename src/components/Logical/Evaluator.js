import React from 'react';
import { Loader, NoDataView } from 'components';
export default class extends React.Component {
    render() {
        const { dataObject, children, noDataMessage, callToAction, callback, message } = this.props;
        if (typeof (dataObject) !== 'undefined') {
            return children.length ? children : <NoDataView noDataMessage={noDataMessage} callToAction={callToAction} callback={callback} />
        } else {
            return <Loader message={message ? message : 'Retrieving Data'} />
        }
    };
};