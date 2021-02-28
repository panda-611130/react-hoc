import React, { Component } from "react";
import { RenderComponents } from "./RenderComponents";
export const EditOrCreateHoc = (WrappedComponent) =>
  class extends Component {
    components = [];

    get fullPageData() {
      return this.components.reduce((preCompdata, nextComp) => {
        const pre = (preCompdata.getData && preCompdata.getData()) || {
          ...preCompdata,
        };
        return {
          ...pre,
          ...nextComp.getData(),
        };
      }, {});
    }

    validateCompData() {
      return this.components.reduce((promise, nextComponent) => {
        return promise.then(
          (res) => {
            return nextComponent.validateComponent(true);
          },
          (res) => {
            return nextComponent.validateComponent(false);
          }
        );
      }, Promise.resolve(true));
    }

    renderPage = (moudules, extraProps) => {
      const props = {
        ...extraProps,
        moudules,
        instanceRef: (component) => this.components.push(component),
      };
      console.log("=======moudules========",moudules);
      return RenderComponents(moudules, props);
    };

    render() {
      const { props } = this;
      return <WrappedComponent page={this} {...props} />;
    }
  };
