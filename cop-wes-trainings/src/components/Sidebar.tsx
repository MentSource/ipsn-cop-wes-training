import React from "react";
import { useNavigate } from "react-router-dom";

interface Course {
  format: string;
  category: string;
  title: string;
  organization: string;
  status: string;
  link: string;
}

interface SidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  onAddCourse: (course: Course) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar card">
      
      <div className="sidebar-header">
        <h3>Filter by Category</h3>
      </div>

      <ul className="category-list">
        {categories.map((category) => (
          <li key={category}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
              />
              {category}
            </label>
          </li>
        ))}
      </ul>

      <div className="sidebar-button">
        <button
          className="primary-btn"
          onClick={() => navigate("/submit-course")}
        >
          Submit Training Course
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Sidebar.css"; // keep your styles

// const Sidebar: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <aside className="sidebar">
//       <h2>Menu</h2>
//       <ul className="sidebar-links">
//         <li>
//           <button
//             className="sidebar-btn"
//             onClick={() => navigate("/")}
//           >
//             Home
//           </button>
//         </li>
//         <li>
//           <button
//             className="sidebar-btn"
//             onClick={() => navigate("/about")}
//           >
//             About
//           </button>
//         </li>
//         <li>
//           <button
//             className="sidebar-btn primary-btn"
//             onClick={() => navigate("/submit-course")}
//           >
//             Submit Training Course
//           </button>
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;




// OLD CODE for pop up modal form

// import React, { useState } from "react";
// // import { Link } from "react-router-dom";

// interface SidebarProps {
//   categories: string[];
//   selectedCategories: string[];
//   onCategoryChange: (category: string) => void;
//   onAddCourse: (course: {
//     format: string;
//     category: string;
//     title: string;
//     organization: string;
//     status: string;
//     link: string;
//   }) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   categories,
//   selectedCategories,
//   onCategoryChange,
//   onAddCourse,
// }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [newCourse, setNewCourse] = useState({
//     format: "",
//     category: "",
//     title: "",
//     organization: "",
//     status: "",
//     link: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onAddCourse(newCourse);
//     setNewCourse({
//       format: "",
//       category: "",
//       title: "",
//       organization: "",
//       status: "",
//       link: "",
//     });
//     setShowForm(false);
//   };

//   return (
//     <aside className="sidebar">
//       {/* --- Card 1: Submit Button --- */}
//       <div className="card">
//         <div className="sidebar-button">

//           <button
//              className="primary-btn"
//              onClick={() => navigate("/submit-course")}>
//               Submit Training Course
//         </button>

//           {/* <button className="primary-btn" 
//           onClick={() => 
//           // setShowForm(true) --> for pop up but changed to redirect to submit page
//           (window.location.href = "/submit")
//           }>
//             Submit Training Course
//           </button> */}
//         </div>
//       </div>

//       {/* --- Card 2: Search --- */}
//       <div className="card">
//         <h3>Search for a Course</h3>
//         <p>
//           <small>Example: Viral trainings.</small>
//         </p>
//         <input type="text" id="courseSearch" placeholder="Search by Keywords" />
//       </div>

//       {/* --- Card 3: Course Categories --- */}
//       <div className="card">
//         <h3>Course Categories</h3>
//         <ul className="career-list">
//           {categories.map((cat, i) => (
//             <li key={i}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories.includes(cat)}
//                   onChange={() => onCategoryChange(cat)}
//                 />
//                 {cat}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* --- Modal Form Popup --- */}
//       {showForm && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Submit New Training Course</h3>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Course Format:
//                 <input
//                   type="text"
//                   value={newCourse.format}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, format: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               <label>
//                 Course Category:
//                 <select
//                   value={newCourse.category}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, category: e.target.value })
//                   }
//                   required
//                 >
//                   <option value="">Select category</option>
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <label>
//                 Course Title:
//                 <input
//                   type="text"
//                   value={newCourse.title}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, title: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               <label>
//                 Organization:
//                 <input
//                   type="text"
//                   value={newCourse.organization}
//                   onChange={(e) =>
//                     setNewCourse({
//                       ...newCourse,
//                       organization: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </label>

//               <label>
//                 Course Status:
//                 <input
//                   type="text"
//                   value={newCourse.status}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, status: e.target.value })
//                   }
//                 />
//               </label>

//               <label>
//                 Course Link:
//                 <input
//                   type="url"
//                   value={newCourse.link}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, link: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               <div className="modal-actions">
//                 <button type="submit" className="primary-btn">
//                   Add Course
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";

// interface SidebarProps {
//   categories: string[];
//   selectedCategories: string[];
//   onCategoryChange: (category: string) => void;
//   onAddCourse: (course: {
//     format: string;
//     category: string;
//     title: string;
//     organization: string;
//     status: string;
//     link: string;
//   }) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   categories,
//   selectedCategories,
//   onCategoryChange,
//   onAddCourse,
// }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [newCourse, setNewCourse] = useState({
//     format: "",
//     category: "",
//     title: "",
//     organization: "",
//     status: "",
//     link: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onAddCourse(newCourse);
//     setNewCourse({
//       format: "",
//       category: "",
//       title: "",
//       organization: "",
//       status: "",
//       link: "",
//     });
//     setShowForm(false);
//   };

//   return (
//     <aside className="sidebar">
//       {/* ✅ Card 1: Submit Training Course */}
//       <div className="card">
//         <div className="sidebar-button">
//           <button className="primary-btn" onClick={() => setShowForm(true)}>
//             Submit Training Course
//           </button>
//         </div>
//       </div>

//       {/* ✅ Card 2: Search for a Course */}
//       <div className="card">
//         <h3>Search for a Course</h3>
//         <p>
//           <small>Example: Viral trainings.</small>
//         </p>
//         <input
//           type="text"
//           id="courseSearch"
//           placeholder="Search by Keywords"
//         />
//       </div>

//       {/* ✅ Card 3: Course Categories */}
//       <div className="card">
//         <h3>Course Categories</h3>
//         <ul className="career-list">
//           {categories.map((cat, i) => (
//             <li key={i}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories.includes(cat)}
//                   onChange={() => onCategoryChange(cat)}
//                 />
//                 {cat}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* ✅ Popup Modal for Adding Course */}
//       {showForm && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Submit New Training Course</h3>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Course Format:
//                 <input
//                   type="text"
//                   value={newCourse.format}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, format: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               <label>
//                 Course Category:
//                 <select
//                   value={newCourse.category}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, category: e.target.value })
//                   }
//                   required
//                 >
//                   <option value="">Select category</option>
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <label>
//                 Course Title:
//                 <input
//                   type="text"
//                   value={newCourse.title}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, title: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               <label>
//                 Organization:
//                 <input
//                   type="text"
//                   value={newCourse.organization}
//                   onChange={(e) =>
//                     setNewCourse({
//                       ...newCourse,
//                       organization: e.target.value,
//                     })
//                   }
//                   required
//                 />
//               </label>

//               <label>
//                 Course Status:
//                 <input
//                   type="text"
//                   value={newCourse.status}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, status: e.target.value })
//                   }
//                 />
//               </label>

//               <label>
//                 Course Link:
//                 <input
//                   type="url"
//                   value={newCourse.link}
//                   onChange={(e) =>
//                     setNewCourse({ ...newCourse, link: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               <div className="modal-actions">
//                 <button type="submit" className="primary-btn">
//                   Add Course
//                 </button>
//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// };

// export default Sidebar;



   <aside className="sidebar">
//       {/* ✅ Card 1: Submit Training Course */}
//       <div className="card">
//         <div className="sidebar-button">
//           <button className="primary-btn" onClick={() => setShowForm(true)}>
//             Submit Training Course
//           </button>
//         </div>
//       </div>

//       {/* ✅ Card 2: Search for a Course */}
//       <div className="card">
//         <h3>Search for a Course</h3>
//         <p>
//           <small>Example: Viral trainings.</small>
//         </p>
//         <input
          type="text"
          id="courseSearch"
          placeholder="Search by Keywords"
        />
      </div>

       {/* ✅ Card 3: Course Categories */}
       <div className="card">
         <h3>Course Categories</h3>
           <ul className="career-list">
             {categories.map((cat, i) => (
            <li key={i}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryChange(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
       </div>