//  base URL
const baseURL = "http://localhost:8000/api/v1/";

export const endpoints = {
// Auth Endpoint
  loginAuth: `${baseURL}auth/login`,
  signupAuth: `${baseURL}auth/signup`,
  logoutAuth: `${baseURL}auth/logout`,

// Todos Endpoint  
  getAllTodos: `${baseURL}todo/getalltask`,
  getSingleTodo: `${baseURL}todo/getsingletask`,
  addTodo: `${baseURL}todo/addtask`,
  updateTodo: `${baseURL}todo/updatetask`,
  deleteTodo: `${baseURL}todo/deletetask`,

};

// Export the endpoints object
export default endpoints;
