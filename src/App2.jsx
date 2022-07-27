import React from "react";
import Layout from "./components/layout";
import Dropzone from "react-dropzone";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import Model from "./components/model";

export default function App() {
  //global state
  const [state, dispatch] = useStateValue();
  const { step, steps, isLoading } = state;


  const setSteps = (data) => {
    dispatch({ type: actionTypes.SET_STEPS, steps: data })
  }

  const handleClearData = () => {

    // for enumerable properties of shallow/plain object
    // for (var key in file) {
    //     // this check can be safely omitted in modern JS engines
    //     // if (obj.hasOwnProperty(key))
    //     delete file[key];
    // }

    //
    dispatch({ type: actionTypes.CLEAR_STEPS })
    dispatch({ type: actionTypes.RESET_STEP })
    dispatch({ type: actionTypes.SET_STEP, step: -1 })
    //dispatch({ type: actionTypes.LOADING_FINISHED})
  }

  const handleDrop = (acceptedFiles) => {

    console.log("test", acceptedFiles);
    console.log("path", acceptedFiles[0].name);
    console.log("url", URL.createObjectURL(acceptedFiles[0]));


    // kho choi qua
    //handle mang file up vao
    let temp = {}
    for (let i = 0; i < acceptedFiles.length; i++) {
      const key = getItemKey(acceptedFiles[i].name);

      if (key == i) {
        temp[key] = URL.createObjectURL(acceptedFiles[i]);
      }
    }

    // luu o bien global
    console.log({temp})
    setSteps(temp)

    //Bật cờ loading 
    dispatch({ type: actionTypes.LOADING})
    //
  }

  //parse ten file va lay stt lam key
  function getItemKey(str) {
    const a = str.split(".")[0]
    const pieces = a.split("-")
    const last = pieces[pieces.length - 1]

    return parseInt(last);
  }

  return (
    <div className="model-container">
      <Layout>
       
        <Model />
        {/* view usign up model files */}
        <div className='absolute bottom-2 right-4'>
          {Object.keys(steps).length <= 0 ?
            <>
              <h2 className="text-lg">UPLOAD</h2>
              <Dropzone onDrop={handleDrop} className="">
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone p-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer" })}>
                    <input {...getInputProps()} />
                    <p>Select files</p>
                  </div>
                )}
              </Dropzone>
            </>
            : <button className="p-2 bg-gray-200 rounded" onClick={handleClearData}>CLEAR</button>}
        </div>
      </Layout>
    </div>
  );
}