import React, { Children } from "react";
import { Helmet } from "react-helmet-async";
// { closeModel, children }
const Model = ({ closeModel, children }) => {
  return (
    <div className="parent-form">
      <Helmet>
        <style type="text/css">
          {`
        .parent-form {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #00000073;
          display: flex;
          align-items: center;
          justify-content: center;

        }
        .modal {
          background-color: whitesmoke;
          width: 460px;
          height: 320px;
          border-radius: 20px;
          padding:20px;
          position: fixed;
          scale: 1;
          transition: 0.3s;
          animation: myanim .3s linear;
          z-index: 22;

        }
        
        .close {
          font-size: 22px;
          color: #444;
          position: absolute;
          top: 8px;
          right: 20px;
          cursor: pointer;

        }
        .close:hover {
          color: #2F7BD6;
          font-size: 21px;
          transform: rotate(180deg);
          transition: 0.2s;
        }
        @keyframes myanim {
          0%{scale: 0;}
          100%{scale: 1;}
        }
        
        `}
        </style>
      </Helmet>

      <form className={`modal`}>
        <div
          onClick={() => {
            closeModel();
          }}
          className="close"
        >
          x
        </div>
        {children}
      </form>
    </div>
  );
};

export default Model;
