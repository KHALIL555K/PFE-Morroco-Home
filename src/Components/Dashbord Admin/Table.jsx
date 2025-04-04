import React, { useEffect, useState } from 'react'
import Title from './Title'
import { MdAutoDelete } from 'react-icons/md'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { auth, fireDB } from '../../firebase/firebaseConfig'
import { deleteUser } from 'firebase/auth'

export default function Table() {
    const [receptionnistes, setReceptionnistes] = useState([])
    const [currentAdminHotel, setCurrentAdminHotel] = useState(null)
    const [loading, setLoading] = useState(true)

    // Récupérer l'hôtel de l'admin connecté
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                if (auth.currentUser) {
                    const adminQuery = query(
                        collection(fireDB, 'users'),
                        where('email', '==', auth.currentUser.email)
                    )
                    const adminSnapshot = await getDocs(adminQuery)
                    
                    if (!adminSnapshot.empty) {
                        const adminData = adminSnapshot.docs[0].data()
                        setCurrentAdminHotel(adminData.hotelId || adminData.hotel?.id)
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données admin:", error)
            }
        }
        
        fetchAdminData()
    }, [])

    // Afficher les réceptionnistes de l'hôtel de l'admin
    const fetchReceptionnistes = async () => {
        try {
            setLoading(true)
            if (!currentAdminHotel) return

            const q = query(
                collection(fireDB, 'users'),
                where('role', '==', 'receptionniste'),
                where('hotelId', '==', currentAdminHotel)
            )

            const querySnapshot = await getDocs(q)
            const receptionnistesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setReceptionnistes(receptionnistesList)
        } catch (error) {
            console.error("Erreur Firestore:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReceptionnistes()
    }, [currentAdminHotel])

    // Supprimer un réceptionniste
    const supprimerReceptionniste = async (id, email) => {
        try {
            if (!window.confirm(`Voulez-vous vraiment supprimer ${email} ?`)) return

            // Suppression du document Firestore
            await deleteDoc(doc(fireDB, 'users', id))

            // Suppression du compte d'authentification (si nécessaire)
            try {
                const user = auth.currentUser
                if (user && user.email === email) {
                    await deleteUser(user)
                }
            } catch (authError) {
                console.warn("Impossible de supprimer le compte auth:", authError)
            }

            // Mise à jour de l'état local
            setReceptionnistes(prev => prev.filter(r => r.id !== id))
            alert("Réceptionniste supprimé avec succès")
        } catch (error) {
            console.error("Erreur de suppression:", error)
            alert(`Échec de la suppression: ${error.message}`)
        }
    }

    if (loading) {
        return (
            <div className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300">
                <div className="flex justify-center items-center h-64">
                    <p>Chargement en cours...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300'>
            <Link 
                to={'/Dashbord/Admin/Create'} 
                className='bg-brandPrimary text-white p-3 block max-w-fit rounded-xl mb-5 dark:bg-slate-300 dark:text-slate-600'
            >
                Ajouter un nouveau réceptionniste
            </Link>

            <Title>Les réceptionnistes de votre hôtel</Title>

            {receptionnistes.length === 0 ? (
                <div className="text-center py-8">
                    <p>Aucun réceptionniste trouvé pour votre hôtel</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className='min-w-full'>
                        <thead>
                            <tr className='text-sm md:text-base'>
                                <th className='px-4 py-2 text-left font-semibold text-slate-400'>Nom</th>
                                <th className='px-4 py-2 text-left font-semibold text-slate-400'>Prénom</th>
                                <th className='px-4 py-2 text-left font-semibold text-slate-400'>Email</th>
                                <th className='px-4 py-2 text-left font-semibold text-slate-400'>Statut</th>
                                <th className='px-4 py-2 text-left font-semibold text-slate-400'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receptionnistes.map(({ id, nom, prenom, email, actif }) => (
                                <tr key={id} className="border-t hover:bg-gray-50 dark:hover:bg-slate-500">
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
                                    <td className='flex gap-2 mt-5'>
                                        <Link 
                                            to={`/Dashbord/Admin/Edit/${id}`}
                                            className="bg-blue-500 text-xl p-3 rounded-lg text-white mr-3 "
                                        >
                                            <FaRegPenToSquare />
                                        </Link>
                                        <button 
                                            onClick={() => supprimerReceptionniste(id, email)} 
                                            className="bg-red-500 text-white text-xl p-3 rounded-lg "
                                        >
                                            <MdAutoDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}