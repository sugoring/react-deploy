import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProductDataQuery } from '@/api/hooks/useProductDetail';
import { useProductOptionsQuery } from '@/api/hooks/useProductOptions';
import { useAddWishMutation } from '@/api/hooks/useWishlist';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import type { ProductId } from '@/types';
import { orderHistorySessionStorage } from '@/utils/storage';

import { PriceDisplay } from './PriceDisplay';
import { ProductOptionSelector } from './ProductOptionSelector';
import { WishButton } from './WishButton';

export const OptionSection = ({ productId }: { productId: ProductId }) => {
  const { data: detail, error: detailError } = useProductDataQuery({ productId });
  const { data: options, error: optionsError } = useProductOptionsQuery({ productId });

  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [countAsString, setCountAsString] = useState('1');

  const totalPrice = useMemo(() => {
    const price = detail?.price ?? 0;
    return price * Number(countAsString);
  }, [detail?.price, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();
  const addWishMutation = useAddWishMutation();

  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    if (!selectedOptionId) {
      alert('옵션을 선택해주세요.');
      return;
    }

    orderHistorySessionStorage.set({
      id: productId,
      optionId: selectedOptionId,
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  const handleWishClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    addWishMutation.mutate(productId, {
      onSuccess: () => {
        alert('위시리스트에 추가되었습니다.');
      },
      onError: () => {
        alert('위시리스트 추가에 실패했습니다.');
      },
    });
  };

  if (!detail || !options) {
    return <div>Loading...</div>;
  }

  if (optionsError || detailError) {
    return <div>Error loading product details or options.</div>;
  }

  return (
    <Wrapper>
      <ProductOptionSelector
        options={options}
        selectedOptionId={selectedOptionId}
        setSelectedOptionId={setSelectedOptionId}
        countAsString={countAsString}
        setCountAsString={setCountAsString}
      />
      <BottomWrapper>
        <PriceDisplay totalPrice={totalPrice} />
        <WishButton onClick={handleWishClick} />
        <Button theme="black" size="large" onClick={handleClick} disabled={!selectedOptionId}>
          나에게 선물하기
        </Button>
      </BottomWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomWrapper = styled.div`
  padding: 12px 0 0;
`;
