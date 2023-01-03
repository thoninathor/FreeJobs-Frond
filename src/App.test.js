import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';

test('renders learn react link', () => {
  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
