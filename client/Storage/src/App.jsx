import axios from "axios";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input, Progress } from "@chakra-ui/react";
function App() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleButtonClick = async () => {
    if (isFileSelected) {
      toast.loading("Uploading File");
      await handleUpload().then((res) => {
        setSelectedFile(null);
        setIsFileSelected(false);
      });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
      setIsFileSelected(true);
      console.log("Selected File:", selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.dismiss();
      toast.error("Please select a file.");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8010/api/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      toast.dismiss();
      toast.success("Uploading Success, File Uploaded In Folder");
      setUploadSuccess(true);
      console.log("Upload complete. Response: ", response.data);
      setSelectedFile(null);
      setIsFileSelected(false);
    } catch (error) {
      toast.dismiss();
      console.error("Upload failed: ", error);
      toast.error("Upload Failed");
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex w-full justify-center items-center h-full">
        <div>
          <Toaster />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="mb-12 text-center"
          />

          <h1
            className="bg-green-600 px-6 py-1.5 rounded-md shadow-md text-center text-white font-semibold w-[300px]"
            onClick={handleButtonClick}
          >
            Upload File
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
