import React from "react";
import A from "../components/A/index";
import B from "../components/B/index";
import C from "../components/C/index";
import D from "../components/D/index";
import E from "../components/E/index";

// 想不出来具体啥名 就用如此简朴的命名 0_0
const componentMap = {
  A,
  B,
  C,
  D,
  E,
};

export const RenderComponents = (modules, extraProps) => {
  return (
    Array.isArray(modules) &&
    modules.map((item) => {
      // console.log("===extraProps===", extraProps);
      const ComponentItem = componentMap[item.compName];
      return (
        <ComponentItem
          key={item.compName}
          {...extraProps}
          initData={item.initData || {}}
        />
      );
    })
  );
};
