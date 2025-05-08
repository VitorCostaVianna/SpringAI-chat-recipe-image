import { useState } from "react";
import api from "../../services/api";
import ReactMarkdown from "react-markdown";

function RecipeGenerator(){
    
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('Any');
    const [dietaryRestrictions , setDietaryRestrictions] = useState('');
    
    const [recipe , setRecipe] = useState('');

    const generateRecipe = async () => {
        try {
            const response = await api.get(`recipe-creator`, {
                params:{
                        ingredients, 
                        cuisine , 
                        dietaryRestrictions}
            })
            const data = await response.data;
            setRecipe(data);
        } catch (error) {
            console.log("Error generating recipe")
        }
    }

    return (
        <>
            <div>
                <h2>Generate Recipe</h2>
                <input type="text" 
                       value={ingredients}
                       onChange={(e) => setIngredients(e.target.value)}
                       placeholder="Enter ingredients (comma separated)"
                />
                <input type="text" 
                       value={cuisine}
                       onChange={(e) => setCuisine(e.target.value)}
                       placeholder="Enter Cuisine type"
                />
                <input type="text" 
                       value={dietaryRestrictions}
                       onChange={(e) => setDietaryRestrictions(e.target.value)}
                       placeholder="Enter Dietary Restrictions"
                />

                <button onClick={generateRecipe}>
                    Generate Recipe
                </button>

                <div className="output">
                    <ReactMarkdown>{recipe}</ReactMarkdown>
                </div>

            </div>
        </>

    );
}

export default RecipeGenerator;