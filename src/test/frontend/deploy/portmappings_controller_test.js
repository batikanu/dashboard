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

import deployModule from 'deploy/deploy_module';
import PortMappingsController from 'deploy/portmappings_controller';

describe('PortMappingsController controller', () => {
  /** @type {!PortMappingsController} */
  let ctrl;

  beforeEach(() => {
    angular.mock.module(deployModule.name);

    angular.mock.inject(($controller) => {
      ctrl = $controller(PortMappingsController, undefined, {protocols: ['FOO', 'BAR']});
    });
  });

  it('should initialize first value', () => {
    expect(ctrl.portMappings).toEqual([{port: null, targetPort: null, protocol: 'FOO'}]);
  });

  it('should add new mappings when needed', () => {
    expect(ctrl.portMappings.length).toBe(1);
    let index = 0;
    ctrl.addOrRemoveProtocolIfNeeded(index);
    expect(ctrl.portMappings.length).toBe(1);

    ctrl.portMappings[index].port = 80;
    ctrl.portMappings[index].targetPort = 8080;

    ctrl.addOrRemoveProtocolIfNeeded(index);
    expect(ctrl.portMappings.length).toBe(2);
  });

  it('should determine removability', () => {
    let index = 0;
    expect(ctrl.isRemovable(index)).toBe(false);
    ctrl.portMappings[index].port = 80;
    ctrl.portMappings[index].targetPort = 8080;
    ctrl.addOrRemoveProtocolIfNeeded(index);
    expect(ctrl.isRemovable(index)).toBe(true);
  });

  it('should remove port mappings', () => {
    let index = 0;
    ctrl.portMappings[index].port = 80;
    ctrl.portMappings[index].targetPort = 8080;
    ctrl.addOrRemoveProtocolIfNeeded(index);
    expect(ctrl.portMappings.length).toBe(2);
    ctrl.remove(index);
    expect(ctrl.portMappings.length).toBe(1);
    expect(ctrl.portMappings[index].port).toBeNull();
  });

  it('should remove port mappings if they are empty', () => {
    let index = 0;
    ctrl.portMappings[index].port = 80;
    ctrl.portMappings[index].targetPort = 8080;
    ctrl.addOrRemoveProtocolIfNeeded(index);
    // first one port mapping should be added
    expect(ctrl.portMappings.length).toBe(2);
    ctrl.portMappings[index].port = '';
    ctrl.portMappings[index].targetPort = '';
    // then it should be removed
    ctrl.addOrRemoveProtocolIfNeeded(index);
    expect(ctrl.portMappings.length).toBe(1);
  });
});
