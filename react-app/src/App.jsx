import { useState } from 'react';
import './App.scss';
import { Footer, Header, Main } from './components';

function App() {
  const [file, setFile] = useState({ url: require('./assets/png/preview-icon-bright.png'), fileObj: undefined });

  if (window.electronAPI) {
    window.electronAPI.getImage((e, dataURL) => {
      setFile({ url: dataURL });
    });
  };

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
