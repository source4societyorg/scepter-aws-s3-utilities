import { sendRequestToS3 } from '../src';

test('sendRequestToS3 forms an S3 PUT request object and passes it to the request handler', () => {
  const mockRequestResult = 'mockRequestResult';
  const mockSignedUrl = 'mockSignedUrl';
  const mockAdditionalHeaders = ['mockHeader1', 'mockHeader2', 'mockHeader3'];
  const mockAdditionalOptions = ['mockAdditionalOptions1', 'mockAdditionalOptions2'];
  const mockContentType = 'mockContentType';
  const mockFile = 'mockFile';

  const mockRequestHandler = (url, parameters) => {
    expect(url).toEqual(mockSignedUrl);
    expect(parameters).toEqual({
      method: 'PUT',
      headers: {
        'Content-Type': mockContentType,
        ...mockAdditionalHeaders,
      },
      body: mockFile,
      ...mockAdditionalOptions,
    });
    return mockRequestResult;
  };

  expect(sendRequestToS3(mockRequestHandler, mockFile, mockSignedUrl, mockContentType, mockAdditionalHeaders, mockAdditionalOptions)).toEqual(mockRequestResult);
});
