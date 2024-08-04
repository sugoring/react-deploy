import styled from '@emotion/styled';

type Props = {
  totalPrice: number;
};

export const PriceDisplay = ({ totalPrice }: Props) => (
  <PricingWrapper>
    총 결제 금액 <span>{totalPrice}원</span>
  </PricingWrapper>
);

const PricingWrapper = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;

  & span {
    font-size: 20px;
    letter-spacing: -0.02em;
  }
`;
