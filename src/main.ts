/*!
 * @author: Yuto Watanabe
 * @version: 1.0.0
 *
 * Copyright (c) 2020 Earthquake alert
 */

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

import * as control from "ol/control";
import * as Format from "ol/format";
import * as Layer from "ol/layer";
import { fromLonLat } from "ol/proj";
import * as Source from "ol/source";

import { Style, Stroke, Fill } from "ol/style";

// 地図データ
const attribution = new control.Attribution({
  className: "copyright",
  collapsible: false,
});

// 都道府県のマップ
const prefMap = new Layer.VectorTile({
  source: new Source.VectorTile({
    format: new Format.MVT(),
    url:
      "https://earthquake-alert.github.io/maps/pbf_japan/pref_jma/{z}/{x}/{y}.pbf",
    attributions: [
      "Copyright(c) 2020 Earthquake alert / 地図データ: 国土数値情報(湖沼データ), 気象庁(地震情報/細分区域, 緊急地震速報/府県予報区)",
    ],
  }),
  style: new Style({
    stroke: new Stroke({
      color: "5b626e",
      width: 3,
    }),
  }),
  maxZoom: 10,
  minZoom: 0,
  maxResolution: 5000,
});

// 水域マップ
const waterAreaMap = new Layer.VectorTile({
  source: new Source.VectorTile({
    format: new Format.MVT(),
    url:
      "https://earthquake-alert.github.io/maps/pbf_water_area/waterArea/{z}/{x}/{y}.pbf",
  }),
  style: new Style({
    fill: new Fill({
      color: "5b626e",
    }),
  }),
  maxZoom: 10,
  minZoom: 0,
  maxResolution: 5000,
});

// 世界のマップ
const worldMap = new Layer.VectorTile({
  source: new Source.VectorTile({
    format: new Format.MVT(),
    url:
      "https://earthquake-alert.github.io/maps/pbf_world/world/{z}/{x}/{y}.pbf",
    attributions: [
      "Copyright(c) 2020 Earthquake alert / 地図データ: Natural Earth",
    ],
  }),
  style: new Style({
    fill: new Fill({
      color: "5b626e",
    }),
    stroke: new Stroke({
      color: "5b626e",
      width: 2,
    }),
  }),
  maxZoom: 5,
  minZoom: 0,
  minResolution: 5000,
});

// マップ描画
const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([35.362222, 138.731388]),
    zoom: 5,
    maxZoom: 10,
  }),
  layers: [
    worldMap,
    waterAreaMap,
    prefMap,
  ],
});
