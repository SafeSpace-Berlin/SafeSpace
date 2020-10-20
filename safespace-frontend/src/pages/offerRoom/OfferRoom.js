import React from 'react';
import DatePicker from 'react-datepicker';
import { data } from './data';
import { toast } from 'react-toastify';
import './OfferRoom.scss';
import 'react-datepicker/dist/react-datepicker.css';

let config = require("../../config");

export default class offerRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
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

    // Setters

    this.setIsValidated = this.setIsValidated.bind(this);
    this.setRoomAttribute = this.setRoomAttribute.bind(this);

    // Event handlers

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Validation

    this.isAttributeInvalid = this.isAttributeInvalid.bind(this);
    this.isAvailableFromInvalid = this.isAvailableFromInvalid.bind(this);
    this.isAvailableToInvalid = this.isAvailableToInvalid.bind(this);
    this.getInvalidInputClass = this.getInvalidInputClass.bind(this)
  }

  // Setters

  async setIsValidated(value) {
    await this.setState({ isValidated: value })
  }
  async setRoomAttribute(attribute, value) {
    await this.setState({
      room: {
        ...this.state.room,
        [attribute]: value,
      }
    });
  }

  // Event handlers

  handleTextInputChange(attribute, value) {
    this.setRoomAttribute(attribute, value)
  }
  handleFileInputChange(event) {
    const files = event.target.files
    if (FileReader && files && files.length) {
      const fr = new FileReader()
      const setRoomAttribute = this.setRoomAttribute
      fr.onload = function (event) {
        setRoomAttribute(event.target.result)
      }
      fr.readAsDataURL(files[0])
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    const roomData = { ...this.state.room };
    await this.setIsValidated(true);
    const invalidAttributes = []
    for (let attr in roomData) {
      if (roomData.hasOwnProperty(attr) && this.isAttributeInvalid(attr)) {
        invalidAttributes.push(attr)
      }
    }
    if (invalidAttributes.length) {
      const invalidFields = invalidAttributes
        .map(attr => data.formLabels[attr])
        .join(', ');
      toast.error(
        `${data.messages.validationError}
        ${invalidFields}`
      );
    } else {
      fetch(config.url + "rooms", {
        method: "post",
        body: { room: roomData },
      })
        .then((result) => {
          if (result.ok) {
            toast.success(data.messages.createSuccess);
          } else {
            toast.error(`${result.status}: ${result.statusText}`);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }

  // Validation

  isAvailableFromInvalid() {
    if (!this.state.room['availableFrom']) return true;
    const today = new Date();
    const availableFromObj = new Date(this.state.room.availableFrom);
    return today > availableFromObj;
  }
  isAvailableToInvalid() {
    if (!this.state.room['availableTo']) return true;
    const today = new Date();
    const availableFromObj = new Date(this.state.room.availableFrom);
    const availableToObj = new Date(this.state.room.availableTo);
    return (today > availableToObj) || (availableToObj < availableFromObj);
  }
  isAttributeInvalid(attribute) {
    const isAttributeEmpty = !this.state.room[attribute];
    const isValidated = this.state.isValidated;
    if (attribute === 'availableFrom') {
      return isValidated && this.isAvailableFromInvalid();
    } else if (attribute === 'availableTo') {
      return isValidated && this.isAvailableToInvalid();
    } else if (attribute === 'photo') {
      return false;
    } else {
      return isValidated && isAttributeEmpty;
    }
  }
  getInvalidInputClass(attribute) {
    return this.isAttributeInvalid(attribute) ? 'input--invalid' : '';
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
              className={ `input ${this.getInvalidInputClass('country')}` }
              onChange={ event => this.handleTextInputChange('country', event.target.value) }
            />
          </div>
          <div className="form__row">
            <label htmlFor="input-district">
              { data.formLabels.district  }
            </label>
            <input
              id="input-district"
              className={ `input ${this.getInvalidInputClass('district')}` }
              onChange={ event => this.handleTextInputChange('district', event.target.value) }
            />
          </div>
          <div className="form__row">
            <label htmlFor="input-city">
              { data.formLabels.city  }
            </label>
            <input
              id="input-city"
              className={ `input ${this.getInvalidInputClass('city')}` }
              onChange={ event => this.handleTextInputChange('city', event.target.value) }
            />
          </div>
          <div className="form__row">
            <label htmlFor="input-price">
              { data.formLabels.price }
            </label>
            <input
              id="input-price"
              className={ `input ${this.getInvalidInputClass('price')}` }
              onChange={ event => this.handleTextInputChange('price', event.target.value) }
            />
          </div>
          <div className="form__row">
            <label htmlFor="input-description">
              { data.formLabels.description  }
            </label>
            <input
              id="input-description"
              className={ `input ${this.getInvalidInputClass('description')}` }
              onChange={ event => this.handleTextInputChange('description', event.target.value) }
            />
          </div>
          <div className="form__row form__row--horizontal">
            <div className="form__row">
              <label htmlFor="input-available-from">
                { data.formLabels.availableFrom }
              </label>
              <DatePicker
                id="input-available-from"
                className={ `input ${this.getInvalidInputClass('availableFrom')}` }
                dateFormat="yyyy-MM-dd"
                selected={this.state.room.availableFrom}
                onChange={ date => this.handleTextInputChange('availableFrom', date) }
              />
            </div>
            <div className="form__row">
              <label htmlFor="input-available-to">
                { data.formLabels.availableTo  }
              </label>
              <DatePicker
                id="input-available-to"
                className={ `input ${this.getInvalidInputClass('availableTo')}` }
                dateFormat="yyyy-MM-dd"
                selected={this.state.room.availableTo}
                onChange={ date => this.handleTextInputChange('availableTo', date) }
              />
            </div>
          </div>
          <div className="form__row">
            <label htmlFor="input-contact">
              { data.formLabels.contact  }
            </label>
            <input
              id="input-contact"
              className={ `input ${this.getInvalidInputClass('contact')}` }
              onChange={ (event) => this.handleTextInputChange('contact', event.target.value) }
            />
          </div>
          <div className="form__row">
            <button
              className="form__submit-button"
              onClick={ this.handleSubmit }
            >
              { data.formLabels.submit }
            </button>
          </div>
        </div>
      </div>
    )
  }
}
