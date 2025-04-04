import React, { useEffect, useState } from 'react';
import { fireDB } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function ChambresAvecOffres() {
    const [chambresAvecOffres, setChambresAvecOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChambresAvecOffres = async () => {
            try {
                setLoading(true);
                setError(null);

                const chambresSnapshot = await getDocs(collection(fireDB, "chambres"));
                const chambresData = chambresSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (chambresData.length === 0) {
                    setError("Aucune chambre avec une offre disponible.");
                    setLoading(false);
                    return;
                }

                const hotelsSnapshot = await getDocs(collection(fireDB, "hotels"));
                const hotelsData = {};
                hotelsSnapshot.docs.forEach(hotelDoc => {
                    hotelsData[hotelDoc.id] = {
                        id: hotelDoc.id,
                        ...hotelDoc.data()
                    };
                });

                const chambresAvecHotels = chambresData.map(chambre => ({
                    ...chambre,
                    hotel: hotelsData[chambre.hotelId] || { nom: "Hôtel inconnu", adresse: "Adresse non disponible" }
                }));

                setChambresAvecOffres(chambresAvecHotels);
            } catch (err) {
                setError("Erreur lors du chargement des données.");
                console.error("Erreur Firebase:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChambresAvecOffres();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Chargement des chambres en promotion...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-red-600 font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto mt-[65px] px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-blue-700 uppercase">Nos Meilleures Offres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {chambresAvecOffres.map(chambre => (
                    <div
                        key={chambre.id}
                        className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden w-full flex flex-col"
                    >
                        {/* Image */}
                        <div className="h-64 bg-gray-200 relative">
                            <img
                                src={chambre.imageBase64 || "https://via.placeholder.com/400x300?text=Chambre"}
                                alt={chambre.type || "Chambre"}
                                className="w-full h-full object-cover "
                                onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=Image+Indisponible")}
                            />
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                                Offre spéciale
                            </span>
                        </div>

                        {/* Infos chambre et hôtel */}
                        <div className="p-5 flex-1 flex flex-col justify-between min-h-[280px]">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{chambre.type || "Chambre standard"}</h3>
                                <p className="text-gray-600 mt-1">
                                    Prix : <span className="font-bold text-green-600">{chambre.prix} MAD</span>
                                </p>
                                {chambre.description && (
                                    <p className="text-gray-500 text-sm mt-2">{chambre.description}</p>
                                )}
                                <p className="text-sm text-gray-500 mt-2">
                                    <span className="font-semibold">Étage :</span> {chambre.etage || "Non spécifié"}
                                </p>
                            </div>

                            <div className="mt-4 p-3 bg-gray-100 rounded-md shadow-sm">
                                <h4 className="font-semibold text-blue-600">{chambre.hotel.nom}</h4>
                                <p className="text-sm text-gray-500">{chambre.hotel.adresse}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
