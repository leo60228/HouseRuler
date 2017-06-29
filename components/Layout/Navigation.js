/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    editing: state.editing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeMode: id => {
      dispatch({
        type: 'CHANGE_MODE'
      })
    }
  }
}

class Navigation extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <nav className="mdl-navigation" ref={node => (this.root = node)}>
        <span className="mdl-navigation__link" onClick={this.props.changeMode}>{this.props.editing ? "💾 Save" : "✎ Edit"}</span>
        <Link className="mdl-navigation__link" to="/">Home</Link>
        <Link className="mdl-navigation__link" to="/about">About</Link>
      </nav>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
