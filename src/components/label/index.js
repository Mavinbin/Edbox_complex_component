import React, {Component} from 'react';
import styles from './index.scss';

class Label extends Component {
    render() {
        return (
            <label className={styles['label']}>{this.props.name}</label>
        )
    }
}

export default Label;