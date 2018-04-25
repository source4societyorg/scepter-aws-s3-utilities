import { sendRequestToS3, getContentTypeFromExtension, asyncFileReader } from '../src';

test('sendRequestToS3 forms an S3 PUT request object and passes it to the request handler', () => {
  const mockRequestResult = 'mockRequestResult';
  const mockSignedUrl = 'mockSignedUrl';
  const mockMethod = 'mockMethod';
  const mockAdditionalHeaders = ['mockHeader1', 'mockHeader2', 'mockHeader3'];
  const mockAdditionalOptions = ['mockAdditionalOptions1', 'mockAdditionalOptions2'];
  const mockContentType = 'mockContentType';
  const mockFile = 'mockFile';

  const mockRequestHandler = (url, parameters) => {
    expect(url).toEqual(mockSignedUrl);
    expect(parameters).toEqual({
      method: mockMethod,
      headers: {
        'Content-Type': mockContentType,
        ...mockAdditionalHeaders,
      },
      body: mockFile,
      ...mockAdditionalOptions,
    });
    return mockRequestResult;
  };

  expect(sendRequestToS3(mockRequestHandler, mockFile, mockSignedUrl, mockContentType, mockMethod, mockAdditionalHeaders, mockAdditionalOptions)).toEqual(mockRequestResult);
});

test('getContenTypeFromExtension returns content types for common extensions', () => {
  expect(getContentTypeFromExtension('file.jpg')).toEqual('image/jpeg');
  expect(getContentTypeFromExtension('file.jpeg')).toEqual('image/jpeg');
  expect(getContentTypeFromExtension('file.png')).toEqual('image/png');
  expect(getContentTypeFromExtension('file.docx')).toEqual('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  expect(getContentTypeFromExtension('file.xlsx')).toEqual('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  expect(getContentTypeFromExtension('file.xls')).toEqual('application/vnd.ms-excel');
  expect(getContentTypeFromExtension('file.pdf')).toEqual('application/pdf');
  expect(getContentTypeFromExtension('file.gif')).toEqual('image/gif');
  expect(getContentTypeFromExtension('file.tif')).toEqual('image/tiff');
  expect(getContentTypeFromExtension('file.tiff')).toEqual('image/tiff');
  expect(getContentTypeFromExtension()).toBeUndefined();
});


test('asyncFileReader initiates a specified file reading function and returns a promise', (done) => {
  const mockFile = 'fakeFile';
  const mockResult = 'mockResult';
  const mockFileReader = class {
    mockFunction() {
      this.onload(mockResult);
    }
  };
  const mockReadFunctionName = 'mockFunction';
  const promise = asyncFileReader(mockFile, mockFileReader, mockReadFunctionName);
  promise.then((result) => {
    expect(result).toEqual(mockResult);
    done();
  });
});

test('asyncFileReader calls reject if it catches an error', (done) => {
  const mockFile = 'fakeFile';
  const mockError = new Error('mockError');
  const mockFileReader = class {
    mockFunction() {
      throw mockError;
    }
  };
  const mockReadFunctionName = 'mockFunction';
  const promise = asyncFileReader(mockFile, mockFileReader, mockReadFunctionName);
  asyncFileReader(mockFile, mockFileReader, mockReadFunctionName);
  promise.catch((exception) => {
    expect(exception).toEqual(mockError);
    done();
  });
});
