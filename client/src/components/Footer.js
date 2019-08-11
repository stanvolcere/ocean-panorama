import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <footer className="footer__landing">
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
                        <span>Phone: +248 2 524 756</span>
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
            </footer>
        )
    }
}

export default Footer;