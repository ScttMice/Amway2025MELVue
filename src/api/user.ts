import { http } from './index';


export type LoginData = {
  phone: string,
  phoneCode: number | string
}

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return http.post(`/api/login`, {
    data: { name: '123' },
  });
}