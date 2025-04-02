import React, { useRef, useState } from 'react';
import room2 from '../assets/room2.jpg';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth, fireDB } from '../firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const nomRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const hotelNameRef = useRef();
    const descriptionRef = useRef();
    const addressRef = useRef();
    const [userType, setUserType] = useState('client');
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();

        // Validation des champs obligatoires
        if (!nomRef.current.value || !emailRef.current.value || !passwordRef.current.value) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Validation spécifique aux admins
        if (userType === 'admin' && (!hotelNameRef.current.value || !addressRef.current.value)) {
            alert('Veuillez remplir tous les champs pour les administrateurs');
            return;
        }

        try {
            // 1. Création de l'utilisateur Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );

            // 2. Création du document utilisateur de base
            const userData = {
                nom: nomRef.current.value,
                email: emailRef.current.value,
                uid: userCredential.user.uid,
                role: userType, // 'client' ou 'admin'
                createdAt: Timestamp.now()
            };

            const userRef = doc(fireDB, "users", userCredential.user.uid);
            await setDoc(userRef, userData);

            // 3. Traitement spécifique pour les admins (création de l'hôtel)
            if (userType === 'admin') {
                const hotelData = {
                    nom: hotelNameRef.current.value,
                    address: addressRef.current.value,
                    description: descriptionRef.current.value || "",
                    adminId: userCredential.user.uid, // L'admin est propriétaire
                    createdAt: Timestamp.now()
                };

                // Création du document hôtel
                const hotelRef = await addDoc(collection(fireDB, "hotels"), hotelData);

                // Mise à jour de l'utilisateur avec la référence à l'hôtel
                await updateDoc(userRef, {
                    hotelId: hotelRef.id
                });
            }

            // Reset du formulaire
            nomRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            if (hotelNameRef.current) hotelNameRef.current.value = "";
            if (descriptionRef.current) descriptionRef.current.value = "";
            if (addressRef.current) addressRef.current.value = "";

            navigate('/');

        } catch (error) {
            console.error("Erreur d'inscription:", error);

            if (error.code === 'auth/email-already-in-use') {
                alert("Cet email est déjà utilisé. Veuillez en choisir un autre.");
            } else if (error.code === 'auth/weak-password') {
                alert("Mot de passe trop faible. Utilisez au moins 6 caractères.");
            } else {
                alert(`Erreur: ${error.message}`);
            }
        }
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value === 'Administrateur d\'un Hotel' ? 'admin' : 'client');
    };

    return (
        <div className='w-full min-h-screen flex flex-col md:flex-row'>
            {/* Partie Gauche (identique) */}
            <div className='relative md:w-1/2 h-64 md:h-auto'>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center md:items-start md:justify-start">
                    <div className='md:mt-20 md:ml-10 p-6 text-center md:text-left text-center'>
                        <h1 className='text-3xl md:text-4xl text-white font-bold my-8'>Creation de Compte</h1>
                        <p className='text-lg md:text-xl text-white/90 max-w-md'>c'est votre compte, selon voter besoin.</p>
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
                <form onSubmit={signUp} className='max-w-md w-full mx-auto space-y-6'>
                    <div className='space-y-2'>
                        <h2 className='text-2xl font-bold text-gray-900'>Créer un compte</h2>
                        <p className='text-gray-600'>Bienvenue, veuillez entrer vos identifiants</p>
                    </div>

                    <div className="space-y-1">
                        <select
                            onChange={handleUserTypeChange}
                            className='w-full my-2 p-2 rounded-xl focus:outline-none'
                        >
                            <option>Client (normal user)</option>
                            <option>Administrateur d'un Hotel</option>
                        </select>
                    </div>

                    <div className='space-y-4'>
                        {/* Champs communs */}
                        <div className='space-y-1'>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Nom</label>
                            <input
                                ref={nomRef}
                                type="text"
                                id="nom"
                                placeholder='Votre nom'
                                className='w-full px-3 py-3 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
                                required
                            />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                            <input
                                ref={emailRef}
                                type="email"
                                id="email"
                                placeholder='exemple@email.com'
                                className='w-full px-3 py-3 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
                                required
                            />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Mot de passe</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                id="password"
                                placeholder='••••••••'
                                className='w-full px-3 py-3 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
                                required
                            />
                        </div>

                        {/* Champs spécifiques aux administrateurs */}
                        {userType === 'admin' && (
                            <>
                                <div className='space-y-1'>
                                    <label htmlFor="hotelName" className='block text-sm font-medium text-gray-700'>Nom de l'hôtel</label>
                                    <input
                                        ref={hotelNameRef}
                                        type="text"
                                        id="hotelName"
                                        placeholder='Nom de votre hôtel'
                                        className='w-full px-3 py-3 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                                    <textarea
                                        ref={descriptionRef}
                                        id="description"
                                        placeholder='Description de votre hôtel'
                                        className='w-full px-2 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
                                        rows="2"
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <label htmlFor="address" className='block text-sm font-medium text-gray-700'>Adresse de l'hôtel</label>
                                    <input
                                        ref={addressRef}
                                        type="text"
                                        id="address"
                                        placeholder='Adresse complète'
                                        className='w-full px-3 py-3 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
                                    />
                                </div>
                            </>
                        )}

                        <div className='flex justify-between items-center pt-2'>
                            <label className='flex items-center space-x-2'>
                                <input
                                    type="checkbox"
                                    className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black'
                                />
                                <span className='text-sm text-gray-600'>Se souvenir de moi</span>
                            </label>
                        </div>
                    </div>

                    {/* Boutons */}
                    <div className='space-y-4'>
                        <button
                            type="submit"
                            className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'
                        >
                            Créer compte
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className='text-center text-sm text-gray-600'>
                    <p>Vous avez déjà un compte {' '}
                        <Link to="/" className='font-semibold text-black hover:underline'>Connectez-vous</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}