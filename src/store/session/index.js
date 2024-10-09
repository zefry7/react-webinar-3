import StoreModule from '../module';
import simplifyErrors from '../../utils/simplify-errors';

/**
 * Сессия
 */
class SessionState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: null,
      errors: null,
      waiting: true,
      exists: false,
    };
  }

  /**
   * Авторизация (вход)
   * @param data
   * @param onSuccess
   * @returns {Promise<void>}
   */
  async signIn(data, onSuccess) {
    this.setState(this.initState(), 'Авторизация');
    try {
      const res = await this.services.api.request({
        url: '/api/v1/users/sign',
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!res.data.error) {
        this.setState(
          {
            ...this.getState(),
            token: res.data.result.token,
            user: res.data.result.user,
            exists: true,
            waiting: false,
          },
          'Успешная авторизация',
        );

        // Запоминаем токен, чтобы потом автоматически аутентифицировать юзера
        window.localStorage.setItem('token', res.data.result.token);

        // Устанавливаем токен в АПИ
        this.services.api.setHeader(this.config.tokenHeader, res.data.result.token);

        if (onSuccess) onSuccess();
      } else {
        this.setState(
          {
            ...this.getState(),
            errors: simplifyErrors(res.data.error.data.issues),
            waiting: false,
          },
          'Ошибка авторизации',
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Отмена авторизации (выход)
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      await this.services.api.request({
        url: '/api/v1/users/sign',
        method: 'DELETE',
      });
      // Удаляем токен
      window.localStorage.removeItem('token');
      // Удаляем заголовок
      this.services.api.setHeader(this.config.tokenHeader, null);
    } catch (error) {
      console.error(error);
    }
    this.setState({ ...this.initState(), waiting: false });
  }

  /**
   * По токену восстановление сессии
   * @return {Promise<void>}
   */
  async remind() {
    const token = localStorage.getItem('token');
    if (token) {
      // Устанавливаем токен в АПИ
      this.services.api.setHeader(this.config.tokenHeader, token);
      // Проверяем токен выбором своего профиля
      const res = await this.services.api.request({ url: '/api/v1/users/self' });

      if (res.data.error) {
        // Удаляем плохой токен
        window.localStorage.removeItem('token');
        this.services.api.setHeader(this.config.tokenHeader, null);
        this.setState(
          {
            ...this.getState(),
            exists: false,
            waiting: false,
          },
          'Сессии нет',
        );
      } else {
        this.setState(
          {
            ...this.getState(),
            token: token,
            user: res.data.result,
            exists: true,
            waiting: false,
          },
          'Успешно вспомнили сессию',
        );
      }
    } else {
      // Если токена не было, то сбрасываем ожидание (так как по умолчанию true)
      this.setState(
        {
          ...this.getState(),
          exists: false,
          waiting: false,
        },
        'Сессии нет',
      );
    }
  }

  /**
   * Сброс ошибок авторизации
   */
  resetErrors() {
    this.setState({ ...this.initState(), errors: null });
  }
}

export default SessionState;
