import { fetch } from 'global';

let fetchImplementation = fetch;

export function setImplementation(implementation) {
  fetchImplementation = implementation;
}

export default (...args) => fetchImplementation(...args);
