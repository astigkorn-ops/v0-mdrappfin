import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Image from 'next/image';

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function NewsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, loading, error] = useAuthState(auth);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsItem, setNewsItem] = useState(null);

  // Mock news data - replace with actual data fetching
  useEffect(() => {
    if (id) {
      // In a real app, fetch from API
      const mockNews = {
        id: id,
        title: "Flood Control Measures Implemented Across Low-lying Areas",
        excerpt: "New flood barriers and drainage systems have been installed to protect vulnerable communities during heavy rainfall.",
        date: "2024-09-12",
        category: "Infrastructure",
        image: "https://images.unsplash.com/photo-1529974147920-1b643f03bd3d?w=800&h=400&fit=crop",
        alt: "Flood control infrastructure being installed in low-lying areas",
        content: `
          <p>The Municipal Disaster Risk Reduction and Management Office (MDRRMO) of Pio Duran has successfully implemented new flood control measures across low-lying barangays to mitigate the impact of seasonal flooding.</p>
          
          <p>These measures include the installation of reinforced flood barriers, upgraded drainage systems, and improved water retention areas. The project was completed in partnership with the Department of Public Works and Highways (DPWH) and local community groups.</p>
          
          <p>"Our community has been vulnerable to flooding during the rainy season for years," said Barangay Captain Maria Santos of Brgy. Hal. "These new installations give us hope for better protection."</p>
          
          <p>The project covered five barangays identified as high-risk areas: Hal, Banga, Bambang, Duran, and San Jose. Each area received customized solutions based on their specific topographical challenges.</p>
          
          <p>MDRRMO Officer Juan Dela Cruz emphasized the importance of community involvement in the project's success. "We conducted regular consultations with residents to ensure the solutions met their needs and gained their support," he explained.</p>
          
          <p>The flood control systems are designed to handle up to 150mm of rainfall per hour, significantly improving the municipality's resilience during typhoon season. Regular maintenance schedules have been established to ensure long-term effectiveness.</p>
        `
      };
      setNewsItem(mockNews);
      
      // Mock comments data
      const mockComments = [
        {
          id: 1,
          userId: 'user1',
          userName: 'Juan dela Cruz',
          userAvatar: 'https://placehold.co/40x40/4f46e5/white?text=JD',
          content: 'This is a great initiative! Our community really needed this.',
          timestamp: '2024-09-13T10:30:00Z'
        },
        {
          id: 2,
          userId: 'user2',
          userName: 'Maria Santos',
          userAvatar: 'https://placehold.co/40x40/ec4899/white?text=MS',
          content: 'I hope this will be maintained properly. These systems need regular cleaning.',
          timestamp: '2024-09-13T14:15:00Z'
        }
      ];
      setComments(mockComments);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, send to your backend
      const comment = {
        id: comments.length + 1,
        userId: user.uid,
        userName: user.displayName,
        userAvatar: user.photoURL || `https://placehold.co/40x40/4f46e5/white?text=${user.displayName?.charAt(0)}`,
        content: newComment,
        timestamp: new Date().toISOString()
      };
      
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">News not found</h1>
          <p className="mt-2 text-gray-600">The requested news article could not be found.</p>
          <button 
            onClick={() => router.push('/news')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => router.push('/news')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to News
            </button>
            <div>
              {user ? (
                <div className="flex items-center space-x-3">
                  <Image 
                    src={user.photoURL || `https://placehold.co/40x40/4f46e5/white?text=${user.displayName?.charAt(0)}`}
                    alt={user.displayName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-gray-700">{user.displayName}</span>
                  <button 
                    onClick={() => auth.signOut()}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleGoogleLogin}
                    className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                    </svg>
                    Google
                  </button>
                  <button 
                    onClick={handleFacebookLogin}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                    Facebook
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* News Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                {newsItem.category}
              </span>
              <time className="text-gray-500 text-sm">
                {formatDate(newsItem.date)}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {newsItem.title}
            </h1>
          </div>

          {/* News Image */}
          <div className="relative h-96 w-full">
            <Image
              src={newsItem.image}
              alt={newsItem.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* News Content */}
          <div className="p-6">
            <div 
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h2>
          
          {/* Comment Form */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex items-start space-x-4">
                <Image 
                  src={user.photoURL || `https://placehold.co/40x40/4f46e5/white?text=${user.displayName?.charAt(0)}`}
                  alt={user.displayName}
                  width={40}
                  height={40}
                  className="rounded-full flex-shrink-0"
                />
                <div className="flex-grow">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="3"
                    required
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting || !newComment.trim()}
                      className={`px-6 py-2 rounded-lg font-medium transition ${
                        isSubmitting || !newComment.trim()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-6 bg-blue-50 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Join the discussion</h3>
              <p className="text-gray-600 mb-4">Sign in to post a comment</p>
              <div className="flex justify-center space-x-3">
                <button 
                  onClick={handleGoogleLogin}
                  className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                  </svg>
                  Sign in with Google
                </button>
                <button 
                  onClick={handleFacebookLogin}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                  Sign in with Facebook
                </button>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-4">
                  <Image 
                    src={comment.userAvatar}
                    alt={comment.userName}
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{comment.userName}</h4>
                        <time className="text-sm text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </time>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 MDRRMO Pio Duran. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .prose :global(h2) {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        
        .prose :global(h3) {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }
        
        .prose :global(p) {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        
        .prose :global(ul) {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .prose :global(li) {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
