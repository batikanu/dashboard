// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import chromeModule from 'chrome/chrome_module';
import componentsModule from 'common/components/components_module';
import filtersModule from 'common/filters/filters_module';
import namespaceModule from 'common/namespace/namespace_module';
import resourceQuotaDetailModule from 'resourcequotadetail/resourcequotadetail_module';

import {resourceQuotaCardComponent} from './resourcequotacard_component';
import {resourceQuotaCardListComponent} from './resourcequotacardlist_component';
import stateConfig from './resourcequotalist_stateconfig';


/**
 * Angular module for the Resource Quota list view.
 */
export default angular
    .module(
        'kubernetesDashboard.resourceQuotaList',
        [
          'ngMaterial',
          'ngResource',
          'ui.router',
          filtersModule.name,
          componentsModule.name,
          resourceQuotaDetailModule.name,
          chromeModule.name,
          namespaceModule.name,
        ])
    .config(stateConfig)
    .component('kdResourceQuotaCardList', resourceQuotaCardListComponent)
    .component('kdResourceQuotaCard', resourceQuotaCardComponent)
    .factory('kdResourceQuotaListResource', resourceQuotaListResource);

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
function resourceQuotaListResource($resource) {
  return $resource('api/v1/resourcequota/:namespace');
}
