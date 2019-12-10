import React from 'react';
import '../pageStyles/Footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <div id="footerBG">
                <div className="footerright">
                    <div id="ftr-contact">
                        <a href="mailto:achau@ufl.edu">blaiseabowman@ufl.edu</a>
                    </div>
                </div>
                <div className="footerCenter">

                </div>
                <div className="footerleft">
                    <div class="copyright">
                        Copyright © 2019 Blaise Bowman & SSWC
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;