import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import OCRApp from './OCRApp';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<OCRApp />);