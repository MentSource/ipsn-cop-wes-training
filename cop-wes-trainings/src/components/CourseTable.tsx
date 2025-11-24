import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";


interface Course {
  format: string;
  category: string;
  title: string;
  organization: string;
  link: string;
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"title" | "organization">("title");
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const handleAddCourse = (course: Course) => {setCourses((prev) => [...prev, course]);};


  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setShowSidebar(false);
    }
  }

  if (showSidebar) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showSidebar]);

  const categories = [
    "Foundations of WES",
    "Method & Protocols",
    "Data Systems & Analysis",
    "Metadata, Standards & Interoperability",
    "Place-Based Applications",
    "Training, Collaboration & Growth",
  ];

  // ✅ Load courses dynamically from public/courses.json
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/courses.json");
        if (!response.ok) throw new Error("Failed to load course data");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // ✅ Handle category selection toggle
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };


  // ✅ Combined Filtering Logic
  const filteredCourses = useMemo(() => {
    return courses
      .filter(
        (course) =>
          (!search ||
            course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.category.toLowerCase().includes(search.toLowerCase()) ||
            course.organization.toLowerCase().includes(search.toLowerCase())) &&
          (selectedCategories.length === 0 ||
            selectedCategories.includes(course.category))
      )
      .sort((a, b) =>
        sortBy === "title"
          ? a.title.localeCompare(b.title)
          : a.organization.localeCompare(b.organization)
      );
  }, [courses, search, selectedCategories, sortBy]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / recordsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSortBy("title");
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading courses...</p>
      </div>
    );
  }

return (
  <section className="course-section">
    <div className="layout">
      {/* Sidebar Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰ Filters
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`layout-sidebar ${showSidebar ? "open" : ""}`}
      >
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={(cat) => {
            handleCategoryChange(cat);
            setShowSidebar(false); 
          }}
          onAddCourse={handleAddCourse}
        />
      </aside>

      {/* Right Content */}
      <div className="layout-content">
        <div className="course-header">
          <div className="course-header-left">
            <p>
              Found <strong>{filteredCourses.length}</strong> courses
            </p>
            <button onClick={clearAllFilters}>Clear All Filters</button>
          </div>

          <div className="course-actions">
            <label htmlFor="sortCourses">Sort by:</label>
            <select
              id="sortCourses"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "title" | "organization")
              }
            >
              <option value="title">Course Title</option>
              <option value="organization">Organization</option>
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search course..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <table>
          <thead>
            <tr>
              <th>Course Format</th>
              <th>Course Category</th>
              <th>Course Title</th>
              <th>Organization</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course, i) => (
                <tr key={i}>
                  <td>{course.format}</td>
                  <td>{course.category}</td>
                  <td>{course.title}</td>
                  <td>{course.organization}</td>
                  <td>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Access Course
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No matching courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
        />

        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top ↑
        </button>
      </div>
    </div>
  </section>
);

};

export default CourseTable;

