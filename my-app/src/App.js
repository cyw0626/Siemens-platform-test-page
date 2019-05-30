//单表数据
import React from 'react';
import {Row} from 'antd';
import "antd/dist/antd.css";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

export default class App extends React.Component { 
    //清除上个页面定时器
    componentWillUnmount() {
        clearInterval(this.appInterval);
    }     
    //获取数据,生命周期函数激活
    componentDidMount() {
        //数据初始化
        var TimeStamp,Ch1Val,Ch2Val,Ch3Val,Ch4Val,DAVal,ExVal;
        var data1=[];
        var data2=[];
        var data3=[];
        var data4=[];
        var data5=[];
        var data6=[];
        var data7=[];
        var myDisplay = echarts.init(document.getElementById('display'));
        var myExvalDisplay = echarts.init(document.getElementById('Exvaldisplay'));
        //获取历史值
        fetch('/testReceiveInfoHis')
        .then((res) => { return res.json() })
        .then(data => {
            this.setState({historydata:data});
            data1=this.state.historydata.TimeStamp;
            data2=this.state.historydata.Ch1Val;
            data3=this.state.historydata.Ch2Val;
            data4=this.state.historydata.Ch3Val;
            data5=this.state.historydata.Ch4Val;
            data6=this.state.historydata.DAVal;
            data7=this.state.historydata.ExVal;
        })
        //1秒更新一次数据
        this.appInterval=setInterval(()=>{
            //var myDisplay = echarts.init(document.getElementById('display'));
            myDisplay.setOption({
                title: { text: '数据显示' },
                tooltip: {},
                legend: {
                    data:['Ch1Val','Ch2Val','Ch3Val','Ch4Val','DAVal']
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
                        name : '                  简单数据显示',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name:'Ch1Val',
                        type: 'line',
                        data: data2     
                    },
                    {
                        name:'Ch2Val',
                        type: 'line',
                        data: data3
                    },
                    {
                        name:'Ch3Val',
                        type: 'line',
                        data: data4
                    },
                    {
                        name:'Ch4Val',
                        type: 'line',
                        data: data5
                    },
                    {
                        name:'DAVal',
                        type: 'line',
                        data: data6
                    }
                ]
            });
            myExvalDisplay.setOption({
                title: { text: '数据显示' },
                tooltip: {},
                legend: {
                    data:['ExVal']
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
                        name : '                  简单数据显示',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name:'ExVal',
                        type: 'line',
                        data: data7
                    }
                ]
            });
            //charts suits the screen
            window.onresize = function(){
                myDisplay.resize();
                myExvalDisplay.resize();
            };
            fetch('/testReceiveInfo')
            .then((res) => { return res.json() })
            .then(data => {
                this.setState({updatedata:data});
                TimeStamp=this.state.updatedata.TimeStamp;
                Ch1Val=this.state.updatedata.Ch1Val;
                Ch2Val=this.state.updatedata.Ch2Val;
                Ch3Val=this.state.updatedata.Ch3Val;
                Ch4Val=this.state.updatedata.Ch4Val;
                DAVal=this.state.updatedata.DAVal;
                ExVal=this.state.updatedata.ExVal;
                data1.shift();
                data1.push(TimeStamp);
                data2.shift();
                data2.push(Ch1Val);
                data3.shift();
                data3.push(Ch2Val);
                data4.shift();
                data4.push(Ch3Val);
                data5.shift();
                data5.push(Ch4Val);
                data6.shift();
                data6.push(DAVal);
                data7.shift();
                data7.push(ExVal);
            })
        },300);
    }
    render() {
        return (
            // <div id="display" style={{ 
            //    // width: 700,
            //      height: 400 }}>
            // </div>
            <div>
                <Row id="display" style={{ height: 350 }}></Row>
                <Row id="Exvaldisplay" style={{ height: 350 }}></Row>
            </div>
        )
    }
}