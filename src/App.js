import React, {Component} from 'react';
import './App.css';
import {Tabs, Card, Icon, Select, Row, Col, Affix, Button} from 'antd';

const {TabPane} = Tabs;
const {Meta} = Card;
const {Option} = Select;
const tabs = ['未', '已', '到期'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          houseType: '1.1',
          owner: 'hh',
          tel: '123342',
          address: '路',
          status: '空',
          rentOutStartTime: '',
          rentOutEndTime: ''
        },
        {
          id: 2,
          houseType: '1.2',
          owner: 'aahh',
          tel: '1233546542',
          address: '路',
          status: '空',
          rentOutStartTime: '',
          rentOutEndTime: ''
        },
        {
          id: 2,
          houseType: '1.2',
          owner: 'aahh',
          tel: '1233546542',
          address: '路',
          status: '空',
          rentOutStartTime: '',
          rentOutEndTime: ''
        },
        {
          id: 2,
          houseType: '1.2',
          owner: 'aahh',
          tel: '1233546542',
          address: '路',
          status: '空',
          rentOutStartTime: '',
          rentOutEndTime: ''
        }
      ],
      loading: false,
    }
  }

  tabsCallback = key => {

  };
  onChange = () => {

  };
  onFocus = () => {

  };
  onBlur = () => {

  };
  onSearch = () => {

  };

  render() {
    const {data} = this.state;

    return (
      <div className="App">
        <Tabs defaultActiveKey="1" onChange={this.tabsCallback} style={{height: '100%'}}>
          <TabPane tab={tabs[0]} key="1" style={{height: '100%'}}>
            <div style={{display:'flex',flexDirection:'column',flex:1, overflow: 'scroll'}}>


              <div className={'top-tools'} style={{margin: '0 10px 10px 10px'}}>
                <Select
                  showSearch
                  style={{width: '100%'}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </div>

              {
                data.map((item, index) => {
                  return <Card
                    key={'card' + index}
                    className={'card'}
                    style={{margin: '0 10px 10px 10px'}}
                    actions={[<Icon type="edit"/>, <Icon type="ellipsis"/>]}
                  >
                    <Meta
                      title={item.houseType}
                      description={item.address}
                    />
                    <a href={`tel:${item.tel}`}>{item.tel}</a>
                  </Card>
                })
              }

            </div>

            <Affix offsetBottom={20} onChange={affixed => console.log(affixed)}>
              <Button>120px to affix top</Button>
            </Affix>

          </TabPane>
          <TabPane tab={tabs[1]} key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab={tabs[2]} key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}


export default App;
