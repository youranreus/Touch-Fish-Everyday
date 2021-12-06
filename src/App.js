import React from 'react';
import './App.css';
import config from './config/config.json';
import CuAvatar from "./components/Avatar";
import {Descriptions, Button, Notification} from '@douyinfe/semi-ui';
import {IconBolt, IconTriangleUp, IconLikeThumb, IconLikeHeart} from '@douyinfe/semi-icons';
import jsonp from 'jsonp';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.c = config;
        this.state = {
            workingData: [
                {
                    key: "今日代码时长",
                    value: "loading"
                },
                {
                    key: "目标时长",
                    value: this.c.goal
                },
                {
                    key: "完成度",
                    value: "loading"
                },
                {
                    key: "总结",
                    value: "loading"
                }
            ],
            accomplished: false
        };
        document.title = "今天" + this.c.name + "摸鱼了吗";
    }

    sendLike = () => {
        Notification.open({
            title: '谢谢你~',
            content: '感谢你的支持！',
            duration: 3,
            icon: <IconLikeHeart style={{color: "red"}}/>
        });
        window.location = "mailto:" + this.c.contact + "?subject=今天也辛苦啦&body=今天已经很努力啦，放松一下吧~";
    }

    punch = () => {
        Notification.open({
            title: '在努力了',
            content: 'QAQ',
            duration: 3,
        });
        window.location = "mailto:" + this.c.contact + "?subject=还在摸鱼？&body=今日事今日毕！快点起床！";
    }

    sendNotice = () => {
        Notification.open({
            title: '氮气加速！',
            content: '战意涌上来啦！',
            duration: 3,
        });
        window.location = "mailto:" + this.c.contact + "?subject=加油！&body=坚持就是胜利！";
    }

    componentDidMount() {
        jsonp(this.c.wakatimeApi, null, (error, data) => {
            if (error) console.log(error)
            else {
                let _data = data.data[6].grand_total;
                this.setState({
                    workingData: [
                        {
                            key: "今日代码时长",
                            value: _data.text
                        },
                        {
                            key: "目标时长",
                            value: this.c.goal + 'hrs'
                        },
                        {
                            key: "完成度",
                            value: (_data.total_seconds / (this.c.goal * 3600) * 100).toFixed(2) + "%"
                        },
                        {
                            key: "总结",
                            value: (this.c.goal > _data.hours) ? (this.c.offWorkTime < new Date().getHours()) ? (
                                <span style={{color: "#DD4A68"}}>摸鱼了</span>) : "还在奋斗" : "好耶！"
                        }
                    ],
                    accomplished: this.c.goal < _data.hours
                });
            }
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="App">
                    <header>
                        <h2><CuAvatar c={this.c}/><br/>今天{this.c.name}摸鱼了吗？</h2>
                        <Descriptions data={this.state.workingData} row style={{textAlign: "right"}}/>
                        <div className={"btn-bar"}>
                            {this.state.accomplished ?
                                <Button theme='solid' type='primary' size={"large"} style={{borderRadius: "1000rem"}}
                                        onClick={this.sendLike}
                                        icon={
                                            <IconLikeThumb/>}>表扬一下！</Button> : (this.c.offWorkTime < new Date().getHours()) ?
                                    <Button theme='solid' type='danger' size={"large"} style={{borderRadius: "1000rem"}}
                                            onClick={this.punch}
                                            icon={<IconBolt/>}>还敢摸鱼？加班！</Button> :
                                    <Button theme='solid' type='primary' size={"large"} onClick={this.sendNotice}
                                            style={{borderRadius: "1000rem"}} icon={<IconTriangleUp/>}>给他加加油</Button>}
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}

export default App;
