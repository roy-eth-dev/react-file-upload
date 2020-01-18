import axios, { CancelToken } from 'axios'

const signedPutUrl =
  'https://storage.googleapis.com/federico-dev-bucket/logo?x-goog-signature=79b7a6077e33c898aaf69a884522dd9e64edab4dc690dde5a7383be44b732939b5bb101960e9f787d433ec3c8b206b55bd1feac1309835466ecbaf85077562230d9e92b32ec45604dfdc8817535a553cee47cb90ad8e64568cbc89b848162bf0d1157596228316e0a4804dc9ac05883132192d785f55c7d2edcf59c5a71c0e40e5507ab9b64b6b82a1f96a3060af59864a8f913b9ba0b272d3193bc7f7c2cfbea1084784be2200fd60c270537c55c6ae1d765758ee289f0b35b6135242e31b4d8197949a19a86f89556aa11c2b01a7be6f3cfb7e6483079d3edbb8421607bedca8ae9c80bc05230e5009f9c075ac97db33bf259b476cb9df8cd01d2f2dfaf7a2&x-goog-algorithm=GOOG4-RSA-SHA256&x-goog-credential=accord-uploader%40disco-mountain-265217.iam.gserviceaccount.com%2F20200118%2Fus-east1%2Fstorage%2Fgoog4_request&x-goog-date=20200118T164948Z&x-goog-expires=604800&x-goog-signedheaders=host'

const signedGetUrl = 'https://storage.googleapis.com/federico-dev-bucket/logo'

type ProgressFunction = (progress: ProgressEvent) => void

export const uploadFile = (
  file: File,
  onProgress: ProgressFunction,
  cancelToken: CancelToken | undefined
) => {
  const headers = new Headers()

  return axios.request({
    method: 'PUT',
    url: signedPutUrl,
    data: file,
    headers: headers,
    onUploadProgress: onProgress,
    cancelToken: cancelToken
  })
}

export const getFile = () => {
  return signedGetUrl + '?t=' + new Date().getTime()
}
