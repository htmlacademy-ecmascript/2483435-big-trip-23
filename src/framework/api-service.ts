export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Config extends Pick<RequestInit, 'body'> {
  /* Адрес относительно сервера */
  url: string;
  /** Метод запроса */
  method?: FetchMethod;
  /** Заголовки запроса */
  headers?: Headers;
}

/**
 * Класс для отправки запросов к серверу
 */
export default class ApiService {
  /**
   *
   * @param _endPoint Адрес сервера
   * @param _authorization Авторизационный токен
   */
  constructor(
    private _endPoint: string,
    private _authorization: string,
  ) {}

  /**
   * Метод для отправки запроса к серверу
   */
  async _load({ url, method = 'GET', body = null, headers = new Headers() }: Config) {
    headers.append('Authorization', this._authorization);

    const response = await fetch(`${this._endPoint}/${url}`, { method, body, headers });

    ApiService.checkStatus(response);
    return response;
  }

  /**
   * Метод для обработки ответа
   * @param response Объект ответа

   */
  static parseResponse<T = unknown>(response: Response): Promise<T> {
    return response.json();
  }

  /**
   * Метод для проверки ответа
   * @param response Объект ответа
   */
  static checkStatus(response: Response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
