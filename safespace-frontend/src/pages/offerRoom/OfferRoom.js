import React from 'react'
import { data } from './data'
import "./OfferRoom.scss";

export default class OfferRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: {
        city: '',
        rent: '',
        district: '',
        description: '',
        email: '',
        files: [],
      } 
    }

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFile = this.addFile.bind(this)
  }

  handleTextInputChange(event, attribute) {
    this.setState({
      ...this.state,
      offer: {
        ...this.state.offer,
        [attribute]: event.target.value,
      }
    })
  }

  addFile(file) {
    this.setState({
      ...this.state,
      offer: {
        ...this.state.offer,
        files: [...this.state.offer.files, file],
      }
    })
  }

  handleFileInputChange(event) {
    const files = event.target.files
    if (FileReader && files && files.length) {
      const fr = new FileReader()
      const addFile = this.addFile
      fr.onload = function (event) {
        addFile(event.target.result)
      }
      fr.readAsDataURL(files[0])
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const offerData = this.state.offer
    console.log(offerData)
    // TODO: send the data to BE to add an offer
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
            <label for="input--file" className="file-input-container">
              Upload files
              <input type="file" accept="image/*" name="input--file" className="file-input" onChange={ this.handleFileInputChange } />
            </label>
            <div class="gallery">
              {
                this.state.offer.files.map( file => (
                  <img src={file} className="form_img" key={file} alt="" />
                ))
              }
            </div>
          </div>
          <div className="form__row">
            <label htmlFor="input--city">
              { data.formLabels.city  }
            </label>
            <input className="" name="input--city" onChange={ (event) => this.handleTextInputChange(event, 'city') } />
          </div>
          <div className="form__row">
            <label htmlFor="input--rent">
              { data.formLabels.rent }
            </label>
            <input className="" name="input--rent" onChange={ (event) => this.handleTextInputChange(event, 'rent') } />
          </div>
          <div className="form__row">
            <label htmlFor="input--district">
              { data.formLabels.district  }
            </label>
            <input className="" name="input--district" onChange={ (event) => this.handleTextInputChange(event, 'district') } />
          </div>
          <div className="form__row">
            <label htmlFor="input--description">
              { data.formLabels.description  }
            </label>
            <input className="" name="input--description" onChange={ (event) => this.handleTextInputChange(event, 'description') } />
          </div>
          <div className="form__row">
            <label htmlFor="input--email">
              { data.formLabels.email  }
            </label>
            <input className="" name="input--email" onChange={ (event) => this.handleTextInputChange(event, 'email') } />
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
