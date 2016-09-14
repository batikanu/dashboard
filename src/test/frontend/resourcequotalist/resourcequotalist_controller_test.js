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

import {ResourceQuotaListController} from 'resourcequotalist/resourcequotalist_controller';
import resourceQuotaListModule from 'resourcequotalist/resourcequotalist_module';

describe('Resource Quota list controller', () => {
  /** @type {!resourcequotalist/resourcequotalist_controller.ResourceQuotaListController} */
  let ctrl;

  beforeEach(() => {
    angular.mock.module(resourceQuotaListModule.name);

    angular.mock.inject(($controller) => {
      ctrl = $controller(ResourceQuotaListController, {resourceQuotaList: {items: []}});
    });
  });

  it('should initialize resource quota controller', angular.mock.inject(($controller) => {
    let ctrls = {};
    /** @type {!ResourceQuotaListController} */
    let ctrl = $controller(ResourceQuotaListController, {resourceQuotaList: {items: ctrls}});

    expect(ctrl.resourceQuotaList.items).toBe(ctrls);
  }));

  it('should show zero state', () => {
    expect(ctrl.shouldShowZeroState()).toBe(true);
  });

  it('should hide zero state', () => {
    // given
    ctrl.resourceQuotaList = {items: ['mock']};

    // then
    expect(ctrl.shouldShowZeroState()).toBe(false);
  });
});
