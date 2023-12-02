"use client";

import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
import MapGL from "@goongmaps/goong-map-react";

const GOONG_MAPTILES_KEY = "1bq6oz96Inqc2vCctL8lSHK9I2jQdeJ25WgB3p9A"; // Set your goong maptiles key here

export default function Mapa() {
  return (
    <MapGL
      viewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0,
      }}
      width="100vw"
      height="100vh"
      mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
      //   onViewportChange={(viewport: any) => this.setState({ viewport })}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
    />
  );
}
