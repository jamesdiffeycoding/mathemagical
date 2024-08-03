"use client"

export default function ThemeColoursComponent() {
    /* ---------------------------- COLOUR THEME -----------------------------------------------------------*/


    {/* The extra DOM elements are inconvenient but necessary for loading the styles for the colour themes. */ }
    {/* THE BELOW SECTION ENSURES TAILWIND STYLES FOR ALL COLOUR THEMES LOAD, SINCE THEY ARE INCLUDED IN THE BUNDLE AT COMPILE TIME */ }
    return (
        <section className="hidden">
            <div className="bg-yellow-200"></div>

            <div className="bg-gray-400"></div>
            <div className="bg-green-300"></div>
            <div className="bg-indigo-300"></div>
            <div className="bg-orange-300"></div>
            <div className="bg-pink-300"></div>
            <div className="bg-green-400"></div>
            <div className="bg-indigo-400"></div>
            <div className="bg-orange-400"></div>
            <div className="bg-pink-400"></div>
            <div className="bg-green-500"></div>
            <div className="bg-indigo-500"></div>
            <div className="bg-orange-500"></div>
            <div className="bg-pink-500"></div>
            <div className="text-green-700"></div>
            <div className="text-indigo-700"></div>
            <div className="text-orange-700"></div>
            <div className="text-pink-700"></div>
            <div className="text-green-600"></div>
            <div className="text-indigo-600"></div>
            <div className="text-orange-600"></div>
            <div className="text-pink-600"></div>
            <div className="border-green-200"></div>
            <div className="border-indigo-200"></div>
            <div className="border-orange-200"></div>
            <div className="border-pink-200"></div>
            <div className="border-green-300"></div>
            <div className="border-indigo-300"></div>
            <div className="border-orange-300"></div>
            <div className="border-pink-300"></div>

            <div className="border-green-400"></div>
            <div className="border-indigo-400"></div>
            <div className="border-orange-400"></div>
            <div className="border-pink-400"></div>

            <div className="border-green-600"></div>
            <div className="border-indigo-600"></div>
            <div className="border-orange-600"></div>
            <div className="border-pink-600"></div>
            <div className="border-green-500"></div>
            <div className="border-indigo-500"></div>
            <div className="border-orange-500"></div>
            <div className="border-pink-500"></div>
            <div className="hover:bg-green-300"></div>
            <div className="hover:bg-indigo-300"></div>
            <div className="hover:bg-orange-300"></div>
            <div className="hover:bg-pink-300"></div>
            <div className="pattern-green-500"></div>
            <div className="pattern-indigo-500"></div>
            <div className="pattern-orange-500"></div>
            <div className="pattern-pink-500"></div>
        </section>
    );
}

