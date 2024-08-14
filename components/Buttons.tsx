import { Button, IconButton, ButtonProps } from '@chakra-ui/react';
import { ChevronLeftIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

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

interface SubmitButtonProps extends ButtonProps {
  isSubmitting?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, isSubmitting, ...props }) => {
  return (
    <Button colorScheme="teal" type="submit" isLoading={isSubmitting} {...props}>
      {children}
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

interface EditButtonProps extends ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick, ...props }) => {
  return (
    <IconButton
      aria-label="Edit Note"
      size="xs"
      icon={<EditIcon />}
      colorScheme="blue"
      variant="outline"
      onClick={onClick}
      _hover={{
        bg: 'blue.500',
        color: 'white',
      }}
      {...props}
    />
  );
};

interface DeleteButtonProps extends ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, ...props }) => {
  return (
    <IconButton
      aria-label="Delete Note"
      size="xs"
      icon={<DeleteIcon />}
      colorScheme="red"
      variant="outline"
      onClick={onClick}
      _hover={{
        bg: 'red.500',
        color: 'white',
      }}
      {...props}
    />
  );
};
