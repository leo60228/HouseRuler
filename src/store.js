/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { createStore } from 'redux';

const queryExists = window.location.search !== '';

console.log(queryExists)

// Centralized application state
// For more information visit http://redux.js.org/
const initialState = { editing: !queryExists };

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      console.log('mode changed')
      return { ...state, editing: !(state.editing) };
    default:
      return state;
  }
});

export default store;
