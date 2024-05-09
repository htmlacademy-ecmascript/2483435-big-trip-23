import type View from './framework/view/_abstract';

function createElement<E extends Element>(template: string) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild as E;
}

function render(component: View<Element>, container: Element, place: InsertPosition = 'beforeend') {
  container.insertAdjacentElement(place, component.element);
}

export { createElement, render };
