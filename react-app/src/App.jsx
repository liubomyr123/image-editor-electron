import { useState } from 'react';
import './App.scss';
import { Footer, Header, Main } from './components';
import { defaultOptions } from './components/Main/helpers';

function App() {
  const [file, setFile] = useState(null);
  const [options, setOptions] = useState(defaultOptions);

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
