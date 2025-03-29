import React, { useRef } from 'react'
import room2 from '../../assets/room2.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/firebaseConfig";

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    // const navigate = useNavigate()
    const navigate = useNavigate();

    const logIn = async (e) => {
        e.preventDefault();
        // const navigate = useNavigate();

        try {
            // 1. Authentification avec Firebase Auth
            const userCredential = await signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );
            const user = userCredential.user;

            // 2. Vérification de l'utilisateur authentifié
            if (!user || !user.uid) {
                throw new Error("Échec de l'authentification");
            }

            // 3. Récupération des données utilisateur depuis Firestore
            const userDocRef = doc(fireDB, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                console.error("Profil utilisateur introuvable dans la base de données");
                alert("Profil utilisateur introuvable. Veuillez contacter l'administration.");
                return;
            }

            const userData = userDoc.data();
            const userType = userData.type; // 'admin' ou 'client'

            // 4. Stockage et redirection en fonction du type d'utilisateur
            const userInfo = { ...user, ...userData };
            if (userType === 'admin') {
                localStorage.setItem('admin', JSON.stringify(userInfo));
                navigate('/Dashbord/Admin');
            } else if (userType === 'client') {
                localStorage.setItem('user', JSON.stringify(userInfo));
                navigate('/Hotels');
            } else {
                console.error("Type d'utilisateur inconnu");
                alert("Type d'utilisateur inconnu. Veuillez contacter l'administration.");
            }
        } catch (error) {
            console.error('Erreur :', error.message);

            // Gestion des erreurs spécifiques
            if (error.code === 'auth/wrong-password') {
                alert('Mot de passe incorrect');
            } else if (error.code === 'auth/user-not-found') {
                alert("Utilisateur non trouvé");
            } else {
                alert('Erreur de connexion : ' + error.message);
            }
        }
    };

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
                                ref={emailRef}
                                type="email"
                                id="email"
                                placeholder='exemple@email.com'
                                className='w-full px-3 py-3 border-b-2 border-gray-300 focus:border-black focus:outline-none bg-transparent transition-colors'
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
                        </div>
                    </div>

                    {/* Boutons */}
                    <div className='space-y-4'>
                        <button onClick={logIn} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'>
                            Se connecter
                        </button>
                        <Link to={'/Register'} className='w-full bg-white text-black py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-black text-center transition-colors block'>
                            Créer un compte
                        </Link>
                    </div>
                </form>


            </div>
        </div>
    )
}