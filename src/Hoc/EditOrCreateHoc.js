import React, { Component } from "react";
import { RenderComponents } from "./RenderComponents";
export const EditOrCreateHoc = (WrappedComponent) =>
  class extends Component {
    components = [];

    get fullPageData() {
      return this.components.reduce((preCompdata, nextComp) => {
        return {
          ...preCompdata,
          ...nextComp.getData(),
        };
      }, {});
    }

    validateCompData() {
      console.log("====this.components===", this.components);
      return this.components.reduce((promise, nextComponent) => {
        return promise.then(
          (res) => {
            console.log("======resolve res ======", res);
            return nextComponent.validateComponent(true);
          },
          (res) => {
            console.log("======reject res ======", res);
            return nextComponent.validateComponent(false);
            // return nextComponent.validateComponent(true);
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
      return RenderComponents(moudules, props);
    };

    render() {
      const { props } = this;
      return <WrappedComponent page={this} {...props} />;
    }
  };
