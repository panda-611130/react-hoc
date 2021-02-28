import React from "react";
import { Form, Input } from "antd";
import { ComponentFormWrapper } from "../../Hoc/ComponentFormWrapper";

@ComponentFormWrapper
class A extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
      Data,
    } = this.props;
    console.log("====this.pros =====", this.props);
    return (
      <div style={{ margin: "12px 0", border: "2px solid black" }}>
        <Form
        // {...formItemLayout}
        >
          <Form.Item label="input-A">
            {getFieldDecorator("emailA", {
              initialValue: Data.emailA,
              rules: [
                {
                  required: true,
                  message: "必须输入",
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: "2" })(A);
