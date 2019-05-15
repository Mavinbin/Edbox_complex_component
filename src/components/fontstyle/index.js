import React, {Component} from 'react';
import {Select} from 'antd';
import {formatMessage} from 'umi/locale';
import Label from '../../components/label';
import IconButton from '../../components/iconbutton';
import styles from './index.scss';

class FontStyle extends Component {
    render() {
        return (
            <div className={this.props.className ? this.props.className : null}>
                <Label name={formatMessage({id: 'style'})}/>
                <div className={styles['body']}>
                    <IconButton className={styles['btn-bold']}>B</IconButton>
                    <IconButton className={styles['btn-italic']}>I</IconButton>
                    <IconButton className={styles['btn-underline']}>
                        <span>U</span>
                        <span>__</span>
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default FontStyle;