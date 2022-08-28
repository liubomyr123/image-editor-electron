import { useState } from 'react';
import './App.scss';
import { Footer, Header, Main } from './components';

function App() {
  const [file, setFile] = useState(null);

  return (
    <div className="app">
      <Header />
      <Main
        file={file}
      />
      <Footer
        setFile={setFile}
        file={file}
      />
    </div>
  );
}

export default App;
