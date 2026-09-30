// import { useEffect, useState } from "react";

// import { useNavigate, useParams } from "react-router-dom";

// import DashboardLayout from "../../../layouts/DashboardLayout";

// import {

//     FaArrowLeft,
//     FaMapMarkerAlt,
//     FaCamera,
//     FaQrcode,
//     FaWifi,
//     FaClipboardCheck

// } from "react-icons/fa";

// import {

//     getCheckpointDetails,
//     checkpointCheckin

// } from "../../../api/patrol";

// import "../../../styles/CheckpointDetails.css";
// export default function CheckpointDetails(){
// const navigate = useNavigate();

// const { checkpointId } = useParams();

// const [loading,setLoading] = useState(true);

// const [saving,setSaving] = useState(false);

// const [checkpoint,setCheckpoint] = useState(null);

// const [location,setLocation] = useState(null);

// const [distance,setDistance] = useState(null);
// const [showQR,setShowQR] = useState(false);

// const [qrValue,setQrValue] = useState("");

// const [qrVerified,setQrVerified] = useState(false);
// const [remarks,setRemarks] = useState("");

// const [photo,setPhoto] = useState(null);

// const [preview,setPreview] = useState("");

// const [gpsValid,setGpsValid] = useState(false);
// const handlePhoto=(e)=>{

//     const file=e.target.files[0];

//     if(!file)

//         return;

//     setPhoto(file);

//     setPreview(

//         URL.createObjectURL(file)

//     );

// };
// const loadCheckpoint = async()=>{

//     try{

//         const res = await getCheckpointDetails(

//             checkpointId

//         );

//         setCheckpoint(

//             res.data.data

//         );

//     }

//     catch(err){

//         console.log(err);

//     }

//     finally{

//         setLoading(false);

//     }

// };
// const handleQR=(value)=>{

//     setQrValue(value);

//     setShowQR(false);

//     if(

//         value===checkpoint.qr_code

//     ){

//         setQrVerified(true);

//     }

//     else{

//         alert(

//             "Invalid QR Code"

//         );

//     }

// };
// useEffect(()=>{

//     loadCheckpoint();

// },[checkpointId]);

// useEffect(()=>{

//     if(!navigator.geolocation)

//         return;

//     const watch = navigator.geolocation.watchPosition(

//         pos=>{

//             const lat = pos.coords.latitude;

//             const lng = pos.coords.longitude;

//             setLocation({

//                 latitude:lat,

//                 longitude:lng

//             });

//         },

//         err=>{

//             console.log(err);

//         },

//         {

//             enableHighAccuracy:true,

//             maximumAge:0

//         }

//     );

//     return()=>{

//         navigator.geolocation.clearWatch(

//             watch

//         );

//     };

// },[]);

// function getDistance(

//     lat1,

//     lon1,

//     lat2,

//     lon2

// ){

//     const R = 6371000;

//     const dLat =

//         (lat2-lat1)*Math.PI/180;

//     const dLon =

//         (lon2-lon1)*Math.PI/180;

//     const a =

//         Math.sin(dLat/2)

//         *

//         Math.sin(dLat/2)

//         +

//         Math.cos(

//             lat1*Math.PI/180

//         )

//         *

//         Math.cos(

//             lat2*Math.PI/180

//         )

//         *

//         Math.sin(dLon/2)

//         *

//         Math.sin(dLon/2);

//     const c =

//         2*

//         Math.atan2(

//             Math.sqrt(a),

//             Math.sqrt(1-a)

//         );

//     return Math.round(

//         R*c

//     );

// }

// useEffect(()=>{

//     if(

//         !location ||

//         !checkpoint

//     )

//         return;

//     const d = getDistance(

//         location.latitude,

//         location.longitude,

//         checkpoint.latitude,

//         checkpoint.longitude

//     );

//     setDistance(d);

//     setGpsValid(

//         d<=checkpoint.allowed_radius

//     );

// },[location,checkpoint]);

// const submitCheckpoint = async()=>{

//     if(!gpsValid){

//         alert(

//             "You are outside the allowed radius."

//         );

//         return;

//     }

//     try{

//         setSaving(true);

//         await checkpointCheckin({

//             checkpoint_id:checkpoint.id,

//             latitude:location.latitude,

//             longitude:location.longitude,

//             remarks,

//             photo

//         });

//         navigate(-1);

//     }

//     catch(err){

//         console.log(err);

//     }

//     finally{

//         setSaving(false);

//     }

// };

// if (!checkpoint) {

//     return (

//         <DashboardLayout>

//             <div className="gx-loading">

//                 Checkpoint not found.

//             </div>

//         </DashboardLayout>

//     );

// }

// return(

// <DashboardLayout>

// <div className="gx-checkpoint-page">

//     {/* ================= HEADER ================= */}

//     <div className="gx-checkpoint-header">

//         <button

//             className="gx-back-btn"

//             onClick={()=>navigate(-1)}

//         >

//             <FaArrowLeft/>

//         </button>

//         <div>

//             <h2>

//                 {checkpoint.checkpoint_name}

//             </h2>

//             <span>

//                 {checkpoint.route_name}

//             </span>

//         </div>

//     </div>

//     {/* ================= STATUS ================= */}

//     <div className="gx-status-grid">

//         <div className="gx-status-card">

//             <FaMapMarkerAlt/>

//             <label>

//                 GPS Status

//             </label>

//             <h3>

//                 {

//                     gpsValid

//                     ?

//                     "Inside Radius"

//                     :

//                     "Outside Radius"

//                 }

//             </h3>

//             <span>

//                 {

//                     distance!==null

//                     ?

//                     `${distance} m`

//                     :

//                     "-"

//                 }

//             </span>

//         </div>

//         <div className="gx-status-card">

//             <FaWifi/>

//             <label>

//                 Allowed Radius

//             </label>

//             <h3>

//                 {

//                     checkpoint.allowed_radius

//                 } m

//             </h3>

//         </div>

//     </div>

//     {/* ================= REQUIREMENTS ================= */}

//     <div className="gx-requirements">

// <div className="gx-req-card">

//     <FaQrcode/>

//     <h4>

//         QR Verification

//     </h4>

//     {

//         checkpoint.mandatory_qr

//         ?

//         <>

//             {

//                 qrVerified

//                 ?

//                 <span>

//                     ✅ Verified

//                 </span>

//                 :

//                 <button

//                     onClick={()=>setShowQR(true)}

//                 >

//                     Scan QR

//                 </button>

//             }

//         </>

//         :

//         <span>

//             Not Required

//         </span>

//     }

// </div>

//         <div className="gx-req-card">

//             <FaCamera/>

//             <h4>

//                 Photo

//             </h4>

//             <span>

//                 {

//                     checkpoint.mandatory_photo

//                     ?

//                     "Required"

//                     :

//                     "Not Required"

//                 }

//             </span>

//         </div>

//         <div className="gx-req-card">

//             <FaClipboardCheck/>

//             <h4>

//                 Remarks

//             </h4>

//             <span>

//                 {

//                     checkpoint.mandatory_remark

//                     ?

//                     "Required"

//                     :

//                     "Optional"

//                 }

//             </span>

//         </div>

//     </div>

//     {/* ================= PHOTO ================= */}

// <div className="gx-photo-card">

//     <label>

//         Evidence Photo

//     </label>

//     {

//         preview

//         ?

//         <div className="gx-preview">

//             <img

//                 src={preview}

//                 alt="Evidence"

//             />

//         </div>

//         :

//         <div className="gx-empty-photo">

//             <FaCamera/>

//             <span>

//                 No Photo Captured

//             </span>

//         </div>

//     }

//     <label className="gx-camera-btn">

//         {

//             preview

//             ?

//             "Retake Photo"

//             :

//             "Capture Photo"

//         }

//         <input

//             type="file"

//             accept="image/*"

//             capture="environment"

//             hidden

//             onChange={handlePhoto}

//         />

//     </label>

// </div>

//     {/* ================= REMARKS ================= */}

//     <div className="gx-card">

//         <label>

//             Remarks

//         </label>

//         <textarea

//             rows={4}

//             placeholder="Enter remarks..."

//             value={remarks}

//             onChange={(e)=>

//                 setRemarks(

//                     e.target.value

//                 )

//             }

//         />

//     </div>

//     {/* ================= VERIFY ================= */}

//     <button

//         className="gx-submit-btn"

// disabled={

//     saving ||

//     !gpsValid ||

//     (

//         checkpoint.mandatory_qr &&

//         !qrVerified

//     ) ||

//     (

//         checkpoint.mandatory_photo &&

//         !photo

//     ) ||

//     (

//         checkpoint.mandatory_remark &&

//         remarks.trim()===""

//     )

// }

//         onClick={submitCheckpoint}

//     >

//         {

//             saving

//             ?

//             "Verifying..."

//             :

//             "Verify Checkpoint"

//         }

//     </button>
// {/* <QRScanner

//     open={showQR}

//     onClose={()=>setShowQR(false)}

//     onSuccess={handleQR}

// /> */}
// </div>

// </DashboardLayout>

// );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCamera,
  FaQrcode,
  FaWifi,
  FaClipboardCheck,
  FaRoute,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { getCheckpointDetails, checkpointCheckin } from "../../../api/patrol";

import "../../../styles/CheckpointDetails.css";

export default function CheckpointDetails() {
  const navigate = useNavigate();

  const { sessionId, checkpointId } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [checkpoint, setCheckpoint] = useState(null);

  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [gpsValid, setGpsValid] = useState(false);

  const [remarks, setRemarks] = useState("");

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const [qrVerified, setQrVerified] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState("");

  const loadCheckpoint = async () => {
    try {
      const res = await getCheckpointDetails(checkpointId);

      setCheckpoint(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPhoto(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleQR = (value) => {
    setQrValue(value);

    setShowQR(false);

    if (value === checkpoint.qr_code) {
      setQrVerified(true);
    } else {
      alert("Invalid QR Code");
    }
  };

  useEffect(() => {
    loadCheckpoint();
  }, [checkpointId]);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watch = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },

      (err) => {
        console.log(err);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watch);
    };
  }, []);

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;

    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),

        Math.sqrt(1 - a),
      );

    return Math.round(R * c);
  }

  useEffect(() => {
    if (!location || !checkpoint) return;

    const d = getDistance(
      location.latitude,

      location.longitude,

      checkpoint.latitude,

      checkpoint.longitude,
    );

    setDistance(d);

    setGpsValid(d <= checkpoint.allowed_radius);
  }, [location, checkpoint]);

  const submitCheckpoint = async () => {
    if (!gpsValid) {
      alert("You are outside the allowed radius.");

      return;
    }

    try {
      setSaving(true);

const formData = new FormData();

formData.append("session_id", Number(sessionId));

formData.append("checkpoint_id", checkpoint.id);

formData.append("latitude", location.latitude);

formData.append("longitude", location.longitude);

formData.append("remarks", remarks);

formData.append("qr_code", qrValue);

formData.append("nfc_code", "");

formData.append("battery_level", 95);

formData.append("device_name", navigator.userAgent);

if (photo) {

    formData.append("photo", photo);

}

const response = await checkpointCheckin(formData);
navigate(

    "/employee/checkpoint-success",

    {

        state:{

            checkpoint: checkpoint.checkpoint_name,

            route: checkpoint.route_name,

            session_id: response.data.data.session_id,

            completed: response.data.data.completed,

            next_checkpoint: response.data.data.next_checkpoint

        }

    }

);
    } catch (err) {

    console.log("========== CHECKPOINT ERROR ==========");

    console.log("Status :", err.response?.status);

    console.log("Response :", err.response?.data);

    console.log("Request :", err.config?.data);

    console.log("======================================");

} finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="gx-loading">Loading Checkpoint...</div>
      </DashboardLayout>
    );
  }

  if (!checkpoint) {
    return (
      <DashboardLayout>
        <div className="gx-loading">Checkpoint Not Found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="gx-checkpoint-wrapper">
        {/* Header */}

        <div className="gx-header-card">
          <button className="gx-back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>

          <div className="gx-header-info">
            <h2>{checkpoint.checkpoint_name}</h2>

            <p>
              <FaRoute />

              {checkpoint.route_name}
            </p>
          </div>

          <div className="gx-header-status">
            <FaShieldAlt />
            Patrol Verification
          </div>
        </div>

        {/* ====================================================== */}
        {/* STATUS DASHBOARD */}
        {/* ====================================================== */}

        <div className="gx-dashboard-grid">
          <div className={`gx-stat-card ${gpsValid ? "success" : "danger"}`}>
            <div className="gx-stat-icon">
              <FaMapMarkerAlt />
            </div>

            <div className="gx-stat-content">
              <span>GPS Status</span>

              <h3>{gpsValid ? "Inside Radius" : "Outside Radius"}</h3>

              <small>{distance !== null ? `${distance} m Away` : "--"}</small>
            </div>
          </div>

          <div className="gx-stat-card">
            <div className="gx-stat-icon">
              <FaWifi />
            </div>

            <div className="gx-stat-content">
              <span>Allowed Radius</span>

              <h3>{checkpoint.allowed_radius} m</h3>

              <small>Configured by Admin</small>
            </div>
          </div>

          <div className="gx-stat-card">
            <div className="gx-stat-icon">
              <FaRoute />
            </div>

            <div className="gx-stat-content">
              <span>Patrol Route</span>

              <h3>{checkpoint.route_name}</h3>

              <small>Active Patrol</small>
            </div>
          </div>

          <div className="gx-stat-card">
            <div className="gx-stat-icon">
              <FaShieldAlt />
            </div>

            <div className="gx-stat-content">
              <span>Verification</span>

              <h3>Ready</h3>

              <small>Waiting for Submission</small>
            </div>
          </div>
        </div>
        <div className="gx-main-grid">
          <div className="gx-left-panel">
            <div className="gx-card">
              <div className="gx-card-header">
                <h3>Verification Requirements</h3>

                <p>Complete all mandatory checks</p>
              </div>

              <div className="gx-requirement-card">
                <div className="gx-requirement-left">
                  <div className="gx-req-icon qr">
                    <FaQrcode />
                  </div>

                  <div>
                    <h4>QR Verification</h4>

                    <p>Security QR Authentication</p>
                  </div>
                </div>

                <div>
                  {checkpoint.mandatory_qr ? (
                    qrVerified ? (
                      <span className="gx-badge success">Verified</span>
                    ) : (
                      <button
                        className="gx-action-btn"
                        onClick={() => setShowQR(true)}
                      >
                        Scan QR
                      </button>
                    )
                  ) : (
                    <span className="gx-badge">Optional</span>
                  )}
                </div>
              </div>

              <div className="gx-requirement-card">
                <div className="gx-requirement-left">
                  <div className="gx-req-icon photo">
                    <FaCamera />
                  </div>

                  <div>
                    <h4>Evidence Photo</h4>

                    <p>Capture checkpoint image</p>
                  </div>
                </div>

                <div>
                  {checkpoint.mandatory_photo ? (
                    <span className="gx-badge warning">Required</span>
                  ) : (
                    <span className="gx-badge">Optional</span>
                  )}
                </div>
              </div>

              <div className="gx-requirement-card">
                <div className="gx-requirement-left">
                  <div className="gx-req-icon remark">
                    <FaClipboardCheck />
                  </div>

                  <div>
                    <h4>Remarks</h4>

                    <p>Observation Notes</p>
                  </div>
                </div>

                <div>
                  {checkpoint.mandatory_remark ? (
                    <span className="gx-badge warning">Required</span>
                  ) : (
                    <span className="gx-badge">Optional</span>
                  )}
                </div>
              </div>

              <div className="gx-card">
                <div className="gx-card-header">
                  <h3>Verification Status</h3>
                </div>

                <div className="gx-verification-list">
                  <div>
                    {gpsValid ? (
                      <FaCheckCircle className="success-icon" />
                    ) : (
                      <FaTimesCircle className="danger-icon" />
                    )}

                    <span>GPS Validation</span>
                  </div>

                  <div>
                    {checkpoint.mandatory_qr ? (
                      qrVerified ? (
                        <FaCheckCircle className="success-icon" />
                      ) : (
                        <FaTimesCircle className="danger-icon" />
                      )
                    ) : (
                      <FaCheckCircle className="success-icon" />
                    )}

                    <span>QR Verification</span>
                  </div>

                  <div>
                    {checkpoint.mandatory_photo ? (
                      photo ? (
                        <FaCheckCircle className="success-icon" />
                      ) : (
                        <FaTimesCircle className="danger-icon" />
                      )
                    ) : (
                      <FaCheckCircle className="success-icon" />
                    )}

                    <span>Evidence Photo</span>
                  </div>

                  <div>
                    {checkpoint.mandatory_remark ? (
                      remarks.trim() ? (
                        <FaCheckCircle className="success-icon" />
                      ) : (
                        <FaTimesCircle className="danger-icon" />
                      )
                    ) : (
                      <FaCheckCircle className="success-icon" />
                    )}

                    <span>Remarks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="gx-right-panel">
              {/* ===========================================
   EVIDENCE PHOTO
=========================================== */}

              <div className="gx-card gx-photo-card">
                <div className="gx-card-header">
                  <h3>Evidence Capture</h3>

                  <p>Take a clear photo of the checkpoint.</p>
                </div>

                {preview ? (
                  <div className="gx-photo-preview">
                    <img src={preview} alt="Checkpoint Evidence" />
                  </div>
                ) : (
                  <div className="gx-empty-photo">
                    <FaCamera />

                    <h4>No Photo Captured</h4>

                    <span>Capture the checkpoint for verification</span>
                  </div>
                )}

                <label className="gx-upload-btn">
                  <FaCamera />

                  {preview ? "Retake Photo" : "Capture Photo"}

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhoto}
                  />
                </label>
              </div>
              <div className="gx-card">
                <div className="gx-card-header">
                  <h3>Patrol Remarks</h3>

                  <p>Mention observations or unusual activity.</p>
                </div>

                <textarea
                  className="gx-remarks"
                  rows={6}
                  value={remarks}
                  placeholder="Write your remarks..."
                  onChange={(e) => setRemarks(e.target.value)}
                />

                <div className="gx-remark-footer">
                  <span>{remarks.length} Characters</span>
                </div>
              </div>
              <div className="gx-card">
                <div className="gx-card-header">
                  <h3>Patrol Summary</h3>
                </div>

                <div className="gx-summary-grid">
                  <div>
                    <label>Checkpoint</label>

                    <strong>{checkpoint.checkpoint_name}</strong>
                  </div>

                  <div>
                    <label>Route</label>

                    <strong>{checkpoint.route_name}</strong>
                  </div>

                  <div>
                    <label>Distance</label>

                    <strong>
                      {distance !== null ? `${distance} m` : "--"}
                    </strong>
                  </div>

                  <div>
                    <label>GPS</label>

                    <strong>{gpsValid ? "Verified" : "Outside Radius"}</strong>
                  </div>
                </div>
              </div>
              <div className="gx-submit-area">
                <button
                  className="gx-submit-btn"
                  disabled={
                    saving ||
                    !gpsValid ||
                    (checkpoint.mandatory_qr && !qrVerified) ||
                    (checkpoint.mandatory_photo && !photo) ||
                    (checkpoint.mandatory_remark && remarks.trim() === "")
                  }
                  onClick={submitCheckpoint}
                >
                  {saving ? (
                    <>
                      <span className="gx-loader"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Verify Checkpoint
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/*

<QRScanner

open={showQR}

onClose={()=>setShowQR(false)}

onSuccess={handleQR}

/>

*/}
        </div>
      </div>
    </DashboardLayout>
  );
}
