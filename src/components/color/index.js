import React, {Component} from 'react';
import {formatMessage} from 'umi/locale';
import {Select} from 'antd';
import Label from '../../components/label';
import IconButton from '../../components/iconbutton';
import styles from './index.scss';

class Color extends Component {
    render() {
        const {Option} = Select;
        return (
            <div className="widget">
                <Label name={formatMessage({id: 'color'})}/>
                <Select className={styles['picker'] + ' color-picker'} defaultValue={0} dropdownClassName={styles['dropdown']}>
                    <Option value={0} key={0}>
                        <div 
                            className={styles['selected']} 
                            style={this.props.color ? {backgroundColor: this.props.color} : null}
                        ></div>
                    </Option>
                </Select>
            </div>
        )
    }
}

export default Color;