import axios, { CancelToken } from 'axios'

const signedPutUrl =
  'https://storage.googleapis.com/federico-dev-bucket/logo?x-goog-signature=1596ae822b9979979239b4b284901cd5883fa203eba1eed83dcc93e301400fdfb301d015099821e3162eb33cabdced6f9638aeed59783c6bf8af206ca6758c5ebbee09a1a8acc105c441f19d8ac0548110886a162de2668fa6e0de293e82ee62b9f7deade93fa818e6c05ca21ae3fef16679624baa4938e899e314179a8ce09763c5ba62f9d2e9ec00a448e034432ba37be69f515905770db2c4e92d3270caba28c1fdb31737a6f3babc51817b9dcf67d559e80960e1eb32ea73ccab4d0b0a2403f0db105b2f54701f50f5257d10ca093c3b81ba57b88e5a723407cb1f998b3d88f3262da9ef4388301f6f7fd5bd5af3bed79351a7d28dae07140c600b7727ea&x-goog-algorithm=GOOG4-RSA-SHA256&x-goog-credential=accord-uploader%40disco-mountain-265217.iam.gserviceaccount.com%2F20200115%2Fus-east1%2Fstorage%2Fgoog4_request&x-goog-date=20200115T225851Z&x-goog-expires=172800&x-goog-signedheaders=host'

const signedGetUrl =
  'https://storage.googleapis.com/federico-dev-bucket/logo?x-goog-signature=4537c7702148c1f16b387fcb1bf126806a791e53754561f8a9a805701aa56e85deff7130926472abcff665133f089ebb126fcf8dd565bed9ba997258c436f2c109d07ff562fed95560cf4344108346fc6b2803e56956861a5dea4a2a51f0658f5f2a4083a456b36e3fe11d57311e6116916078bd8b9937ac612e6b6986ab7cdbbb0b366dd9b0bfb1bd0f919c9fb9cb06fc6ba5b90f9c69ce39f0ef50647f8b8fb1a966a7ba9833e12b6c9f305a15f166e9289dbbe1c8367df8cbe3356d9cceb00a2dddbebbd7947a026d9f4d7c6e6439d7f3dbbb3c18ff447f0e82f4ebb379ec96756c3b92da2f69f28c838738f0c2c35c91ac5e1da7b4365a3d4dba555fb049&x-goog-algorithm=GOOG4-RSA-SHA256&x-goog-credential=accord-uploader%40disco-mountain-265217.iam.gserviceaccount.com%2F20200115%2Fus-east1%2Fstorage%2Fgoog4_request&x-goog-date=20200115T225958Z&x-goog-expires=172800&x-goog-signedheaders=host'

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
  return signedGetUrl + '#' + new Date().getTime()
}
