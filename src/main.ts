import { createService } from './service/create-service';
import { getModels } from './model/create-models';
import { getPageElements } from './page-elements';
// import InfoPresenter from '@presenter/info';
import FilterPresenter from './presenter/filter';
import ListPresenter from '../src/presenter/list';


const start = async () => {
  const elements = getPageElements();
  const service = createService();
  const models = getModels(service);

  // const info = new InfoPresenter({container: elements.header as HTMLElement, models });
  const filter = new FilterPresenter({container: elements.filters as HTMLElement, models});
  const list = new ListPresenter({ container: elements.events!, models, addButton: elements.add});


  filter.init();
  list.init();
};
start();
