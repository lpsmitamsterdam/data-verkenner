# MapPanel
### `src/pages/MapPage/components/MapPanel/MapPanel.tsx`

The `MapPanel` is a primary component inside the MapPage component responsible for displaying content and data related to the current map view. It is also reponsible for rendering the `MapLayersPanel`, which handles the map Legend.

It follows the route patterns:
- `/data/geozoek` - Renders `MapSearchResults`
- `/data/:type/:subtype/:id/` - Various result types - Explained in the [detail-panel.md](detail-panel.md) document
- `/data/bag/addressen/`, `/data/hr/vestigingen`, `/data/brk/kadastrale-objecten/` - Renders `DrawResults`, which itself renders various components depending on the data. This routing endpoint often includes map overlays.
