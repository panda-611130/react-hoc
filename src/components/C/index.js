import React from "react";
import { Form, Input } from "antd";
import { ComponentFormWrapper } from "../../Hoc/ComponentFormWrapper";

@ComponentFormWrapper
class C extends React.Component {
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
          <Form.Item label="input-C">
            {getFieldDecorator("emailC", {
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

export default Form.create({ name: "2" })(C);
