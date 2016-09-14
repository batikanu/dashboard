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

import {StateParams} from 'common/resource/resourcedetail';
import {stateName} from 'resourcequotadetail/resourcequotadetail_state';

/**
 * Controller for the resource quota card.
 *
 * @final
 */
export default class ResourceQuotaCardController {
  /**
   * @param {!ui.router.$state} $state
   * @param {!angular.$interpolate} $interpolate
   * @param {!./../common/namespace/namespace_service.NamespaceService} kdNamespaceService
   * @ngInject
   */
  constructor($state, $interpolate, kdNamespaceService) {
    /**
     * Initialized from the scope.
     * @export {!backendApi.ResourceQuota}
     */
    this.resourceQuota;

    /** @private {!ui.router.$state} */
    this.state_ = $state;

    /** @private */
    this.interpolate_ = $interpolate;

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

  /**
   * @return {string}
   * @export
   */
  getResourceQuotaDetailHref() {
    return this.state_.href(
        stateName,
        new StateParams(
            this.resourceQuota.objectMeta.namespace, this.resourceQuota.objectMeta.name));
  }

  /**
   * @export
   * @param  {string} creationDate - creation date of the resource quota
   * @return {string} localized tooltip with the formated creation date
   */
  getCreatedAtTooltip(creationDate) {
    let filter = this.interpolate_(`{{date | date:'short'}}`);
    /** @type {string} @desc Tooltip 'Created at [some date]' showing the exact creation time of
     * resource quota. */
    let MSG_RESOURCE_QUOTA_LIST_CREATED_AT_TOOLTIP =
        goog.getMsg('Created at {$creationDate}', {'creationDate': filter({'date': creationDate})});
    return MSG_RESOURCE_QUOTA_LIST_CREATED_AT_TOOLTIP;
  }
}

/**
 * @return {!angular.Component}
 */
export const resourceQuotaCardComponent = {
  bindings: {
    'resourceQuota': '=',
  },
  controller: ResourceQuotaCardController,
  templateUrl: 'resourcequotalist/resourcequotacard.html',
};

const i18n = {
  /** @export {string} @desc Label 'Resource Quota' which will appear in the resource quota
   delete dialog opened from a resource quota card on the list page. */
  MSG_RESOURCE_QUOTA_LIST_RESOURCE_QUOTA_LABEL: goog.getMsg('Resource Quota'),
};
