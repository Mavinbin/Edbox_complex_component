import React, {Component} from 'react';
import {Icon} from 'antd';
import router from 'umi/router';
import styles from './index.scss';
import { goBack } from 'react-router-redux';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1188697_4xq979pc8zn.js'
});

class Header extends Component {
    goBack() {
        router.go(-1);
    }
    render() {
        const {title, back} = this.props;
        return (
            <div className={styles['header']}>
                {back ? 
                    <IconFont type="icon-arrow-go-back-fill" className={styles['ico-back']} onClick={this.goBack.bind(this)}/>
                    : null
                }
                {title ?
                    <h3 className={styles['tit']}>{this.props.title}</h3>
                    : null
                }
                <IconFont type="icon-close" className={styles['ico-close']}/>
            </div>
        )
    }
}

export default Header;

