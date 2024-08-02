import styled from '@emotion/styled';

type Props = {
  radius?: 'circle' | number;
  ratio?: 'square' | 'auto' | number;
  src?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const placeholderImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLTbwEGi00FUChLrIEPiavJSDhyLqUIG-1mg&s';

export const Image = ({ src, ...props }: Props) => {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = placeholderImage;
  };

  return <Wrapper src={src || placeholderImage} onError={handleError} {...props} />;
};

const Wrapper = styled.img<Pick<Props, 'ratio' | 'radius'>>(
  {
    objectFit: 'cover',
    objectPosition: 'center',
  },
  ({ radius = 0 }) => {
    if (radius === 'circle') {
      return {
        borderRadius: '50%',
      };
    }

    if (typeof radius === 'number') {
      return {
        borderRadius: `${radius}px`,
      };
    }
  },
  ({ ratio = 'auto' }) => {
    if (ratio === 'square') {
      return {
        aspectRatio: '1 / 1',
      };
    }

    if (ratio === 'auto') {
      return {
        aspectRatio: 'auto',
      };
    }

    if (typeof ratio === 'number') {
      return {
        aspectRatio: `${ratio}`,
      };
    }
  },
);
