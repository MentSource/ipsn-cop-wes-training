document.addEventListener("DOMContentLoaded", () => {
  // ==== API URL ====
  const API_THEMES = "https://cop-wes-training-backend.onrender.com/api/themes";
  //const API_BASE = window.location.hostname === "localhost"
   // ? "http://localhost:5001/api/courses"
  // const API_BASE = window.location.hostname === "localhost"
  //   ? "http://localhost:3000/api/courses"
  //   : "https://cop-wes-training-backend.onrender.com/api/courses";
    const isLocal = window.location.hostname === "localhost" || 
                  window.location.hostname === "127.0.0.1" ||
                  window.location.hostname === "";

  const API_BASE = isLocal
    ? "http://localhost:5001/api/courses"
    ? "http://localhost:3000/api/courses"
    : "https://cop-wes-training-backend.onrender.com/api/courses":

  console.log("Using API_BASE:", API_BASE); 
  document._COP_API_URL = API_BASE;

  // ==== Helpers ====
  function escapeHtml(unsafe) {
    if (unsafe == null) return '';
    return String(unsafe)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  function escapeAttr(unsafe) {
    if (unsafe == null) return '';
    return String(unsafe)
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }


  // ==== FORM SUBMISSION ====
const courseForm = document.getElementById("courseForm");

if (courseForm) {
  courseForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_title", document.getElementById("title")?.value.trim() || "");
    formData.append("course_organization", document.getElementById("organization")?.value.trim() || "");
    formData.append("course_theme", document.getElementById("theme")?.value || "");
    formData.append("course_format", document.getElementById("format")?.value || "");
    formData.append("course_language", document.getElementById("language")?.value.trim() || "");
    formData.append("course_accessibility", document.getElementById("accessibility")?.value || "");

    // Optional link
    const links = document.getElementById("links")?.value.trim();
    if (links) formData.append("links", links);

    // Optional PDF/PPTX upload
    // const pdfUpload = document.getElementById("pdfUpload")?.files[0];
    // if (pdfUpload) formData.append("files", pdfUpload);

    // const pdfUpload = document.getElementById("pdfUpload")?.files[0];
    // if (pdfUpload) formData.append("pdfUpload", pdfUpload);
  
    const pdfUpload = document.getElementById("pdfUpload")?.files;
    
    if (pdfUpload && pdfUpload.length > 0) {

      // Array.from(pdfUpload).forEach(file => formData.append("files", file));

     formData.append("file", pdfUpload[0]); // single file
}


    let responseMsg = document.getElementById("responseMessage");
    if (!responseMsg) {
      responseMsg = document.createElement('p');
      responseMsg.id = 'responseMessage';
      responseMsg.style.marginTop = '20px';
      responseMsg.style.fontWeight = 'bold';
      courseForm.appendChild(responseMsg);
    }

    const linksVal = document.getElementById("links")?.value.trim();
    const pdfFiles = document.getElementById("pdfUpload")?.files;
    if (!linksVal && (!pdfFiles || pdfFiles.length === 0)) {
      responseMsg.style.color = 'red';
      responseMsg.textContent = '⚠️ Provide a link or a file.';
      return;
    }

    // Decide payload type
    const hasFile = pdfFiles && pdfFiles.length > 0;
    //let options;
    //const options = { method: "POST", body: fd };

    const basePayload = {
      course_title: document.getElementById("title")?.value.trim() || "",
      course_organization: document.getElementById("organization")?.value.trim() || "",
      course_theme: document.getElementById("theme")?.value || "",
      course_format: document.getElementById("format")?.value || "",
      course_language: document.getElementById("language")?.value.trim() || "",
      course_accessibility: document.getElementById("accessibility")?.value || "",
      links: linksVal || ""
    };

    console.log("Sending payload:", basePayload);
    
    const fd = new FormData();
    Object.entries(basePayload).forEach(([k, v]) => fd.append(k, v));

    if (pdfFiles && pdfFiles.length > 0) {
    fd.append("pdfUpload", pdfFiles[0]);
    }

    const options = { method: 'POST', body: fd };


    // if (hasFile) {
    //   const fd = new FormData();
    //   Object.entries(basePayload).forEach(([k, v]) => fd.append(k, v));
    //   fd.append("pdfUpload", pdfFiles[0]); // single file only
    //   options = { method: 'POST', body: fd };
    // } else {
    //   options = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(basePayload)
    //   };
    // }

    try {
      const resp = await fetch(API_BASE, options);
      const raw = await resp.text();
      let data; try { data = JSON.parse(raw); } catch { data = { message: raw }; }
      console.log('POST status:', resp.status, 'response:', data);

      if (resp.ok) {
        responseMsg.style.color = 'green';
        responseMsg.textContent = data.message || '✅ Created';
        courseForm.reset();
        await loadCourses(); // refresh table
        // Remove redirect until DB confirmed
        // setTimeout(()=>location.href='index.html', 200);
      } else {
        responseMsg.style.color = 'red';
        responseMsg.textContent = data.message || `❌ Failed (${resp.status})`;
      }
    } catch (err) {
      console.error('Submit error:', err);
      responseMsg.style.color = 'red';
      responseMsg.textContent = '❌ Network error';
    }
  });
}
// ...existing code...
const courseTable = document.getElementById("courseTable");

async function loadCourses() {
  if (!courseTable) return;
  try {
    const r = await fetch(API_BASE);
    const raw = await r.text();
    let parsed; try { parsed = JSON.parse(raw); } catch { parsed = []; }
    const courses = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.courses) ? parsed.courses : []);
    courseTable.innerHTML = '';
    if (courses.length === 0) {
      courseTable.innerHTML = `<tr><td colspan="7" style="text-align:center;">No courses available yet.</td></tr>`;
      return;
    }
    courses.forEach(c => {
      const row = document.createElement('tr');
      row.classList.add('course-row');
      row.innerHTML = `
        <td>${escapeHtml(c.course_title || '')}</td>
        <td>${escapeHtml(c.course_organization || '')}</td>
        <td>${escapeHtml(c.course_theme || '')}</td>
        <td>${escapeHtml(c.course_format || '')}</td>
        <td>${escapeHtml(c.course_language || '')}</td>
        <td>${escapeHtml(c.course_accessibility || '')}</td>
        <td>${
          c.links ? `<a href="${escapeAttr(c.links)}" target="_blank" rel="noopener">Access</a>` :
          (c.pdf_path ? `<a href="${escapeAttr(c.pdf_path)}" target="_blank" rel="noopener">File</a>` : '')
        }</td>
      `;
      courseTable.appendChild(row);
    });
    setupPaginationAndFilters();
  } catch (e) {
    console.error('Load error:', e);
    courseTable.innerHTML = `<tr><td colspan="7" style="text-align:center;color:red;">❌ Failed to load courses.</td></tr>`;
  }
}

// ==== LOAD THEMES INTO FORM ====
var loadThemes = async () => {
      const response = await fetch(API_THEMES);
      const themes = await response.json();
      var themeSelect = document.getElementById("theme");
      if (!themeSelect) return;
      themes.forEach(theme => {
        const option = document.createElement("option");
        option.value = theme.id; 
        option.textContent = theme.name;
        themeSelect.appendChild(option);
      });
}
loadThemes();

  // ==== PAGINATION & FILTERS ====
  function setupPaginationAndFilters() {
    const recordsSelect = document.getElementById('records-per-page');
    const pageLinksContainer = document.getElementById('page-links');
    let courseRows = Array.from(document.querySelectorAll('.course-row'));
    let currentPage = 1;
    let recordsPerPage = recordsSelect ? parseInt(recordsSelect.value) || 50 : 50;

    function displayPage(page) {
      courseRows = Array.from(document.querySelectorAll('.course-row'));
      const visibleRows = courseRows.filter(r => !r.classList.contains('hidden'));
      const start = (page - 1) * recordsPerPage;
      const end = start + recordsPerPage;
      visibleRows.forEach((row, i) => row.style.display = (i >= start && i < end) ? '' : 'none');
      currentPage = page;
      updatePaginationButtons(visibleRows.length);
    }

    function updatePaginationButtons(totalVisible) {
      if (!pageLinksContainer) return;
      const totalPages = Math.max(1, Math.ceil(totalVisible / recordsPerPage));
      pageLinksContainer.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active');
        btn.addEventListener('click', () => displayPage(i));
        pageLinksContainer.appendChild(btn);
      }
    }

    displayPage(1);

    if (recordsSelect) recordsSelect.addEventListener('change', () => {
      recordsPerPage = parseInt(recordsSelect.value) || 50;
      displayPage(1);
    });
  }

  // ==== SEARCH ====
  ['global-search', 'courseSearch'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', function () {
      const keyword = this.value.toLowerCase().trim();
      const rows = document.querySelectorAll('.course-row');
      rows.forEach(row => row.style.display = row.textContent.toLowerCase().includes(keyword) ? '' : 'none');
    });
  });

  // ==== HAMBURGER MENU ====
  const hamburger = document.getElementById('mobile-menu');
  const nav = document.querySelector('.nav-links');
  if (hamburger && nav) hamburger.addEventListener('click', () => nav.classList.toggle('active'));

  // ==== BACK TO TOP ====
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ==== COLLAPSIBLES / DROPDOWN ====
  document.querySelectorAll(".collapsible").forEach(btn => btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    if (!content) return;
    content.style.display = (getComputedStyle(content).display === "none") ? "block" : "none";
  }));
  document.querySelectorAll('.dropdown-header').forEach(header => header.addEventListener('click', () => {
    const parent = header.closest('.dropdown');
    if (parent) parent.classList.toggle('open');
  }));


  // ==== DNA ANIMATION ====
  const dna = document.getElementById('dna');
  if (dna) {
    const colors = ['#1e88e5','#ea6024','#ccc24f','#89b82a','#bda098','#188cc5','#8b909c','#f7b561','#e86421','#dac258','#3676a0'];
    function createDNA() {
      dna.innerHTML = '';
      const width = dna.offsetWidth, height = dna.offsetHeight;
      const cols = Math.floor(width / 30), rows = 10;
      const spacingX = width / (cols + 1), spacingY = height / (rows + 1);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const offset1 = Math.sin((c / cols) * Math.PI * 2) * 40;
          const y1 = r * spacingY + offset1 + spacingY / 2;
          if (Math.random() > 0.6) continue; 
          addDot(c * spacingX, y1);
          
          const offset2 = Math.sin((c / cols) * Math.PI * 2 + Math.PI) * 40;
          const y2 = r * spacingY + offset2 + spacingY / 2;
          if (Math.random() > 0.6) continue; 
          addDot(c * spacingX, y2);
        }
      }
    }
    function addDot(left, top) {
      const dot = document.createElement('div');
      const size = 6 + Math.random() * 12;
      dot.className = 'dot';
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = left + 'px';
      dot.style.top = top + 'px';
      dot.style.background = colors[Math.floor(Math.random() * colors.length)];
      dna.appendChild(dot);
    }
    createDNA(); window.addEventListener('resize', createDNA);
  }

  // // ==== DNA ANIMATION ====
  // const dna = document.getElementById('dna');
  // if (dna) {
  //   const colors = ['#1e88e5','#ea6024','#ccc24f','#89b82a','#bda098','#188cc5','#8b909c','#f7b561','#e86421','#dac258','#3676a0'];
  //   function createDNA() {
  //     dna.innerHTML = '';
  //     const width = dna.offsetWidth, height = dna.offsetHeight;
  //     const cols = Math.floor(width / 30), rows = 10;
  //     const spacingX = width / (cols + 1), spacingY = height / (rows + 1);
  //     for (let c = 0; c < cols; c++) {
  //       for (let r = 0; r < rows; r++) {
  //         const offset1 = Math.sin((c / cols) * Math.PI * 2) * 40;
  //         const y1 = r * spacingY + offset1 + spacingY / 2;
  //         if (Math.random() > 0.6) continue; addDot(c * spacingX, y1);
  //         const offset2 = Math.sin((c / cols) * Math.PI * 2 + Math.PI) * 40;
  //         const y2 = r * spacingY + offset2 + spacingY / 2;
  //         if (Math.random() > 0.6) continue; addDot(c * spacingX, y2);
  //       }
  //     }
  //   }
  //   function addDot(left, top) {
  //     const dot = document.createElement('div');
  //     const size = 6 + Math.random() * 12;
  //     dot.className = 'dot';
  //     dot.style.width = size + 'px';
  //     dot.style.height = size + 'px';
  //     dot.style.left = left + 'px';
  //     dot.style.top = top + 'px';
  //     dot.style.background = colors[Math.floor(Math.random() * colors.length)];
  //     dna.appendChild(dot);
  //   }
  //   createDNA(); window.addEventListener('resize', createDNA);
  // }

  // ==== INITIAL LOAD ====
  loadCourses();
});


// if (courseForm) {
//   courseForm.addEventListener("submit", async e => {
//     e.preventDefault();

//     let responseMsg = document.getElementById("responseMessage");
//     if (!responseMsg) {
//       responseMsg = document.createElement('p');
//       responseMsg.id = 'responseMessage';
//       responseMsg.style.marginTop = '20px';
//       responseMsg.style.fontWeight = 'bold';
//       courseForm.appendChild(responseMsg);
//     }


//   const links = document.getElementById("links")?.value.trim();
//   const pdfUpload = document.getElementById("pdfUpload")?.files;

//   //  Validate at least one is provided
//   if (!links && (!pdfUpload || pdfUpload.length === 0)) {
//     responseMsg.style.color = 'red';
//     responseMsg.textContent = '⚠️ Please provide at least a link or upload a file.';
//     return; 
//   }

//    const hasFile = pdfFiles && pdfFiles.length > 0;
//     let options;


//     const formData = new FormData();
//     formData.append("course_title", document.getElementById("title")?.value.trim() || "");
//     formData.append("course_organization", document.getElementById("organization")?.value.trim() || "");
//     formData.append("course_theme", document.getElementById("theme")?.value || "");
//     formData.append("course_format", document.getElementById("format")?.value || "");
//     formData.append("course_language", document.getElementById("language")?.value.trim() || "");
//     formData.append("course_accessibility", document.getElementById("accessibility")?.value || "");

//     // Optional link
//     // const links = document.getElementById("links")?.value.trim();
//     if (links) formData.append("links", links);
   
//     // const pdfUpload = document.getElementById("pdfUpload")?.files;
//     if (pdfUpload && pdfUpload.length > 0) {
//        Array.from(pdfUpload).forEach(file => formData.append("pdfUpload", file));

// }


//     try {
//       const response = await fetch(API_BASE, { method: 'POST', body: formData });
//       const result = await response.json().catch(() => ({}));

//       if (response.ok) {
//         responseMsg.style.color = 'green';
//         responseMsg.textContent = result.message || '✅ Course submitted successfully!';
//         courseForm.reset();

//         setTimeout(() =>{ window.location.href = 'index.html'; }, 200);
        
//     } else {
//         responseMsg.style.color = 'red';
//         responseMsg.textContent = result.message || '⚠️ Submission failed.';
//       }
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       responseMsg.style.color = 'red';
//       responseMsg.textContent = '❌ Network error. Please try again.';
//     }
//   });
// }


//   // ==== LOAD COURSES ====
//   const courseTable = document.getElementById("courseTable");

//   async function loadCourses() {
//   if (!courseTable) return;
//   try {
//     const response = await fetch(API_BASE);
//     const courses = await response.json();
//     courseTable.innerHTML = '';
//     if (!Array.isArray(courses) || courses.length === 0) {
//       courseTable.innerHTML = `<tr><td colspan="7" style="text-align:center;">No courses available yet.</td></tr>`;
//       return;
//     }

//     courses.forEach(course => {
//       const row = document.createElement('tr');
//       row.classList.add('course-row');

//       const title = escapeHtml(course.course_title || '');
//       const org = escapeHtml(course.course_organization || '');
//       const theme = escapeHtml(course.course_theme || ''); // if you join theme name from DB
//       const format = escapeHtml(course.course_format || '');
//       const language = escapeHtml(course.course_language || '');
//       const accessibility = escapeHtml(course.course_accessibility || '');

//       // ===== Access Course column =====
//       const linksArray = [];
//       if (course.links) linksArray.push(course.links);
//       if (course.pdf_path) linksArray.push(course.pdf_path);

//       const linksHTML = linksArray.map(link => {
//         // If link ends with .pdf or .pptx, show as download
//         if (link.match(/\.(pdf|pptx)$/i)) {
//           return `<a href="${escapeAttr(link)}" target="_blank" rel="noopener noreferrer" download>Download File</a>`;
//         }
//         return `<a href="${escapeAttr(link)}" target="_blank" rel="noopener noreferrer">Access Course</a>`;
//       }).join('<br/>');

//       row.innerHTML = `
//         <td>${title}</td>
//         <td>${org}</td>
//         <td>${theme}</td>
//         <td>${format}</td>
//         <td>${language}</td>
//         <td>${accessibility}</td>
//         <td>${linksHTML}</td>
//       `;

//       courseTable.appendChild(row);
//     });

//     setupPaginationAndFilters();
//   } catch (err) {
//     console.error('Error loading courses:', err);
//     courseTable.innerHTML = `<tr><td colspan="7" style="text-align:center;color:red;">❌ Failed to load courses.</td></tr>`;
//   }
// }