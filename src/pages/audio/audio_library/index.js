import React, {Component} from 'react';
import {Row, Col, Radio, Button, Slider, Tabs} from 'antd';
import {formatMessage, getLocale} from 'umi/locale';
import IconFont from '@/components/iconfont';
import Header from '@/components/header';
import Search from '@/components/search';
import styles from './index.scss';

class AudioLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchEngine: [
                {
                    id: 1,
                    englishName: 'NDR',
                    chinesename: 'NDR',
                    icon: 'icon-layers'
                },
                {
                    id: 2,
                    englishName: 'Baidu Search',
                    chinesename: '百度搜索',
                    icon: 'icon-baidu'
                }
            ],
            musicType: [
                {
                    id: '1',
                    englishName: 'All',
                    chineseName: '全部',
                    subType: [
                        {
                            id: '1_1',
                            englishName: 'All',
                            chineseName: '全部',
                        },
                        {
                            id: '1_2',
                            englishName: 'Animal',
                            chineseName: '动物',
                        },
                        {
                            id: '1_3',
                            englishName: 'Person',
                            chineseName: '人物',
                        },
                        {
                            id: '1_4',
                            englishName: 'Build',
                            chineseName: '建筑',
                        },
                        {
                            id: '1_5',
                            englishName: 'Plant',
                            chineseName: '植物',
                        },
                        {
                            id: '1_6',
                            englishName: 'Biology',
                            chineseName: '生物',
                        },
                        {
                            id: '1_7',
                            englishName: 'Bird',
                            chineseName: '鸟',
                        },
                        {
                            id: '1_8',
                            englishName: 'Bird',
                            chineseName: '鸟',
                        },
                        {
                            id: '1_9',
                            englishName: 'Bird',
                            chineseName: '鸟',
                        }
                    ]
                },
                {
                    id: '2',
                    englishName: 'Acoustics',
                    chineseName: 'xxx',
                    subType: [
                        {
                            id: '2_1',
                            englishName: 'All',
                            chineseName: '全部',
                        }
                    ]
                },
                {
                    id: '3',
                    englishName: 'Backdrop',
                    chineseName: 'xxx',
                    subType: [
                        {
                            id: '3_1',
                            englishName: 'All',
                            chineseName: '全部',
                        }
                    ]
                },
                {
                    id: '4',
                    englishName: 'Acoustics',
                    chineseName: 'xxx',
                    subType: [
                        {
                            id: '4_1',
                            englishName: 'All',
                            chineseName: '全部',
                        }
                    ]
                },
                {
                    id: '5',
                    englishName: 'Test',
                    chineseName: '测试',
                    subType: [
                        {
                            id: '5_1',
                            englishName: 'All',
                            chineseName: '全部',
                        }
                    ]
                }
            ],
            musicList: [
                {
                    id: 1,
                    name: 'Hospital-Warning all Hospital-Warning all Hospital-Warning allHospital-Warning all Hospital-Warning all Hospital-Warning allHospital-Warning all Hospital-Warning all Hospital-Warning all',
                    time: '04:02',
                    status: 1 // 已下载
                },
                {
                    id: 2,
                    name: 'Hospital-Warning all Hospital-Warning all Hospital-Warning all',
                    time: '04:02',
                    status: 2 // 未下载 
                },
                {
                    id: 3,
                    name: 'Hospital-Warning all Hospital-Warning all Hospital-Warning all',
                    time: '04:02',
                    status: 3 // 下载中
                },
                {
                    id: 4,
                    name: 'Hospital-Warning all Hospital-Warning all Hospital-Warning all',
                    time: '04:02',
                    status: 1
                },
                {
                    id: 5,
                    name: 'Hospital-Warning all Hospital-Warning all Hospital-Warning all',
                    time: '04:02',
                    status: 1
                },
            ],
            defaultEngine: 1
        }
    }
    componentWillMount() {
        const {musicType} = this.state;
        const newMusicType = musicType.map(type => {
            const subType = type.subType;
            if (subType.length > 8) {
                return {
                    hasMore: true,
                    isShowMore: false,
                    ...type
                }
            }

            return {
                hasMore: false,
                ...type
            }
        })
        this.setState({
            musicType: [...newMusicType]
        });
    }
    /**
     * 展开和收起更多子类型
     * @param {int/string} id 点击的类型music类型id
     */
    handleToggleSubType(id) {
        const {musicType} = this.state;
        for (let i = 0; i < musicType.length; i++) {
            if (musicType[i].id === id) {
                musicType[i].isShowMore = !musicType[i].isShowMore;
            }
            break;
        }
        this.setState({
            musicType: [...musicType]
        })
    }
    render () {
        const {searchEngine, defaultEngine, musicList, musicType} = this.state;
        const RadioGroup = Radio.Group;
        const RadioButton = Radio.Button;
        const {TabPane} = Tabs;
        return (
            <div>
                <Header title={formatMessage({id: 'audio_library'})} back/>
                <div className={styles['top-panel']}>
                    <Row gutter={7} className={styles['search-bar']}>
                        <Col span={10}>
                            <RadioGroup defaultValue={1} buttonStyle="solid" className={`${styles['lib-type']} lib-type`}>
                                <RadioButton value={1}>{formatMessage({id: 'music'})}</RadioButton>
                                <RadioButton value={2}>{formatMessage({id: 'effects'})}</RadioButton>
                            </RadioGroup>
                        </Col>
                        <Col span={14}>
                            <Search searchEngine={searchEngine} defaultEngine={defaultEngine} placeholder={formatMessage({id: 'search_word'})}/>
                        </Col>
                    </Row>
                    <div className="filter-panel">
                        {
                            musicType && musicType.length ? 
                            <Tabs animated={false} tabBarGutter={0}>
                                {musicType.map(type => 
                                    <TabPane tab={getLocale() === 'en-US' ? type.englishName : type.chineseName} key={type.id}>
                                        <Row gutter={4}>
                                        {
                                            (() => {
                                                let arr = type.subType;
                                                if (type.hasMore && !type.isShowMore) {
                                                    arr = arr.slice(0, 7);
                                                }
                                                if (type.hasMore && type.isShowMore) {
                                                    arr = type.subType;
                                                }
                                                return arr.map((subType, i) => 
                                                    <div key={subType.id}>
                                                        <Col span={6} key={subType.id}>
                                                            <Button className={`${styles['subtype-btn']} ellipsis`}>{getLocale() === 'en-US' ? subType.englishName : subType.chineseName}</Button>
                                                        </Col>
                                                        {i === arr.length - 1 && type.hasMore ? 
                                                            <Col span={6}>
                                                                <Button className={`${styles['subtype-btn']} ${styles['btn-more']} ellipsis`} onClick={this.handleToggleSubType.bind(this, type.id)}>sss</Button>
                                                            </Col>
                                                            : null
                                                        }
                                                    </div>
                                                )
                                            })()
                                        }
                                        </Row>
                                    </TabPane>
                                )}
                            </Tabs>
                            : null
                        }
                    </div>
                </div>
                <div className={styles['list']}>
                    {
                        musicList && musicList.length ?
                        <RadioGroup className={styles['list-group']}>
                            {musicList.map(item => 
                                <div className={`${styles['list-item']}`} key={item.id}>
                                    <div className={`${styles['list-item-c']} ellipsis clearfix`}>
                                        <time>{item.time}</time>
                                        <IconFont type="icon-sound" className={styles['ico-sound']}/>
                                        <span>{item.name}</span>
                                        <Slider className={`${styles['slider']} audio-slider`}/>
                                    </div>
                                    <div className={styles['list-item-r']}>
                                        {
                                            (() => {
                                                let type = '';
                                                switch(item.status) {
                                                    case 1: 
                                                        type="icon-downloaded";
                                                        break;
                                                    case 2: 
                                                        type="icon-download";
                                                        break;
                                                    case 3:
                                                        type="icon-loading";
                                                        break;
                                                }
                                                return <IconFont type={type} className={styles['ico-status']}/> 
                                            })()
                                        }
                                        <Radio value={item.id} className={styles['list-item-radio']}/>
                                    </div>
                                </div>
                            )}
                        </RadioGroup>
                        :null
                    }
                </div>
                <div className="btm-btns">
                    <Button type="primary">{formatMessage({id: 'ok'})}</Button>
                </div>
            </div>
        )
    }
}

export default AudioLibrary;