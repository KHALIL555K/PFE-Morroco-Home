import React, { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function CreateChambre() {
    const [chambre, setChambre] = useState({
        numero: '',
        etage: '',
        description: '',
        prix: '',
        imageBase64: ''
    });
    const navigate = useNavigate()

    const [preview, setPreview] = useState(null);

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChambre(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Fonction pour convertir une image en Base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setChambre(prev => ({
                    ...prev,
                    imageBase64: reader.result // Stocker l'image en Base64
                }));
                setPreview(reader.result); // Prévisualisation
            };
            reader.readAsDataURL(file); // Convertir l'image en Base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Récupérer l'hôtel du réceptionniste
            const receptionniste = JSON.parse(localStorage.getItem('receptionniste'));
            const hotelId = receptionniste?.hotelId;

            if (!hotelId) {
                throw new Error("Aucun hôtel associé à ce réceptionniste");
            }

            // 2. Créer l'objet à enregistrer dans Firestore
            const chambreData = {
                ...chambre,
                prix: parseFloat(chambre.prix),
                etage: parseInt(chambre.etage),
                hotelId,
                disponible: true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            // Ajouter la chambre dans Firestore
            await addDoc(collection(fireDB, 'chambres'), chambreData);

            setSuccess(true);
            setTimeout(() => {
                setChambre({
                    numero: '',
                    etage: '',
                    description: '',
                    prix: '',
                    imageBase64: ''
                });
                setPreview(null);
                setSuccess(false);
            }, 2000);

        } catch (err) {
            console.error("Erreur lors de l'ajout de la chambre:", err);
        }

        navigate('/Dashboard/Receptionniste/Chambres')

    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    🏨 Ajouter une Chambre
                </h2>



                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        Chambre ajoutée avec succès!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="numero" className="block text-sm font-semibold text-gray-700">
                            Numéro de Chambre
                        </label>
                        <input
                            type="text"
                            id="numero"
                            name="numero"
                            value={chambre.numero}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ex: 101"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="etage" className="block text-sm font-semibold text-gray-700">
                            Étage
                        </label>
                        <input
                            type="number"
                            id="etage"
                            name="etage"
                            value={chambre.etage}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Ex: 1"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={chambre.description}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Description détaillée de la chambre..."
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="prix" className="block text-sm font-semibold text-gray-700">
                            Prix (€)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="prix"
                                name="prix"
                                value={chambre.prix}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="0.00"
                                required
                            />
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">€</span>
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">/ nuit</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Image de la Chambre
                        </label>
                        <div className="flex justify-center">
                            <label className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition relative">
                                {preview ? (
                                    <img src={preview} alt="Prévisualisation" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <BiPlusCircle className="w-12 h-12 text-gray-400 hover:text-indigo-500 focus:outline-none transition" />
                                )}
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="w-1/3 py-2 px-4 text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="w-1/3 py-2 px-4 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
                        >
                            Enregister
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}