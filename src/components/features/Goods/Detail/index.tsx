import styled from '@emotion/styled';
import { Suspense } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

import { breakpoints } from '@/styles/variants';
import type { ProductId } from '@/types';

import { GoodsDetailHeader } from './components/Header';

const ErrorFallback = ({ error }: FallbackProps) => <div>에러가 발생했습니다: {error.message}</div>;

const LoadingFallback = () => <div>로딩 중...</div>;

export const GoodsDetail = ({ productId }: { productId: ProductId }) => {
  return (
    <Wrapper>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <GoodsDetailHeader productId={productId} />
        </Suspense>
      </ErrorBoundary>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  padding: 16px 16px 60px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 32px 32px 80px;
  }
`;
