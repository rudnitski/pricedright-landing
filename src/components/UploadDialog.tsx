'use client';

import { useEffect, useId, useState } from 'react';

type Props = { className?: string; children?: React.ReactNode };
type Submission = {
  email: string;
  materials?: string;
  hours?: number;
  channel?: 'Etsy' | 'Shopify' | 'Craft fair' | 'Instagram';
  brand?: 'budget' | 'mid' | 'premium';
  photoUrl: string;
  userAgent?: string;
};

const DAILY_LIMIT = Number(process.env.NEXT_PUBLIC_DAILY_SLOT_LIMIT || 30);

// Trigger button
function Trigger({ className, children }: Props) {
  const handleClick = () => {
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('open-upload'));
    }
  };
  
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

// Container for modal
function Container() {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const onOpen = () => setOpen(true);
    document.addEventListener('open-upload', onOpen);
    return () => document.removeEventListener('open-upload', onOpen);
  }, []);

  return open ? <Dialog onClose={() => setOpen(false)} /> : null;
}

function Dialog({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [materials, setMaterials] = useState('');
  const [hours, setHours] = useState<number | ''>('');
  const [channel, setChannel] = useState<'Etsy' | 'Shopify' | 'Craft fair' | 'Instagram' | ''>('');
  const [brand, setBrand] = useState<'budget' | 'mid' | 'premium' | ''>('mid');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ queue: number; eta: string } | null>(null);
  const inputId = useId();

  // WOZ-friendly, client-side queue simulation (keeps UX crisp)
  // Compute on client after mount to avoid SSR/CSR mismatch
  const [queueInfo, setQueueInfo] = useState<{ next: number; left: number } | null>(null);
  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const key = `pr-queue-${today}`;
      const existing = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(key) : null;
      if (existing) {
        setQueueInfo(JSON.parse(existing));
        return;
      }
      const next = Math.floor(Math.random() * 10) + 4; // position 4–13
      const left = Math.max(0, DAILY_LIMIT - next);
      const val = { next, left };
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(val));
      }
      setQueueInfo(val);
    } catch {
      // ignore any storage issues; leave null
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !email || !channel) return;

    try {
      setSubmitting(true);

      // 1) Upload photo (multipart → Blob)
      const fd = new FormData();
      fd.append('file', file);
      const upRes = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!upRes.ok) throw new Error('Upload failed');
      const { url: photoUrl } = await upRes.json();

      // 2) Submit metadata
      const payload: Submission = {
        email,
        materials: materials || undefined,
        hours: hours === '' ? undefined : Number(hours),
        channel: channel || undefined,
        brand: brand || undefined,
        photoUrl,
        userAgent: navigator.userAgent,
      };

      const subRes = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!subRes.ok) throw new Error('Submit failed');

      // 3) Show confirmation
      const etaHrs = Math.floor(Math.random() * 10) + 12; // 12–21h
      setSuccess({ queue: queueInfo.next, eta: `${etaHrs}h` });
    } catch (err) {
      alert('Something went wrong. Please try again in a minute.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full md:max-w-lg bg-white rounded-t-2xl md:rounded-2xl border border-[#DCDCDC] p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Upload your jewelry for a pricing report</h3>
          <button className="text-neutral-500 hover:text-black" onClick={onClose}>✕</button>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor={inputId} className="block text-sm font-medium">Photo (JPEG/PNG up to 10MB)</label>
              <input
                id={inputId}
                type="file"
                accept="image/*"
                required
                onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
                className="mt-1 block w-full text-sm file:mr-3 file:rounded-md file:border file:border-[#DCDCDC] file:bg-white file:px-3 file:py-2 file:hover:bg-neutral-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#DCDCDC] px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Where you plan to sell</label>
                <select
                  required value={channel}
                  onChange={(e) => setChannel(e.target.value as typeof channel)}
                  className="mt-1 w-full rounded-md border border-[#DCDCDC] px-3 py-2"
                >
                  <option value="" disabled>Select</option>
                  <option>Etsy</option>
                  <option>Shopify</option>
                  <option>Craft fair</option>
                  <option>Instagram</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Materials (optional)</label>
              <input
                type="text" value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="e.g., 20ga copper wire, 4mm glass beads"
                className="mt-1 w-full rounded-md border border-[#DCDCDC] px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Time spent (hours, optional)</label>
                <input
                  type="number" min={0} step="0.25"
                  value={hours} onChange={(e) => setHours(e.target.value ? Number(e.target.value) : '')}
                  className="mt-1 w-full rounded-md border border-[#DCDCDC] px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Brand positioning</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value as typeof brand)}
                        className="mt-1 w-full rounded-md border border-[#DCDCDC] px-3 py-2">
                  <option value="budget">Budget</option>
                  <option value="mid">Mid</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-neutral-600">
              We never sell your photos or data. You can request deletion anytime. Free during beta.
            </p>

            <div className="flex items-center justify-between">
              <div className="text-xs text-neutral-700">
                Slots left today: <b>{queueInfo ? Math.max(0, DAILY_LIMIT - (queueInfo.next || 0)) : '—'}</b>
              </div>
              <button
                disabled={submitting || !file}
                className="rounded-md bg-[#0E0E0F] text-white px-4 py-2 disabled:opacity-60"
              >
                {submitting ? 'Joining…' : 'Join today’s beta queue'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm">
              You’re <b>#{success.queue}</b> in today’s beta. ETA ≈ <b>{success.eta}</b>.
            </div>
            <p className="mt-3 text-sm text-neutral-700">
              We’ll email your PDF report. Want a quick ballpark now?
              <a className="underline ml-1" href="#sample">Open instant calculator</a>
            </p>
            <div className="mt-5 flex justify-end">
              <button className="rounded-md border border-[#DCDCDC] px-3 py-2" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const UploadDialog = { Trigger, Container };
export default UploadDialog;
export { Trigger, Container };
