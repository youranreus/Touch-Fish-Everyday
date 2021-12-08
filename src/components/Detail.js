/**
 * @author 季悠然
 * @date 2021-12-07
 */
import React from 'react';
import {Collapsible, Card, Row, Col} from '@douyinfe/semi-ui';
import * as echarts from 'echarts/lib/echarts';
import { TitleComponent } from 'echarts/components';
import 'echarts/lib/chart/pie';
import jsonp from "jsonp";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        echarts.use([TitleComponent]);
    }

    componentDidMount() {
        let that = this;
        this.lchart = echarts.init(document.querySelector('#chart-language'));
        jsonp(this.props.languageApi, null, (error, data) => {
            if (error) console.log(error)
            else {
                data.data.forEach(item => {
                    item.value = item.percent;
                })
                that.lchart.setOption({
                    title: {
                        text: '写的啥',
                        left: 'auto',
                        top: 'auto',
                        textStyle: {
                            fontSize: "0.875rem"
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            avoidLabelOverlap: false,
                            radius: ['60%', '80%'],
                            label: {
                                show: false,
                                position: 'center',
                                emphasis: {
                                    show: true
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            data: data.data
                        }
                    ]
                });
            }
            this.lchart.resize({
                height: 150
            });
        });

        this.echart = echarts.init(document.querySelector('#chart-editor'));
        jsonp(this.props.editorApi, null, (error, data) => {
            if (error) console.log(error)
            else {
                data.data.forEach(item => {
                    item.value = item.percent;
                })
                that.echart.setOption({
                    title: {
                        text: '用的啥',
                        left: 'auto',
                        top: 'auto',
                        textStyle: {
                            fontSize: "0.875rem"
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            avoidLabelOverlap: false,
                            radius: ['60%', '80%'],
                            label: {
                                show: false,
                                position: 'center',
                                emphasis: {
                                    show: true
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            data: data.data
                        }
                    ]
                });
            }
            this.echart.resize({
                height: 150
            });
        });
    }

    render() {
        return (
            <div className="Detail">
                <Collapsible isOpen={this.props.isOpen} keepDOM={true}>
                    <Row style={{marginTop: "1rem"}}>
                        <Col span={12}>
                            <Card style={{margin: "1rem"}}>
                                <div id="chart-language"></div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card style={{margin: "1rem"}}>
                                <div id="chart-editor"></div>
                            </Card>
                        </Col>
                    </Row>
                </Collapsible>
            </div>
        );
    }
}

export default Detail;