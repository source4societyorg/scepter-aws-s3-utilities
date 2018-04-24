# scepter-aws-utilities

Useful utilities for common AWS S3 situations

[![scepter-logo](http://res.cloudinary.com/source-4-society/image/upload/v1519221119/scepter_hzpcqt.png)](https://github.com/source4societyorg/SCEPTER-core)

[![airbnb-codestyle](https://camo.githubusercontent.com/1c5c800fbdabc79cfaca8c90dd47022a5b5c7486/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](https://github.com/airbnb/javascript)

[![Build Status](https://travis-ci.org/source4societyorg/scepter-aws-s3-utilities.svg?branch=master)](https://travis-ci.org/source4societyorg/scepter-aws-s3-utilities)

[![codecov](https://codecov.io/gh/source4societyorg/scepter-aws-s3-utilities/branch/master/graph/badge.svg)](https://codecov.io/gh/source4societyorg/scepter-aws-s3-utilities)

# Usage

## sendRequestToS3

Accepts the following:

    requestHandler    // Something like whatwyg-fetch to handle the request
    file,             // The file to upload, typically the data you would send in the form POST request body
    signedUrl,        // An S3 signed url for 'putObject' 
    contentType,      // The content type header
    injectedHeaders,  // Optional additional headers to inject or override defaults
    injectedOption    // Optional additional parameters to inject or override defaults