import React from "react";

export const ComponentFormWrapper = (DataComponent) => {
  return class extends DataComponent {
    validateComponent(preDataStatus) {
      if (!preDataStatus) {
        //如果上一个区块数据搜集失败了下个区块也不搜集了
        return Promise.reject(false);
      }
      return this.validate();
    }

    getData() {
      const {
        DataName,
        form: { getFieldsValue },
      } = this.props;
      const data = getFieldsValue();
      return {
        [DataName]: data,
      };
    }

    validate() {
      const { validateFields } = this.props.form;
      let selfValidateSuccess = true;
      validateFields((err, value) => {
        if (err) {
          selfValidateSuccess = false;
          return;
        } else {
          selfValidateSuccess = true;
        }
      });

      if (selfValidateSuccess) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(false);
      }
    }

    componentDidMount() {
      const { instanceRef } = this.props;
      instanceRef && instanceRef(this);
      super.componentDidMount && super.componentDidMount();
    }

    render() {
      return (
        <DataComponent
          validateComponent={this.validateComponent}
          {...this.props}
        />
      );
    }
  };
};
