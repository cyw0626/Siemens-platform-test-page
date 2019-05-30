//液体称重
import React from 'react';
import {Row,Col} from 'antd';
import "antd/dist/antd.css";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

export default class WghSec extends React.Component {  
    //清除上个页面定时器
    componentWillUnmount() {
        clearInterval(this.wghsecInterval);
    }  
    //获取数据,生命周期函数激活
    componentDidMount() {
        //数据初始化
        var TimeStamp,Weight,WeightTag1,WeightTag2,WeightTag3,WeightTag4;
        var data1=[];
        var data2=[];
        var data3=[];
        var data4=[];
        var data5=[];
        var data6=[];
        var myWeightSecond1 = echarts.init(document.getElementById('second1'));
        var myWeightSecond2 = echarts.init(document.getElementById('second2'));
        var myWeightSecond3 = echarts.init(document.getElementById('second3'));
        var myWeightSecond4 = echarts.init(document.getElementById('second4'));
        var myWeightSecond5 = echarts.init(document.getElementById('second5'));
        //获取历史值
        fetch('/testPourWaterHis')
        .then((res) => { return res.json() })
        .then(data => {
            this.setState({historydata:data});
            data1=this.state.historydata.TimeStamp;
            data2=this.state.historydata.Weight;
            data3=this.state.historydata.WeightTag1;
            data4=this.state.historydata.WeightTag2;
            data5=this.state.historydata.WeightTag3;
            data6=this.state.historydata.WeightTag4;
        })
        //1秒更新一次数据
        this.wghsecInterval=setInterval(()=>{
            myWeightSecond1.setOption({
                title: { text: '数据1' },
                tooltip: {},
                legend: {
                    data:['WeightTag1']
                }, 
                xAxis: [
                    {
                        type: 'category',
                        data:data1,
                        splitLine: {
                            show: false
                        }  
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name : '                           1号传感器重量(kg)',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name:'WeightTag1',
                        type: 'line',
                        data: data3     
                    }
                ]
            });
            myWeightSecond2.setOption({
                title: { text: '数据2' },
                tooltip: {},
                legend: {
                    data:['WeightTag2']
                }, 
                xAxis: [
                    {
                        type: 'category',
                        data:data1,
                        splitLine: {
                            show: false
                        }  
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name : '                         2号传感器重量(kg)',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name:'WeightTag2',
                        type: 'line',
                        data: data4     
                    }
                ]
            });
            myWeightSecond3.setOption({
                title: { text: '数据3' },
                tooltip: {},
                legend: {
                    data:['WeightTag3']
                }, 
                xAxis: [
                    {
                        type: 'category',
                        data:data1,
                        splitLine: {
                            show: false
                        }  
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name : '                           3号传感器重量(kg)',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name:'WeightTag3',
                        type: 'line',
                        data: data5     
                    }
                ]
            });
            myWeightSecond4.setOption({
                title: { text: '数据4' },
                tooltip: {},
                legend: {
                    data0:['WeightTag4']
                }, 
                xAxis: [
                    {
                        type: 'category',
                        data:data1,
                        splitLine: {
                            show: false
                        }  
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name : '                          4号传感器重量(kg)',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name:'WeightTag4',
                        type: 'line',
                        data: data6     
                    }
                ]
            });
            myWeightSecond5.setOption({
                title: { text: '称重数据' },
                tooltip: {},
                legend: {
                    data:['Weight']
                }, 
                xAxis: [
                    {
                        type: 'category',
                        data:data1,
                        splitLine: {
                            show: false
                        }  
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name : '                          总和传感器重量(kg)',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name:'Weight',
                        type: 'line',
                        data: data2     
                    }
                ]
            });
            window.onresize = function(){
                myWeightSecond1.resize();
                myWeightSecond2.resize();
                myWeightSecond3.resize();
                myWeightSecond4.resize();
                myWeightSecond5.resize();
            };
            fetch('/testPourWater')
            .then((res) => { return res.json() })
            .then(data => {
                this.setState({updatedata:data});
                TimeStamp=this.state.updatedata.TimeStamp;
                Weight=this.state.updatedata.Weight;
                WeightTag1=this.state.updatedata.WeightTag1;
                WeightTag2=this.state.updatedata.WeightTag2;
                WeightTag3=this.state.updatedata.WeightTag3;
                WeightTag4=this.state.updatedata.WeightTag4;
                data1.shift();
                data1.push(TimeStamp);
                data2.shift();
                data2.push(Weight);
                data3.shift();
                data3.push(WeightTag1);
                data4.shift();
                data4.push(WeightTag2);
                data5.shift();
                data5.push(WeightTag3);
                data6.shift();
                data6.push(WeightTag4);
            })
        },300);
    }
    render() {
        return (
            <div>
                <Row>
                    <Col id="second1" style={{  height: 400 }} span={12}/>
                    <Col id="second2" style={{  height: 400 }} span={12}/>
                </Row>
                <Row>
                    <Col id="second3" style={{  height: 400 }} span={12}/>
                    <Col id="second4" style={{  height: 400 }} span={12}/>
                </Row>
                <Row id="second5" style={{  height: 400 }}/>
            </div>
        )
    }
}