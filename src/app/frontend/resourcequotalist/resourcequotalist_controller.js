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

/**
 * Controller for the resource quota list view.
 *
 * @final
 */
export class ResourceQuotaListController {
  /**
   * @param {!backendApi.ResourceQuotaList} resourceQuotaList
   * @param {!angular.Resource} kdResourceQuotaListResource
   * @ngInject
   */
  constructor(resourceQuotaList, kdResourceQuotaListResource) {
    /** @export {!backendApi.ResourceQuotaList} */
    this.resourceQuotaList = resourceQuotaList;

    /** @export {!angular.Resource} */
    this.resourceQuotaListResource = kdResourceQuotaListResource;
  }

  /**
   * @return {boolean}
   * @export
   */
  shouldShowZeroState() {
    return this.resourceQuotaList.items.length === 0;
  }
}
