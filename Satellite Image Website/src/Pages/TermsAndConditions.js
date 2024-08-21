import React from 'react';
import './termsandconditions.css'; 

const TermsAndConditions = () => {
    return (
        <div className="terms-container">
            <h1 className='terms-h1'>Terms and Conditions</h1>
            <p className='terms-p'> Welcome to the official website of ISMEA. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use.</p>
            <h2 className='terms-h2'>1. Usage of Website</h2>
            <p className='terms-p'>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>
            <h2 className='terms-h2'>2. Cookies</h2>
            <p className='terms-p'>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties.</p>
            <h2 className='terms-h2'>3. Disclaimer</h2>
            <p className='terms-p'>The information contained in this website is for general information purposes only. The information is provided by us and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>
            <h2 className='terms-h2'>4. Changes to Terms</h2>
            <p className='terms-p'>We reserve the right to modify these terms and conditions at any time. You should check this page regularly to ensure that you are aware of any changes.</p>
        </div>
    );
};

export default TermsAndConditions;