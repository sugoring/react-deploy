import { useMemo } from 'react';

import { useCategoriesQuery } from '@/api/hooks/useCategory';
import { getCurrentCategory } from '@/components/features/Category/CategoryHeroSection';

type Props = { categoryId: string };

export const useCurrentCategory = ({ categoryId }: Props) => {
  const { data, isLoading, isError } = useCategoriesQuery();

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data) return false;
    return true;
  }, [data, isLoading, isError]);

  const currentTheme = getCurrentCategory(categoryId, data ?? []);

  return {
    isRender,
    currentTheme,
  };
};