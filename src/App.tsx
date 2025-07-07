import './App.css';
import Main from './components/Main/Main';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className='app-container'>
        <Main />
        <Analytics />
      </div>
    </LanguageProvider>
  );
}

export default App;
