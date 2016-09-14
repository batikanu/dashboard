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
 * Controller for resource quota card list.
 *
 * @final
 */
export class ResourceQuotaCardListController {
  /**
   * @param {!./../common/namespace/namespace_service.NamespaceService} kdNamespaceService
   * @ngInject
   */
  constructor(kdNamespaceService) {
    /** @private {!./../common/namespace/namespace_service.NamespaceService} */
    this.kdNamespaceService_ = kdNamespaceService;

    /** @export */
    this.i18n = i18n;
  }

  /**
   * @return {boolean}
   * @export
   */
  areMultipleNamespacesSelected() {
    return this.kdNamespaceService_.areMultipleNamespacesSelected();
  }
}

/**
 * @return {!angular.Component}
 */
export const resourceQuotaCardListComponent = {
  transclude: true,
  controller: ResourceQuotaCardListController,
  bindings: {
    'resourceQuotaList': '<',
    'resourceQuotaListResource': '<',
  },
  templateUrl: 'resourcequotalist/resourcequotacardlist.html',
};

const i18n = {
  /** @export {string} @desc Resource quota list header: name. */
  MSG_RESOURCE_QUOTA_LIST_HEADER_NAME: goog.getMsg('Name'),
  /** @export {string} @desc Resource quota list header: namespace. */
  MSG_RESOURCE_QUOTA_LIST_NAMESPACE_LABEL: goog.getMsg('Namespace'),
  /** @export {string} @desc Resource quota list header: labels. */
  MSG_RESOURCE_QUOTA_LIST_HEADER_LABELS: goog.getMsg('Labels'),
  /** @export {string} @desc Resource quota list header: age. */
  MSG_RESOURCE_QUOTA_LIST_HEADER_AGE: goog.getMsg('Age'),
};
