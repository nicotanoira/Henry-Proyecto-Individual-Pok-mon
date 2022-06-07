import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css'

export default function LandingPage() {
    return (
        <div className='landing-body'>
            <Link to='/home'>
                <img className='img-landing-logo' src='https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png' alt='logo'/>
            </Link>
        </div>
    )
}