import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

interface WishItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface WishListProps {
  wishes: WishItem[];
  onRemove: (wishId: number) => void;
}

export const WishList: React.FC<WishListProps> = ({ wishes, onRemove }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [selectedWishId, setSelectedWishId] = React.useState<number | null>(null);

  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBorder = useColorModeValue('gray.200', 'gray.700');

  const handleRemoveClick = (wishId: number) => {
    setSelectedWishId(wishId);
    onOpen();
  };

  const handleRemoveConfirm = () => {
    if (selectedWishId !== null) {
      onRemove(selectedWishId);
      toast({
        title: '상품이 위시리스트에서 제거되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {wishes.map((wish) => (
          <Box
            key={wish.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg={cardBg}
            borderColor={cardBorder}
            shadow="md"
            _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
          >
            <Image src={wish.product.imageUrl} alt={wish.product.name} />
            <VStack p={4} align="start" spacing={2}>
              <Text fontWeight="bold" fontSize="lg">
                {wish.product.name}
              </Text>
              <Text fontSize="md" color="gray.500">
                {wish.product.price.toLocaleString()}원
              </Text>
              <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveClick(wish.id)}
              >
                삭제
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              위시리스트 상품 삭제
            </AlertDialogHeader>

            <AlertDialogBody>정말로 이 상품을 위시리스트에서 삭제하시겠습니까?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button colorScheme="red" onClick={handleRemoveConfirm} ml={3}>
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
