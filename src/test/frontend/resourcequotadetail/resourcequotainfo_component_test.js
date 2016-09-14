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

import resourceQuotaDetailModule from 'resourcequotadetail/resourcequotadetail_module';

describe('Resource Quota Info controller', () => {
  /** @type {!ResourceQuotaInfoController} */
  let ctrl;

  beforeEach(() => {
    angular.mock.module(resourceQuotaDetailModule.name);

    angular.mock.inject(($componentController, $rootScope) => {
      ctrl = $componentController('kdResourceQuotaInfo', {$scope: $rootScope}, {
        resourceQuota: {
          statusList: {
            'limits.cpu': {
              'used': '0',
              'hard': '10',
            },
          },
          scopes: ['BestEffort'],
        },
      });
    });
  });

  it('should initialize the ctrl', () => {
    expect(ctrl.i18n).not.toBeUndefined();
  });
});
