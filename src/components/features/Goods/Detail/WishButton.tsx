import styled from '@emotion/styled';

import { HeartIcon } from '@/components/common/Icons/HeartIcon';

type Props = {
  onClick: () => void;
};

export const WishButton = ({ onClick }: Props) => (
  <StyledWishButton onClick={onClick}>
    <HeartIcon width={160} height={20} />
    위시리스트에 추가
  </StyledWishButton>
);

const StyledWishButton = styled.button`
  margin-bottom: 30px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;

  &:hover {
    background-color: #e0e0e0;
  }
`;
