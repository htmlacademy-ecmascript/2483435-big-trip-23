export const getPageElements = () => {
  const header = document.querySelector('.trip-main');
  const filters = header?.querySelector('.trip-controls__filters');
  const events = document.querySelector<HTMLTableSectionElement>('.trip-events');

  return {
    header,
    filters,
    events,
  };
};
