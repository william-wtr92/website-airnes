import { BlobServiceClient } from "@azure/storage-blob"
import config from "@/api/config"

const blobServiceClient = BlobServiceClient.fromConnectionString(
  config.azure.security.connection
)
const containerClient = blobServiceClient.getContainerClient(
  config.azure.security.container
)

export const uploadFile = async (file) => {
  const blobClient = containerClient.getBlockBlobClient(file.name)
  await blobClient.uploadData(file)

  return blobClient.url
}
