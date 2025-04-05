import React from 'react'
import { Link } from 'react-router-dom' // Assurez-vous d'avoir react-router installé
import { IoMdArrowRoundBack } from 'react-icons/io' // Importez depuis react-icons/io
import PageNotFoundImg from '../assets/pageNotFoundImg.jpg'


export default function PageNotFound() {
    return (
        <div className='flex'>
            <div>
                <img src={PageNotFoundImg} className='w-[100vw] h-[100vh]' alt="" />
            </div>

            <div className='flex justify-center text-center flex-col items-center w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
                {/* Animation SVG */}
                <div className='relative w-64 h-64 my-8'>
                    <svg className='w-full h-full' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        {/* Cercle animé */}
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="502" strokeDashoffset="502" className='animate-dash' />

                        {/* Croix animée */}
                        <line x1="60" y1="60" x2="140" y2="140" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" className='animate-fade-in' />
                        <line x1="140" y1="60" x2="60" y2="140" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" className='animate-fade-in' />
                    </svg>
                </div>

                {/* Texte 404 */}
                <h1 className='text-8xl font-extrabold my-4 bg-clip-text text-transparent bg-gradient-to-r from-brandPrimary to-blue-700'>
                    404
                </h1>

                {/* Message */}
                <p className='text-4xl font-bold uppercase mb-6'>
                    Page Not <span className='text-brandPrimary'>Found</span>
                </p>

                <p className='text-gray-600 max-w-md mb-10 px-4'>
                    La page que vous recherchez semble avoir disparu, a été déplacée ou n'existe pas.
                </p>

                {/* Boutons d'action */}
                <div className='flex flex-col sm:flex-row gap-4 w-full max-w-md px-6'>
                    <Link to="/" className='py-3 px-6 bg-brandPrimary text-white rounded-lg flex-1 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-300 shadow-md'>
                        <IoMdArrowRoundBack className='text-xl' />
                        <span>Retour à l'accueil</span>
                    </Link>

                    <button onClick={() => window.history.back()} className='py-3 px-6 border-2 border-gray-300 rounded-lg flex-1 hover:bg-gray-100 transition-colors duration-300'>
                        Page précédente
                    </button>
                </div>

                {/* Style pour l'animation */}
                <style jsx>{`
                @keyframes dashAnimation {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                .animate-dash {
                    animation: dashAnimation 2s ease-in-out forwards;
                }
                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn 0.5s ease-in-out forwards 1.5s;
                }
            `}</style>
            </div>
        </div>

    )
}