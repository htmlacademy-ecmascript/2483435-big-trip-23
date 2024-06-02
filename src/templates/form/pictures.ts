import type { Models } from '../../model/create-models';
import type { AppPicture } from '../../types/destination-type';

const getTemplate = (pictures: AppPicture[]) =>
  pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const createPicturesTemplate = (destination: string, models: Models) => {
  if (destination !== '') {
    const pictures = models.destinationsModel.getDestinationByID(destination)?.pictures;

    if (pictures) {
      return pictures.length !== 0
        ? `
        <div class="event__photos-container">
            <div class="event__photos-tape">
            ${getTemplate(pictures)}
            </div>
          </div>
          `
        : '';
    } else {
      throw new Error('Pictures is not found');
    }
  } else {
    return '';
  }
};

export { createPicturesTemplate };
