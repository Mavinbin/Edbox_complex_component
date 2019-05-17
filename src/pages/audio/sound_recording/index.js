import React, {Component} from 'react';
import {formatMessage}  from 'umi/locale';
import {Icon, Button} from 'antd';
import IconFont from '@/components/iconfont';
import WaveSurfer from 'wavesurfer.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Swiper from 'swiper';
import Header from '@/components/header';
import Name from '@/components/name';
import 'swiper/dist/css/swiper.css';
import '@/common.scss';
import styles from './index.scss';
class SoundRecording extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wavesurfer: null,
            swiper: null,
            name: 'voice_20190215',
            currTime: '00:00:00',
            audioUrl: 'http://ossweb-img.qq.com/images/audio/motion/audio4.mp3',
            audioEffect: [
                {
                    id: 1,
                    name: 'Monster',
                    image_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557974088&di=d9d619e8a467ff63313da93e64328e61&imgtype=jpg&er=1&src=http%3A%2F%2Fi1.sinaimg.cn%2Ftravel%2F2015%2F0518%2FU8888P704DT20150518165811.jpg'
                },
                {
                    id: 2,
                    name: 'Men',
                    image_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557974088&di=d9d619e8a467ff63313da93e64328e61&imgtype=jpg&er=1&src=http%3A%2F%2Fi1.sinaimg.cn%2Ftravel%2F2015%2F0518%2FU8888P704DT20150518165811.jpg'
                },
                {
                    id: 3,
                    name: 'Girl',
                    image_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557974088&di=d9d619e8a467ff63313da93e64328e61&imgtype=jpg&er=1&src=http%3A%2F%2Fi1.sinaimg.cn%2Ftravel%2F2015%2F0518%2FU8888P704DT20150518165811.jpg'
                },
                {
                    id: 4,
                    name: 'Dog',
                    image_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557974088&di=d9d619e8a467ff63313da93e64328e61&imgtype=jpg&er=1&src=http%3A%2F%2Fi1.sinaimg.cn%2Ftravel%2F2015%2F0518%2FU8888P704DT20150518165811.jpg'
                },
                {
                    id: 5,
                    name: 'Snow',
                    image_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557974088&di=d9d619e8a467ff63313da93e64328e61&imgtype=jpg&er=1&src=http%3A%2F%2Fi1.sinaimg.cn%2Ftravel%2F2015%2F0518%2FU8888P704DT20150518165811.jpg'
                },
                {
                    id: 6,
                    name: 'Other',
                    image_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557974088&di=d9d619e8a467ff63313da93e64328e61&imgtype=jpg&er=1&src=http%3A%2F%2Fi1.sinaimg.cn%2Ftravel%2F2015%2F0518%2FU8888P704DT20150518165811.jpg'
                },
            ]
        }
    }
    componentDidMount() {
        this.waveSurferInit();
        this.swiperInit();
    }
    /**
     * 处理音频显示区
     */
    waveSurferInit() {
        const {audioUrl} = this.state;
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            cursorColor: '#047ef0',
            cursorWidth: 2,
            barWidth: 2,
            hideScrollbar: true,
            waveColor: '#ccc',
            progressColor: '#ccc',
            responsive: true,
            plugins: [
                this.timelineInit()
            ]
        });
        wavesurfer.load(audioUrl);
        wavesurfer.on('ready', () => {
            
        });
        this.setState({
            wavesurfer: wavesurfer
        })
    }
    /**
     * 时间线配置初始化
     */
    timelineInit() {
        return Timeline.create({
            container: '#timeline',
            unlabeledNotchColor: '#ccc',
            primaryColor: '#ccc',
            secondaryColor: '#ccc',
            primaryFontColor: '#ccc',
            secondaryFontColor: '#333',
            fontSize: 12,
            formatTimeCallback: (seconds, pxPerSec) => this.formatTimeCallback(seconds, pxPerSec)
        })
    }
    swiperInit() {
        const thumbSwiper = new Swiper('#thumbSwiper', {
            slidesPerView: 5,
            spaceBetween: 4,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true
        })
        const swiper = new Swiper('#mainSwiper', {
            navigation: {
                nextEl: '#swiperBtnNext',
                prevEl: '#swiperBtnPrev'
            },
            thumbs: {
                swiper: thumbSwiper
            }
        });
        this.setState({
            swiper: thumbSwiper
        });
    }
    /**
     * 时间线时间格式化
     * @param {int} seconds 当前秒数
     * @param {float} pxPerSec 每秒px数
     */
    formatTimeCallback(seconds, pxPerSec) {
        let min = 0;
        let sec = 0;
        let hour = 0;
        hour = Math.floor(seconds / 60 / 60);
        hour = hour < 10 ? `0${hour}` : hour;
        min = Math.floor(seconds / 60);
        min = min < 10 ? `0${min}` : min;
        sec = seconds % 60;
        sec = sec < 10 ? `0${sec}` : sec;
        if (!parseInt(hour)) {
            return `${min}:${sec}.00`;
        } else {
            return `${hour}:${min}:${sec}.00`;
        }
    }
    render() {
        const {name, currTime, audioEffect} = this.state;
        return (
            <div>
                <Header title={formatMessage({id: 'sound_recording'})} back/>
                <Name className="row" defaultValue={name}/>
                <div className="row2">
                    <time className={styles['current-time']}>{currTime}</time>
                    <div id="waveform" className={styles['waveform']}></div>
                    <div id="timeline" className={styles['timeline']}></div>
                </div>
                <div className={`${styles['actions']} row2`}>
                    <Icon type="reload" className={styles['ico-reload']}/>
                    <Button className={styles['btn-record']}>
                        <IconFont type="icon-microphone" className={styles['ico-record']}/>
                    </Button>
                    <IconFont type="icon-play" className={styles['ico-play']}/>
                </div>
                {audioEffect && audioEffect.length ?
                    <div className="effect-swiper row2">
                        <div id="mainSwiper" className="main-swiper">
                            <div className="swiper-wrapper">
                                {audioEffect.map(item => 
                                    <div className="swiper-slide" key={item.id}>
                                        <img src={item.image_url} />
                                        <p>{item.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div id="thumbSwiper">
                            <div className="swiper-wrapper">
                                {audioEffect.map(item => 
                                    <div className="swiper-slide" key={item.id}>
                                        <img src={item.image_url} />
                                        <p>{item.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div id="swiperBtnPrev" className="btn-prev">
                            <Icon type="left"/>
                        </div>
                        <div id="swiperBtnNext" className="btn-next">
                            <Icon type="right"/>
                        </div>
                    </div>
                    : null
                }
                <div className="btm-btns">
                    <Button className={styles['btn-conserve']}>{formatMessage({'id': 'conserve'})}</Button>
                    <Button type="primary" className={styles['btn-ok']}>{formatMessage({'id': 'ok'})}</Button>
                </div>
            </div>
        )
    }
}
export default SoundRecording;