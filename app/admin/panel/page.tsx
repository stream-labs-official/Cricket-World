'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function AdminPanel() {
  const [streamUrl, setStreamUrl] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    const fetchCurrentStream = async () => {
      try {
        const response = await fetch('/api/default');
        const data = await response.json();
        
        if (data.streamSource) {
          setStreamUrl(data.streamSource);
        }
      } catch (error) {
        setStatus({ type: 'error', message: 'Failed to fetch current stream' });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentStream();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('/api/admin/update-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ streamSource: streamUrl }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: 'Stream source updated successfully!' });
        setTimeout(() => setStatus({ type: '', message: '' }), 3000);
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to update stream source' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to update stream source' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-xl w-full max-w-2xl mx-4 relative">
          <div className="absolute top-4 left-4 flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-white hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <button 
              onClick={handleLogout}
              className="text-white hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-8 text-center text-white">Admin Panel</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="streamUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Stream URL
              </label>
              <input
                type="text"
                id="streamUrl"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Enter stream URL"
              />
            </div>
            {status.message && (
              <p className={`text-sm mt-2 ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {status.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
            >
              Update Stream
            </button>
          </form>
          
          <div className="mt-8 p-4 bg-[#2a2a2a] rounded-md">
            <h2 className="text-xl font-semibold text-white mb-4">Current Stream</h2>
            <p className="text-gray-300 break-all font-mono text-sm">
              {streamUrl || 'No stream URL set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
