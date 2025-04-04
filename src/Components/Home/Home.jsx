import React, { useState, useEffect } from "react";
import { GoMoveToBottom } from "react-icons/go";
import chambreTest from "../../assets/chambreTest.jpg";
import room_3 from '../../assets/room_3.jpg'
import room_4 from '../../assets/room_4.jpg'
import room_5 from '../../assets/room_5.jpg'

export default function Hero() {
    const images = [
        { id: 1, src: chambreTest, alt: "Chambre marocaine 1" },
        { id: 2, src: room_3, alt: "Chambre marocaine 2" },
        { id: 3, src: room_4, alt: "Chambre marocaine 3" },
        { id: 4, src: room_5, alt: "Chambre marocaine 4" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };



    // Auto-rotate slides
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full center"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 w-full">
                {/* Titre et texte */}
                <div className="px-4 lg:px-9 mx-auto flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl font-extrabold uppercase text-white mb-5 text-5xl font-bold">
                        Morocco Home
                    </h1>
                    <p className="text-white/90 text-lg max-w-2xl font-Eagle">
                        Découvrez l'élégance et le charme des maisons marocaines avec des
                        intérieurs authentiques et un confort inégalé.
                    </p>
                    <GoMoveToBottom className="text-white mt-4 text-5xl animate-bounce" />
                    <button className="bg-gradient-to-l from-brandPrimary to-blue-200 text-white px-6 py-3 rounded-xl font-semibold uppercase mt-4 hover:opacity-90 transition-opacity">
                        Crée compte
                    </button>
                </div>


                {/* Indicators */}
                <div className="flex justify-center mt-4 space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={` w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}