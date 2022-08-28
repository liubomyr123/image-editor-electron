import { useState } from 'react';
import './App.scss';
import { Footer, Header, Main } from './components';
import { defaultOptions } from './components/Main/helpers';

function App() {
  const [file, setFile] = useState({ url: require('./assets/png/preview-icon.jpg'), fileObj: undefined });
  const [options, setOptions] = useState(defaultOptions);

  if (window.electronAPI) {
    window.electronAPI.getImage((e, dataURL) => {
      setFile({ url: dataURL });
    });
  };

  return (
    <div className="app">
      <Header />
      <Main
        options={options}
        setOptions={setOptions}
        file={file}
      />
      <Footer
        setOptions={setOptions}
        options={options}
        setFile={setFile}
        file={file}
      />
    </div>
  );
}

export default App;
