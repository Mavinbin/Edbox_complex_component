import React, {Component} from 'react';
import {Row, Col, Radio, Button, Slider, Tabs, Empty} from 'antd';
import {formatMessage, getLocale} from 'umi/locale';
import IconFont from '@/components/iconfont';
import Header from '@/components/header';
import Search from '@/components/search';
import styles from './index.scss';
import noResultMatchImage from '@/assets/no_result_match.png';
import loadingResultImage from '@/assets/loading_result.png';

class AudioLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchEngineList: [
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
                    status: 4 // 缓存失败或者已删除
                },
                {
                    id: 5,
                    name: 'Hospital-Warning all Hospital-Warning all Hospital-Warning all',
                    time: '04:02',
                    status: 1
                }
            ],
            searchWords: {
                data: [
                    {
                        id: 1,
                        englishName: 'Animal',
                        chineseName: '动物'
                    },
                    {
                        id: 2,
                        englishName: 'Person',
                        chineseName: '人物',
                    },
                    {
                        id: 3,
                        englishName: 'Build',
                        chineseName: '建筑'
                    },
                    {
                        id: 4,
                        englishName: 'Plant',
                        chineseName: '植物'
                    }
                ],
                hasMore: false,
                isShowMore: false
            },
            searchEngine: 2
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
     * @param {int/string} id 点击的music类型id
     */
    handleToggleSubType(id) {
        const {musicType} = this.state;
        musicType.map(item => {
            if (item.id === id) {
                item.isShowMore = !item.isShowMore;
            }
        })
        this.setState({
            musicType: [...musicType]
        })
    }
    /**
     * 展开和收起更多相关搜索词
     */
    handleToggleSearchWord() {
        const {searchWords} = this.state;
        searchWords.isShowMore = !searchWords.isShowMore
        this.setState({
            searchWords: {...searchWords}
        })
    }
    /**
     * 处理音频播放/暂停
     * @param {int/string} id 点击的音频列表的id
     */
    handleAudioPlay (id) {
        const {musicList} = this.state;
        musicList.map(item => {
            if (item.id === id) {
                item.isPlay = !item.isPlay;
            } else {
                item.isPlay = false;
            }
            return item;
        })
        this.setState({
            musicList: [...musicList]
        })
    }
    handleSearchEngineChange(value) {
        this.setState({
            searchEngine: value
        });
    }
    render () {
        const {searchEngineList, searchEngine, musicList, musicType, searchWords} = this.state;
        const RadioGroup = Radio.Group;
        const RadioButton = Radio.Button;
        const {TabPane} = Tabs;
        return (
            <div>
                <Header title={formatMessage({id: 'audio_library'})} back/>
                <div className={styles['top-panel']}>
                    <Row gutter={7} className={styles['search-bar']}>
                        {searchEngine === 1 ?
                        <Col span={10}>
                            <RadioGroup defaultValue={1} buttonStyle="solid" className={`${styles['lib-type']} lib-type`}>
                                <RadioButton value={1}>{formatMessage({id: 'music'})}</RadioButton>
                                <RadioButton value={2}>{formatMessage({id: 'effects'})}</RadioButton>
                            </RadioGroup>
                        </Col>
                        : null
                        }
                        <Col span={searchEngine === 1 ? 14 : 24}>
                            <Search searchEngineList={searchEngineList} defaultEngine={searchEngine} placeholder={formatMessage({id: 'search_word'})}  onEngineChange={this.handleSearchEngineChange.bind(this)}/>
                        </Col>
                    </Row>
                    <div className="filter-panel">
                        {
                            searchEngine === 1 ?
                                musicType && musicType.length ? 
                                <Tabs animated={false} tabBarGutter={0}>
                                    {musicType.map(type => 
                                        <TabPane tab={getLocale() === 'en-US' ? type.englishName : type.chineseName} key={type.id}>
                                            <Row gutter={4}>
                                                <RadioGroup defaultValue={[type.id, 1].join('_')} className={styles['subtype-group']}>
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
                                                                    <Col span={6}>
                                                                        <RadioButton className={styles['subtype-btn']} value={subType.id}>{getLocale() === 'en-US' ? subType.englishName : subType.chineseName}</RadioButton>
                                                                    </Col>
                                                                    {i === arr.length - 1 && type.hasMore ? 
                                                                        <Col span={6}>
                                                                            <Button className={`${styles['subtype-btn']} ${styles['btn-more']} ellipsis`} onClick={this.handleToggleSubType.bind(this, type.id)}>
                                                                                <IconFont type={type.isShowMore ? 'icon-retract' : 'icon-expand'}/>
                                                                            </Button>
                                                                        </Col>
                                                                        : null
                                                                    }
                                                                </div>
                                                            )
                                                        })()
                                                    }
                                                </RadioGroup>
                                            </Row>
                                        </TabPane>
                                    )}
                                </Tabs>
                                :null
                            :
                            searchWords && searchWords.data && searchWords.data.length ?
                            <div className={styles['search-word']}>
                                <p className={styles['tit']}>{formatMessage({id: 'search_word'})}:</p>
                                <Row gutter={4}>
                                    <RadioGroup className={styles['subtype-group']}>
                                        {
                                            (() => {
                                                let arr = searchWords.data;
                                                if (searchWords.hasMore && !searchWords.isShowMore) {
                                                    arr = arr.slice(0, 7);
                                                }
                                                if (searchWords.hasMore && searchWords.isShowMore) {
                                                    arr = searchWords.data;
                                                }
                                                return arr.map((item, i) => 
                                                    <div key={item.id}>
                                                        <Col span={6}>
                                                            <RadioButton className={styles['subtype-btn']} value={item.id}>{getLocale() === 'en-US' ? item.englishName : item.chineseName}</RadioButton>
                                                        </Col>
                                                        {i === arr.length - 1 && searchWords.hasMore ? 
                                                            <Col span={6}>
                                                                <Button className={`${styles['subtype-btn']} ${styles['btn-more']} ellipsis`} onClick={this.handleToggleSearchWord.bind(this)}>
                                                                    <IconFont type={searchWords.isShowMore ? 'icon-retract' : 'icon-expand'}/>
                                                                </Button>
                                                            </Col>
                                                            : null
                                                        }
                                                    </div>
                                                )
                                            })()
                                        }
                                    </RadioGroup>
                                </Row>
                                <p className={styles['warning-info']}>
                                    <IconFont type="icon-warning"/>
                                    {formatMessage({id: 'network_audio_resources_warning'})}
                                </p>
                            </div>
                            :null
                        }
                    </div>
                </div>
                <div className={styles['list']}>
                    {
                        musicList && musicList.length ?
                        <RadioGroup className={styles['list-group']}>
                            {musicList.map(item => {
                                return <div className={`${styles['list-item']} ${item.isPlay ? styles['list-item-play'] : ''}`} key={item.id}>
                                    <div className={`${styles['list-item-c']} ellipsis clearfix`}>
                                        <time>{item.time}</time>
                                        <i className={styles['ico-sound']} onClick={this.handleAudioPlay.bind(this, item.id)}></i>
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
                                                    case 4:
                                                        type="icon-warning";
                                                }
                                                return <IconFont type={type} className={styles['ico-status']} spin={type === 'icon-loading' ? true : false}/> 
                                            })()
                                        }
                                        <Radio value={item.id} className={styles['list-item-radio']}/>
                                    </div>
                                </div>
                                    }
                            )}
                        </RadioGroup>
                        : 
                        // 搜索结果未空
                        // <div>
                        //    <Empty className={styles['empty']} description={formatMessage({id: 'no_result_match'}).split('<br>').map((str, i) => <span key={i}>{str}</span>)} image={noResultMatchImage} imageStyle={{marginBottom: 24}}>
                        //    </Empty>
                        //</div>

                        // 准备资源中
                        <div className="no-data">
                            <Empty className={styles['empty']} description={formatMessage({id: 'loading_search_result'}).split('<br>').map((str, i) => <span key={i}>{str}</span>)} image={loadingResultImage} imageStyle={{marginBottom: 24}}>
                            </Empty>
                        </div>
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