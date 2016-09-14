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

import {stateName as chromeStateName} from 'chrome/chrome_state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_service';

import {ResourceQuotaListController} from './resourcequotalist_controller';
import {stateName, stateUrl} from './resourcequotalist_state';

/**
 * Configures states for the resource quota list view.
 *
 * @param {!ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
export default function stateConfig($stateProvider) {
  $stateProvider.state(stateName, {
    url: stateUrl,
    parent: chromeStateName,
    resolve: {
      'resourceQuotaList': resolveResourceQuotaList,
    },
    data: {
      [breadcrumbsConfig]: {
        'label': i18n.MSG_BREADCRUMBS_RESOURCE_QUOTAS_LABEL,
      },
    },
    views: {
      '': {
        controller: ResourceQuotaListController,
        controllerAs: '$ctrl',
        templateUrl: 'resourcequotalist/resourcequotalist.html',
      },
    },
  });
}

/**
 * @param {!angular.Resource} kdResourceQuotaListResource
 * @param {!./../chrome/chrome_state.StateParams} $stateParams
 * @param {!./../common/pagination/pagination_service.PaginationService} kdPaginationService
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolveResourceQuotaList(
    kdResourceQuotaListResource, $stateParams, kdPaginationService) {
  let query = kdPaginationService.getDefaultResourceQuery($stateParams.namespace);
  return kdResourceQuotaListResource.get(query).$promise;
}

const i18n = {
  /** @type {string} @desc Label 'Resource Quotas' that appears as a breadcrumbs on the action
   bar. */
  MSG_BREADCRUMBS_RESOURCE_QUOTAS_LABEL: goog.getMsg('Resource Quotas'),
};
