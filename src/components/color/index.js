import React, {Component} from 'react';
import {formatMessage} from 'umi/locale';
import {Icon} from 'antd';
import Label from '../../components/label';
import styles from './index.scss';

class Color extends Component {
    handlePickerClick(e) {
        if (this.picker.classList.contains('ant-select-open')) {
            this.picker.classList.remove('ant-select-open');
            this.picker.classList.remove('ant-select-focused');
        } else {
            this.picker.classList.add('ant-select-open');
            this.picker.classList.add('ant-select-focused');
        }
    }
    render() {
        return (
            <div className={this.props.className ? this.props.className : null}>
                <Label name={formatMessage({id: 'color'})}/>
                <div className={styles['picker']} onClick={this.handlePickerClick.bind(this)} ref={picker => this.picker = picker}>
                    <div className={styles['selection'] + ' ant-select-selection'} >
                        <div className={styles['selected']} style={this.props.color ? {backgroundColor: this.props.color} : null}></div>
                        <div className={styles['ico-arrow'] + ' ant-select-arrow'}>
                            <Icon type="down" className="ant-select-arrow-icon"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Color;