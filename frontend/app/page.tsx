"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { kv } from "@vercel/kv";

// async function getPosts() {
//   'use server'
//   const session = await kv.lrange("posts", 0, 100)
// }

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {/* TODO: display feed from list in redis kv, pull images from blobs via https://api.blobscan.com/blobs/{id}/data */} 
    </main>
  );
}
