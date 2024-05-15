const POINTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'] as const;

const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'] as const;
const FILTER_TYPES = ['everything', 'future', 'present', 'past'] as const;
type FilterType = (typeof FILTER_TYPES)[number];
type SortType = (typeof SORT_TYPES)[number];

const WaypointsEmptyMessages = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  present: 'There are no present events now',
  past: 'There are no past events now',
} as const satisfies Record<FilterType, string>;

export { POINTS_TYPES, SORT_TYPES, FilterType, WaypointsEmptyMessages, FILTER_TYPES, SortType };
