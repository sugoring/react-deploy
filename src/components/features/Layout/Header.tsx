import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

const API_URLS = {
  PROXY_1: process.env.REACT_APP_PROXY_1,
  PROXY_2: process.env.REACT_APP_PROXY_2,
  PROXY_3: process.env.REACT_APP_PROXY_3,
};

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const [selectedApi, setSelectedApi] = useState<string>('PROXY_1');

  useEffect(() => {
    const storedApi = localStorage.getItem('selectedApi');
    if (storedApi && API_URLS[storedApi as keyof typeof API_URLS]) {
      setSelectedApi(storedApi);
    }
  }, []);

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newApi = event.target.value;
    setSelectedApi(newApi);
    localStorage.setItem('selectedApi', newApi);
    window.location.reload();
  };

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <Link to={RouterPath.home}>
          <Logo
            src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
            alt="카카오 선물하기 로고"
          />
        </Link>
        <RightWrapper>
          <Select value={selectedApi} onChange={handleApiChange}>
            {Object.keys(API_URLS).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Select>
          {authInfo ? (
            <LinkButton onClick={() => navigate(RouterPath.myAccount)}>내 계정</LinkButton>
          ) : (
            <LinkButton onClick={handleLogin}>로그인</LinkButton>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = '54px';

export const Wrapper = styled.header`
  position: fixed;
  z-index: 9999;
  width: 100%;
  max-width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT};
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  margin-left: 16px;
`;

const Select = styled.select`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`;
