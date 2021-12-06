import React from 'react';
import './App.css';
import config from './config/config.json';
import CuAvatar from "./components/Avatar";
import {Descriptions} from '@douyinfe/semi-ui';
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
            ]
        };
        document.title = "今天" + this.c.name + "摸鱼了吗";
    }

    componentDidMount() {
        jsonp(this.c.wakatimeApi, null, (error, data) => {
            if (error) console.log(error)
            else {
                let _data = data.data[6].grand_total;
                console.log(_data);
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
                            value: (_data.total_seconds/(this.c.goal*3600)*100).toFixed(2)+"%"
                        },
                        {
                            key: "总结",
                            value: (this.c.goal > _data.hours) ? (this.c.offWorkTime < new Date().getHours()) ? "摸鱼了" : "还在奋斗" : "努力100%"
                        }]
                });
            }
        });
    }

    render() {
        return (
            <div className="App">
                <header>
                    <h2><CuAvatar c={this.c}/><br/>今天{this.c.name}摸鱼了吗？</h2>
                    <Descriptions data={this.state.workingData} row size="large"/>
                </header>
            </div>
        );
    }
}

export default App;
