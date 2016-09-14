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

describe('Resource Quota card list', () => {
  /** @type {!resourcequotalist/resourcequotacard_component.ResourceQuotaCardListController} */
  let ctrl;
  /**
   * @type {!./../common/namespace/namespace_service.NamespaceService}
   */
  let data;

  beforeEach(() => {
    angular.mock.module(resourceQuotaListModule.name);

    angular.mock.inject(($componentController, $rootScope, kdNamespaceService) => {
      /** @type {!./../common/namespace/namespace_service.NamespaceService} */
      data = kdNamespaceService;
      /** @type {!ResourceQuotaCardListController} */
      ctrl = $componentController(
          'kdResourceQuotaCardList', {$scope: $rootScope, kdNamespaceService_: data}, {});
    });
  });

  it('should instantiate the controller properly', () => {
    expect(ctrl).not.toBeUndefined();
  });

  it('should return the value from Namespace service', () => {
    expect(ctrl.areMultipleNamespacesSelected()).toBe(data.areMultipleNamespacesSelected());
  });

  it('should init i18n', () => {
    expect(ctrl.i18n).not.toBeUndefined();
  });
});
