// For more docs about blob store in vercel:  https://vercel.com/docs/storage/vercel-blob/using-blob-sdk

import { put, del, head, list } from "@vercel/blob";

export const config = {
  runtime: "edge",
};

export class BlobService {
  async uploadBlob(file: File, filename: string) {
    // const { searchParams } = new URL(request.url);
    // const filename = searchParams.get("filename");

    //  example of use : put(pathname, body, options);

    const blob = await put(filename, file, {
      access: "public",
    });

    // bolob.url to store
    return blob;
  }

  async deleteBlob(url: string) {
    // exemple of use : del(url, options);

    //const { searchParams } = new URL(request.url);
    //const urlToDelete = searchParams.get("url") as string;
    await del(url);
  }

  async getBlob(url: string) {
    //const { searchParams } = new URL(request.url);
    //const blobUrl = searchParams.get('url');

    // example of use : head(url, options);
    const blobDetails = await head(url);

    return blobDetails;
  }

  async getAllBlobs() {
    // example of use : list(options);
    const { blobs } = await list();
    return blobs;
  }
}
