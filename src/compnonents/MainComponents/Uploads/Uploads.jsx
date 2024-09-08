import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Uploads.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

Modal.setAppElement("#root");

const Uploads = ({ onComplete, onSubmission }) => {
  const [panCard, setPanCard] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);
  const [panCardUrl, setPanCardUrl] = useState("");
  const [aadharCardUrl, setAadharCardUrl] = useState("");
  const [panCardPreview, setPanCardPreview] = useState("");
  const [aadharCardPreview, setAadharCardPreview] = useState("");
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [uploadAadharText,setUploadAadharText] = useState("Upload")
  const [uploadPanText,setUploadPanText] = useState("Upload")

  const notify = () => {
    toast.success('Uploaded successfully!', {
      position: 'top-center',
      autoClose: 1000,
    });
  };
  const handlePanCardChange = (event) => {
    const file = event.target.files[0];
    setPanCard(file);
    setPanCardPreview(URL.createObjectURL(file));
  };

  const handleAadharCardChange = (event) => {
    const file = event.target.files[0];
    setAadharCard(file);
    setAadharCardPreview(URL.createObjectURL(file));
  };

 
  const uploadPan = async (e) => {
    e.preventDefault();
    if (!panCard) return;
    setUploadPanText("Uploading .")
    const formData = new FormData();
    formData.append("file", panCard);
    formData.append("upload_preset", "zigmabank040");
    try {
    setUploadPanText("Uploading ...")
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvmkt80vc/image/upload",
        formData
      );
    setUploadPanText("Uploading .....")
      setPanCardUrl(response.data.secure_url);
      notify()
      setUploadPanText("Uploaded")
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const uploadAadhar = async (e) => {
    e.preventDefault();
    if (!aadharCard) return;
    setUploadAadharText("Uploading .")
    const formData = new FormData();
    formData.append("file", aadharCard);
    formData.append("upload_preset", "zigmabank040");
    try {
      setUploadAadharText("Uploading ...")
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvmkt80vc/image/upload",
        formData
      );
      setUploadAadharText("Uploading .....")
      setAadharCardUrl(response.data.secure_url);
      notify()
      setUploadAadharText("Uploaded")
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aadharCardUrl && !panCardUrl) return;
    const uploadData = {
      Aadhar: aadharCardUrl,
      Pan: panCardUrl,
    };
    console.log(uploadData);
    onSubmission(uploadData);
    onComplete("3");
  };

  return (
    <div className="upload">
       <ToastContainer />
      <div className="upload-container">
        <div className="illustration">
          <img
            src="https://res.cloudinary.com/dsbuzlxpw/image/upload/v1719229069/cglv9lhybjskrlkdtpfx.jpg"
            alt="Key Carriers"
            className="upload-img"
          />
        </div>
        <div className="upload-form-container">
          <form>
            <div className="form-group">
              <label className="label" htmlFor="pan-card">
                PAN Card:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePanCardChange}
                className="input-file"
                required
              />
              <button className="upload-btn" onClick={uploadPan}>
                {uploadPanText}
              </button>
            </div>
            <div className="form-group">
              <label className="label" htmlFor="aadhar-card">
                Aadhar Card:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAadharCardChange}
                className="input-file"
                required
              />
              <button className="upload-btn" onClick={uploadAadhar}>
              {uploadAadharText}
              </button>
            </div>
            <center>
              <button onClick={handleSubmit} className="btn-submit">
                Submit
              </button>
            </center>
          </form>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Image Modal"
            className="image-modal"
            overlayClassName="image-modal-overlay"
          >
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <img src={selectedImage} alt="Selected" className="modal-image" />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Uploads;
