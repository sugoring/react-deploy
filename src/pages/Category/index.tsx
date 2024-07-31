import { Navigate, useParams } from 'react-router-dom';

import { CategoryHeroSection } from '@/components/features/Category/CategoryHeroSection';
import { CategoryProductsSection } from '@/components/features/Category/CategoryProductsSection';
import { useCurrentCategory } from '@/hooks/useCurrentCategory';
import { RouterPath } from '@/routes/path';

export const CategoryPage = () => {
  const { categoryId = '' } = useParams<{ categoryId: string }>();
  const { isRender, currentTheme } = useCurrentCategory({ categoryId });

  if (!isRender) return null;

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  if (!categoryId) return null;

  const numericCategoryId = parseInt(categoryId, 10);

  return (
    <>
      <CategoryHeroSection categoryId={categoryId} />
      <CategoryProductsSection categoryId={numericCategoryId} />
    </>
  );
};
