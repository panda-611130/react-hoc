import React, { Component } from "react";
import { RenderComponents } from "./RenderComponents";
export const EditOrCreateHoc = (WrappedComponent) =>
  class extends Component {
    components = [];

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
