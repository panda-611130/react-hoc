import React from "react";
import { Form, Input } from "antd";
class A extends React.Component {
  mockCollectDate = () => {
    const { validateFields } = this.props.form;
    validateFields((err, value) => {
      console.log("====value====", value);
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      initData,
    } = this.props;

    return (
      <div style={{ margin: "12px 0", border: "2px solid black" }}>
        <Form
        // {...formItemLayout}
        >
          <Form.Item label="input-A">
            {getFieldDecorator("emailA", {
              rules: [
                {
                  required: true,
                  message: "必须输入",
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>

        <div onClick={() => this.mockCollectDate()}>123123</div>
      </div>
    );
  }
}

export default Form.create({ name: "2" })(A);
