'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff, Upload, X, ImageIcon, Search } from 'lucide-react';
import api from '@/lib/api';

const CATEGORIES = [
  'Spiritual Growth',
  'Relationships',
  'Meditation',
  'Soul Connections',
  'Community',
  'Wellness',
];

type Blog = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  coverImage?: { url: string; publicId: string };
  featured: boolean;
  published: boolean;
  readTime: string;
  tags: string[];
  createdAt: string;
  views: number;
};

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  category: CATEGORIES[0],
  author: 'Spiritual Unity Match Team',
  readTime: '5 min read',
  tags: '',
  featured: false,
  published: true,
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/blogs/admin/all');
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error('Error fetching blogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreate = () => {
    setEditBlog(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setShowForm(true);
  };

  const openEdit = (blog: Blog) => {
    setEditBlog(blog);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      tags: blog.tags?.join(', ') || '',
      featured: blog.featured,
      published: blog.published,
    });
    setImageFile(null);
    setImagePreview(blog.coverImage?.url || '');
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Compress large images (>800KB) in-browser to avoid network timeout and speed up upload
  const compressImageIfNeeded = async (file: File): Promise<File> => {
    if (file.size < 800 * 1024) return file;

    return new Promise((resolve) => {
      const img = document.createElement('img');
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const maxDim = 1600;
        let { width, height } = img;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(file);

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const compressed = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressed);
          },
          'image/jpeg',
          0.85
        );
      };

      img.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));

      if (imageFile) {
        const optimizedFile = await compressImageIfNeeded(imageFile);
        formData.append('image', optimizedFile);
      }

      const axiosConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000, // 2 minutes for Cloudinary image processing
      };

      if (editBlog) {
        await api.put(`/blogs/${editBlog._id}`, formData, axiosConfig);
      } else {
        await api.post('/blogs', formData, axiosConfig);
      }

      await fetchBlogs();
      setShowForm(false);
    } catch (err: any) {
      console.error('Save blog error', err);
      const msg = err.response?.data?.message || err.message || 'Failed to save blog';
      alert(`Error saving blog: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error('Delete blog error', err);
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      const formData = new FormData();
      formData.append('published', String(!blog.published));
      await api.put(`/blogs/${blog._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? { ...b, published: !b.published } : b))
      );
    } catch (err) {
      console.error('Toggle publish error', err);
    }
  };

  const toggleFeatured = async (blog: Blog) => {
    try {
      const formData = new FormData();
      formData.append('featured', String(!blog.featured));
      await api.put(`/blogs/${blog._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? { ...b, featured: !b.featured } : b))
      );
    } catch (err) {
      console.error('Toggle featured error', err);
    }
  };

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Blog Management</h2>
          <p className="text-sm text-neutral-500 mt-1">{blogs.length} articles total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-purple-300/30"
        >
          <Plus size={16} />
          New Blog Post
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
        />
      </div>

      {/* Blog List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <div className="text-5xl mb-4">📝</div>
          <p className="font-medium">No blog posts yet. Click "New Blog Post" to create one.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4 hover:shadow-md transition-shadow"
            >
              {/* Cover thumbnail */}
              <div className="flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                {blog.coverImage?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={blog.coverImage.url} alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={24} className="text-purple-300" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
                    {blog.category}
                  </span>
                  {blog.featured && (
                    <span className="text-xs font-bold uppercase tracking-wide text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${blog.published ? 'text-green-600 bg-green-50 dark:bg-green-900/30' : 'text-red-500 bg-red-50 dark:bg-red-900/30'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm truncate">{blog.title}</h3>
                <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{blog.excerpt}</p>
                <p className="text-xs text-neutral-400 mt-1">{blog.author} · {blog.readTime} · {blog.views} views</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  title={blog.featured ? 'Unfeature' : 'Feature'}
                  onClick={() => toggleFeatured(blog)}
                  className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-neutral-400 hover:text-amber-500 transition-colors"
                >
                  {blog.featured ? <Star size={15} fill="currentColor" /> : <StarOff size={15} />}
                </button>
                <button
                  title={blog.published ? 'Unpublish' : 'Publish'}
                  onClick={() => togglePublish(blog)}
                  className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-neutral-400 hover:text-green-500 transition-colors"
                >
                  {blog.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  title="Edit"
                  onClick={() => openEdit(blog)}
                  className="p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-neutral-400 hover:text-purple-600 transition-colors"
                >
                  <Pencil size={15} />
                </button>
                <button
                  title="Delete"
                  onClick={() => setDeleteId(blog._id)}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ──────────── Blog Form Modal ──────────── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4 flex items-center justify-between z-10">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {editBlog ? 'Edit Blog Post' : 'New Blog Post'}
                </h3>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Cover Image</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="relative border-2 border-dashed border-purple-200 dark:border-purple-700 rounded-xl overflow-hidden cursor-pointer hover:border-purple-400 transition-colors group"
                    style={{ height: imagePreview ? '180px' : '120px' }}
                  >
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-neutral-400 group-hover:text-purple-500 transition-colors">
                        <Upload size={24} className="mb-2" />
                        <span className="text-sm font-medium">Click to upload image</span>
                        <span className="text-xs mt-1">PNG, JPG, WEBP up to 10MB</span>
                      </div>
                    )}
                    {imagePreview && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload size={28} className="text-white" />
                        <span className="text-white text-sm ml-2 font-medium">Change Image</span>
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Title *</label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Finding Love Through Spiritual Alignment"
                    className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Excerpt *</label>
                  <textarea
                    required
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="A short summary of the blog post..."
                    className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-neutral-800 dark:text-white resize-none"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Content *</label>
                  <textarea
                    required
                    rows={10}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Write the full blog post content here..."
                    className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-neutral-800 dark:text-white resize-y"
                  />
                </div>

                {/* Row: Category + Author */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-neutral-800 dark:text-white"
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Author</label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-neutral-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Row: Read Time + Tags */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Read Time</label>
                    <input
                      type="text"
                      value={form.readTime}
                      onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-neutral-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      placeholder="love, spiritual, mindfulness"
                      className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white dark:bg-neutral-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div
                      onClick={() => setForm({ ...form, published: !form.published })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${form.published ? 'bg-green-500' : 'bg-neutral-300'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div
                      onClick={() => setForm({ ...form, featured: !form.featured })}
                      className={`w-10 h-5 rounded-full transition-colors relative ${form.featured ? 'bg-amber-500' : 'bg-neutral-300'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Featured</span>
                  </label>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                    {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {saving
                      ? imageFile
                        ? 'Uploading & Publishing...'
                        : 'Saving...'
                      : editBlog
                      ? 'Update Post'
                      : 'Publish Post'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────── Delete Confirm Modal ──────────── */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 max-w-sm w-full"
            >
              <div className="text-4xl mb-3 text-center">🗑️</div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white text-center mb-2">Delete Blog Post?</h3>
              <p className="text-sm text-neutral-500 text-center mb-6">This action cannot be undone. The blog post and its image will be permanently deleted.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
