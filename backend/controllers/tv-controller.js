import { fetchAPI } from "../services/API-services.js";
export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchAPI(
      //"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=1"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomTv });
  } catch (error) {
    console.error("Error fetching trending TV shows:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTvTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    console.error("Error fetching TV trailers:", error.message);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error("Error fetching TV details:", error.message);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarTvs = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching similar TV shows:", error.message);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTvsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching TV shows by category:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
