import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Footer, Header, Main } from './components';
import { updateFile } from './redux/slicers/fileSlicer';

import './App.scss';

const App = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  // document.addEventListener('keydown', (event) => {
  //   console.log('event====', event.key);
  // });

  const zoom = (e) => {
    if (window.electronAPI) {

      window.electronAPI.setZoom(e.deltaY);
    };
  };

  document.addEventListener('keydown', (event) => {
    // console.log('event====', event);
    if (event.ctrlKey) {
      console.log('e====', window?.electronAPI);
    }
  });

  document.addEventListener('wheel', zoom, { passive: false });


  if (window.electronAPI) {
    window.electronAPI.getImage((e, dataURL) => {
      dispatch(updateFile(
        {
          file: {
            fileUrl: dataURL,
            fileObj: {},
            isDefault: false
          }
        }
      ));
    });
  };

  return (
    <div className="app">
      <Header />
      <Main
        canvasRef={canvasRef}
      />
      <Footer
        canvasRef={canvasRef}
      />
    </div>
  );
};

export default App;
