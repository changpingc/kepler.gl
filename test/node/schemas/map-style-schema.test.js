// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import cloneDeep from 'lodash.clonedeep';
import SchemaManager from 'schemas';
import {InitialState, StateWCustomMapStyle} from 'test/helpers/mock-state';

it('#mapStyleSchema -> v1 -> save load mapStyle', () => {
  const initialState = cloneDeep(InitialState);
  const savedState = SchemaManager.getConfigToSave(initialState);

  // save state
  const msToSave = savedState.config.mapStyle;
  const msLoaded = SchemaManager.parseSavedConfig(savedState).mapStyle;
  
  expect(Object.keys(msToSave))
    .toEqual(
      ['styleType', 'topLayerGroups', 'visibleLayerGroups', 'threeDBuildingColor', 'mapStyles']
    );


  const expectedSaved = {
    styleType: 'dark',
    topLayerGroups: {},
    visibleLayerGroups: {},
    mapStyles: {},
    threeDBuildingColor: [209, 206, 199]
  };

  const expectedLoaded = {
    styleType: 'dark',
    topLayerGroups: {},
    visibleLayerGroups: {},
    threeDBuildingColor: [209, 206, 199]
  };

  expect(msToSave).toEqual(expectedSaved);
  expect(msLoaded).toEqual(expectedLoaded);
});

it('#mapStyleSchema -> v1 -> save load mapStyle with custom style', () => {
  const initialState = cloneDeep(StateWCustomMapStyle);
  const savedState = SchemaManager.getConfigToSave(initialState);

  // save state
  const msToSave = savedState.config.mapStyle;
  const msLoaded = SchemaManager.parseSavedConfig(savedState).mapStyle;

  const expectedSaved = {
    styleType: 'smoothie_the_cat',
    topLayerGroups: {},
    visibleLayerGroups: {
      label: true,
      road: true
    },
    threeDBuildingColor: [1, 2, 3],
    mapStyles: {
      'smoothie_the_cat': {
        id: 'smoothie_the_cat',
        accessToken: 'secret_token',
        label: 'Smoothie the Cat',
        icon: 'data:image/png;base64,xyz',
        custom: true,
        url: 'mapbox://styles/shanhe/smoothie.the.cat'
      }
    }
  };

  expect(msToSave).toEqual(expectedSaved);
  expect(msLoaded).toEqual(expectedSaved);

});