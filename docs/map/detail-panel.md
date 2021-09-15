# DetailPanel
#### `src/pages/MapPage/components/DetailPanel/DetailPanel.tsx`

The `DetailPanel` is a primary component inside the MapPanel component responsible for displaying 'Data detail' pages.

It follows the route pattern `/data/:type/:subtype/:id/`, for example: `/data/brk/subject/:id`, where the type is `BRK` and the subtype `subject`; these often correspond with an API endpoint.

Each `:type/:subject` should correspond to an endpoint defined in the `src/pages/MapPage/legacy/servies/map-services.config.ts`. In the example `/data/brk/subject/:id` we match with the `src/pages/MapPage/legacy/services/map-services-configurations/kadastraalSubject.ts` endpoint (`brk/subject`). Legacy service configurations are defined in the `map-services.config.ts` file than via an import; we try to define service configurations outside now for cleaner and more organized code.

The `DetailPanel` component renders a child component `RenderDetails.tsx`, which loops through the items defined in the `kadastraalSubject.ts` service configuration. Each of these items is rendered via `src/pages/MapPage/components/DetailPanel/DetailItem.tsx`, which expects an item type that defines which component to use.

This item type is defined in the service configuration along with component props and a `toView` function, which is useful for normalizing items with child items. These Item components consist of:
- DefinitionList
- Table
- DetailLinkList - A list where each item is a link
- SplitListData - A list with a 'Show more'/'Show less' toggle link
- PaginatedData - A list with [CompactPager](https://amsterdam.github.io/amsterdam-styled-components/?path=/docs/ui-compactpager--default-story)
- GroupedItems - Items can also contain child Items, which correspond to another Item type
- Image
- BulletList

A `DetailPanel` also often consists of a header component with a title and description.
