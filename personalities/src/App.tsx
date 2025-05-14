import { useState, useEffect } from 'react';
import './App.css';

interface Artist {
  id: number;
  name: string;
  description: string;
  url: string;
  alt: string;
}

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch artists from Java backend
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:8080/vinuya/personalities');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtists(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const hasNext = artists.length > 0 && index < artists.length - 1;

  function handleNextClick() {
    if (artists.length === 0) return;
    
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleBackClick() {
    if (artists.length === 0) return;
    
    if (index === 0) {
      setIndex(artists.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  if (loading) {
    return <div className="main-container">Loading artists...</div>;
  }

  if (error) {
    return <div className="main-container">Error: {error}</div>;
  }

  if (artists.length === 0) {
    return <div className="main-container">No artists found</div>;
  }

  const currentArtist = artists[index];

  return (
    <>
      <div className='main-container'>
        <div className='name'>
          John Rein Vinuya
        </div>
        <div className='button-container'>
          <button onClick={handleBackClick} className='next-button'>
            Back
          </button>
          <button onClick={handleNextClick} className='back-button'>
            Next
          </button>
        </div>
        
        <h2 className='artist-name'>
          <i>{currentArtist.name}</i>
        </h2>
        <h3 className='index-count'>
          ({index + 1} of {artists.length})
        </h3>
        <div>
          <button onClick={handleMoreClick} className='details-button'>
            {showMore ? 'Hide' : 'Show'} details
          </button>
        </div>
        
        {showMore && <p>{currentArtist.description}</p>}
        <img
          src={currentArtist.url}
          alt={currentArtist.alt}
        />
      </div>
    </>
  );
}