
import { valueOrDefault } from '@source4society/scepter-utility-lib';
export const sendRequestToS3 = (requestHandler, file, signedUrl, contentType, injectedHeaders, injectedOptions) => {
  const additionalHeaders = valueOrDefault(injectedHeaders, []);
  const additionalOptions = valueOrDefault(injectedOptions, []);
  return requestHandler(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      ...additionalHeaders,
    },
    body: file,
    ...additionalOptions,
  });
};

