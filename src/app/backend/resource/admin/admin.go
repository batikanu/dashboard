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

package admin

import (
	"log"

	"github.com/kubernetes/dashboard/src/app/backend/resource/common"
	"github.com/kubernetes/dashboard/src/app/backend/resource/dataselect"
	"github.com/kubernetes/dashboard/src/app/backend/resource/limitrange"
	"github.com/kubernetes/dashboard/src/app/backend/resource/namespace"
	"github.com/kubernetes/dashboard/src/app/backend/resource/node"
	"github.com/kubernetes/dashboard/src/app/backend/resource/persistentvolume"
	k8sClient "k8s.io/kubernetes/pkg/client/unversioned"
)

// Admin structure contains all resource lists grouped into the admin category.
type Admin struct {
	LimitRangeList limitrange.LimitRangeList `json:"limitRangeList"`

	NamespaceList namespace.NamespaceList `json:"namespaceList"`

	NodeList node.NodeList `json:"nodeList"`

	PersistentVolumeList persistentvolume.PersistentVolumeList `json:"persistentVolumeList"`
}

// GetAdmin returns a list of all admin resources in the cluster.
func GetAdmin(client *k8sClient.Client) (*Admin, error) {

	log.Printf("Getting admin category")
	channels := &common.ResourceChannels{
		LimitRangeList:       common.GetLimitRangeListChannel(client, common.NewNamespaceQuery([]string{}), 1),
		NamespaceList:        common.GetNamespaceListChannel(client, 1),
		NodeList:             common.GetNodeListChannel(client, 1),
		PersistentVolumeList: common.GetPersistentVolumeListChannel(client, 1),
	}

	return GetAdminFromChannels(channels)
}

// GetAdminFromChannels returns a list of all admin in the cluster, from the
// channel sources.
func GetAdminFromChannels(channels *common.ResourceChannels) (*Admin, error) {

	lrChan := make(chan *limitrange.LimitRangeList)
	nsChan := make(chan *namespace.NamespaceList)
	nodeChan := make(chan *node.NodeList)
	pvChan := make(chan *persistentvolume.PersistentVolumeList)
	numErrs := 3
	errChan := make(chan error, numErrs)

	go func() {
		items, err := limitrange.GetLimitRangeListFromChannels(channels, dataselect.DefaultDataSelect)
		errChan <- err
		lrChan <- items
	}()

	go func() {
		items, err := namespace.GetNamespaceListFromChannels(channels,
			dataselect.DefaultDataSelect)
		errChan <- err
		nsChan <- items
	}()

	go func() {
		items, err := node.GetNodeListFromChannels(channels, dataselect.DefaultDataSelect, nil)
		errChan <- err
		nodeChan <- items
	}()

	go func() {
		items, err := persistentvolume.GetPersistentVolumeListFromChannels(channels,
			dataselect.DefaultDataSelect)
		errChan <- err
		pvChan <- items
	}()

	for i := 0; i < numErrs; i++ {
		err := <-errChan
		if err != nil {
			return nil, err
		}
	}

	admin := &Admin{
		LimitRangeList:       *(<-lrChan),
		NamespaceList:        *(<-nsChan),
		NodeList:             *(<-nodeChan),
		PersistentVolumeList: *(<-pvChan),
	}

	return admin, nil
}
