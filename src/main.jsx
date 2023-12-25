import { React } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Lobby />,
//   },
//   {
//     path: "/:id",
//     element: <BroadDetail />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
