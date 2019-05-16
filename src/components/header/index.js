import React, {Component} from 'react';
import {Icon} from 'antd';
import styles from './index.scss';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1188697_4xq979pc8zn.js'
});

class Header extends Component {
    render() {
        const {title, back} = this.props;
        return (
            <div className={styles['header']}>
                {back ? 
                    <IconFont type="icon-arrow-go-back-fill" className={styles['ico-back']}/>
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

