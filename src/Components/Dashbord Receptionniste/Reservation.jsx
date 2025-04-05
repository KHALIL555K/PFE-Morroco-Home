import { useEffect, useState } from 'react';
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    updateDoc
} from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig'; // adapte le chemin selon ton projet

export default function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                setError(null);

                const q = query(collection(fireDB, 'reservations'));

                const unsubscribe = onSnapshot(q, async (snapshot) => {
                    const reservationsData = await Promise.all(
                        snapshot.docs.map(async (docSnap) => {
                            const reservation = docSnap.data();

                            // Récupérer les données du client
                            const clientSnap = await getDoc(doc(fireDB, 'users', reservation.clientId));
                            const client = clientSnap.exists() ? clientSnap.data() : null;

                            // Récupérer les données de la chambre
                            const chambreSnap = await getDoc(doc(fireDB, 'chambres', reservation.chambreId));
                            const chambre = chambreSnap.exists() ? chambreSnap.data() : null;

                            return {
                                id: docSnap.id,
                                ...reservation,
                                client,
                                chambre,
                                createdAt: reservation.createdAt?.toDate(),
                                expiresAt: reservation.expiresAt?.toDate()
                            };
                        })
                    );

                    setReservations(reservationsData);
                    setLoading(false);
                });

                return unsubscribe;

            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const changeRoomStatus = async (roomId, newStatus) => {
        try {
            const roomRef = doc(fireDB, 'chambres', roomId);
            await updateDoc(roomRef, { status: newStatus });
            console.log('Statut de la chambre mis à jour');
        } catch (err) {
            console.error('Erreur lors de la mise à jour du statut:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3">Chargement des réservations...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-red-700">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Clients ayant réservé une chambre</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chambre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Période</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <tr key={reservation.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">
                                            {reservation.client?.prenom || 'Prénom'} {reservation.client?.nom || 'Nom'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {reservation.client?.email || 'Email non disponible'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Tel: {reservation.client?.telephone || 'Non renseigné'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            Chambre {reservation.chambre?.numero || 'N/A'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Type: {reservation.chambre?.type || 'Non spécifié'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>
                                            {reservation.createdAt?.toLocaleDateString('fr-FR') || 'Date inconnue'}
                                        </div>
                                        {reservation.expiresAt && (
                                            <div>
                                                Jusqu'au {reservation.expiresAt.toLocaleDateString('fr-FR')}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {reservation.prix?.toFixed(2) || '0.00'} MAD
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reservation.status === 'confirmée'
                                                ? 'bg-green-100 text-green-800'
                                                : reservation.status === 'annulée'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {reservation.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => changeRoomStatus(reservation.chambre.id, 'available')}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Marquer comme Disponible
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    Aucune réservation trouvée
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
