// src/pages/Register/index.tsx
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '@/api/hooks/useRegister';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { LoginResponse } from '@/types';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const onRegisterSuccess = useCallback(
    (_data: LoginResponse) => {
      navigate(RouterPath.home);
    },
    [navigate],
  );

  const {
    mutate: register,
    isPending,
    error: registerError,
  } = useRegister({
    onSuccess: onRegisterSuccess,
  });

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    register({ email, password });
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
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
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Spacing height={{ initial: 40, sm: 60 }} />
        <Button onClick={handleRegister} disabled={isPending}>
          {isPending ? '가입 중...' : '회원가입'}
        </Button>
        {registerError && <ErrorMessage>{registerError.message}</ErrorMessage>}
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;
