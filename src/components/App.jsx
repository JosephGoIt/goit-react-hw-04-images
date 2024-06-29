import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import useImages from './hooks/useImages';
import styles from './App.module.css';

const App = () => {
  const {
    images,
    isLoading,
    isError,
    isEnd,
    handleSearchSubmit,
    handleLoadMore,
  } = useImages();

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {!isLoading && !isError && images.length > 0 && !isEnd && (
        <Button onClick={handleLoadMore} />
      )}
      {isError && <p>Something went wrong. Please try again later.</p>}
    </div>
  );
};

export default App;
