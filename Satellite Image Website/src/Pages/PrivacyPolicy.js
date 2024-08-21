import React from 'react'
import './privacypolicy.css'

const PrivacyPolicy = () => {
  return (
    <div className='privacy-policy'>
      <h1>PRIVACY POLICY</h1>
      <div className='policy-section'>
        <h2>What the Privacy Policy Covers</h2>
        <p>
          This privacy policy outlines how we collect, use, and protect your personal information when you use our website and services. It covers topics such as the types of data we gather, data security measures, third-party integrations, and your rights regarding your personal data.
        </p>
        <h2>Information Collection and Use</h2>
        <p>
          We collect personal information such as your name, email address, and
          login credentials when you create an account on our website. This
          information is used to provide you with access to our services and
          features.
        </p>
      </div>
      <div className='policy-section'>
        <h2>Data Security</h2>
        <p>
          We take appropriate measures to ensure the security of your personal
          information. However, no method of transmission over the internet or
          electronic storage is 100% secure. While we strive to use commercially
          acceptable means to protect your personal information, we cannot
          guarantee its absolute security.
        </p>
      </div>
      <div className='policy-section'>
        <h2>Third-Party Services</h2>
        <p>
          Our website may use third-party services for certain functionalities,
          such as satellite image processing or data analysis. These third-party
          services may have their own privacy policies, which we recommend you
          review.
        </p>
      </div>
      <div className='policy-section'>
        <h2>Changes to this Privacy Policy</h2>
        <p>
          We reserve the right to modify this privacy policy at any time. Any
          changes will be posted on this page, and we encourage you to review
          this policy periodically.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
