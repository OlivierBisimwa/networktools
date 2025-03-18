import axios from "axios"

export const checkHost = async (req, res) => {
  // Fonction pour formater les URLs
  const formatURL = (domain) => {
    if (!domain.startsWith("http://") && !domain.startsWith("https://")) {
      return `https://${domain}`; // Ajoute HTTPS si absent
    }
    return domain;
  };

  const { host } = req.body;
  const url = formatURL(host);
  const results = [];

  try {
    const response = await axios.get(url, { timeout: 10000 }); // Récupère les en-têtes
    results.push({
      url,
      status: response.status,
      headers: response.headers, // Stocke les en-têtes HTTP
    });
    return res.status(200).json(results);
  } catch (error) {
    console.error(error)
    results.push({
      url,
      status: "inaccessible",
      headers: {},
    });
  }
  return res.status(400).json(results);
};
