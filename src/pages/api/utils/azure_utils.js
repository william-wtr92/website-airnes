import { BlobServiceClient } from "@azure/storage-blob"
import config from "@/api/config"

const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN
const storageAccountName = process.env.AZURE_STORAGE_RESOURCE_NAME

const blobServiceClient = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
)
const containerClient = blobServiceClient.getContainerClient(
  config.azure.security.container
)

export const uploadFile = async (file) => {
  const blobClient = containerClient.getBlockBlobClient(file.name)
  await blobClient.uploadData(file)

  return blobClient.url
}
