import { createService } from './service/create-service';
import { getModels } from './model/create-models';
import MainPresenter from './presenter/main';


const start = async () => {
  const service = createService();
  const models = getModels(service);
  const mainPresenter = new MainPresenter({service, models});

  mainPresenter.init();
};

start();
