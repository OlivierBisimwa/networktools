import express from "express"
import multer from "multer"
import csv from "csv-parser"
import fs from "fs"
import cors from "cors"
// const express = require("express");
// const multer = require("multer");
// const csv = require("csv-parser");
// const fs = require("fs");
// const axios = require("axios");
// const cors = require("cors");
import hostRoute from "./routes/hosts.routes.js"

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.use("/", hostRoute)

// // Fonction pour formater les URLs
// const formatURL = (domain) => {
//     if (!domain.startsWith("http://") && !domain.startsWith("https://")) {
//         return `https://${domain}`; // Ajoute HTTPS si absent
//     }
//     return domain;
// };

// // Route pour uploader un fichier CSV et tester les domaines
// app.post("/upload", upload.single("file"), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "Aucun fichier envoyé." });
//     }

//     const filePath = req.file.path;
//     const results = [];

//     const readStream = fs.createReadStream(filePath).pipe(csv());

//     readStream.on("data", async (row) => {
//         const domain = row["domain"]?.trim(); // Supprime les espaces inutiles
//         if (domain) {
//             const url = formatURL(domain);
//             try {
//                 const response = await axios.head(url, { timeout: 5000 }); // Récupère les en-têtes
//                 results.push({
//                     domain,
//                     status: response.status,
//                     headers: response.headers, // Stocke les en-têtes HTTP
//                 });
//             } catch (error) {
//                 results.push({
//                     domain,
//                     status: "inaccessible",
//                     headers: {},
//                 });
//             }
//             console.log(results)
//         }
//     });

//     readStream.on("end", () => {
//         fs.unlinkSync(filePath); // Nettoie le fichier temporaire
//         res.json({ results });
//     });
// });

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Serveur backend en écoute sur http://localhost:${PORT}`);
});
