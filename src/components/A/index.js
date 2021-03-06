import React from "react";
import { Form, Input } from "antd";
import { ComponentFormWrapper } from "../../Hoc/ComponentFormWrapper";

@ComponentFormWrapper
class A extends React.Component {
  getData() {
    const {
      DataName,
      form: { getFieldsValue },
    } = this.props;

    const data = getFieldsValue();

    // 在下面我们可以对当前组件搜集上来的数据进行一些定制化的处理，最终放回就可以了
    //mock start
    Object.assign(data, {
      fromCompSelf: "在组件内部可以定义数据搜集后的处理方式",
    });
    //mock end

    return {
      [DataName]: data,
    };
  }
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
