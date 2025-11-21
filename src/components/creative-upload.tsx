"use client";
import { useState } from "react";
import { useCreatives } from "@/store/creatives";

export function CreativeUpload() {
  const { addCreative } = useCreatives();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }

  function onAdd() {
    if (!file || !preview) return;
    addCreative({ title: title || file.name, slug: "", imageUrl: preview });
    setTitle("");
    setFile(null);
    setPreview(null);
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="font-semibold tracking-tight">Upload wedding creative</h3>
      <p className="mt-1 text-sm text-zinc-600">Add an image to share and track.</p>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="md:col-span-2 space-y-3">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Save the Date — Aarav & Siya"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image</label>
            <input type="file" accept="image/*" onChange={onFileChange} className="mt-1" />
          </div>
          <button
            disabled={!preview}
            onClick={onAdd}
            className="rounded-md bg-zinc-900 px-3 py-1.5 text-white text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-zinc-800"
          >
            Add creative (mock)
          </button>
        </div>
        <div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-md border bg-zinc-50">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-zinc-500">Preview</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
