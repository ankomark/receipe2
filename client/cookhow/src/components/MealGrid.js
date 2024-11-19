// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function MealGrid() {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
//       .then((response) => response.json())
//       .then((data) => {
//         setMeals(data.meals);
//         setLoading(false);
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-600">Loading...</p>;
//   }
//   // grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//       {meals.map((meal) => (
//         <div
//           key={meal.idMeal}
//           className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
//         >
//           <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
//           <div className="p-4">
//             <h3 className="text-lg font-semibold text-gray-800">{meal.strMeal}</h3>
//             <p className="text-gray-600">{meal.strCategory}</p>
//             <p className="text-gray-600">{meal.strArea}</p>
//             <Link
//               to={`/meal/${meal.idMeal}`}
//               className="text-blue-500 hover:underline mt-2 inline-block"
//             >
//               View Recipe
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MealGrid;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MealGrid() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []); // Ensure meals defaults to an empty array
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Filter meals based on search query
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          className="w-full p-2 border border-gray-300 text-black rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{meal.strMeal}</h3>
                <p className="text-gray-600">{meal.strCategory}</p>
                <p className="text-gray-600">{meal.strArea}</p>
                <Link
                  to={`/meal/${meal.idMeal}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No meals match your search.</p>
        )}
      </div>
    </div>
  );
}

export default MealGrid;
