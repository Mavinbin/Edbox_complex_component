import React, {Component} from 'react';
import {formatMessage}  from 'umi/locale';
import Header from '../../components/header';
import IconButton from '../../components/iconbutton';
import styles from './index.scss';

class Image extends Component {
    render() {
        return (
            <div>
                <Header title={formatMessage({id: 'edit_picture'})}/>
                <div className={styles['widget'] + ' ' + styles['main-tools']}>
                    <IconButton iconfont="icon-image-upload"/>
                    <IconButton iconfont="icon-image-download"/>
                    <IconButton iconfont="icon-phone"/>
                    <IconButton iconfont="icon-image-with-text"/>
                    <IconButton iconfont="icon-cut1"/>
                    <IconButton iconfont="icon-forbid-s-o"/>
                </div>
            </div>
        )
    }
}

export default Image;