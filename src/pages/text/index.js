import React, {Component} from 'react';
import {Button} from 'antd';
import {formatMessage} from 'umi/locale';
import Header from '@/components/header';
import FontFamily from '@/components/fontfamily';
import FontSize from '@/components/fontsize';
import Color from '@/components/color';
import FontStyle from '@/components/fontstyle';
import '../../common.scss'
import './index.scss';

class Text extends Component {
    constructor() {
        super();
        this.state = {
            fontFamilyList: {
                recent: [
                    {
                        id: 20,
                        name: 'Arial',
                        status: 'downloaded'
                    },
                    {
                        id: 21,
                        name: 'Aubade',
                        status: 'downloaded'
                    },
                    {
                        id: 22,
                        name: 'Articulate',
                        status: 'downloaded'
                    }
                ],
                all: [
                    {
                        id: 0,
                        name: 'Default Font',
                        status: 'done'
                    },
                    {
                        id: 2,
                        name: 'Arial',
                        status: 'downloading'
                    },
                    {
                        id: 3,
                        name: 'Aubade',
                        status: 'not_downloaded'
                    },
                    {
                        id: 4,
                        name: 'Articulate',
                        status: 'not_downloaded'
                    },
                    {
                        id: 5,
                        name: 'Default Font',
                        status: 'not_downloaded'
                    },
                    {
                        id: 6,
                        name: 'Arial',
                        status: 'downloaded'
                    },
                    {
                        id: 7,
                        name: 'Aubade',
                        status: 'downloaded'
                    },
                    {
                        id: 8,
                        name: 'Articulate',
                        status: 'downloaded'
                    }
                ]
            },
            fontSizeList: [{
                    id: 0,
                    value: 12
                },
                {
                    id: 1,
                    value: 13
                },
                {
                    id: 2,
                    value: 14
                },
                {
                    id: 3,
                    value: 15
                },
                {
                    id: 4,
                    value: 16
                },
                {
                    id: 5,
                    value: 18
                },
                {
                    id: 6,
                    value: 20
                }
            ],
            fontColor: '#cf0100'
        }
    }
    render() {
        const {fontFamilyList, fontSizeList, fontColor} = this.state;
        return (
            <div className="page-wrap">
                <Header title={formatMessage({id: 'edit_text'})}/>
                <FontFamily data={fontFamilyList} defaultValue={0} className="row"/>
                <FontSize data={fontSizeList} defaultValue={0} className="row"/>
                <Color color={fontColor} className="row"/>
                <FontStyle className="row"/>
                <div className="btm-btns">
                    <Button>{formatMessage({id: 'reset'})}</Button>
                    <Button type="primary">{formatMessage({id: 'use'})}</Button>
                </div>
            </div>
        )
    }
}

export default Text;