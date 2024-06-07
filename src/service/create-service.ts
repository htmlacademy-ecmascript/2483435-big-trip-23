import PointsApiService from './point-api-service';

const enum Setting {
  AUTHORIZATION = 'Basic YQpmc1BozkUB3Krfr[0',
  END_POINT = 'https://23.objects.htmlacademy.pro/big-trip',
}

export const createService = () => new PointsApiService(Setting.END_POINT, Setting.AUTHORIZATION);
