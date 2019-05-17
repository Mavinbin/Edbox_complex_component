import React, {Component} from 'react';
import {Select} from 'antd';
import {formatMessage} from 'umi/locale';
import Label from '../../components/label';
import IconButton from '../../components/iconbutton';
import styles from './index.scss';

class FontSize extends Component {
    render() {
        const data = this.props.data;
        const {Option} = Select;
        return (
            <div className={this.props.className ? this.props.className : null}>
                <Label name={formatMessage({id: 'size'})}/>
                <div className={styles['body']}>
                    <Select defaultValue={this.props.defaultValue} className={styles['select']}>
                    {data && data.length ?
                        data.map(opt => 
                            <Option value={opt.id} key={opt.id}>{opt.value}</Option>
                        )
                        :null
                    }
                    </Select>
                    <IconButton>
                        <span>A</span>
                        <sup>+</sup>
                    </IconButton>
                    <IconButton>
                        <span>A</span>
                        <sup>-</sup>
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default FontSize;