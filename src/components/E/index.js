import React from "react";
import { Form, Input } from "antd";
import { ComponentFormWrapper } from "../../Hoc/ComponentFormWrapper";

@ComponentFormWrapper
class E extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
      Data,
    } = this.props;
    return (
      <div style={{ margin: "12px 0", border: "2px solid black" }}>
        <Form
        // {...formItemLayout}
        >
          <Form.Item label="input-E">
            {getFieldDecorator("emailE", {
              initialValue: Data.emailE,
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

export default Form.create({ name: "E" })(E);
