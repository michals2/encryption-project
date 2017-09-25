import React, { Component } from "react";
import axios from "axios";

// Styling
import theme from "./assets/react-toolbox/theme";
import "./assets/react-toolbox/theme.css";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import "material-design-icons/iconfont/material-icons.css";
import "./App.css";

// Components
import Card from "react-toolbox/lib/card/Card";
import CardTitle from "react-toolbox/lib/card/CardTitle";
import CardText from "react-toolbox/lib/card/CardText";
import CardActions from "react-toolbox/lib/card/CardActions";
import Button from "react-toolbox/lib/button/Button";
import Input from "react-toolbox/lib/input/Input";
import DatePicker from "react-toolbox/lib/date_picker/DatePicker";
import Passphrase from "./components/Passphrase";
import Dialog from "react-toolbox/lib/dialog/Dialog";
import Avatar from "react-toolbox/lib/avatar/Avatar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passphrase: "Rp9Vz",
      dialogActive: false,
      name: ""
    };
    this.setNewPassphrase = this.setNewPassphrase.bind(this);
    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  generatePassphrase() {
    const length = 5;
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  setNewPassphrase() {
    this.setState({ passphrase: this.generatePassphrase() });
  }

  toggleDialog() {
    console.log(this);
    this.setState({ dialogActive: !this.state.dialogActive });
  }

  dialogActions = [
    { label: "CLOSE", onClick: this.toggleDialog.bind(this) },
    { label: "DECRYPT", onClick: this.decrypt.bind(this) }
  ];

  decrypt() {
    console.log("decrypting!");
    const action = "decrypt";
    const payload = this.state.encryptedMessage;
    axios
      .post(`/${this.state.passphrase}`, {
        action,
        payload
      })
      .then(response => {
        const responseData = response.data;
        console.log("responseData --> ", responseData);
        this.setState({
          name: responseData.name,
          message: responseData.message,
          expiration: new Date(responseData.expiration)
        });
        this.toggleDialog();
      })
      .catch(error => {
        console.log(error);
      });
  }

  encrypt() {
    const action = "encrypt";
    const payload = {
      name: this.state.name,
      message: this.state.message,
      expiration: Date.parse(this.state.expiration)
    };
    // console.log(payload);
    axios
      .post(`/${this.state.passphrase}`, {
        action,
        payload
      })
      .then(response => {
        this.handleChange("encryptedMessage", response.data);
        this.toggleDialog();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="container">
          <Card style={{ width: "400px" }}>
            <CardTitle title="Tovia's Enigma" />
            <CardText>
              <div className="name-container">
                <Avatar title={this.state.name.toUpperCase()} />
                <Input
                  type="text"
                  required
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this, "name")}
                />
              </div>
              <Input
                type="text"
                multiline required
                label="Message"
                maxLength={120}
                value={this.state.message}
                onChange={this.handleChange.bind(this, "message")}
              />
              <DatePicker
                required
                label="Expiration date"
                onChange={this.handleChange.bind(this, "expiration")}
                value={this.state.expiration}
                sundayFirstDayOfWeek
              />
            </CardText>
            <CardActions>
              <Button label="Encrypt" onClick={this.encrypt} />
              <Button label="Decrypt" onClick={this.toggleDialog} />
            </CardActions>
          </Card>
          <Dialog
            actions={this.dialogActions}
            active={this.state.dialogActive}
            onEscKeyDown={this.toggleDialog}
            onOverlayClick={this.toggleDialog}
            title="De/Encrypt"
          >
            <Input
              type="text"
              multiline
              label="Message*"
              value={this.state.encryptedMessage}
              onChange={this.handleChange.bind(this, "encryptedMessage")}
            />
          </Dialog>
          <Passphrase
            generatePassphrase={this.setNewPassphrase}
            passphrase={this.state.passphrase}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
