"use client";

import * as React from "react";
import ReactMapGL from "@goongmaps/goong-map-react";
import "@goongmaps/goong-js/dist/goong-js.css";

export default function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 16.26566,
    longitude: 105.71366,
    zoom: 12,
  });


  return (
    <div className="w-screen h-screen">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        
        mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
        goongApiAccessToken="bSRWNuVyXVNDD0FvVOYhBSAbVt3PioUobBTOmicV"
        onViewportChange={(viewport: any) => setViewport(viewport)}
      />
    </div>
  );
}
