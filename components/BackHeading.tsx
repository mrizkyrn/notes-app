import { useRouter } from 'next/navigation';
import { HStack, Heading } from '@chakra-ui/react';
import { BackButton } from '@/components/Buttons';

interface BackHeadingProps {
  title: string;
}

const BackHeading: React.FC<BackHeadingProps> = ({ title }) => {
  const router = useRouter();

  return (
    <HStack spacing={{ base: 1, md: 3 }} w="100%" mb={{ base: 5, md: 10 }}>
      <BackButton onClick={() => router.push('/')} />
      <Heading as="h1" size="lg" textAlign="center">
        {title}
      </Heading>
    </HStack>
  );
};

export default BackHeading;
