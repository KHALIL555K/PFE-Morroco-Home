import React, { useEffect, useState } from 'react'
import Title from './Title'
// import { tableData } from '../../constants/index'
import { MdAutoDelete } from 'react-icons/md'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { auth, fireDB } from '../../firebase/firebaseConfig'
import { deleteUser } from 'firebase/auth'

export default function Table() {

    const [Receptionniste, setReceptionniste] = useState([]);


    //affiche les receptionniste ...
    const fetchReceptionnistes = async () => {
        try {
            // Requête Firestore pour récupérer les réceptionnistes
            const q = query(
                collection(fireDB, 'users'),
                where('role', '==', 'receptionniste')
            );

            const querySnapshot = await getDocs(q);
            const receptionnistesList = querySnapshot.docs.map(doc => ({
                id: doc.id, // Firestore génère automatiquement un ID
                ...doc.data() // Données du document
            }));

            setReceptionniste(receptionnistesList);

        } catch (error) {
            console.error("Erreur Firestore:", error);
        }
    };


    //supprimer un receptionniste ...
    const supprimerReceptionniste = async (id, email) => {
        try {
            if (!window.confirm(`Voulez-vous vraiment supprimer ${email} ?`)) return;

            // Suppression du document Firestore
            await deleteDoc(doc(fireDB, 'users', id));

            // Optionnel : Suppression du compte d'authentification
            // Note: Cela nécessite que l'admin soit récemment connecté
            try {
                const user = auth.currentUser;
                if (user && user.email === email) {
                    await deleteUser(user);
                }
            } catch (authError) {
                console.warn("Impossible de supprimer le compte auth:", authError);
            }

            // Mise à jour de l'état local
            setReceptionniste(prev => prev.filter(r => r.id !== id));
            alert("Réceptionniste supprimé avec succès");

        } catch (error) {
            console.error("Erreur de suppression:", error);
            alert(`Échec de la suppression: ${error.message}`);
        }
    };



    useEffect(() => {
        fetchReceptionnistes();
    }, []);

    console.log(Receptionniste)

    return (
        <div className='flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300 '>
            <Link to={'/Dashbord/Admin/Create'} className='bg-brandPrimary text-white p-3 block max-w-fit rounded-xl mb-5 dark:bg-slate-300 dark:text-slate-600'>
                ajouter un nouveau Receptionniste
            </Link>

            <Title>les Receptionnistes de votre Hotel </Title>

            <table className='min-w-full '>
                <thead>
                    <tr className='text-sm md:text-base'>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>ID</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Nom</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Prenom</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Email</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Actif</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Operation :</th>
                    </tr>
                </thead>

                <tbody>
                    {Receptionniste.map(({ id, nom, prenom, email, actif }) => (
                        <tr key={id} className="border-t">
                            <td className='px-4 py-3'>{id}</td>
                            <td className='px-4 py-3'>{nom}</td>
                            <td className='px-4 py-3'>{prenom}</td>
                            <td className='px-4 py-3'>{email}</td>
                            <td className='px-4 py-3'>
                                <div className="flex items-center">
                                    {actif ? (
                                        <div className="relative">
                                            <div className="w-5 h-5 bg-green-500 rounded-full shadow-lg shadow-green-500/30 animate-pulse"></div>
                                            <div className="absolute inset-0 rounded-full bg-green-400 opacity-70 animate-ping"></div>
                                        </div>
                                    ) : (
                                        <div className="w-5 h-5 bg-red-500 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-200"></div>
                                    )}
                                    <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                                        {actif ? 'Actif' : 'Inactif'}
                                    </span>
                                </div>
                            </td>
                            <td className='px-4 py-3'>
                                <button className="bg-blue-500 text-xl p-3 rounded-lg text-white mr-3">
                                    <FaRegPenToSquare />
                                </button>
                                <button onClick={() => supprimerReceptionniste(id, email)} className="bg-red-500 text-white text-xl p-3 rounded-lg">
                                    <MdAutoDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
