import { Navbar } from '../components/Navbar';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Nft {
  id: string;
  title: string;
}

const Gallery = () => {
  const mutation = useMutation((newNft: Nft) =>
    axios.post('/api/test', newNft)
  );

  return (
    <>
      <Navbar />
      <button
        onClick={() => {
          mutation.mutate({ id: '1', title: 'Milady 1' });
        }}
      >
        Click me
      </button>
    </>
  );
};

export default Gallery;
