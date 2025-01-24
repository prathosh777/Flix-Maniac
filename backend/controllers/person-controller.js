
import { fetchAPI } from "../services/API-services.js";

export const getPersonDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/person/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null); 
    }
    console.error("Error fetching person details:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getPersonCredits = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`
    );
    res.status(200).json({ success: true, content: data.cast });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null); 
    }
    console.error("Error fetching person credits:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


