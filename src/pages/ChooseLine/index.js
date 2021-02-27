import React, { Component } from "react";
import { Form, Radio, Checkbox, Row, Col, Button } from "antd";
import moment from "moment";
import "./index.less";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class ChooseLine extends Component {
  state = {
    entryPageMode: "create",
  };
  goPage = () => {
    const { validateFields, resetFields } = this.props.form;
    validateFields((err, value) => {
      if (err) {
        return;
      }
      const { pageMode, componetGroup, pageId } = value;
      if (["create"].includes(pageMode)) {
        const componetGroupObj = {};
        componetGroup.forEach((item) => {
          Object.assign(componetGroupObj, {
            [item]: {},
          });
        });
        const pageId = `${moment().format("YYYY-DD-MM-HH-MM-SS")}`;
        const obj = {
          pageId,
          pageData: {
            ...componetGroupObj,
          },
        };
        const prePage = JSON.parse(localStorage.getItem("pageEntity")) || [];
        prePage.push(obj);
        localStorage.setItem("pageEntity", JSON.stringify(prePage));
        resetFields();
        this.props.history.push(`/create?pageId=${pageId}`);
      } else if (["edit"].includes(pageMode)) {
        this.props.history.push(`/edit?pageId=${pageId}`);
      } else {
        this.props.history.push(`/${pageMode}?pageId=${pageId}`);
      }
    });
  };
  changeEntryMode = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({
      entryPageMode: value,
    });
  };

  getPageEntity = () => {
    const pageEntity = JSON.parse(localStorage.getItem("pageEntity"));
    if (!pageEntity) {
      return (
        <div className="empty-page-entity">
          本地localStorage暂时没有存储页面实例
        </div>
      );
    } else {
      return (
        <>
          {pageEntity.map((item) => {
            return (
              <Radio value={item.pageId} key={item.pageId}>
                {item.pageId}
              </Radio>
            );
          })}
        </>
      );
    }
  };

  render() {
    const { entryPageMode } = this.state;
    const { getFieldDecorator, resetFields } = this.props.form;
    return (
      <div className="choose-line">
        <div className="choose-area">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="进入模式">
              {getFieldDecorator("pageMode", {
                initialValue: "create",
                rules: [
                  {
                    required: true,
                    message: "请选择进入页面的模式",
                  },
                ],
              })(
                <Radio.Group onChange={this.changeEntryMode}>
                  <Radio value="create">新增</Radio>
                  <Radio value="edit">编辑</Radio>
                  <Radio value="detail">详情</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            {["create"].includes(entryPageMode) && (
              <Form.Item label="所需要的业务组件区块">
                {getFieldDecorator("componetGroup", {
                  rules: [
                    {
                      required: true,
                      message: "选择需要的组件进行页面的拼装",
                    },
                  ],
                })(
                  <Checkbox.Group style={{ width: "100%" }}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="A">A</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="B">B</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="C">C</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="D">D</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="E">E</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
            )}

            {["edit", "detail"].includes(entryPageMode) && (
              <Form.Item label="页面实例">
                {getFieldDecorator("pageId", {
                  rules: [
                    {
                      required: true,
                      message: "请选择之前创建的页面",
                    },
                  ],
                })(<Radio.Group>{this.getPageEntity()}</Radio.Group>)}
              </Form.Item>
            )}
          </Form>
        </div>
        <div className="option-area">
          <Button className="btn" type="primary" onClick={() => this.goPage()}>
            前往页面
          </Button>
          <Button
            className="btn"
            onClick={() => {
              resetFields();
            }}
          >
            重置{" "}
          </Button>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: "validate_other" })(ChooseLine);
