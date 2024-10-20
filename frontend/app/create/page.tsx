"use client";
import { useState } from "react";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { Jimp } from "jimp";
import * as bmp from "bmp-ts";
import * as Sharp from "sharp";

export default function Create() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const image = await Jimp.read(await file!.arrayBuffer())
    const bitmap = image.resize({w: 256, h: 256})

    console.log("bitmap: ", bitmap)
    console.log("array: ", await bitmap.getBuffer("image/bmp"))
    // console.log("quantized array: ", await bitmap.quantize({colors: 256, imageQuantization: "nearest"}).getBuffer("image/bmp", {h}))
    // console.log("base64: ", await bitmap.getBase64("image/bmp"))
    // const rawImg = bmp.encode({bitPP: 8, ...(bitmap.bitmap), 
    //     palette: [
    //       { red: 255, green: 255, blue: 255, quad: 0 },
    //       { red: 255, green: 255, blue: 0, quad: 0 },
    //       { red: 255, green: 0, blue: 255, quad: 0 },
    //       { red: 255, green: 0, blue: 0, quad: 0 },
    //       { red: 0, green: 255, blue: 255, quad: 0 },
    //       { red: 0, green: 255, blue: 0, quad: 0 },
    //       { red: 0, green: 0, blue: 255, quad: 0 },
    //       { red: 0, green: 0, blue: 0, quad: 0 },
    //     ]})
    // console.log("raw image: ", rawImg)

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: createPost action
    console.log("Selected file:", selectedFile);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : !user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{!selectedFile ? "Take your photo!" : "Looking good!"}</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                capture="user"
                onChange={handleFileChange}
                className="display-none"
                hidden
              />
              <button 
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
 onClick={() => {document.getElementById('photo')!.click();}} hidden={!!selectedFile}>Select Image</button>

            </div>
            {previewUrl && (
              <div className="mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              hidden={!selectedFile}
            >
              Post Image
            </button>
          </form>
        </>
      ) : (
<>
        <h1 className="text-2xl font-bold mb-4">Sign in to post an image.</h1>
        <button className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openAuthModal}>
          Login
        </button>
        </>
      )}
    </main>
  );
}
