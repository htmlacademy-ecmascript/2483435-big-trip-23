import type { AppPicture } from '../../types/destination-type';

const getTemplate = (pictures: AppPicture[]) =>
  pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

const createPicturesTemplate = (pictures: AppPicture[]) =>
  pictures.length !== 0
    ? `
      <div class="event__photos-container">
          <div class="event__photos-tape">
          ${getTemplate(pictures)}
          </div>
        </div>
        `
    : '';

export { createPicturesTemplate };
