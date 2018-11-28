import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
export default class ClassIcon extends React.Component {
    render() {
        const { is, ...rest } = this.props
        const icon = icons[is]
        return (
            <Ionicon icon={icon} color='white'  {...rest} />
        );
    };
};
export const icons = [
    'md-create',            // 0
    'md-calculator',        // 1
    'ios-flask',            // 2
    'ios-color-palette',    // 3
    'md-globe',             // 4
    'ios-leaf',             // 5
    'ios-thermometer',      // 6
    'ios-bulb',             // 7
    'ios-quote',            // 8
    'md-code',              //
    'md-flower',            //
    'md-leaf',              //
    'md-map',               //
    'md-man',               // 
    'md-quote',             //
    'md-mic',               //
];
ClassIcon.propTypes = {
    is: PropTypes.number,
};
ClassIcon.defaultProps = {
    is: 0,
};