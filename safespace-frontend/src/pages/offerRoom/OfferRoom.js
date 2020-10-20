import React from 'react';
import DatePicker from 'react-datepicker';
import { data } from './data';
import './OfferRoom.scss';
import 'react-datepicker/dist/react-datepicker.css';

let config = require("../../config");

export default class roomRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {
        availableFrom: '',
        availableTo: '',
        country: '',
        city: '',
        price: '',
        district: '',
        description: '',
        contact: '',
        photo: null,
      }
    };

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleDatePickerSelect = this.handleDatePickerSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
  }

  handleTextInputChange(event, attribute) {
    this.setState({
      ...this.state,
      room: {
        ...this.state.room,
        [attribute]: event.target.value,
      }
    });
  }

  handleDatePickerSelect(date, attribute) {
    if (!['availableFrom', 'availableTo'].includes(attribute)) {
      return
    }
    this.setState({
      ...this.state,
      room: {
        ...this.state.room,
        [attribute]: date,
      },
    });
  }

  addPhoto(file) {
    this.setState({
      ...this.state,
      room: {
        ...this.state.room,
        photo: file,
      }
    });
  }

  handleFileInputChange(event) {
    const files = event.target.files
    if (FileReader && files && files.length) {
      const fr = new FileReader()
      const addPhoto = this.addPhoto
      fr.onload = function (event) {
        addPhoto(event.target.result)
      }
      fr.readAsDataURL(files[0])
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const roomData = this.state.room
    console.log(roomData)
    fetch(config.url + "rooms", {
      method: "post",
      body: { room: this.state.room },
    })
      .then((result) => {
        // success toast
      })
      .catch((error) => {
        // error toast
      });
  }

  render() {
    return (
      <div className="offerRoom">
        <div className="description">
          <div className="description__title">
            { data.description.title }
          </div>

          <div className="description__text">
            { data.description.text }
          </div>
        </div>
        <div className="form">
          <div className="form__row">
            <label htmlFor="input-file" className="file-input-container">
              Upload files
              <input type="file" accept="image/*" id="input-file" className="input input--file" onChange={ this.handleFileInputChange } />
            </label>
            <div className="gallery">
              <img
                src={ this.state.room.photo }
                className="form_img"
                alt=""
              />
            </div>
          </div>
          <div className="form__row">
            <label htmlFor="input-country">
              { data.formLabels.country  }
            </label>
            <input
              id="input-country"
              className="input input--text"
              onChange={ event => this.handleTextInputChange(event, 'country') }
            />
          </div>
          <div className="form__row">
            <label htmlFor="input-district">
              { data.formLabels.district  }
            </label>
            <input
              id="input-district"
              className="input input--text"
              onChange={ event => this.handleTextInputChange(event, 'district') }
            />
          </div>
          <div className="form__row">
            <label htmlFor="input-city">
              { data.formLabels.city  }
            </label>
            <input
              id="input-city"
              className="input input--text"
              onChange={ event => this.handleTextInputChange(event, 'city') }
            />
          </div>
          <div className="form__row">
            <label htmlFor="input-price">
              { data.formLabels.price }
            </label>
            <input
              id="input-price"
              className="input input--text"
              onChange={ event => this.handleTextInputChange(event, 'price') }
            />
          </div>
          <div className="form__row">
            <label htmlFor="input-description">
              { data.formLabels.description  }
            </label>
            <input
              id="input-description"
              className="input input--text"
              onChange={ event => this.handleTextInputChange(event, 'description') }
            />
          </div>
          <div className="form__row form__row--horizontal">
            <div className="form__row">
              <label htmlFor="input-available-from">
                { data.formLabels.availableFrom }
              </label>
              <DatePicker
                id="input-available-from"
                className="input"
                dateFormat="yyyy-MM-dd"
                selected={this.state.room.availableFrom}
                onChange={ date => this.handleDatePickerSelect(date, 'availableFrom') }
              />
            </div>
            <div className="form__row">
              <label htmlFor="input-available-to">
                { data.formLabels.availableTo  }
              </label>
              <DatePicker
                id="input-available-to"
                className="input"
                dateFormat="yyyy-MM-dd"
                selected={this.state.room.availableTo}
                onChange={ date => this.handleDatePickerSelect(date, 'availableTo') }
              />
            </div>
          </div>
          <div className="form__row">
            <label htmlFor="input-contact">
              { data.formLabels.contact  }
            </label>
            <input
              id="input-contact"
              className="input input--text"
              onChange={ (event) => this.handleTextInputChange(event, 'contact') }
            />
          </div>
          <div className="form__row">
            <button className="form__submit-button" onClick={ this.handleSubmit }>
              { data.formLabels.submit }
            </button>
          </div>
        </div>
      </div>
    )
  }
}
