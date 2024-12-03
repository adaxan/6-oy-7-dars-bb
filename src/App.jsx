// import React, { useState } from "react";
// import axios from "axios";
// import { PacmanLoader } from "react-spinners";

// function App() {
//   const [search, setSearch] = useState("");
//   const [books, setBooks] = useState([]);
//   const [Loading, setLoading] = useState(false);

//   const fetchBooks = () => {
//     if (!search) {
//       alert("Please enter a value!");
//       return;
//     }

//     setLoading(true);
//     axios
//       .get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
//       .then((response) => {
//         if (response.status === 200) {
//           setBooks(response.data.items || []);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching books:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
//           Book Library
//         </h1>
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter value..."
//           />
//           <button
//             onClick={fetchBooks}
//             className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="mt-6 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Loading ? (
//           <PacmanLoader color="#3490dc" size={50} />
//         ) : (
//           books.length > 0 &&
//           books.map((value) => {
//             const info = value.volumeInfo;
//             return (
//               <div
//                 key={value.id}
//                 className="bg-white p-4 shadow-md rounded-lg flex flex-col"
//               >
//                 <img
//                   src={
//                     info.imageLinks?.thumbnail ||
//                     "https://via.placeholder.com/150"
//                   }
//                   alt={info.title}
//                   className="h-48 w-full object-cover mb-4 rounded"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {info.title || "No Title Available"}
//                 </h3>
//                 <p className="text-gray-600">
//                   {info.authors ? info.authors.join(", ") : "Unknown Author"}
//                 </p>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

//! 2chisi
import React, { useState, useEffect } from "react";
import axios from "axios";

function App(){
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  function fetchRepos() {
    setError("");
    setRepos([]);
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(function (response) {
        const sortedRepos = response.data
          .sort(function (a, b) {
            return b.stars_count - a.stars_count;
          })
          .slice(0, 10);
        setRepos(sortedRepos);
      })
      .catch(function (err) {
        if (err.response && err.response.status === 404) {
          setError("Foydalanuvchi topilmadi");
        } else {
          setError("Ma'lumot yuklashda xatolik yuz berdi");
        }
      });
  }

  useEffect(function () {
    if (username) {
      fetchRepos();
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">GitHub Repozitoriyalari</h1>
      <input
        type="text"
        placeholder="GitHub username kiriting"
        value={username}
        onChange={function (e) {
          setUsername(e.target.value);
        }}
        className="border rounded px-4 py-2 w-full max-w-md mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="w-full max-w-md">
        {repos.length > 0 && (
          <ul className="bg-white shadow-md rounded-md p-4">
            {repos.map(function (repo) {
              return (
                <li key={repo.id} className="mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {repo.name}
                  </a>
                  <span className="text-gray-600"> - ⭐ {repo.stars_count}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;