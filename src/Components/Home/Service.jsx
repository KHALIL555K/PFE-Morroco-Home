import React from 'react';
import { FaHotel } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { ImAirplane } from 'react-icons/im';
import { MdLocalHotel, MdOutlineLaptopChromebook, MdOutlinePayment } from 'react-icons/md';

export default function Service() {
    const services = [
        {
            icon: <MdLocalHotel size={60} />,
            title: 'Réservation des chambres en ligne',
            description: 'Réservez des chambres selon vos préférences en quelques clics.',
            color: 'text-blue-500'
        },
        {
            icon: <MdOutlinePayment size={60} />,
            title: 'Paiement en ligne sécurisé',
            description: 'Transactions 100% sécurisées avec cryptage des données.',
            color: 'text-green-500'
        },
        {
            icon: <GiReceiveMoney size={60} />,
            title: 'Paiement sur place',
            description: 'Payez directement à votre arrivée à l\'hôtel si vous préférez.',
            color: 'text-purple-500'
        },
        {
            icon: <FaHotel size={60} />,
            title: 'Solution pour les hôtels',
            description: 'Gestion moderne et complète pour établissements hôteliers.',
            color: 'text-red-500'
        },
        {
            icon: <ImAirplane size={60} />,
            title: 'Réservation au Maroc',
            description: 'Accès à des centaines d\'hôtels à travers tout le Maroc.',
            color: 'text-yellow-500'
        },
        {
            icon: <MdOutlineLaptopChromebook size={60} />,
            title: 'Multiplateforme',
            description: 'Disponible sur mobile, tablette et ordinateur.',
            color: 'text-indigo-500'
        },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* En-tête avec animation */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Nos Services
                    </h2>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Découvrez ce que nous offrons pour simplifier votre expérience
                    </p>
                </div>

                {/* Grille de services */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Fond décoratif */}
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-10 rounded-xl from-transparent to-${service.color.split('-')[1]}-200 group-hover:opacity-20 transition-opacity`}></div>

                            {/* Icône */}
                            <div className={`mb-6 ${service.color} transition-colors duration-300 `}>
                                {service.icon}
                            </div>

                            {/* Titre */}
                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Effet hover */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-300 rounded-xl pointer-events-none transition-all duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* Call-to-action */}
                <div className="mt-16 text-center">
                    <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                        Découvrir plus
                    </button>
                </div>
            </div>
        </section>
    );
}