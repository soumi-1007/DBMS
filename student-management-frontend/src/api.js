const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ========== STUDENTS ==========
export const getStudents = () =>
  fetch(`${BASE_URL}/students`).then(res => res.json());

export const addStudent = (data) =>
  fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateStudent = (id, data) =>
  fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteStudent = (id) =>
  fetch(`${BASE_URL}/students/${id}`, { method: "DELETE" }).then(res => res.json());

// ========== EVENTS ==========
export const getEvents = () =>
  fetch(`${BASE_URL}/events`).then(res => res.json());

export const getEventsByType = (type) =>
  fetch(`${BASE_URL}/events/filter/${type}`).then(res => res.json());

export const addEvent = (data) =>
  fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateEvent = (id, data) =>
  fetch(`${BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteEvent = (id) =>
  fetch(`${BASE_URL}/events/${id}`, { method: "DELETE" }).then(res => res.json());

// ========== FACULTY ==========
export const getFaculty = () =>
  fetch(`${BASE_URL}/faculty`).then(res => res.json());

export const addFaculty = (data) =>
  fetch(`${BASE_URL}/faculty`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateFaculty = (id, data) =>
  fetch(`${BASE_URL}/faculty/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteFaculty = (id) =>
  fetch(`${BASE_URL}/faculty/${id}`, { method: "DELETE" }).then(res => res.json());

// ========== PARTICIPATION ==========
export const getParticipation = () =>
  fetch(`${BASE_URL}/participation`).then(res => res.json());

export const getParticipationByType = (type) =>
  fetch(`${BASE_URL}/participation/filter/${type}`).then(res => res.json());

export const addParticipation = (data) =>
  fetch(`${BASE_URL}/participation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateParticipation = (id, data) =>
  fetch(`${BASE_URL}/participation/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteParticipation = (id) =>
  fetch(`${BASE_URL}/participation/${id}`, { method: "DELETE" }).then(res => res.json());

// ========== ACHIEVEMENTS ==========
export const getAchievements = () =>
  fetch(`${BASE_URL}/achievements`).then(res => res.json());

// ========== ACTIVITIES ==========
export const getActivities = () =>
  fetch(`${BASE_URL}/activities`).then(res => res.json());

// ========== DASHBOARD ==========
export const getDashboardStats = () =>
  fetch(`${BASE_URL}/dashboard`).then(res => res.json());

// ========== REGISTRATION LOG ==========
export const getRegistrationLog = () =>
  fetch(`${BASE_URL}/registration-log`).then(res => res.json());

export const registerStudent = (data) =>
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());