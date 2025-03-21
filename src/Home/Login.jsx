import React from 'react'
import room2 from '../assets/room2.jpg'

export default function Login() {
    return (
        <div className='w-full min-h-screen flex flex-col md:flex-row'>
            {/* Partie Gauche */}
            <div className='relative md:w-1/2 h-64 md:h-auto'>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center md:items-start md:justify-start">
                    <div className='md:mt-20 md:ml-10 p-6 text-center md:text-left text-center'>
                        <h1 className='text-3xl md:text-4xl text-white font-bold my-8'>Réservez maintenant</h1>
                        <p className='text-lg md:text-xl text-white/90 max-w-md'>Connectez-vous et réservez votre chambre selon vos préférences</p>
                    </div>
                </div>
                <img
                    src={room2}
                    alt="Chambre d'hôtel"
                    className='w-full h-full object-cover'
                />
            </div>

            {/* Partie Droite */}
            <div className='w-full md:w-1/2 bg-gray-50 p-8 md:p-20 flex flex-col justify-between'>
                {/* En-tête */}
                <div className='text-right'>
                    <h1 className='text-lg font-bold text-gray-900'>Interactive Brand</h1>
                </div>

                {/* Formulaire */}
                <form className='max-w-md w-full mx-auto space-y-6'>
                    <div className='space-y-2'>
                        <h2 className='text-2xl font-bold text-gray-900'>Connexion</h2>
                        <p className='text-gray-600'>Bienvenue, veuillez entrer vos identifiants</p>
                    </div>

                    <div className='space-y-4'>
                        <div className='space-y-1'>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder='exemple@email.com'
                                className='w-full px-3 py-3 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
                            />
                        </div>

                        <div className='space-y-1'>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                placeholder='••••••••'
                                className='w-full px-3 py-3 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
                            />
                        </div>

                        <div className='flex justify-between items-center pt-2'>
                            <label className='flex items-center space-x-2'>
                                <input
                                    type="checkbox"
                                    className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black'
                                />
                                <span className='text-sm text-gray-600'>Se souvenir de moi</span>
                            </label>
                            <a href="#" className='text-sm text-black font-medium hover:underline'>Mot de passe oublié ?</a>
                        </div>
                    </div>

                    {/* Boutons */}
                    <div className='space-y-4'>
                        <button className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'>
                            Se connecter
                        </button>
                        <button className='w-full bg-white text-black py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-black transition-colors'>
                            Créer un compte
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className='text-center text-sm text-gray-600'>
                    <p>Pas encore de compte ?{' '}
                        <a href="#" className='font-semibold text-black hover:underline'>S'inscrire</a>
                    </p>
                </div>
            </div>
        </div>
    )
}