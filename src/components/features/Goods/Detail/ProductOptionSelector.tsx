import { useMemo } from 'react';

import type { ProductOptionsData } from '@/types';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = {
  options: ProductOptionsData[];
  selectedOptionId: number | null;
  setSelectedOptionId: (id: number) => void;
  countAsString: string;
  setCountAsString: (count: string) => void;
};

export const ProductOptionSelector = ({
  options,
  selectedOptionId,
  setSelectedOptionId,
  countAsString,
  setCountAsString,
}: Props) => {
  const selectedOption = useMemo(() => {
    return options.find((option) => option.id === selectedOptionId);
  }, [options, selectedOptionId]);

  return (
    <>
      <select onChange={(e) => setSelectedOptionId(Number(e.target.value))}>
        <option value="">옵션을 선택하세요</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name} (재고: {option.quantity})
          </option>
        ))}
      </select>
      {selectedOption && (
        <CountOptionItem
          name={selectedOption.name}
          value={countAsString}
          onChange={setCountAsString}
          minValues={1}
          maxValues={selectedOption.quantity}
        />
      )}
    </>
  );
};
