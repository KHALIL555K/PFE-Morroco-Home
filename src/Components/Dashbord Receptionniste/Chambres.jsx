import { IoAddCircle } from "react-icons/io5";
import { MdChangeCircle } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { fireDB, auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Chambres() {
    const [chambres, setChambres] = useState([]);
    const [currentUserHotel, setCurrentUserHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    // Récupérer l'hôtel de l'utilisateur connecté
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDocs(query(
                        collection(fireDB, "users"),
                        where("email", "==", user.email)
                    ));

                    if (!userDoc.empty) {
                        const userData = userDoc.docs[0].data();
                        setCurrentUserHotel(userData.hotelId);
                    }
                } catch (err) {
                    console.error("Erreur lors de la récupération des données utilisateur:", err);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    // Récupérer les chambres de l'hôtel
    const fetchChambres = async () => {
        try {
            setLoading(true);
            if (!currentUserHotel) return;

            const q = query(
                collection(fireDB, "chambres"),
                where("hotelId", "==", currentUserHotel)
            );

            const querySnapshot = await getDocs(q);
            const chambresArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setChambres(chambresArray);
        } catch (err) {
            console.error("Erreur lors de la récupération des chambres :", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChambres();
    }, [currentUserHotel]);

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
            try {
                await deleteDoc(doc(fireDB, 'chambres', id));
                fetchChambres();
            } catch (error) {
                console.log('Erreur lors de la suppression', error);
                alert("Erreur lors de la suppression");
            }
        }
    }

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center h-64">
                <p>Chargement en cours...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                {chambres.length === 0 ? (
                    <div className="p-6 text-center">
                        <p>Aucune chambre trouvée pour votre hôtel</p>
                    </div>
                ) : (
                    chambres.map((chambre) => (
                        <div key={chambre.id} className="flex flex-col md:flex-row gap-2 p-6 border-b last:border-b-0">
                            {/* Image */}
                            <div className="w-full md:w-1/4 h-48">
                                <img
                                    loading="lazy"
                                    src={chambre.imageBase64 || 'https://via.placeholder.com/300'}
                                    alt={`Chambre ${chambre.numero}`}
                                    className="w-full h-full rounded-lg object-cover shadow-sm"
                                />
                            </div>

                            {/* Description */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800">Chambre {chambre.numero}</h1>
                                    <div className="flex items-center gap-2 mt-1 mb-3">
                                        <span className="text-yellow-500">★★★★☆</span>
                                        <span className="text-sm text-gray-500">4.2 (128 avis)</span>
                                    </div>
                                    <p className="text-gray-600 border-t pt-3">
                                        {chambre.description}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-blue-600">{chambre.prix}€</span>
                                        <span className="text-gray-500 text-sm ml-1">/nuit</span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${chambre.disponible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        {chambre.disponible ? "Disponible" : "Occupée"}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col justify-center gap-4 md:gap-3 pt-4 md:pt-0 md:pl-4">
                                <button className="flex flex-col items-center group">
                                    <IoAddCircle className="text-green-500 text-4xl hover:text-green-600 transition-colors" />
                                    <span className="text-xs text-gray-500 group-hover:text-green-600">Ajouter</span>
                                </button>
                                <button className="flex flex-col items-center group">
                                    <MdChangeCircle className="text-blue-500 text-4xl hover:text-blue-600 transition-colors" />
                                    <span className="text-xs text-gray-500 group-hover:text-blue-600">Modifier</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(chambre.id)}
                                    className="flex flex-col items-center group"
                                >
                                    <TiDelete className="text-red-500 text-4xl hover:text-red-600 transition-colors" />
                                    <span className="text-xs text-gray-500 group-hover:text-red-600">Supprimer</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}