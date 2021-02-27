import React, { Component } from "react";
import { solveSearchToObj } from "../../util/index";
import "./index.less";
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
    return <div>EditOrCreatePage</div>;
  }
}

export default EditOrCreatePage;
