import View from '../view/_abstract';

function createElement<El extends Element = HTMLDivElement>(template: string) {
  const newElement = document.createElement('template');
  newElement.innerHTML = template;

  return newElement.content.firstElementChild as El;
}

function render(component: View<Element>, container: HTMLElement, place: InsertPosition = 'beforeend') {
  if (!(component instanceof View)) {
    throw new Error('Can render only components');
  }

  if (container === null) {
    throw new Error('Container element doesn\'t exist');
  }

  container.insertAdjacentElement(place, component.element);
}

function replace(newComponent: View<Element>, oldComponent: View<Element>) {
  const newElement = newComponent.element;
  const oldElement = oldComponent.element;

  const parent = oldElement.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newElement, oldElement);
}

function remove(component: View<Element> | null) {
  if (component === null) {
    return;
  }

  component.element.remove();
  component.removeElement();
}

export { createElement, render, replace, remove };
