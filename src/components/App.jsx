import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Section from './Section/Section';
import Loader from './Loader/Loader';
import Notification from './Notification/Notification';
import { requestImages } from 'services/api';

import { useState, useEffect } from 'react';

export function App() {
  const [modal, setModal] = useState({ open: false, modalData: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await requestImages(value, page);
        setImages(prevState => {
          return [...prevState, ...data.hits];
        });
        setTotalImages(data.totalHits);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (!value.length) return;
    fetchImages();
  }, [page, value]);

  const onSearchPictures = value => {
    setPage(1);
    setImages([]);
    const normalizedValue = value.toLowerCase().trim();
    setValue(normalizedValue);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = data => {
    setModal({ open: true, modalData: data });
  };

  const closeModal = () => {
    setModal({ open: false, modalData: null });
  };
  const buttonOption = page * 12 >= totalImages;

  return (
    <Section>
      <Searchbar onSearchPictures={onSearchPictures} />
      {error && <Notification message={error} />}
      {loading && <Loader />}
      <ImageGallery images={images} handlerClick={openModal} />
      {modal.open && <Modal onClose={closeModal} modalData={modal.modalData} />}
      {images.length > 0 && (
        <Button handlerClick={loadMore} disabled={buttonOption} />
      )}
    </Section>
  );
}
