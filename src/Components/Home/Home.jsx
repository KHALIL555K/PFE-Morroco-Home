import React from "react";
import { GoMoveToBottom } from "react-icons/go";
import chambreTest from "../../assets/chambreTest.jpg";

export default function Hero() {
    return (
        <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen flex flex-col items-center justify-center py-20">
            {/* Titre et texte */}
            <div className="px-4 lg:px-9 mx-auto flex flex-col justify-center items-center text-center">
                <h1 className="text-5xl font-extrabold uppercase text-gray-800 mb-5 text-5xl font-bold bg-gradient-to-r from-brandPrimary to-blue-300 bg-clip-text text-transparent">
                    Morocco Home
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl font-Eagle">
                    Découvrez l'élégance et le charme des maisons marocaines avec des
                    intérieurs authentiques et un confort inégalé.
                </p>
                <GoMoveToBottom className="text-brandPrimary mt-4 text-5xl animate-bounce" />
                <button className="bg-gradient-to-l from-brandPrimary to-blue-200 text-white px-2 py-3 rounded-xl font-semibold ppercase ">
                    Cree compte 
                </button>
            </div>

            {/* Galerie d'images */}
            <div className="w-full flex flex-wrap items-center justify-center gap-4 px-14 mt-14">

                <img
                    src={chambreTest}
                    alt=""
                    className="w-[18em] h-[24em] md:w-[15em] md:h-[20em] rounded-2xl shadow-xl transition-transform transform  hover:scale-105 hover:shadow-2xl duration-300 object-fit"
                />
                <img
                    src={chambreTest}
                    alt=""
                    className="w-[18em] h-[24em] md:w-[15em] md:h-[20em] rounded-2xl shadow-xl transition-transform transform mt-20 hover:scale-105 hover:shadow-2xl duration-300 object-fit"
                />
                <img
                    src={chambreTest}
                    alt=""
                    className="w-[18em] h-[24em] md:w-[15em] md:h-[20em] rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300  object-fit"
                />
                <img
                    src={chambreTest}
                    alt=""
                    className="w-[18em] h-[24em] md:w-[15em] md:h-[20em] rounded-2xl shadow-xl transition-transform transform mt-20 hover:scale-105 hover:shadow-2xl duration-300  object-fit"
                />
                <img
                    src={chambreTest}
                    alt=""
                    className="w-[18em] h-[24em] md:w-[15em] md:h-[20em] rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300  object-fit"
                />

            </div>
        </div>
    );
}
