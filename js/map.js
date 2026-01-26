document.addEventListener("DOMContentLoaded", () => {
  // Leaflet map (minimal + reliable)
  const mapDiv = document.getElementById("map");
  if (mapDiv && typeof L !== "undefined") {
    const lat = 53.3498;
    const lng = -6.2603;

    const map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Custom flag icon
    const flagIcon = L.icon({
      iconUrl: "images/flag.png",
      iconSize: [38, 38], // size of your flag image
      iconAnchor: [19, 38], // bottom center of icon points to location
      popupAnchor: [0, -38], // popup appears above the icon
    });

    // Marker with custom icon
    L.marker([lat, lng], { icon: flagIcon })
      .addTo(map)
      .bindPopup(
        `
        <div class="map-popup">
          <strong>ArtisanHub</strong>
          <br />
          <a
            class="map-address"
            target="_blank"
            rel="noopener"
            href="https://www.google.com/maps?q=12+Artisan+Street,+Dublin,+Ireland"
          >
            12 Artisan Street
            <br />
            Dublin, Ireland
          </a>
        </div>`,
      )
      .openPopup();

    // Force correct rendering
    setTimeout(() => map.invalidateSize(), 0);
    window.addEventListener("load", () => map.invalidateSize());
  }
});
