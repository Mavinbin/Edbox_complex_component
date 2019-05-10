import React, {Component} from 'react';
import {formatMessage}  from 'umi/locale';
import {Select, Icon} from 'antd';
import Label from '../../components/label';
import styles from './index.scss';

class FontFamily extends Component {
    render() {
        const data = this.props.data;
        const {Option, OptGroup} = Select;
        return (
            <div className="widget">
                <Label name={formatMessage({id: 'font'})}/>
                <Select defaultValue={this.props.defaultValue} className={styles['select']}>
                    {data && data.recent &&  data.recent.length? 
                        <OptGroup label={formatMessage({id: 'recently_used'})}>
                            {data.recent.map(opt => 
                                <Option value={opt.id} key={opt.id}>
                                    {opt.name}
                                    {opt.status === 'downloading' ? 
                                        <i className={styles['ico-loading']}></i>
                                        :
                                        opt.status === 'not_downloaded' ?
                                        <Icon type="download" className={styles['ico-download']}/>
                                        :null
                                    }
                                </Option>
                            )}
                        </OptGroup>
                        :null
                    }
                    {data && data.all &&  data.all.length? 
                        <OptGroup label={formatMessage({id: 'all'})}>
                            {data.all.map(opt => 
                                <Option value={opt.id} key={opt.id}>
                                    {opt.name}
                                    {opt.status === 'downloading' ? 
                                        <i className={styles['ico-loading']}></i>
                                        :
                                        opt.status === 'not_downloaded' ?
                                        <Icon type="cloud-download" className={styles['ico-download']}/>
                                        :null
                                    }
                                </Option>
                            )}
                        </OptGroup>
                        :null
                    }
                </Select>
            </div>
        )
    }
}

export default FontFamily;