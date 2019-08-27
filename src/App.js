import React, {Component} from 'react';
import './App.css';
import {Tabs, Card, Icon, Select, Button, Modal, Form, Input, DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

const {TextArea} = Input;
const {RangePicker} = DatePicker;
const {TabPane} = Tabs;
const {Meta} = Card;
const {Option} = Select;
const tabs = ['未出租', '已出租', '快到期'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unrentedData: [],
      rentedData: [],
      rentDueData: [],
      loading: false,
      visible: false,

      startValue: null,
      endValue: null,
      endOpen: false,

      name: '',

    }
  }


  disabledStartDate = startValue => {
    const {endValue} = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const {startValue} = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({endOpen: true});
    }
  };

  handleEndOpenChange = open => {
    this.setState({endOpen: open});
  };
  tabsCallback = key => {

  };
  onSelectChange = () => {

  };
  onFocus = () => {

  };
  onBlur = () => {

  };
  onSearch = () => {

  };
  openAddModal = () => {
    this.setState({visible: true})
  };
  handleAdd = () => {
    const {
      startValue,
      endValue,
      name,
      tel,
      houseType,
      address,
      remark
    } = this.state;
    this.setState({visible: false});

    const body = {
      owner: name,
      rentOutStartTime: startValue,
      rentOutEndTime: endValue,
      tel,
      houseType,
      address,
      status: remark
    };
    fetch('/api/house', {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=UTF-8',},
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(res => {
        //console.log(res)
        this.getList()
      })
      .catch(err => console.log(err))
  };
  handleCancel = () => {
    this.setState({visible: false})
  };
  getList = () => {
    fetch('/api/house/list', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => {
        //console.log(res)
        //todo


        this.setState({
          unrentedData: res.data,
          rentedData: res.data,
          rentDueData: res.data,
        })
      })
      .catch(err => console.log(err))
  };
  delete = (id) => {
    fetch(`/api/house/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(res => {
        //console.log(res)
        this.getList()
      })
      .catch(err => console.log(err))
  };

  setName = (e) => {
    this.setState({name: e.target.value})
  };
  setTel = (e) => {
    this.setState({tel: e.target.value})
  };
  setHouseType = (e) => {
    this.setState({houseType: e.target.value})
  };
  setAddress = (e) => {
    this.setState({address: e.target.value})
  };
  setRemark = (e) => {
    this.setState({remark: e.target.value})
  };

  componentDidMount() {
    this.getList()
  }

  handleSubmit = () => {

  };
  renderListCom = (data) => {
    return data.map((item, index) => {
      return <Card
        key={'card' + index}
        className={'card'}
        style={{margin: '0 10px 10px 10px'}}
        actions={[<Icon type="edit"/>, <Icon type="delete" onClick={() => this.delete(item.id)}/>]}
      >
        <Meta
          title={item.houseType}
          description={item.address}
        />
        {item.owner}: <a href={`tel:${item.tel}`}>{item.tel}</a>
      </Card>
    })
  }

  render() {
    const {
      unrentedData,
      rentedData,
      rentDueData,
      startValue,
      endValue,
      endOpen,
      name,
      tel,
      houseType,
      address,
      remark
    } = this.state;

    return (
      <div className="App">
        <Tabs defaultActiveKey="1" onChange={this.tabsCallback} style={{height: '100%'}}>
          <TabPane tab={tabs[0]} key="1">
            <div className="tab-view">

              <Button className={'add-btn-fixed'} onClick={this.openAddModal}>＋</Button>


              <div className={'top-tools'} style={{margin: '0 10px 10px 10px'}}>
                <Select
                  showSearch
                  style={{width: '100%'}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={this.onSelectChange}
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
              <div style={{display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'scroll'}}>
                {
                  this.renderListCom(unrentedData)
                }
              </div>

            </div>

            <Modal
              title="添加"
              visible={this.state.visible}
              onOk={this.handleAdd}
              onCancel={this.handleCancel}
            >
              <Form layout="vertical">
                <Form.Item label="联系人">
                  <Input value={name} onChange={this.setName}/>
                </Form.Item>
                <Form.Item label="联系方式">
                  <Input value={tel} onChange={this.setTel}/>
                </Form.Item>
                <Form.Item label="户型">
                  <Input value={houseType} onChange={this.setHouseType}/>
                </Form.Item>
                <Form.Item label="地址">
                  <Input value={address} onChange={this.setAddress}/>
                </Form.Item>
                <Form.Item label="出租时间">
                  <DatePicker
                    style={{width: '100%'}}
                    popupStyle={{width: '100%'}}
                    locale={locale}
                    disabledDate={this.disabledStartDate}
                    format="YYYY-MM-DD"
                    value={startValue}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                </Form.Item>
                <Form.Item label="到期时间">
                  <DatePicker
                    style={{width: '100%'}}
                    popupStyle={{width: '100%'}}
                    locale={locale}
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="End"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                  />
                </Form.Item>
                <Form.Item label="备注">
                  <TextArea placeholder="" autosize value={remark} onChange={this.setRemark}/>
                </Form.Item>
              </Form>

            </Modal>

          </TabPane>

          <TabPane tab={tabs[1]} key="2">
            Content of Tab Pane 2
            <div className="tab-view">

              <Button className={'add-btn-fixed'} onClick={this.openAddModal}>＋</Button>


              <div className={'top-tools'} style={{margin: '0 10px 10px 10px'}}>
                <Select
                  showSearch
                  style={{width: '100%'}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={this.onSelectChange}
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
              <div style={{display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'scroll'}}>
                {
                  this.renderListCom(rentedData)
                }
              </div>

            </div>
          </TabPane>
          <TabPane tab={tabs[2]} key="3">
            Content of Tab Pane 3
            <div className="tab-view">

              <Button className={'add-btn-fixed'} onClick={this.openAddModal}>＋</Button>


              <div className={'top-tools'} style={{margin: '0 10px 10px 10px'}}>
                <Select
                  showSearch
                  style={{width: '100%'}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={this.onSelectChange}
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
              <div style={{display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'scroll'}}>
                {
                  this.renderListCom(rentDueData)
                }
              </div>

            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}


export default App;
