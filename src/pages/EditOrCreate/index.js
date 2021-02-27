import React, { Component } from "react";

import { solveSearchToObj } from "../../util/index";
import { EditOrCreateHoc } from "../../Hoc/EditOrCreateHoc";
import "./index.less";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
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

  render() {
    const { canRender, pageData = {} } = this.state;
    const { page } = this.props;
    const renderCompArr = Object.keys(pageData).map((compName) => {
      return {
        compName,
        initData: { ...(pageData[compName] || {}) },
      };
    });
    return (
      <div className="page-comp-container">
        {page.renderPage(renderCompArr, this.props)}
      </div>
    );
  }
}

export default EditOrCreatePage;
