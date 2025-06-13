import React from "react";
import { useState, useEffect } from "react"; // Ensure useEffect is imported
import { useParams } from "react-router-dom";

var id=""; // It's better to declare id inside the component if it's used within render logic

const Recipe = () => {
    const [item, setItem] = useState(null); // Initialize with null
    const { recipeId } = useParams();

    useEffect(() => {
        if (recipeId) { // Only fetch if recipeId exists
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
                .then(res => res.json())
                .then(data => {
                    setItem(data.meals ? data.meals[0] : null); // Handle case where meals might be null
                })
                .catch(error => console.error("Error fetching recipe:", error)); // Add error handling
        }
    }, [recipeId]); // Dependency array: re-run effect only when recipeId changes

    let youtubeId = ""; // Declare id locally
    if(item && item.strYoutube){
      const str=item.strYoutube.split("=");
      youtubeId=str[str.length-1];
    }
    
    // ... rest of your Recipe component logic remains the same
    return (
        <>
            {
                (!item) ? (
                    // Display loading or a message while item is null (fetching or not found)
                    <div className="text-center text-xl text-gray-700 p-8">Loading recipe or recipe not found...</div>
                ) : (
                    <div className="content">
                        <img src={item.strMealThumb} alt="" />
                        <div className="inner-content">
                            <h1>{item.strMeal}</h1>
                            <h2>{item.strArea} Food</h2>
                            <h3>Category {item.strCategory}</h3>
                        </div>
                    
                        <div className="recipe-details">
                            <div className="ingredients">
                                <h2>Ingredients</h2><br />
                                {/* It's better to loop through ingredients dynamically */}
                                {/* For example, create an array of ingredients */}
                                {
                                    Array.from({length: 20}, (_, i) => i + 1)
                                    .map(i => {
                                        const ingredient = item[`strIngredient${i}`];
                                        const measure = item[`strMeasure${i}`];
                                        return (ingredient && ingredient.trim() !== "") ? (
                                            <h4 key={i}>{ingredient}:{measure}</h4>
                                        ) : null;
                                    })
                                }
                            </div>
                            <div className="instructions">
                                <h2>Instructions</h2><br />
                                <h4>{item.strInstructions}</h4>
                            </div>
                        </div>
                        <div className="video">
                            {/* Make sure YouTube URL is correct, it should be 'youtube.com/embed/' not 'googleusercontent.com/youtube.com/0' */}
                            {youtubeId && (
                                <iframe width="100%" height="515" title="recipeVideo"
                                    src={`https://www.youtube.com/embed/${youtubeId}`} // Corrected YouTube embed URL
                                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            )}
                        </div>
                    </div>
                )
            }
        </>
    );
};
export default Recipe;