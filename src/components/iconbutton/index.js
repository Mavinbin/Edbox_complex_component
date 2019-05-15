import React, {Component} from 'react';
import {Button, Icon} from 'antd';
import styles from './index.scss';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1188697_tgz3vwzfd.js'
});

class IconButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }
    handleClick() {
        const {selected} = this.state;
        this.setState({
            selected: !selected
        });
    }
    render() {
        const {selected} = this.state;
        return (
            <Button className={styles['btn'] + ' ' + this.props.className + (selected ? ' ' + styles['selected'] : '')} onClick={this.handleClick.bind(this)} >
                {this.props.iconfont ? <IconFont type={this.props.iconfont}/>: this.props.children}
            </Button>
        )
    }
}

export default IconButton;