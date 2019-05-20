import React, {Component} from 'react';
import {formatMessage}  from 'umi/locale';
import Link from 'umi/link';
import {Icon, Slider, Row, Col, Radio, Button} from 'antd';
import IconFont from '@/components/iconfont';
import WaveSurfer from 'wavesurfer.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions'
import Header from '@/components/header';
import IconButton from '@/components/iconbutton';
import Name from '@/components/name';
import NumberInput from '@/components/numberinput';
import '@/common.scss';
import styles from './index.scss';

class EditAudio extends Component {
    constructor() {
        super();
        this.state = {
            wavesurfer: null,
            start: 0.01,
            end: 0.01,
            step: 0.01,
            name: 'music',
            currTime: '00:35:00',
            audioUrl: 'http://ossweb-img.qq.com/images/audio/motion/audio4.mp3'
        }
    }
    componentDidMount() {
        this.waveSurferInit();
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
                this.timelineInit(),
                this.regionsInit()
            ]
        });
        wavesurfer.load(audioUrl);
        wavesurfer.on('ready', () => {
            
        });
        const thumbwave = WaveSurfer.create({
            container: '#thumbwave',
            cursorColor: '#047ef0',
            cursorWidth: 2,
            barWidth: 2,
            hideScrollbar: true,
            waveColor: '#ccc',
            progressColor: '#ccc',
            responsive: true
        })
        this.setState({
            wavesurfer: wavesurfer
        })
        thumbwave.load(audioUrl);
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
    /**
     * 选中区配置初始化
     */
    regionsInit() {
        return Regions.create({
            regions: [
                {
                    start: 5,
                    end: 20,
                    color: 'rgba(207, 1, 0, 0.3)'
                }
            ]
        })  
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
        const {start, end, step, currTime, name} = this.state;
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        return (
            <div className="page-wrap">
                <Header title={formatMessage({id: 'edit_audio'})}/>
                <div className="row">
                    <IconButton iconfont="icon-upload-audio" toolTip={formatMessage({id: 'upload_local_audio'})} placement="bottomLeft"/>
                    <Link to="/audio/audio_library">
                        <IconButton iconfont="icon-network-audio" toolTip={formatMessage({id: 'select_online_audio'})} placement="bottomLeft"/>
                    </Link>
                    <Link to="/audio/sound_recording">
                        <IconButton iconfont="icon-microphone1" toolTip={formatMessage({id: 'record_audio'})}/>
                    </Link>
                    <IconButton iconfont="icon-forbid-s-o" toolTip={formatMessage({id: 'no_audio'})}/>
                </div>
                <Name className="row" defaultValue={name}/>
                <div className="row">
                    <RadioGroup defaultValue={1} className={styles['cut-length']}>
                        <RadioButton value={1}>
                            <IconFont type="icon-fixed-length-cut"/>
                            {formatMessage({'id': 'preset_length'})}
                        </RadioButton>
                        <RadioButton value={2}>
                            <IconFont type="icon-free-length-cut"/>
                            {formatMessage({'id': 'free_length'})}
                        </RadioButton>
                    </RadioGroup>
                </div>
                <div className="row">
                    <time className={styles['current-time']}>{currTime}</time>
                    <div id="waveform" className={styles['waveform']}></div>
                    <div id="timeline" className={styles['timeline']}></div>
                </div>
                <div className="row2">
                    <Row gutter={24}>
                        <Col span={12}>
                            <NumberInput name={formatMessage({id: 'start'})} defaultValue={start} step={step}/>
                        </Col>
                        <Col span={12}>
                            <NumberInput name={formatMessage({id: 'end'})} defaultValue={end} step={step}/> 
                        </Col>
                    </Row>
                </div>
                <div className={`${styles['zoomer']} wave-zoomer row2`}>
                    <div className={styles['slider-main']} id="thumbwave"></div>
                    <Slider className={styles['slider']} range defaultValue={[0, 100]}/>
                </div>
                <div className={`${styles['actions']} row2`}>
                    <IconFont type="icon-save" className={styles['ico-save']}/>
                    <Button className={styles['btn-play']}>
                    {
                        <IconFont type="icon-play" className={styles['ico-play']}/> // 播放状态
                        // <IconFont type="icon-pause" className={styles['ico-play']}/> // 暂停状态
                    }
                    </Button>
                    <IconFont type="icon-reload" className={styles['ico-reload']}/>
                </div>
                <div className="btm-btns">
                    <Button type="primary" className={styles['btn-reset']}>{formatMessage({'id': 'reset'})}</Button>
                </div>
            </div>
        )
    }
}
export default EditAudio;