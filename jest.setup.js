import '@testing-library/jest-dom';

import 'jest-fetch-mock';

globalThis.fetch = require('jest-fetch-mock');

require('@testing-library/jest-dom');
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();