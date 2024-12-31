'use client';

import { useEffect, useState } from 'react';

export default function VideoPlayer() {
  const [streamSource, setStreamSource] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStreamSource = async () => {
      try {
        const response = await fetch('/api/default');
        const data = await response.json();
        
        if (data.streamSource) {
          setStreamSource(data.streamSource);
        } else {
          setError('Failed to load stream source');
        }
      } catch (err) {
        setError('Failed to load stream source');
      } finally {
        setLoading(false);
      }
    };

    fetchStreamSource();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full h-[calc(100vh-64px)] bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading stream...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-[calc(100vh-64px)] bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <iframe
          id="video-iframe"
          className="w-full h-full"
          style={{ aspectRatio: '16/9', maxHeight: 'calc(100vh - 64px)' }}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          src={streamSource}
          name="iframe_a"
          scrolling="no"
          allowFullScreen
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  );
}
