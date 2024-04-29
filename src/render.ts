/* eslint-disable @typescript-eslint/no-explicit-any */
function createElement<E extends Element>(template: string) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild as E;
}

function render(component: any, container:any, place: InsertPosition = 'beforeend') {
  container.insertAdjacentElement(place, component.element);
}

export { createElement, render };
