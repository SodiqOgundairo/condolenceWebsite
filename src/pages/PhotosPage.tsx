import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { addPhoto, getPublicPhotos, uploadPhoto, type Photo } from '../lib/database';

const PhotosPage: React.FC = () => {
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const items = await getPublicPhotos();
      setPhotos(items);
      setLoading(false);
    };
    fetchPhotos();
    const id = setInterval(fetchPhotos, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [file]);

  const canSubmit = useMemo(() => !!name.trim() && !!file && !submitting, [name, file, submitting]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    setError(null);
    try {
      const url = await uploadPhoto(file, name.trim());
      if (!url) throw new Error('Failed to upload photo');
      const ok = await addPhoto({ name: name.trim(), caption: caption.trim() || undefined, photo_url: url, is_public: true });
      if (!ok) throw new Error('Failed to save photo record');
      setSuccess(true);
      setName('');
      setCaption('');
      setFile(null);
      setPreview(null);
      setTimeout(() => setSuccess(false), 8000);
      const items = await getPublicPhotos();
      setPhotos(items);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="container mx-auto px-6 py-10">
        <Link to="/" className="text-sm text-text-secondary hover:text-primary">&larr; Back to main site</Link>
        <h1 className="text-3xl md:text-4xl font-display text-text-primary">Share a Photo</h1>
        <p className="mt-2 text-text-secondary max-w-2xl">You may upload a cherished photograph with an optional caption. Photos will appear below once approved.</p>
      </header>

      <main className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-text-secondary font-medium mb-1" htmlFor="name">Your Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="e.g., Jane Smith" />
            </div>
            <div className="mb-4">
              <label className="block text-text-secondary font-medium mb-1" htmlFor="caption">Caption (optional)</label>
              <input id="caption" type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full p-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="Say something about the photo" />
            </div>
            <div className="mb-4">
              <label className="block text-text-secondary font-medium mb-1">Photo</label>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:brightness-110" />
            </div>
            {preview && (
              <div className="mb-4">
                <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg border border-border bg-white" />
              </div>
            )}
            <button type="submit" disabled={!canSubmit} className="w-full bg-primary text-white py-3 px-4 rounded-full font-medium text-sm hover:brightness-110 disabled:opacity-60">Upload Photo</button>
            {success && <p className="mt-3 text-primary">Thank you. Your photo has been submitted.</p>}
            {error && <p className="mt-3 text-red-600">{error}</p>}
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-display text-text-primary mb-4">Gallery</h2>
          {loading ? (
            <p className="text-text-secondary">Loading photos…</p>
          ) : photos.length === 0 ? (
            <p className="text-text-secondary">No photos yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {photos.map((p) => (
                <figure key={p.id} className="bg-surface border border-border rounded-xl p-2 shadow-sm">
                  <img src={p.photo_url} alt={p.caption || p.name} className="w-full h-40 object-cover rounded-md" />
                  <figcaption className="mt-2 text-xs text-text-secondary">
                    {p.caption || <span className="italic">No caption</span>} — <span className="font-medium text-text-primary">{p.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PhotosPage;
