import styled from '@emotion/styled';

type Props = {
  radius?: 'circle' | number;
  ratio?: 'square' | 'auto' | number;
  src?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const placeholderImage =
  'https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/301453629_3260834694189455_3199879905866569730_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=p1lI8X0Ap68Q7kNvgFvI0rj&_nc_ht=scontent-ssn1-1.xx&oh=00_AYB59AXIrhyCD8h-MbUbi8Z0yEOn3puuWsG_5rONEc7uog&oe=66B2833E';

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
