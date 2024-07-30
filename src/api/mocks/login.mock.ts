import { rest } from 'msw';

import type { LoginResponse } from '@/types';

// 가짜 사용자 데이터
const fakeUsers = [
  { email: 'test@example.com', password: 'password123' },
  { email: 'user@example.com', password: 'userpass' },
];

// 로그인 성공 응답
const loginSuccessResponse: LoginResponse = {
  email: 'test@example.com', // 예시 이메일 추가
  token: 'fake-jwt-token',
};

// 로그인 API 모킹
const loginHandler = rest.get('/login', (req, res, ctx) => {
  const authCode = req.url.searchParams.get('code');

  if (authCode) {
    return res(ctx.status(200), ctx.json(loginSuccessResponse));
  } else {
    return res(ctx.status(401), ctx.json({ message: '인증에 실패했습니다.' }));
  }
});

// 인증 코드 발급 API 모킹 (필요한 경우)
const getAuthCodeHandler = rest.post('/auth/code', (req, res, ctx) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = fakeUsers.find(u => u.email === email && u.password === password);

  if (user) {
    return res(ctx.status(200), ctx.json({ authCode: 'fake-auth-code' }));
  } else {
    return res(ctx.status(401), ctx.json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' }));
  }
});

export const loginMockHandler = [loginHandler, getAuthCodeHandler];