import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div className="footer__landing">
                <div className="footer__info">
                    <div className="footer__info__header">
                        <span>Location</span>
                    </div>
                    <div className="footer__info__sub">
                        <span>Au Cap, Mahe, Seychelles</span>
                    </div>
                </div>
                <div className="footer__info">
                    <div className="footer__info__header">
                        <span>Contact Us</span>
                    </div>
                    <div className="footer__info__sub">
                        <span>E-mail: hellooceanpanorama@gmail.com</span>
                        <span>Phone: +248 2524 756</span>
                    </div>
                </div>
                <div className="footer__info">
                    <div className="footer__info__header">
                        <span>Other</span>
                    </div>
                    <div className="footer__info__sub">
                        <span>Policies</span>
                        <span>FAQs</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;