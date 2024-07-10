import { http } from './index';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return http.post(`/api/login`, {
    data: { name: '123' },
  });
}