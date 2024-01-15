import {React} from "react";
import Form from "./Form";

export default function Modal({setShowModal, template}) {

  let placeholders = [];
  if (template) {
    placeholders = extractPlaceholders(template.content);
  }

  function extractPlaceholders(template) {
    const regex = /\{([^\}]+)\}/g; // finds all {placeholders}
    let placeholders = template.match(regex) || [];
    return placeholders.map(p => p.replace(/[{}]/g, '')); 
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5">
              <h3 className="text-3xl font-semibold">
                {template.title}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed opacity-10">
                {template.content}
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Form values={placeholders} state= {template.content} />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}