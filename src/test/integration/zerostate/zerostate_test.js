// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import PageObject from './zerostate_po';

describe('Zero state view', () => {
  /** @type {!PageObject} */
  let page;

  beforeEach(() => {
    /**
     * This will be valid when cluster is empty as zerostate is child of
     * replicationcontrollers state and is shown only where there are no RCs to display.
     */
    browser.get('#/replicationcontrollers');
    page = new PageObject();
  });

  it('should do something', () => { expect(page.deployButton.getText()).toContain('DEPLOY'); });
});
