import { useState, useEffect } from 'react';
import { getAPI } from '../services/pixabay-api';

const useImages = (initialQuery = '', initialPage = 1) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await getAPI(searchQuery, currentPage);
        const { totalHits, hits } = response;

        setImages(prevImages => (currentPage === 1 ? hits : [...prevImages, ...hits]));
        setIsEnd(prevImages => prevImages.length + hits.length >= totalHits);

        if (hits.length === 0) {
          alert('No images found. Try a different search.');
        }
      } catch (error) {
        setIsError(true);
        alert(`An error occurred while fetching data: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, currentPage]);

  const handleSearchSubmit = query => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedCurrentQuery = searchQuery.toLowerCase();

    if (normalizedQuery === '') {
      alert(`Empty string is not a valid search query. Please type again.`);
      return;
    }

    if (normalizedQuery === normalizedCurrentQuery) {
      alert(`Search query is the same as the previous one. Please provide a new search query.`);
      return;
    }

    if (normalizedQuery !== normalizedCurrentQuery) {
      setSearchQuery(normalizedQuery);
      setCurrentPage(1);
      setImages([]);
      setIsEnd(false);
    }
  };

  const handleLoadMore = () => {
    if (!isEnd) {
      setCurrentPage(prevPage => prevPage + 1);
    } else {
      alert("You've reached the end of the search results.");
    }
  };

  return {
    images,
    isLoading,
    isError,
    isEnd,
    handleSearchSubmit,
    handleLoadMore,
  };
};

export default useImages;
