import React, {Component} from 'react';
import {Popover} from 'antd';
import IconFont from '@/components/iconfont';
import styles from './index.scss';

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
        if (this.props.onClick && typeof(this.props.onClick === 'function')) {
            this.props.onClick();
        }
    }
    render() {
        const {selected} = this.state;
        const dom = 
            <div className={styles['btn'] + ' ' + this.props.className + (selected ? ' ' + styles['selected'] : '')} onClick={this.handleClick.bind(this)} >
                {this.props.iconfont ? <IconFont type={this.props.iconfont}/>: this.props.children}
            </div>
        return (
            this.props.toolTip ? 
            <Popover placement={this.props.placement ? this.props.placement : 'bottom'} content={this.props.toolTip}>
            {dom ? dom : null}
            </Popover>
            : dom
        )
    }
}

export default IconButton;