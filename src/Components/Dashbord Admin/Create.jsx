import React, { useRef } from 'react';
import { auth, fireDB } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Create() {

    const NomRef = useRef();
    const PrenomRef = useRef();
    const EmailRef = useRef();
    const PasswordRef = useRef();


    const navigate = useNavigate()

    const creeReceptionniste = async (e) => {
        e.preventDefault();

        // Validation des champs
        if (!NomRef.current.value || !PrenomRef.current.value || !EmailRef.current.value || !PasswordRef.current.value) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        try {
            // 1. Récupérer l'administrateur connecté et son hôtel
            const adminId = auth.currentUser.uid;
            const adminDoc = await getDoc(doc(fireDB, "users", adminId));

            if (!adminDoc.exists()) {
                throw new Error("Administrateur non trouvé");
            }

            const adminData = adminDoc.data();

            // Vérifier que l'admin a bien un hôtel associé
            if (!adminData.hotelId) {
                throw new Error("Cet administrateur n'est associé à aucun hôtel");
            }

            // 2. Créer le compte authentification
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                EmailRef.current.value,
                PasswordRef.current.value
            );

            // 3. Créer le document utilisateur dans Firestore
            const receptionnisteData = {
                nom: NomRef.current.value,
                prenom: PrenomRef.current.value,
                email: EmailRef.current.value,
                password: PasswordRef.current.value,
                uid: userCredential.user.uid,
                role: 'receptionniste',
                hotelId: adminData.hotelId, // ID récupéré de l'admin
                actif: true,
                creePar: adminId, // Référence à l'admin créateur
                dateCreation: Timestamp.now()
            };

            await setDoc(doc(fireDB, "users", userCredential.user.uid), receptionnisteData);

            // 4. Mettre à jour la liste des réceptionnistes dans l'hôtel (optionnel mais recommandé)
            await updateDoc(doc(fireDB, "hotels", adminData.hotelId), {
                receptionnistes: arrayUnion(userCredential.user.uid)
            });

            // 5. Redirection
            navigate('/Dashboard/Admin');
            alert('Réceptionniste créé avec succès!');

        } catch (error) {
            console.error("Erreur création réceptionniste:", error);
            alert(`Erreur: ${error.message}`);
        }
    }



    return (
        <div className="flex justify-center items-center min-h-screen  p-4">
            <div className="bg-white flex flex-col md:flex-row items-center p-8 rounded-xl shadow-lg w-full max-w-4xl">

                {/* Avatar Section */}
                <div className="flex flex-col items-center md:pr-8 md:border-r mb-6 md:mb-0">
                    <div className='relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg flex items-center justify-center overflow-hidden'>
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                    <p className="mt-3 text-gray-500 font-medium">Photo de profil</p>
                </div>

                {/* Formulaire Section */}
                <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-0 md:px-6">

                        {/* Nom */}
                        <div className='space-y-1'>
                            <label htmlFor="nom" className='text-gray-700 font-medium'>Nom</label>
                            <div className="relative">
                                <input
                                    id="nom"
                                    type="text"
                                    placeholder='zeggani'
                                    ref={NomRef}
                                    className='w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-b-black  focus:border-transparent transition'
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Prénom */}
                        <div className='space-y-1'>
                            <label htmlFor="prenom" className='text-gray-700 font-medium'>Prénom</label>
                            <input
                                id="prenom"
                                type="text"
                                placeholder='khalil'
                                ref={PrenomRef}
                                className='w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-b-black  focus:border-transparent transition'
                            />
                        </div>

                        {/* Email */}
                        <div className='space-y-1 md:col-span-2'>
                            <label htmlFor="email" className='text-gray-700 font-medium'>Email</label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder='exemple@gmail.com'
                                    ref={EmailRef}
                                    className='w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-b-black  focus:border-transparent transition'
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Mot de passe */}
                        <div className='space-y-1 md:col-span-2'>
                            <label htmlFor="password" className='text-gray-700 font-medium'>Mot de passe</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder='••••••••'
                                    ref={PasswordRef}
                                    className='w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-b-black  focus:border-transparent transition'
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bouton de soumission */}
                    <div className="mt-8 flex justify-end">
                        <button onClick={creeReceptionniste} className="bg-gradient-to-r from-brandPrimary to-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                            Créer le Receptionniste
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}