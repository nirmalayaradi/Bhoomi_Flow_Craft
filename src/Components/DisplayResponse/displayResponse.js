import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./displayResponse.css";

const DisplayResponse = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Fetch the HTML page from local storage
    const storedHTML = localStorage.getItem("documents");
    if (storedHTML) {
      setHtmlContent(storedHTML);
    }
  }, []);

  const requestBody = localStorage.getItem("requestBody");

  // Function to download the stored HTML content
  const handleDownload = () => {
    if (!htmlContent) {
      alert("No HTML content found!");
      return;
    }
    
    localStorage.removeItem("documents");
    localStorage.removeItem("requestBody");

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const a = document.createElement("a");
    a.href = url;
    a.download = "flowchart.html"; // File name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the object URL
    URL.revokeObjectURL(url);
  };

  return (
    <div className="response-container">
      <h1 className="header-title">Flow Chart Component ID = {requestBody}</h1>
      <div className="iframe-container">
        {/* Display the stored HTML inside an iframe */}
        {htmlContent && (
          <iframe srcDoc={htmlContent} title="Flowchart" className="iframe-display" />
        )}
      </div>

      <div className="button-container">
        <Link to="/Bhoomi_Flow_Craft">
          <button className="download-btn">Back to Home</button>
        </Link>
        <button className="download-btn" onClick={handleDownload}>
          Download HTML File
        </button>
      </div>
    </div>
  );
};

export default DisplayResponse;
