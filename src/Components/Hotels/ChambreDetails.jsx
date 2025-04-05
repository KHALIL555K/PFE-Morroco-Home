import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, addDoc, serverTimestamp, updateDoc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/firebaseConfig';
import { StarIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function ChambreDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [chambre, setChambre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [reservationLoading, setReservationLoading] = useState(false);
    const [reservationStatus, setReservationStatus] = useState(null);
    const [activeReservationId, setActiveReservationId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!id || typeof id !== 'string' || id.trim() === '') {
                    throw new Error("ID de chambre invalide ou non fourni");
                }

                if (!fireDB) {
                    throw new Error("Firebase n'est pas initialisé");
                }

                // Fetch chambre details
                const chambreRef = doc(fireDB, 'chambres', id);
                const chambreDoc = await getDoc(chambreRef);

                if (!chambreDoc.exists()) {
                    throw new Error("Chambre non trouvée dans la base de données");
                }

                let chambreData = {
                    id: chambreDoc.id,
                    ...chambreDoc.data(),
                    numero: chambreDoc.data().numero || 'Non spécifié',
                    prix: chambreDoc.data().prix || 0,
                    description: chambreDoc.data().description || 'Aucune description disponible',
                    disponible: chambreDoc.data().disponible !== undefined ? chambreDoc.data().disponible : true,
                    etage: chambreDoc.data().etage || 'Non spécifié',
                    imageBase64: chambreDoc.data().imageBase64 || 'https://via.placeholder.com/800x600?text=Chambre',
                    hotelId: chambreDoc.data().hotelId || null,
                };

                // Fetch hotel info if available
                if (chambreData.hotelId) {
                    const hotelRef = doc(fireDB, 'hotels', chambreData.hotelId);
                    const hotelDoc = await getDoc(hotelRef);
                    if (hotelDoc.exists()) {
                        chambreData.hotel = {
                            nom: hotelDoc.data().nom || 'Hôtel inconnu',
                            adresse: hotelDoc.data().adresse || 'Adresse non spécifiée',
                            telephone: hotelDoc.data().telephone || 'Non disponible',
                        };
                    }
                }

                // Fetch comments
                const commentsRef = collection(fireDB, 'chambres', id, 'comments');
                const commentsSnapshot = await getDocs(commentsRef);
                const commentsData = commentsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().createdAt?.toDate() || new Date(),
                })).sort((a, b) => b.date - a.date);

                // Check active reservation
                const reservationsRef = collection(fireDB, 'reservations');
                const q = query(reservationsRef,
                    where('chambreId', '==', id),
                    where('status', 'in', ['en attente', 'confirmée'])
                );
                const reservationSnapshot = await getDocs(q);

                if (!reservationSnapshot.empty) {
                    const reservationDoc = reservationSnapshot.docs[0];
                    const reservationData = reservationDoc.data();
                    setReservationStatus(reservationData.status);
                    setActiveReservationId(reservationDoc.id);

                    // If reservation is confirmed, update room availability
                    if (reservationData.status === 'confirmée') {
                        await updateDoc(chambreRef, { disponible: false });
                        chambreData.disponible = false;
                    }
                }

                setChambre(chambreData);
                setComments(commentsData);

                // Set up real-time listener for reservation status changes
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    if (!snapshot.empty) {
                        const updatedReservationDoc = snapshot.docs[0];
                        const updatedReservation = updatedReservationDoc.data();
                        setReservationStatus(updatedReservation.status);
                        setActiveReservationId(updatedReservationDoc.id);

                        if (updatedReservation.status === 'confirmée') {
                            updateDoc(chambreRef, { disponible: false });
                            setChambre(prev => ({ ...prev, disponible: false }));
                            setReservationSuccess(true);
                        }
                    } else {
                        setReservationStatus(null);
                        setActiveReservationId(null);
                    }
                });

                return () => unsubscribe();

            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleReservation = async () => {
        if (!chambre?.disponible || reservationStatus) return;

        try {
            setReservationLoading(true);

            // Check if user is logged in
            const currentUser = auth.currentUser;
            if (!currentUser) {
                // User not logged in - redirect to login page or show error
                setError("Vous devez être connecté pour réserver");
                navigate('/login', { state: { returnUrl: `/chambres/${id}` } }); // Optional: redirect to login with return URL
                return;
            }

            // Create reservation with the actual user ID
            const reservationsRef = collection(fireDB, 'reservations');
            const reservationDoc = await addDoc(reservationsRef, {
                chambreId: id,
                status: 'en attente',
                createdAt: serverTimestamp(),
                expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 heures
                prix: chambre.prix,
                hotelId: chambre.hotelId,
                clientId: currentUser.uid, // Use the actual user ID
                clientEmail: currentUser.email || '', // Optionally store user email for easier identification
                clientName: currentUser.displayName || '' // Optionally store user display name
            });

            setActiveReservationId(reservationDoc.id);
            setReservationStatus('en attente');
            setReservationSuccess(true);

        } catch (error) {
            console.error("Erreur lors de la réservation:", error);
            setError("Une erreur est survenue lors de la réservation");
        } finally {
            setReservationLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim() === '' || rating === 0) return;

        try {
            const commentsRef = collection(fireDB, 'chambres', id, 'comments');
            const commentData = {
                text: newComment,
                rating: rating,
                author: 'Utilisateur Anonyme', // À remplacer par le nom de l'utilisateur connecté
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(commentsRef, commentData);
            setComments([{
                id: docRef.id,
                ...commentData,
                date: new Date()
            }, ...comments]);
            setNewComment('');
            setRating(0);
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire:", error);
            setError("Impossible d'ajouter le commentaire");
        }
    };

    const calculateAverageRating = () => {
        if (comments.length === 0) return 0;
        const sum = comments.reduce((total, comment) => total + comment.rating, 0);
        return (sum / comments.length).toFixed(1);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Retour
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Message de succès de réservation */}
            {reservationSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="mt-3 text-lg font-medium text-gray-900">
                                {reservationStatus === 'confirmée'
                                    ? 'Réservation confirmée!'
                                    : 'Demande de réservation envoyée!'}
                            </h3>
                            <div className="mt-2 text-sm text-gray-500">
                                {reservationStatus === 'confirmée' ? (
                                    <p>Votre réservation a été confirmée par la réception.</p>
                                ) : (
                                    <>
                                        <p>Vous avez 3 heures pour vous rendre à l'hôtel pour confirmer votre réservation.</p>
                                        {chambre.hotel && (
                                            <>
                                                <p className="mt-2 font-medium">Adresse: {chambre.hotel.adresse}</p>
                                                <p className="mt-1">Téléphone: {chambre.hotel.telephone}</p>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="mt-4">
                                <button
                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700"
                                    onClick={() => {
                                        setReservationSuccess(false);
                                        if (reservationStatus === 'confirmée') {
                                            navigate('/mes-reservations');
                                        }
                                    }}
                                >
                                    {reservationStatus === 'confirmée' ? 'Voir mes réservations' : 'Compris'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section with Image */}
            <div className="relative h-96 w-full overflow-hidden">
                <img
                    src={chambre.imageBase64}
                    alt={`Chambre ${chambre.numero}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/800x600?text=Image+non+disponible";
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Chambre {chambre.numero}</h1>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        className={`h-6 w-6 ${star <= calculateAverageRating() ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg">
                                {calculateAverageRating()} ({comments.length} avis)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2">
                        {/* Hotel Info */}
                        {chambre.hotel && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{chambre.hotel.nom}</h2>
                                <p className="text-gray-600 mb-1">{chambre.hotel.adresse}</p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Téléphone:</span> {chambre.hotel.telephone}
                                </p>
                            </div>
                        )}

                        {/* Room Details */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Détails de la chambre</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h3 className="font-semibold text-gray-800">Prix</h3>
                                    <p className="text-gray-600">{chambre.prix} MAD / nuit</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Disponibilité</h3>
                                    <p className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${reservationStatus === 'confirmée'
                                            ? 'bg-red-100 text-red-800'
                                            : chambre.disponible
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                        {reservationStatus === 'confirmée'
                                            ? 'Réservée (confirmée)'
                                            : reservationStatus === 'en attente'
                                                ? 'Réservation en attente'
                                                : chambre.disponible
                                                    ? 'Disponible'
                                                    : 'Non disponible'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Étage</h3>
                                    <p className="text-gray-600">{chambre.etage}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 text-xl mb-2">Description</h3>
                                <p className="text-gray-600">{chambre.description}</p>
                            </div>

                            <button
                                onClick={handleReservation}
                                disabled={!chambre.disponible || reservationLoading || reservationStatus}
                                className={`w-full py-3 rounded-lg transition-colors text-lg font-medium flex items-center justify-center ${chambre.disponible && !reservationStatus
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {reservationLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Traitement...
                                    </>
                                ) : reservationStatus === 'confirmée' ? (
                                    'Réservation confirmée'
                                ) : reservationStatus === 'en attente' ? (
                                    'Confirmation en attente'
                                ) : chambre.disponible ? (
                                    'Réserver maintenant'
                                ) : (
                                    'Non disponible'
                                )}
                            </button>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Avis et commentaires</h2>

                            {/* Rating Input */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Donnez votre avis</h3>
                                <div className="flex items-center mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon
                                            key={star}
                                            className={`h-8 w-8 cursor-pointer ${(hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                    ))}
                                    <span className="ml-2 text-gray-600">{rating > 0 ? `Vous avez donné ${rating} étoile(s)` : ''}</span>
                                </div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Écrivez votre commentaire..."
                                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        disabled={newComment.trim() === '' || rating === 0}
                                        className={`px-4 py-2 rounded-r-lg ${newComment.trim() === '' || rating === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                    >
                                        Envoyer
                                    </button>
                                </div>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-6">
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
                                            <div className="flex items-center mb-2">
                                                <UserCircleIcon className="h-10 w-10 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-800">{comment.author}</p>
                                                    <div className="flex items-center">
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <StarIcon
                                                                    key={star}
                                                                    className={`h-5 w-5 ${star <= comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="ml-2 text-xs text-gray-500">
                                                            {comment.date.toLocaleDateString('fr-FR', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 ml-13">{comment.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Aucun commentaire pour le moment.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Réservation</h3>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Prix par nuit</span>
                                <span className="font-bold text-gray-800">{chambre.prix} MAD</span>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">Total estimé</span>
                                <span className="font-bold text-gray-800">{chambre.prix} MAD</span>
                            </div>
                            <button
                                onClick={handleReservation}
                                disabled={!chambre.disponible || reservationLoading || reservationStatus}
                                className={`w-full py-3 rounded-lg transition-colors text-lg font-medium flex items-center justify-center ${chambre.disponible && !reservationStatus
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {reservationLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Traitement...
                                    </>
                                ) : reservationStatus === 'confirmée' ? (
                                    'Réservation confirmée'
                                ) : reservationStatus === 'en attente' ? (
                                    'Confirmation en attente'
                                ) : chambre.disponible ? (
                                    'Réserver maintenant'
                                ) : (
                                    'Non disponible'
                                )}
                            </button>
                            <div className="mt-4 text-center text-sm text-gray-500">
                                {reservationStatus === 'en attente' ? (
                                    <p>Présentez-vous à la réception pour confirmer</p>
                                ) : reservationStatus === 'confirmée' ? (
                                    <p>Votre réservation est confirmée</p>
                                ) : (
                                    <p>Aucun paiement requis pour le moment</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}