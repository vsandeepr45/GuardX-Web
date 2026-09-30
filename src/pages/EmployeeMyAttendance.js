import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "../styles/EmployeeMyAttendance.css";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  HiOutlineUser,
  HiOutlineIdentification,
  HiOutlineBriefcase,
  HiOutlineBuildingOffice,
  HiOutlineBuildingOffice2,
  HiOutlineMap,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineGlobeAlt,
  HiOutlineHome,
  HiOutlineCheckBadge,
  HiOutlineShieldCheck,
  HiOutlineArrowPath,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCheckCircle,
  HiOutlineArrowRightCircle,
  HiOutlineArrowLeftCircle,
} from "react-icons/hi2";

const EmployeeMyAttendance = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [employee, setEmployee] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [locationCaptured, setLocationCaptured] = useState(false);
  const [accuracy, setAccuracy] = useState("");
  const [capturedAt, setCapturedAt] = useState("");

  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState({});
  const webcamRef = useRef(null);
const [capturedImage, setCapturedImage] = useState(null);
const [showCamera, setShowCamera] = useState(false);

// Face verification states
const [faceVerificationStatus, setFaceVerificationStatus] = useState("idle");
// idle | checking | matched | failed | error

const [faceVerificationMessage, setFaceVerificationMessage] =
  useState("");

const [faceSimilarity, setFaceSimilarity] = useState(null);



  useEffect(() => {
    fetchEmployee();
    fetchAttendanceHistory();
    fetchTodayAttendance();
  }, []);

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const res = await axios.get(
        "http://127.0.0.1:5001/api/employee/my-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEmployee(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setCurrentDate(now.toISOString().split("T")[0]);

      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateDateTime();

    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showPopup) {
      getCurrentLocation();
    } else {
      setLatitude("");
      setLongitude("");
      setAddress("");
      setMapUrl("");
      setLocationError("");
      setLocationCaptured(false);
    }
  }, [showPopup]);

const handlePunchIn = async () => {
  // Selfie Validation
  if (!capturedImage) {
    alert("Please capture your selfie before Punch In.");
    return;
  }

  // GPS Validation
  if (!locationCaptured) {
    alert("Please capture your live location before Punch In.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://127.0.0.1:5001/api/attendance/punch-in",
      {
        latitude: latitude || null,
        longitude: longitude || null,
        accuracy: accuracy || null,
        address: address || "",
        selfie: capturedImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert(
      response.data.message ||
        "Punch In Successful"
    );

    fetchAttendanceHistory();
    fetchTodayAttendance();

    // Clear captured attendance data
    setCapturedImage(null);
    setShowCamera(false);

  } catch (error) {
    console.error(
      "Punch In Error:",
      error.response || error
    );

    alert(
      error.response?.data?.message ||
        error.message ||
        "Punch In Failed"
    );
  }
};

const handlePunchOut = async () => {
  // Selfie Validation
  if (!capturedImage) {
    alert("Please capture your selfie before Punch Out.");
    return;
  }

  // Live Location Validation
  if (!locationCaptured) {
    alert("Please capture your live location before Punch Out.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://127.0.0.1:5001/api/attendance/punch-out",
      {
        latitude: latitude || null,
        longitude: longitude || null,
        accuracy: accuracy || null,
        selfie: capturedImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert(
      response.data.message ||
        "Punch Out Successful"
    );

    fetchAttendanceHistory();
    fetchTodayAttendance();

    // Clear captured attendance data
    setCapturedImage(null);
    setShowCamera(false);

  } catch (error) {
    console.error(
      "Punch Out Error:",
      error.response || error
    );

    alert(
      error.response?.data?.message ||
        error.message ||
        "Punch Out Failed"
    );
  }
};

  const fetchAttendanceHistory = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://127.0.0.1:5001/api/attendance/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("Attendance History API Response:", res.data);

    const history = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.attendance)
          ? res.data.attendance
          : Array.isArray(res.data.records)
            ? res.data.records
            : [];

    setAttendanceHistory(history);
  } catch (error) {
    console.error("Attendance History Error:", error);
    setAttendanceHistory([]);
  }
};

  const fetchTodayAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://127.0.0.1:5001/api/attendance/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTodayAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentLocation = async () => {
    console.log("getCurrentLocation called");
    setLocationLoading(true);
    setLocationError("");
    setLocationCaptured(false);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLatitude(lat);
          setLongitude(lng);
          setAccuracy(position.coords.accuracy);
          setCapturedAt(new Date().toLocaleString());

          setMapUrl(
            `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`,
          );

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
          );

          const data = await response.json();

          setAddress(data.display_name || "Address not found");

          setLocationCaptured(true);
        } catch (err) {
          console.error(err);
          setLocationError("Unable to fetch address.");
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.log("Geolocation Error:", error);
        console.log("Error Code:", error.code);
        console.log("Error Message:", error.message);

        let message = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location permission denied.";
            break;

          case error.POSITION_UNAVAILABLE:
            message = "Location unavailable.";
            break;

          case error.TIMEOUT:
            message = "Location request timed out.";
            break;

          default:
            message = "Unable to fetch location.";
        }

        setLocationError(message);
        setLocationLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };
const verifyAttendanceFace = async (image) => {
  if (!image) {
    return;
  }

  try {
    setFaceVerificationStatus("checking");
    setFaceVerificationMessage("Checking your face...");
    setFaceSimilarity(null);

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://127.0.0.1:5001/api/attendance/verify-face",
      {
        selfie: image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data?.data;

    console.log("Face Verification Response:", response.data);

    if (data?.face_verified === true) {
      setFaceVerificationStatus("matched");
      setFaceVerificationMessage(
        "Your face matches the enrolled profile."
      );

      setFaceSimilarity(data.face_similarity ?? null);
    } else {
      setFaceVerificationStatus("failed");
      setFaceVerificationMessage(
        response.data?.message ||
          "Face does not match your enrolled profile."
      );

      setFaceSimilarity(data?.face_similarity ?? null);
    }
  } catch (error) {
    console.error(
      "Face Verification Error:",
      error.response || error
    );

    setFaceVerificationStatus("error");

    setFaceVerificationMessage(
      error.response?.data?.message ||
        "Unable to verify your face. Please retake your selfie."
    );

    setFaceSimilarity(null);
  }
};



const captureSelfie = async () => {
  // Open camera
  if (!showCamera && !capturedImage) {
    setFaceVerificationStatus("idle");
    setFaceVerificationMessage("");
    setShowCamera(true);
    return;
  }

  // Retake selfie
  if (capturedImage) {
    setCapturedImage(null);
    setFaceVerificationStatus("idle");
    setFaceVerificationMessage("");
    setFaceSimilarity(null);
    setShowCamera(true);
    return;
  }

  // Capture image
  const imageSrc = webcamRef.current?.getScreenshot();

  if (!imageSrc) {
    setFaceVerificationStatus("error");
    setFaceVerificationMessage(
      "Unable to capture your selfie. Please try again."
    );
    return;
  }

  setCapturedImage(imageSrc);
  setShowCamera(false);

  // Immediately verify captured selfie
  await verifyAttendanceFace(imageSrc);
};



const safeAttendanceHistory = Array.isArray(attendanceHistory)
  ? attendanceHistory
  : [];
  return (
    <DashboardLayout title="Patrol Route Master">
      <div className="employee-attendance-container">
        <div className="attendance-page-header">
          <div className="attendance-header-card">
            <h2>My Attendance</h2>

            <p>Home / My Attendance</p>
          </div>
        </div>

        <div className="attendance-toolbar">
          <button
            className="attendance-btn"
            onClick={() => {
              // Reset previous data
              setCapturedImage(null);
              setShowCamera(false);
              setFaceVerificationStatus("idle");
              setFaceVerificationMessage("");
              setFaceSimilarity(null);
              setLocationCaptured(false);
              setLatitude("");
              setLongitude("");
              setAddress("");
              setAccuracy("");
              setCapturedAt("");
              setMapUrl("");
              setLocationError("");


              setShowPopup(true);
            }}
          >
            + Add My Attendance
          </button>
        </div>

<div className="attendance-dashboard">

  <div className="dashboard-card blue">
    <h2>{safeAttendanceHistory.length}</h2>
    <p>Total Attendance</p>
  </div>

  <div className="dashboard-card green">
    <h2>
      {
        safeAttendanceHistory.filter(
          (x) => x.attendance_status === "Present"
        ).length
      }
    </h2>
    <p>Present</p>
  </div>

  <div className="dashboard-card red">
    <h2>
      {
        safeAttendanceHistory.filter(
          (x) => x.attendance_status === "Absent"
        ).length
      }
    </h2>
    <p>Absent</p>
  </div>

  <div className="dashboard-card orange">
    <h2>
      {
        safeAttendanceHistory.filter(
          (x) => x.attendance_status === "Late"
        ).length
      }
    </h2>
    <p>Late</p>
  </div>

</div>

        <div className="attendance-history">
          <h3>Attendance History</h3>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Work Hours</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
{safeAttendanceHistory.length > 0 ? (
  safeAttendanceHistory.map((item, index) => (
    <tr key={index}>
      <td>{item.attendance_date}</td>
      <td>{item.punch_in_time || "--"}</td>
      <td>{item.punch_out_time || "--"}</td>
      <td>{item.work_hours || "--"}</td>
      <td>
        <span
          className={
            item.attendance_status === "Present"
              ? "present"
              : item.attendance_status === "Late"
                ? "late"
                : "absent"
          }
        >
          {item.attendance_status}
        </span>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5" style={{ textAlign: "center" }}>
      No Attendance Records Found
    </td>
  </tr>
)}
            </tbody>
          </table>
        </div>

        {/* Popup */}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">
                <div className="popup-title">
                  <h2>My Attendance</h2>
                  <p>Mark your attendance for today</p>
                </div>

                <button
                  className="close-btn"
                  onClick={() => {
                  setCapturedImage(null);
                  setShowCamera(false);

                  setFaceVerificationStatus("idle");
                  setFaceVerificationMessage("");
                  setFaceSimilarity(null);

                  setLocationCaptured(false);
                  setShowPopup(false);
                  }}
                >
                  ✕
                </button>
              </div>

              <hr />

              <div className="attendance-form">
                <div className="attendance-main-layout">
                  {/* Left Side */}
                  <div className="attendance-left">
                    <div className="info-card">
                      <h3 className="card-title">
                        <HiOutlineUser className="card-title-icon" />
                        Employee Information
                      </h3>

                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <HiOutlineUser className="field-icon" />
                            Employee Name
                          </label>
                          <input
                            type="text"
                            value={employee.employee_name || ""}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>
                            <HiOutlineCheckBadge className="field-icon" />
                            Employee Code
                          </label>
                          <input
                            type="text"
                            value={employee.employee_code || ""}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="deployment-card">
                      <h3 className="card-title">
                        <HiOutlineBriefcase className="card-title-icon" />
                        Deployment Details
                      </h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <HiOutlineBuildingOffice className="field-icon" />
                            Client
                          </label>
                          <input
                            type="text"
                            value={employee.client_name || ""}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>
                            <HiOutlineUser className="field-icon" />
                            Supervisor
                          </label>
                          <input
                            type="text"
                            value={employee.supervisor_name || ""}
                            readOnly
                          />
                        </div>
                      </div>{" "}
                      {/* form-row close */}
                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <HiOutlineIdentification className="field-icon" />
                            Deployment Code
                          </label>
                          <input
                            type="text"
                            value={employee.deployment_code || ""}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>
                            <HiOutlineBriefcase className="field-icon" />
                            Duty Position
                          </label>
                          <input
                            type="text"
                            value={employee.designation_name || ""}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <HiOutlineBuildingOffice2 className="field-icon" />
                            Company
                          </label>
                          <input
                            type="text"
                            value={employee.company_name || ""}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>
                            <HiOutlineMap className="field-icon" />
                            Project
                          </label>
                          <input
                            type="text"
                            value={employee.project_name || ""}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <HiOutlineMapPin className="field-icon" />
                            Site
                          </label>
                          <input
                            type="text"
                            value={employee.site_name || ""}
                            readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label>
                            <HiOutlineClock className="field-icon" />
                            Shift
                          </label>
                          <input
                            type="text"
                            value={employee.shift_name || ""}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            <HiOutlineCalendar className="field-icon" />
                            Attendance Date
                          </label>
                          <input type="date" value={currentDate} readOnly />
                        </div>

                        <div className="form-group">
                          <label>
                            <HiOutlineClock className="field-icon" />
                            Current Time
                          </label>
                          <input type="text" value={currentTime} readOnly />
                        </div>
                      </div>
                    </div>

                    {/* Live GPS Location */}
                    <div className="gps-card">
                      <div className="gps-header">
                        <h3 className="card-title">
                          <HiOutlineMapPin className="card-title-icon" />
                          Current Live Location
                        </h3>

                        <button
                          type="button"
                          className="refresh-location-btn"
                          onClick={getCurrentLocation}
                        >
                          <HiOutlineArrowPath className="refresh-icon" />
                          Refresh
                        </button>
                      </div>

                      {locationLoading ? (
                        <div className="gps-loading">
                          Fetching live location...
                        </div>
                      ) : locationError ? (
                        <div className="gps-error">{locationError}</div>
                      ) : (
                        <>
                          <div className="gps-map">
                            {mapUrl ? (
                              <iframe
                                title="Current Location"
                                src={mapUrl}
                                width="100%"
                                height="260"
                                style={{
                                  border: 0,
                                  borderRadius: "12px",
                                }}
                                loading="lazy"
                              />
                            ) : (
                              <div
                                style={{
                                  height: "260px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                Waiting for GPS...
                              </div>
                            )}
                          </div>

                          <div className="gps-info">
                            <div className="gps-item">
                              <strong>
                                <HiOutlineMapPin className="gps-icon" />
                                Latitude
                              </strong>
                              <span>{latitude || "--"}</span>
                            </div>

                            <div className="gps-item">
                              <strong>
                                <HiOutlineGlobeAlt className="gps-icon" />
                                Longitude
                              </strong>
                              <span>{longitude || "--"}</span>
                            </div>

                            <div className="gps-item">
                              <strong>
                                <HiOutlineHome className="gps-icon" />
                                Address
                              </strong>
                              <span>{address || "--"}</span>
                            </div>

                            <div className="gps-item">
                              <strong>
                                <HiOutlineCheckBadge className="gps-icon" />
                                Accuracy
                              </strong>
                              <span>
                                {accuracy
                                  ? `${Number(accuracy).toFixed(1)} meters`
                                  : "--"}
                              </span>
                            </div>

                            <div className="gps-item">
                              <strong>
                                <HiOutlineClock className="gps-icon" />
                                Captured At
                              </strong>
                              <span>{capturedAt || "--"}</span>
                            </div>

                            <div className="gps-item">
                              <strong>
                                <HiOutlineShieldCheck className="gps-icon" />
                                Status
                              </strong>

                              <span
                                style={{
                                  color: locationCaptured
                                    ? "#16a34a"
                                    : "#dc2626",
                                  fontWeight: "600",
                                }}
                              >
                                {locationCaptured
                                  ? "Live Location Captured"
                                  : "Waiting"}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="attendance-right">
                    {/* Today's Status */}
                    <div className="status-card">
                      <h3 className="card-title">
                        <HiOutlineClipboardDocumentCheck className="card-title-icon" />
                        Today's Attendance Status
                      </h3>

                      <div className="attendance-status-card">
                        <p>
                          <strong>
                            <HiOutlineCheckCircle className="field-icon" />
                            Status :
                          </strong>

                          <span className="status-present">
                            {todayAttendance.status || "Not Marked"}
                          </span>
                        </p>

                        <p>
                          <strong>
                            <HiOutlineArrowRightCircle className="field-icon" />
                            Punch In :
                          </strong>

                          {todayAttendance.punch_in
                            ? new Date(
                                todayAttendance.punch_in,
                              ).toLocaleTimeString()
                            : "--:--"}
                        </p>

                        <p>
                          <strong>
                            <HiOutlineArrowLeftCircle className="field-icon" />
                            Punch Out :
                          </strong>

                          {todayAttendance.punch_out
                            ? new Date(
                                todayAttendance.punch_out,
                              ).toLocaleTimeString()
                            : "--:--"}
                        </p>

                        <p>
                          <strong>
                            <HiOutlineClock className="field-icon" />
                            Work Hours :
                          </strong>

                          {todayAttendance.work_hours
                            ? `${Number(todayAttendance.work_hours).toFixed(2)} Hours`
                            : "--"}
                        </p>
                      </div>
                    </div>

                    {/* Selfie Card */}
{/* Selfie Card */}
<div className="selfie-card">
  <h3 className="card-title">
    🛡️ Selfie Verification
  </h3>

  <div className="camera-box">

    {/* Header */}
    <div className="camera-header-box">
      <div className="camera-icon">
        <img
          src="https://img.icons8.com/fluency/96/camera.png"
          alt="camera"
        />
      </div>

      <h2>Capture your selfie</h2>

      <p>
        Your selfie will be compared with your
        enrolled face profile.
      </p>
    </div>

    {/* Camera / Captured Image */}
    {capturedImage ? (
      <div className="captured-image-wrapper">
        <img
          src={capturedImage}
          alt="Captured Selfie"
          className="captured-image"
        />

        {/* Verification Overlay */}
        {faceVerificationStatus === "checking" && (
          <div className="face-status-overlay checking">
            <div className="face-status-icon">
              🔄
            </div>

            <strong>Verifying Face...</strong>

            <span>
              Please wait while we compare your
              selfie.
            </span>
          </div>
        )}

        {faceVerificationStatus === "matched" && (
          <div className="face-status-overlay matched">
            <div className="face-status-icon">
              ✓
            </div>

            <strong>Face Matched</strong>

            <span>
              Your face matches the enrolled profile.
            </span>
          </div>
        )}

        {faceVerificationStatus === "failed" && (
          <div className="face-status-overlay failed">
            <div className="face-status-icon">
              ✕
            </div>

            <strong>Face Not Matched</strong>

            <span>
              Please retake your selfie.
            </span>
          </div>
        )}

        {faceVerificationStatus === "error" && (
          <div className="face-status-overlay error">
            <div className="face-status-icon">
              !
            </div>

            <strong>Verification Failed</strong>

            <span>
              {faceVerificationMessage}
            </span>
          </div>
        )}
      </div>
    ) : showCamera ? (
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        mirrored={true}
        videoConstraints={{
          width: 300,
          height: 300,
          facingMode: "user",
        }}
        className="camera-preview"
        onUserMedia={() => {
          console.log("✅ Camera Started");
        }}
        onUserMediaError={(err) => {
          console.error("❌ Camera Error:", err);
        }}
      />
    ) : (
      <div className="camera-placeholder">
        <div className="camera-placeholder-icon">
          📷
        </div>

        <p>Camera is ready</p>

        <span>
          Click the button below to capture your selfie.
        </span>
      </div>
    )}

    {/* Verification Status Card */}
    {capturedImage && (
      <div
        className={`face-verification-status ${faceVerificationStatus}`}
      >
        {faceVerificationStatus === "checking" && (
          <>
            <span className="status-icon">🔄</span>

            <div>
              <strong>Checking face...</strong>
              <p>
                Comparing your selfie with your
                enrolled profile.
              </p>
            </div>
          </>
        )}

        {faceVerificationStatus === "matched" && (
          <>
            <span className="status-icon">🟢</span>

            <div>
              <strong>Face matched successfully</strong>

              <p>
                You can now mark your attendance.
              </p>
            </div>
          </>
        )}

        {faceVerificationStatus === "failed" && (
          <>
            <span className="status-icon">🔴</span>

            <div>
              <strong>Face not matched</strong>

              <p>
                Please retake your selfie and make
                sure your face is clearly visible.
              </p>
            </div>
          </>
        )}

        {faceVerificationStatus === "error" && (
          <>
            <span className="status-icon">🟠</span>

            <div>
              <strong>Unable to verify face</strong>

              <p>
                {faceVerificationMessage}
              </p>
            </div>
          </>
        )}
      </div>
    )}

    {/* Verification Checklist */}
    {capturedImage && (
      <div className="face-check-list">

        <div className="face-check-item">
          <span>
            {faceVerificationStatus !== "idle"
              ? "✓"
              : "○"}
          </span>

          <p>Face captured</p>
        </div>

        <div className="face-check-item">
          <span>
            {faceVerificationStatus === "matched"
              ? "✓"
              : "○"}
          </span>

          <p>Face profile matched</p>
        </div>

        <div className="face-check-item pending">
          <span>○</span>

          <p>
            Liveness / anti-spoof verification
          </p>
        </div>

      </div>
    )}

    {/* Capture / Retake Button */}
    <button
      className="capture-btn"
      onClick={captureSelfie}
      disabled={faceVerificationStatus === "checking"}
    >
      {capturedImage
        ? "🔄 Retake Selfie"
        : showCamera
          ? "📸 Capture"
          : "📷 Capture Selfie"}
    </button>

    {/* Information */}
    <div className="selfie-info">
      <div className="selfie-info-icon">
        🛡️
      </div>

      <div>
        <h4>Why Selfie is Required?</h4>

        <p>
          Selfie verification helps ensure that
          attendance is marked by the correct
          employee at the correct location.
        </p>
      </div>
    </div>

  </div>
</div>

                    {/* Buttons */}
                    <div className="button-row">
                      <button
                        className="punch-in-btn"
                        onClick={handlePunchIn}
                        disabled={
                          !capturedImage ||
                          !locationCaptured ||
                          faceVerificationStatus !== "matched"
                        }
                      >
                        🟢 Punch In
                      </button>

                      <button
                        className="punch-out-btn"
                        onClick={handlePunchOut}
                        disabled={
                          !capturedImage ||
                          !locationCaptured ||
                          faceVerificationStatus !== "matched"
                        }
                      >
                        🔴 Punch Out
                      </button>
                    </div>
                  </div>

                  {/* Main Layout End */}
                </div>

                {/* Attendance Form End */}
              </div>

              {/* Popup Box End */}
            </div>

            {/* Popup Overlay End */}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeMyAttendance;
