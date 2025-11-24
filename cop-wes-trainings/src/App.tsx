import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CourseTable from "./components/CourseTable";
import Footer from "./components/Footer";
import SubmitCoursePage from "./pages/SubmitCoursePage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Hero />
      <main>
        <Routes>
          <Route path="/" element={<CourseTable />} />
          <Route path="/submit-course" element={<SubmitCoursePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import CourseTable from "./components/CourseTable";
// import SubmitCoursePage from "./components/SubmitCoursePage";
// import Footer from "./components/Footer";
// import "./App.css";
// import SubmitCourseForm from "../components/SubmitCourseForm";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Header />
//       <Hero />

//       <main>
//         <Routes>
//           {/* Home page */}
//           <Route path="/" element={<CourseTable />} />

//           {/* New page for the popup form */}
//           <Route path="/submit-course" element={<SubmitCoursePage />} />
//         </Routes>
//       </main>

//       <Footer />
//     </Router>
//   );
// };

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import CourseTable from "./components/CourseTable";
// import SubmitCoursePage from "./components/SubmitCoursePage";
// import Footer from "./components/Footer";
// import "./App.css";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Header />
//       <Hero />

//       <main>
//         <Routes>
//           {/* Home Page */}
//           <Route path="/" element={<CourseTable />} />

//           {/* Submit Form Page */}
//           <Route path="/submit" element={<SubmitCoursePage />} />
//         </Routes>
//       </main>

//       <Footer />
//     </Router>
//   );
// };

// export default App;


// old code
// import React from "react";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import CourseTable from "./components/CourseTable";
// import Footer from "./components/Footer";
// import "./App.css";

// const App: React.FC = () => {
//   return (
//     <>
//       <Header />
//       <Hero />
//       <main>
//         <CourseTable />
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default App;
