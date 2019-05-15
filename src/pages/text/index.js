import React, {Component} from 'react';
import {formatMessage}  from 'umi/locale';
import Title from '../../components/title';
import FontFamily from '../../components/fontfamily';
import FontSize from '../../components/fontsize';
import Color from '../../components/color';
import FontStyle from '../../components/fontstyle';
import common from '../../common.scss'
import styles from './index.scss';

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
            fontSizeList: [
                {
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
            <div>
                <Title name={formatMessage({id: 'edit_text'})}/>
                <FontFamily data={fontFamilyList} defaultValue={0} className={common['row']}/>
                <FontSize data={fontSizeList} defaultValue={0} className={common['row']}/>
                <Color color={fontColor} className={common['row']}/>
                <FontStyle className={common['row']}/>
            </div>
        )
    }
}

export default Text;