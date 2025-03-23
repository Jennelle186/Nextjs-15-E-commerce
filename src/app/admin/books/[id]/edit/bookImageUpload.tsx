"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "../../../../../../utils/supabase/client";

export default function BookImageUpload({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [bookImage, setBookImage] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) {
      setBookImage(url); // ✅ Set public image URL directly
    }
  }, [url]);

  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("book-pics")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // ✅ Get public URL after upload
      const { data: publicUrlData } = supabase.storage
        .from("book-pics")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      setBookImage(publicUrl); // ✅ Show preview
      onUpload(publicUrl); // ✅ Pass to form
    } catch (error) {
      alert(`Error uploading image: ${(error as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {bookImage ? (
        <Image
          unoptimized
          width={size}
          height={size}
          src={bookImage}
          alt="Book Image"
          className="rounded-xl shadow-md object-cover border border-gray-200"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-100 text-gray-400"
          style={{ height: size, width: size }}
        >
          <span className="text-sm">No Image</span>
        </div>
      )}

      <div className="w-full max-w-xs">
        <label
          htmlFor="single"
          className={`w-full block text-center cursor-pointer rounded-md px-4 py-2 font-medium transition ${
            uploading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </label>

        <input
          id="single"
          type="file"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
          className="hidden"
        />
      </div>
    </div>
  );
}
