import React from "react";

export const ComponentFormWrapper = (DataComponent) => {
  return class extends DataComponent {
    validateComponent(preDataStatus) {
      console.log("====上一个组件状态===", preDataStatus);
      if (!preDataStatus) {
        //如果上一个区块数据搜集失败了下个区块也不搜集了
        // return Promise.reject(false);
        return Promise.reject(false);
      }
      if (super.getData) {
        return super.getData();
      } else {
        return this.getData();
      }
    }

    getData() {
      const { validateFields } = this.props.form;
      return validateFields((err, value) => {
        if (err) {
          //   return
          Promise.reject(false);
          return;
        }
        // return
        Promise.resolve(true);
      });
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
