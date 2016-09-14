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
import resourceQuotaListModule from 'resourcequotalist/resourcequotalist_module';

describe('Resource Quota card', () => {
  /** @type {!resourcequotalist/resourcequotacard_component.ResourceQuotaCardController} */
  let ctrl;

  beforeEach(() => {
    angular.mock.module(resourceQuotaListModule.name);

    angular.mock.inject(($componentController, $rootScope) => {
      ctrl = $componentController('kdResourceQuotaCard', {$scope: $rootScope});
    });
  });

  it('should get details href', () => {
    ctrl.resourceQuota = {
      objectMeta: {
        namespace: 'foo',
        name: 'bar',
      },
    };
    expect(ctrl.getResourceQuotaDetailHref()).toBe('#/resourcequota/foo/bar');
  });

  it('should format the "created at" tooltip correctly', () => {
    expect(ctrl.getCreatedAtTooltip('2016-06-06T09:13:12Z')).toMatch('Created at 6/6/16.*');
  });
});
