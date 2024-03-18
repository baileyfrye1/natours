/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmFpbGV5ZnJ5ZSIsImEiOiJjbHN6cW0yMHcwcm5yMmlyb3c0MDV6ZGM3In0.36rwlbcjSkgvaSWe6p9rYg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/baileyfrye/clszqs88z01jq01p6d1op75tr',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Add marker
    const el = document.createElement('div');
    el.classList.add('marker');

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 30 }).setHTML(
          `<p>Day ${loc.day}: ${loc.description}</p>`,
        ),
      )
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
