import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";
//

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};



function CustomModal({desc}) {
  return (
    <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    contentStyle={contentStyle}
    >
        {desc}
    </Popup>
  )
}
export default CustomModal