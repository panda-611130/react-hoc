import React, { Component } from "react";

import { solveSearchToObj } from "../../util/index";
import { EditOrCreateHoc } from "../../Hoc/EditOrCreateHoc";
import "./index.less";
import { Button, message } from "antd";

@EditOrCreateHoc
class EditOrCreatePage extends Component {
  state = { canRender: false };
  componentDidMount() {
    const { search, pathname } = this.props.location;
    const { pageId } = solveSearchToObj(search);
    if (pathname.indexOf("edit") !== -1 && pageId) {
      this.mockReqData();
    } else {
      this.setState({ canRender: true });
    }
  }
  mockReqData = () => {
    const { search } = this.props.location;
    const { pageId } = solveSearchToObj(search);
    const currentPageData = JSON.parse(localStorage.getItem("pageEntity"));
    const { pageData } = currentPageData.find((item) => {
      return item.pageId == pageId;
    });
    this.setState(
      {
        pageData,
      },
      () => {
        this.setState({
          canRender: true,
        });
      }
    );
  };
  collectPageData() {
    const { page } = this.props;
    const { search } = this.props.location;
    const { pageId } = solveSearchToObj(search);
    page.validateCompData().then(
      (success) => {
        message.error("串行检验数据成功，可以正式进行数据收集");
        const pageData = {
          pageId,
          pageData: {
            ...page.fullPageData,
          },
        };
        const preData = JSON.parse(localStorage.getItem("pageEntity") || "[]");
        const beReplaceIndex = preData.findIndex(
          (item) => item.pageId === pageId
        );
        preData.splice(beReplaceIndex, 1, pageData);
        localStorage.setItem("pageEntity", JSON.stringify(preData));
      },
      (err) => {
        message.error("串行检验数据失败");
      }
    );
  }

  render() {
    const { canRender, pageData = {} } = this.state;
    const { page } = this.props;
    const renderCompArr = Object.keys(pageData).map((compName) => {
      return {
        compName,
        Data: { ...(pageData[compName] || {}) },
      };
    });
    return (
      <div className="page-comp-container">
        {page.renderPage(renderCompArr, this.props)}
        <Button onClick={() => this.collectPageData()}>搜集页面所有数据</Button>
      </div>
    );
  }
}

export default EditOrCreatePage;
