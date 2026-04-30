import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SectionWrapper from '../../components/SectionWrapper';
import Button from '../../components/Button';
import { AnimatedSection } from '../../hooks/useAnimations';
import { API_BASE_URL } from '../../config';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  published: boolean;
  createdAt: string;
}

interface Toast {
  message: string;
  type: 'success' | 'error';
  id: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'posts' | 'settings' | 'users'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post>>({});
  
  // Settings Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Create Admin Form State
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  
  // Upload & Toast State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('adminToken');
    setUploadingImage(true);
    
    try {
      const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      const imageUrl = res.data.url.startsWith('http') ? res.data.url : `${API_BASE_URL}${res.data.url}`;
      setCurrentPost({ ...currentPost, thumbnail: imageUrl });
      showToast('Image uploaded successfully!');
    } catch (err) {
      showToast('Failed to upload image', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };
    
    const slug = currentPost.slug || currentPost.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
      if (currentPost.id) {
        await axios.put(`${API_BASE_URL}/api/posts/${currentPost.id}`, { ...currentPost, slug }, { headers });
        showToast('Post updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/api/posts`, { ...currentPost, slug, published: true }, { headers });
        showToast('Post created successfully!');
      }
      setIsEditing(false);
      setCurrentPost({});
      fetchPosts();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to save post', 'error');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_BASE_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Post deleted successfully!');
      fetchPosts();
    } catch (err) {
      showToast('Failed to delete post', 'error');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_BASE_URL}/api/auth/change-password`, 
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to update password', 'error');
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_BASE_URL}/api/auth/register-admin`, 
        { email: newAdminEmail, password: newAdminPassword, name: newAdminName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast('New admin created successfully!');
      setNewAdminEmail('');
      setNewAdminPassword('');
      setNewAdminName('');
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Failed to create admin', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-12 relative">
      {/* Toasts Container */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`px-6 py-4 rounded-xl shadow-lg border animate-in slide-in-from-right-8 fade-in duration-300 flex items-center gap-3 ${
              toast.type === 'success' ? 'bg-white border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'
            }`}
          >
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            )}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        ))}
      </div>

      <SectionWrapper background="transparent">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 mt-2 text-lg">Manage your content and settings</p>
          </div>
          <div className="flex gap-4">
            <Button as="button" variant="outline" onClick={handleLogout} className="!border-gray-200 !text-gray-600 hover:!bg-gray-100">
              Logout
            </Button>
            {activeTab === 'posts' && !isEditing && (
              <Button as="button" variant="primary" onClick={() => { setCurrentPost({}); setIsEditing(true); }} className="shadow-lg shadow-accent/20">
                + New Post
              </Button>
            )}
            {isEditing && (
              <Button as="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        {!isEditing && (
          <div className="flex space-x-8 border-b border-gray-200 mb-8 overflow-x-auto">
            {['posts', 'users', 'settings'].map((tab) => (
              <button 
                key={tab}
                className={`pb-4 text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-b-2 border-accent text-accent' 
                    : 'text-gray-400 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab === 'posts' ? 'Blog Posts' : tab === 'users' ? 'Manage Users' : 'Settings'}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <AnimatedSection 
          key={isEditing ? 'editing' : activeTab} 
          className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 p-8 md:p-12 overflow-hidden relative"
        >
          {activeTab === 'posts' && !isEditing && (
            <div className="animate-in fade-in duration-500">
              {posts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">No posts yet</h3>
                  <p className="text-gray-500">Get started by creating your first blog post.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {posts.map(post => (
                    <div key={post.id} className="group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-gray-100 rounded-2xl hover:border-accent/30 hover:shadow-md transition-all bg-white">
                      <div className="flex gap-6 items-center w-full md:w-auto mb-4 md:mb-0">
                        {post.thumbnail && (
                          <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                            <img 
                              src={post.thumbnail.startsWith('http') ? post.thumbnail : `${API_BASE_URL}${post.thumbnail}`} 
                              alt={post.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-accent transition-colors">{post.title}</h3>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">/{post.slug}</span>
                            <span>•</span>
                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <button 
                          onClick={() => { setCurrentPost(post); setIsEditing(true); }}
                          className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-semibold bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isEditing && (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 max-w-4xl mx-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                {currentPost.id ? 'Edit Post' : 'Create New Post'}
              </h2>
              <form onSubmit={handleSavePost} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Title</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                      placeholder="Enter a catchy title..."
                      value={currentPost.title || ''}
                      onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Slug (optional)</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                      placeholder="auto-generated-if-empty"
                      value={currentPost.slug || ''}
                      onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Excerpt (Short Summary)</label>
                  <textarea
                    rows={2}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all resize-none"
                    placeholder="A brief summary for the blog listing..."
                    value={currentPost.excerpt || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  />
                </div>

                <div className="space-y-2 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <label className="text-sm font-bold text-gray-700 block mb-2">Thumbnail Image</label>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-1 w-full">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2.5 file:px-6
                            file:rounded-full file:border-0
                            file:text-sm file:font-bold
                            file:bg-accent/10 file:text-accent
                            hover:file:bg-accent/20 file:cursor-pointer transition-all cursor-pointer"
                        />
                        {uploadingImage && (
                          <div className="absolute inset-0 bg-white/80 flex items-center px-4 rounded-xl backdrop-blur-sm">
                            <span className="text-sm font-bold text-accent flex items-center gap-2">
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Uploading...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {currentPost.thumbnail && (
                      <div className="w-40 rounded-xl overflow-hidden border-2 border-white shadow-lg shrink-0 aspect-video bg-gray-200">
                        <img 
                          src={currentPost.thumbnail.startsWith('http') ? currentPost.thumbnail : `${API_BASE_URL}${currentPost.thumbnail}`} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex justify-between">
                    <span>Content</span>
                    <span className="text-gray-400 font-normal">HTML/Markdown supported</span>
                  </label>
                  <textarea
                    required
                    rows={15}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 text-gray-900 focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none transition-all font-mono text-sm leading-relaxed"
                    placeholder="<h1>Your Title Here</h1>&#10;<p>Start writing your amazing post...</p>"
                    value={currentPost.content || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  />
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-end">
                  <Button type="submit" as="button" variant="primary" className="shadow-xl shadow-accent/20 px-8 py-4 !text-base">
                    {currentPost.id ? 'Save Changes' : 'Publish Live Post'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'settings' && !isEditing && (
            <div className="max-w-md animate-in fade-in duration-500">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
                <p className="text-gray-500 mt-1">Update your admin password</p>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Current Password</label>
                  <input
                    type="password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" as="button" className="w-full justify-center">Update Password</Button>
              </form>
            </div>
          )}

          {activeTab === 'users' && !isEditing && (
            <div className="max-w-md animate-in fade-in duration-500">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
                <p className="text-gray-500 mt-1">Invite a new administrator</p>
              </div>
              <form onSubmit={handleCreateAdmin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                    placeholder="John Doe"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                    placeholder="john@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Temporary Password</label>
                  <input
                    type="password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" as="button" className="w-full justify-center">Create Admin Account</Button>
              </form>
            </div>
          )}
        </AnimatedSection>
      </SectionWrapper>
    </div>
  );
}
