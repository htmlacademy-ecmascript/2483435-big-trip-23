import type AbstractView from './view/abstract-view';

function createElement<E extends Element>(template: string) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild as E;
}

function render(component: AbstractView<Element>, container: Element, place: InsertPosition = 'beforeend') {
  container.insertAdjacentElement(place, component.element);
}

function replace(newComponent: AbstractView<Element>, oldComponent: AbstractView<Element>) {
  const newElement = newComponent.element;
  const oldElement = oldComponent.element;

  const parent = oldElement.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newElement, oldElement);
}

function remove(component: AbstractView<Element> | null) {
  if (component === null) {
    return;
  }

  component.element.remove();
  component.removeElement();
}

export { createElement, render, replace, remove };
