import React, {Component} from 'react';
import styles from './index.scss';

class Title extends Component {
    render() {
        return (
            <h3 className={styles['tit']}>{this.props.name}</h3>
        )
    }
}

export default Title;

