import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import "antd/dist/antd.css";
import './index.css'
import App from './App';
import Wgh from './Weight';
import WghSec from './WeightSecond';

const { Content, Sider } = Layout;

class Page extends React.Component {
    state = {
      collapsed: false,
    };
    onCollapse = (collapsed) => {
      this.setState({ collapsed });
    }
    render() {
      return (
        <Layout id="con">
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >  
                {/* logo随着导航栏改变 */}
                {this.state.collapsed? <img src={require('./siemens_logo.jpg')} width="40px" id="logo" alt=""/>:<img src={require('./siemens_logo.jpg')} width="130px" id="logo" alt=""/>}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" >
                        <Link to="/"> 
                            <Icon type="line-chart" />
                            <span className="nav-text">单表数据</span>
                        </Link> 
                    </Menu.Item>
                    <Menu.Item key="2" >
                        <Link to="/Weight">
                            <Icon type="line-chart" /> 
                            <span className="nav-text">实物称重</span>
                        </Link> 
                    </Menu.Item>
                    <Menu.Item key="3" >
                        <Link to="/WeightSecond">
                            <Icon type="line-chart" /> 
                            <span className="nav-text">液体称重</span>
                        </Link> 
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content style={{ margin: '24px 16px 24px ' }}>
                <div id="contain" style={{ padding: 24, background: '#fff'}}>              
                    <Route exact path='/' component={App}/>
                    <Route path='/Weight' component={Wgh}/>  
                    <Route path='/WeightSecond' component={WghSec}/>         
                </div>
            </Content>
        </Layout>
      );
    }
  }

ReactDOM.render(
    <Router>
        <Page/>
    </Router>
    , document.getElementById('root'));
