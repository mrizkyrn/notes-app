import { Button, IconButton, ButtonProps } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

interface AddButtonProps extends ButtonProps {
  onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick, ...props }) => {
  return (
    <Button
      colorScheme="teal"
      variant="outline"
      _hover={{
        bg: 'teal.500',
        color: 'white',
      }}
      onClick={onClick}
      {...props}
    >
      Tambah
    </Button>
  );
};

interface CreateButtonProps extends ButtonProps {
  isSubmitting?: boolean;
}

export const CreateButton: React.FC<CreateButtonProps> = ({ isSubmitting, ...props }) => {
  return (
    <Button colorScheme="teal" type="submit" isLoading={isSubmitting} {...props}>
      Buat Catatan
    </Button>
  );
};

interface BackButtonProps extends ButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      aria-label="Go back"
      icon={<ChevronLeftIcon boxSize={{ base: 8, md: 10 }} />}
      onClick={onClick}
      variant="ghost"
      cursor="pointer"
    />
  );
};
