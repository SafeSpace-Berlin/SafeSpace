import React, { Component } from 'react'
import "./Home.scss";
import { title, content } from './data'

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="home__section home__section--welcome">
                </div>
                <div className="home__section home__section--description">
                  <div className="content">
                    <div className="content__title">
                      {title}
                    </div>
                    <div className="content__text">
                      {content}
                    </div>
                  </div>
                </div>
                <div className="home__section home__section--get-involved">
                  <div className="content">
                    <div className="content__title">
                      Get involved
                    </div>
                  </div>
                </div>
                <div className="home__section home__section--footer">
                  <div className="content">
                    <div className="content__title">
                      SafeSpace
                    </div>
                    <p>safespaceberlin@gmail.com</p>
                  </div>
                </div>
            </div>
        )
    }
}
