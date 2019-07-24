import React, {Component} from 'react';
import {formatMessage}  from 'umi/locale';
import Link from 'umi/link';
import {Slider, Row, Col, Radio, Button} from 'antd';
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
            start: 0,
            end: 0,
            step: 0.01,
            name: 'music',
            duration: null,
            currTime: '00:00:00',
            originalBuffer: null,
            defaultStart: 10,
            defaultEnd: 50,
            audioUrl: 'http://ossweb-img.qq.com/images/audio/motion/audio4.mp3'
        }
    }
    /**
     * 处理音频显示区
     */
    waveSurferInit() {
        const {audioUrl} = this.state;
        const _this = this;
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            cursorColor: '#047ef0',
            cursorWidth: 2,
            barWidth: 1,
            barGap: 4,
            waveColor: '#ccc',
            progressColor: '#ccc',
            hideScrollbar: true,
            responsive: true,
            plugins: [
                this.timelineInit(),
                this.regionsInit()
            ]
        });
        wavesurfer.load(audioUrl);
        wavesurfer.on('ready', function() {
            const {duration, start, originalBuffer} = _this.state;
            const updateState = {
                end: duration
            };
            if (duration === null) {
                const duration = parseFloat(wavesurfer.getDuration().toFixed(2)); // 获取音频时长
                updateState.duration = duration;
            }
            if (originalBuffer === null) {
                updateState.originalBuffer = wavesurfer.backend.buffer;
            }
            _this.setState(updateState, () => {
                if(originalBuffer === null) {
                    _this.handleAudioPartialRender();
                }
            });
        })
        const thumbwave = WaveSurfer.create({
            container: '#thumbwave',
            cursorColor: 'transparent',
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
                    color: 'rgba(207, 1, 0, 0.3)',
                    drag: false
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
        let h = 0;
        let m = 0;
        let s = 0;
        h = parseInt(seconds / 3600);
        m = parseInt(seconds / 60);
        s = parseFloat((seconds % 60).toFixed(2));
        if (!parseInt(h)) {
            return `${this.handleZeroFill(h)}:${this.handleZeroFill(m)}:${this.handleZeroFill(s)}`;
        }

        return `${this.handleZeroFill(m)}:${this.handleZeroFill(s)}`;
    }

    /**
     * 处理滑动条变化
     */
    handleSliderChange(value) {
        const {wavesurfer, duration} = this.state;
        const start = value[0];
        const end = value[1];
        this.setState({
            start: start,
            end: end
        });
        wavesurfer.zoom((end - start) / duration * 100);
    }

    /**
     * 选取部分波形渲染
     */
    handleAudioPartialRender() {
        const {wavesurfer, originalBuffer, defaultStart, defaultEnd} = this.state;
        if (wavesurfer) {
            const newBuffer = wavesurfer.backend.ac.createBuffer(
                originalBuffer.numberOfChannels,
                Math.ceil(defaultEnd - defaultStart) * originalBuffer.sampleRate,
                originalBuffer.sampleRate
            );

            const newChannelData = new Float32Array((defaultEnd - defaultStart) * originalBuffer.sampleRate);
            for (let i = 0; i < originalBuffer.numberOfChannels; i++) {
                let originalChannelData = originalBuffer.getChannelData(i);
                for (var j = defaultStart * originalBuffer.sampleRate, k = 0, len = defaultEnd * originalBuffer.sampleRate; j < len; j++, k++) {
                    newChannelData[k] = originalChannelData[j];
                }
            }
            if (isNaN(newChannelData[0])) {
                return false;
            }
            newBuffer.copyToChannel(newChannelData, 0, 0);
            wavesurfer.empty();
            wavesurfer.loadDecodedBuffer(newBuffer);
            console.log(newChannelData);
        }
    }

    /**
     * 处理滑动条的tip显示格式
     */
    handleSliderTipFormatter(value) {
        const h = parseInt(value / 3600);
        const m = parseInt((value % 3600) / 60);
        const s = parseFloat((value % 60).toFixed(2));
        return `${this.handleZeroFill(h)}:${this.handleZeroFill(m)}:${this.handleZeroFill(s)}`;
    }
    /**
     * 处理小于10时的补0
     */
    handleZeroFill(num) {
        if (num < 10) {
            return '0' + num;
        }

        return num;
    }

    componentDidMount() {
        this.waveSurferInit();
    }

    render() {
        const {start, end, step, currTime, name, duration, audioUrl} = this.state;
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
                    {
                        duration !== null ? 
                        <Slider className={styles['slider']} range defaultValue={[0, duration]} onChange={this.handleSliderChange.bind(this)} step={step} max={duration} tipFormatter={this.handleSliderTipFormatter.bind(this)}/>
                        : null
                    }
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
                <audio id="audio" src={audioUrl}/>   
            </div>
        )
    }
}
export default EditAudio;