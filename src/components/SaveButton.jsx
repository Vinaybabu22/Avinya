import { Heart } from "lucide-react";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

function SaveButton({ itemId, itemType, isSavedInitially = false, className = "", onSaveToggle }) {
  const { user } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(isSavedInitially);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login to save items");
      return;
    }

    // Optimistic update
    const previousState = isSaved;
    setIsSaved(!previousState);
    if (onSaveToggle) {
      onSaveToggle(!previousState, itemId, itemType);
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ itemType: itemType.toLowerCase(), itemId }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        // Revert on failure
        setIsSaved(previousState);
        if (onSaveToggle) {
          onSaveToggle(previousState, itemId, itemType);
        }
        alert(data.message);
      }
    } catch (error) {
      // Revert on failure
      setIsSaved(previousState);
      if (onSaveToggle) {
        onSaveToggle(previousState, itemId, itemType);
      }
      console.error(error);
    }
  };

  return (
    <button 
      onClick={handleSave}
      className={`text-slate-400 hover:text-blue-500 transition-colors ${className}`}
    >
      <Heart size={24} className={isSaved ? "fill-blue-500 text-blue-500" : ""} />
    </button>
  );
}

export default SaveButton;
