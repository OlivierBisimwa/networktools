// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



import React, { useState } from "react";
import axios from "axios";

function App() {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return alert("Veuillez sélectionner un fichier CSV.");

        const formData = new FormData();
        formData.append("file", file); 

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResults(response.data.validDomains);
        } catch (error) {
            console.error("Erreur lors de l'envoi du fichier :", error);
            alert("Erreur lors de l'analyse du fichier.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", textAlign: "center" }}>
            <h1>Vérification des domaines</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".csv" onChange={handleFileChange} required />
                <button type="submit" style={{ marginLeft: "10px" }}>Analyser</button>
            </form>
            <h2>Domaines actifs :</h2>
            <ul>
                {results.map((domain, index) => (
                    <li key={index}>{domain}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
