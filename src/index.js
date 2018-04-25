
import { valueOrDefault } from '@source4society/scepter-utility-lib';

export const asyncFileReader = (file, injectedFileReader, injectedReadFunctionName) => new Promise((resolve, reject) => {
  try {
    const FileReaderClass = valueOrDefault(injectedFileReader, FileReader);
    const reader = new FileReaderClass();
    reader.onload = resolve;
    const readFunctionName = valueOrDefault(injectedReadFunctionName, reader.readAsText.name);
    reader[readFunctionName](file);
  } catch (exception) {
    reject(exception);
  }
});

export const sendRequestToS3 = (requestHandler, file, signedUrl, contentType, injectedMethod, injectedHeaders, injectedOptions) => {
  const method = valueOrDefault(injectedMethod, 'PUT');
  const additionalHeaders = valueOrDefault(injectedHeaders, []);
  const additionalOptions = valueOrDefault(injectedOptions, []);
  return requestHandler(signedUrl, {
    method,
    headers: {
      'Content-Type': contentType,
      ...additionalHeaders,
    },
    body: file,
    ...additionalOptions,
  });
};

export const getContentTypeFromExtension = (filenameArgument) => {
  const filename = valueOrDefault(filenameArgument, '');
  const parts = filename.split('.');
  const extension = parts[parts.length - 1];
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'pdf':
      return 'application/pdf';
    case 'gif':
      return 'image/gif';
    case 'tif':
    case 'tiff':
      return 'image/tiff';
    default:
      return undefined;
  }
};
