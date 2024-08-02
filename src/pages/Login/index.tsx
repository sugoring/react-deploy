// src/pages/Login/index.tsx
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLogin } from '@/api/hooks/useLogin';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { LoginResponse } from '@/types';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const message = location.state?.successMessage;
    if (message) {
      setSuccessMessage(message);
      navigate(RouterPath.login, { replace: true, state: {} });
    }
  }, [location.state?.successMessage, navigate]);

  const onLoginSuccess = useCallback(
    (_data: LoginResponse) => {
      navigate(RouterPath.home);
    },
    [navigate],
  );

  const {
    mutate: login,
    isPending,
    error: loginError,
  } = useLogin({
    onSuccess: onLoginSuccess,
  });

  const handleConfirm = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    login({ email, password });
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <FormWrapper>
        <UnderlineTextField
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing height={{ initial: 40, sm: 60 }} />
        <Button onClick={handleConfirm} disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
        {loginError && <ErrorMessage>{loginError.message}</ErrorMessage>}
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;

const SuccessMessage = styled.div`
  color: green;
  margin-bottom: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;
