import React, {Component} from 'react';
import {Button} from 'antd';
import styles from './index.scss';

class IconButton extends Component {
    render() {
        return (
            <Button className={styles['btn'] + ' ' + this.props.className}>{this.props.children}</Button>
        )
    }
}

export default IconButton;