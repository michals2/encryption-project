import React from "react";


const Passphrase = props => {
  return <div className="passphrase">
    <p className="passphrase-line">Your Passphrase - <span className="link">{props.passphrase}</span></p>
    <p onClick={props.generatePassphrase} className=" passphrase-line link">Generate new passphrase</p>
  </div>;
}
export default Passphrase;
