import axios from 'axios';

// When running on client, we use our own internal API proxy to avoid CORS
// When running on server, we could potentially call direct, but for simplicity let's route all through proxy or just use relative path
const api = axios.create({
  baseURL: '/api/proxy',
});

// We don't need the interceptor for the API key anymore on the client side
// because the proxy adds it. The proxy lives on the server.
// However, we need to pass the 'endpoint' param so the proxy knows where to go.

export default api;
