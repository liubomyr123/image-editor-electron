import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Footer, Header, Main } from './components';
import { updateFile } from './redux/slicers/fileSlicer';

import './App.scss';
// import { useState } from 'react';

const App = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  // const [zoomValue, setZoomValue] = useState(1);

  // document.addEventListener('keydown', (event) => {
  //   console.log('event====', event.key);
  // });

  // const zoom = (e) => {
  //   if (window.electronAPI) {

  //     window.electronAPI.setZoom(e.deltaY);
  //   };
  // };

  // document.addEventListener('keydown', (event) => {
  //   // console.log('event====', event);
  //   if (event.ctrlKey) {
  //     console.log('e====', window?.electronAPI);
  //   }
  // });

  // document.addEventListener('wheel', zoom, { passive: false });

  let zoomValue = 1;
  window.addEventListener("wheel", (event) => {
    if (event.ctrlKey && window.electronAPI) {
      // sizeIt();
      if (event.deltaY > 0) {
        zoomValue = zoomValue - 0.1
      } else {
        zoomValue = zoomValue + 0.1
      }
      console.log('zoomValue====', zoomValue);
      window.electronAPI.setZoom(zoomValue);
      console.log("ctrl key down on wheel event", event);
    }
  });
  // window.electronAPI.getZoom((e, zoomFactor) => {
  //   console.log('zoomFactor====', zoomFactor);
  //   // setZoomValue(zoomFactor);
  // });

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
