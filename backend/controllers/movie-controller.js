import { fetchAPI } from "../services/API-services.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchAPI(
      // "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
         "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Error fetching trending Movie shows:", error.message);

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    // console.error(error.message);
    if (error.message.includes("404")) {
     return res.status(404).send(null);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&include_adult=true`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    // console.error(error.message);
    if (error.message.includes("404")) {
     return res.status(404).send(null);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    // console.error(error.message);
    if (error.message.includes("404")) {
    return res.status(404).send(null);
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchAPI(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
