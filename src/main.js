import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ boardContainer: siteMainElement });

boardPresenter.init();
