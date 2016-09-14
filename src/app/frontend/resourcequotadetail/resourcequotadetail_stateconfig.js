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

import {actionbarViewName, stateName as chromeStateName} from 'chrome/chrome_state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_service';
import {appendDetailParamsToUrl} from 'common/resource/resourcedetail';
import {stateName as resourceQuotaList, stateUrl} from 'resourcequotalist/resourcequotalist_state';

import {ActionBarController} from './actionbar_controller';
import {ResourceQuotaDetailController} from './resourcequotadetail_controller';
import {stateName} from './resourcequotadetail_state';

/**
 * Configures states for the resource quota details view.
 *
 * @param {!ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
export default function stateConfig($stateProvider) {
  $stateProvider.state(stateName, {
    url: appendDetailParamsToUrl(stateUrl),
    parent: chromeStateName,
    resolve: {
      'resourceQuotaDetailResource': getResourceQuotaDetailResource,
      'resourceQuotaDetail': getResourceQuotaDetail,
    },
    data: {
      [breadcrumbsConfig]: {
        'label': '{{$stateParams.objectName}}',
        'parent': resourceQuotaList,
      },
    },
    views: {
      '': {
        controller: ResourceQuotaDetailController,
        controllerAs: '$ctrl',
        templateUrl: 'resourcequotadetail/resourcequotadetail.html',
      },
      [actionbarViewName]: {
        controller: ActionBarController,
        controllerAs: '$ctrl',
        templateUrl: 'resourcequotadetail/actionbar.html',
      },
    },
  });
}

/**
 * @param {!./../common/resource/resourcedetail.StateParams} $stateParams
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource<!backendApi.ResourceQuotaDetail>}
 * @ngInject
 */
export function getResourceQuotaDetailResource($resource, $stateParams) {
  return $resource(
      `api/v1/resourcequota/${$stateParams.objectNamespace}/${$stateParams.objectName}`);
}

/**
 * @param {!angular.Resource<!backendApi.ResourceQuotaDetail>} resourceQuotaDetailResource
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function getResourceQuotaDetail(resourceQuotaDetailResource) {
  return resourceQuotaDetailResource.get().$promise;
}
