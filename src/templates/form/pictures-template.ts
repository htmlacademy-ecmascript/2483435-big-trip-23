import type { DataBase } from '@presenter/main-presenter';
import type { AppPicture } from '../../types/destination-type';

const getTemplate = (pictures: AppPicture[]) =>
  pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const createPicturesTemplate = (destination: string, dataBase: DataBase) => {
  if (destination !== '') {
    const pictures = dataBase.destinationsModel.getDestinationByID(destination)!.pictures;

    return pictures!.length !== 0
      ? `
      <div class="event__photos-container">
          <div class="event__photos-tape">
          ${getTemplate(pictures)}
          </div>
        </div>
        `
      : '';
  } else {
    return '';
  }
};

export { createPicturesTemplate };
