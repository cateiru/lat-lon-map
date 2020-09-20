import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

import * as Format from "ol/format";
import * as Layer from "ol/layer";
import { fromLonLat } from "ol/proj";
import * as Source from "ol/source";

import { Style, Stroke, Fill } from "ol/style";

// 都道府県のマップ
const prefMap = new Layer.VectorTile({
  source: new Source.VectorTile({
    format: new Format.MVT(),
    url:
      "https://earthquake-alert.github.io/maps/pbf_japan/pref_jma/{z}/{x}/{y}.pbf",
    attributions: [
      "Copyright(c) 2020 Earthquake alert / 地図データ: 国土数値情報(湖沼データ), 気象庁(緊急地震速報/府県予報区)",
    ],
  }),
  style: new Style({
    stroke: new Stroke({
      color: "#a6a6a6",
      width: 3,
    }),
    fill: new Fill({
      color: "#262626",
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
      color: "#5d7991",
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
      color: "#262626",
    }),
    stroke: new Stroke({
      color: "#a6a6a6",
      width: 2,
    }),
  }),
  maxZoom: 5,
  minZoom: 0,
  minResolution: 5000,
});

const map = new Map({
  target: "map",
  view: new View({
    center: fromLonLat([140.46, 36.37]),
    zoom: 5,
    maxZoom: 10,
  }),
  layers: [
    worldMap,
    prefMap,
    waterAreaMap,
  ],
});
