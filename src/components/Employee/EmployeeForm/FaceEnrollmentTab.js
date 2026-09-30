import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    enrollEmployeeFace,
    reenrollEmployeeFace
} from "../../../api/employee";


const FACE_POSITIONS = [
    {
        key: "straight",
        title: "Face Straight",
        instruction: "Look directly at the camera"
    },
    {
        key: "left",
        title: "Turn Slightly Left",
        instruction: "Turn your face slightly to the left"
    },
    {
        key: "right",
        title: "Turn Slightly Right",
        instruction: "Turn your face slightly to the right"
    },
    {
        key: "up",
        title: "Look Slightly Up",
        instruction: "Tilt your face slightly upward"
    },
    {
        key: "natural",
        title: "Natural Face",
        instruction: "Look naturally at the camera"
    }
];


export default function FaceEnrollmentTab({
    employeeId,
    onComplete,
    onCancel,
    mode = "enroll"
}) {

    const videoRef = useRef(null);

    const canvasRef = useRef(null);

    const streamRef = useRef(null);


    const [cameraStarted, setCameraStarted] =
        useState(false);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [images, setImages] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");
    const [messageType, setMessageType] =
    useState("error");


    const currentPosition =
        FACE_POSITIONS[currentIndex];


    const isReEnrollment =
        mode === "reenroll";


    // ==================================================
    // START CAMERA
    // ==================================================

const startCamera = async () => {

    try {

        setMessage("");

        if (
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {

            setMessage(
                "Camera access is not supported by this browser."
            );

            return;

        }

        const stream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: "user",

                    width: {
                        ideal: 1280
                    },

                    height: {
                        ideal: 720
                    }
                },

                audio: false

            });

        console.log("Camera stream obtained:", stream);

        streamRef.current = stream;

        // First render the <video>
        setCameraStarted(true);

    } catch (error) {

        console.error(
            "Camera error:",
            error
        );

        if (
            error?.name === "NotAllowedError"
        ) {

            setMessage(
                "Camera permission was denied. Please allow camera access for localhost."
            );

        } else if (
            error?.name === "NotFoundError"
        ) {

            setMessage(
                "No camera was found. Please connect a webcam."
            );

        } else if (
            error?.name === "NotReadableError"
        ) {

            setMessage(
                "The camera is already being used by another application. Close other camera apps and try again."
            );

        } else {

            setMessage(
                "Unable to access camera. Please check camera permissions and connection."
            );

        }

    }

};


    // ==================================================
    // STOP CAMERA
    // ==================================================

    const stopCamera = () => {

        if (streamRef.current) {

            streamRef.current
                .getTracks()
                .forEach(
                    track => track.stop()
                );

            streamRef.current = null;

        }


        setCameraStarted(false);

    };


    // ==================================================
    // CLEANUP
    // ==================================================

    useEffect(() => {

        return () => {

            if (streamRef.current) {

                streamRef.current
                    .getTracks()
                    .forEach(
                        track => track.stop()
                    );

            }

        };

    }, []);


    useEffect(() => {

    if (
        cameraStarted &&
        videoRef.current &&
        streamRef.current
    ) {

        console.log(
            "Attaching camera stream to video..."
        );

        videoRef.current.srcObject =
            streamRef.current;

        videoRef.current
            .play()
            .catch(error => {

                console.error(
                    "Video play error:",
                    error
                );

            });

    }

}, [cameraStarted]);

    // ==================================================
    // CAPTURE IMAGE
    // ==================================================

    const captureFace = () => {

        if (!videoRef.current) {

            setMessage(
                "Camera is not ready."
            );

            return;

        }


        if (!canvasRef.current) {

            setMessage(
                "Camera capture is not ready."
            );

            return;

        }


        const video =
            videoRef.current;

        const canvas =
            canvasRef.current;


        const width =
            video.videoWidth;

        const height =
            video.videoHeight;


if (!width || !height) {

    console.log(
        "Video dimensions:",
        width,
        height
    );

    setMessage(
        "Camera is starting. Please wait a moment and try again."
    );

    return;

}


        canvas.width = width;

        canvas.height = height;


        const context =
            canvas.getContext("2d");


        context.drawImage(
            video,
            0,
            0,
            width,
            height
        );


        const imageData =
            canvas.toDataURL(
                "image/jpeg",
                0.90
            );


        setImages(prev => {

            const updated =
                [...prev];

            updated[currentIndex] =
                imageData;

            return updated;

        });


        setMessage(
            `${currentPosition.title} captured successfully.`
        );


        if (
            currentIndex <
            FACE_POSITIONS.length - 1
        ) {

            setCurrentIndex(
                prev => prev + 1
            );

        }

    };


    // ==================================================
    // SELECT SAMPLE
    // ==================================================

    const selectSample = (index) => {

        setCurrentIndex(index);

        setMessage("");

    };


    // ==================================================
    // RETAKE
    // ==================================================

    const retakeCurrent = () => {

        setImages(prev => {

            const updated =
                [...prev];

            updated[currentIndex] =
                null;

            return updated;

        });


        setMessage("");

    };


    // ==================================================
    // SUBMIT
    // ==================================================

    const submitEnrollment = async () => {

        if (!employeeId) {

            setMessage(
                "Employee ID is missing."
            );

            return;

        }


        if (
            images.length !== 5 ||
            images.some(
                image => !image
            )
        ) {

            setMessage(
                "Please capture all 5 face images."
            );

            return;

        }


        try {

            setLoading(true);


            setMessage(
                isReEnrollment
                    ? "Verifying and updating face profile..."
                    : "Verifying and enrolling face..."
            );


            let response;


            if (isReEnrollment) {

                response =
                    await reenrollEmployeeFace(
                        employeeId,
                        images
                    );

            } else {

                response =
                    await enrollEmployeeFace(
                        employeeId,
                        images
                    );

            }


            if (
                response?.data?.success === true
            ) {

                stopCamera();


setMessageType("success");

setMessage(
    isReEnrollment
        ? "Face profile updated successfully."
        : "Face enrollment completed successfully."
);


                if (onComplete) {

                    onComplete(
                        response.data.data
                    );

                }

            } else {

setMessageType("error");

setMessage(
    response?.data?.message ||
    "Face enrollment failed."
);

            }

        } catch (error) {

            console.error(
                "Face enrollment error:",
                error
            );


setMessageType("error");

setMessage(
    error?.response?.data?.message ||
    "Face enrollment failed."
);

        } finally {

            setLoading(false);

        }

    };


    const completedCount =
        images.filter(Boolean).length;


    return (

        <div className="gx-form-section">

            <h3>
                {isReEnrollment
                    ? "🔄 Re-enroll Employee Face"
                    : "📷 Employee Face Enrollment"
                }
            </h3>


            <p>

                {isReEnrollment
                    ? "Capture 5 new face samples. The existing face profile will be replaced only after all samples are successfully verified."
                    : "Capture 5 different face positions. Keep only one person in the camera frame."
                }

            </p>


            {/* ==========================================
                PROGRESS
            ========================================== */}

            <div
                style={{
                    marginBottom: "20px",
                    fontWeight: "600"
                }}
            >

                Sample {currentIndex + 1} of 5

                {" • "}

                {completedCount}/5 captured

            </div>


            {/* ==========================================
                CAMERA
            ========================================== */}

            <div
                style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    textAlign: "center"
                }}
            >

                <div
                    style={{
                        background: "#111",
                        borderRadius: "12px",
                        overflow: "hidden",
                        minHeight: "300px"
                    }}
                >

                    {cameraStarted ? (

<video
    ref={videoRef}
    autoPlay
    playsInline
    muted
    style={{
        width: "100%",
        display: "block",
        minHeight: "300px",
        objectFit: "cover",
        background: "#111"
    }}
/>

                    ) : (

                        <div
                            style={{
                                padding: "100px 20px",
                                color: "#fff"
                            }}
                        >

                            Camera not started

                        </div>

                    )}

                </div>


                <canvas
                    ref={canvasRef}
                    style={{
                        display: "none"
                    }}
                />


                {/* ======================================
                    INSTRUCTION
                ====================================== */}

                <div
                    style={{
                        marginTop: "20px"
                    }}
                >

                    <h3>
                        {currentPosition.title}
                    </h3>

                    <p>
                        {currentPosition.instruction}
                    </p>

                </div>


                {/* ======================================
                    CAMERA CONTROLS
                ====================================== */}

                {!cameraStarted ? (

                    <button
                        type="button"
                        className="gx-btn-primary"
                        onClick={startCamera}
                        disabled={loading}
                    >
                        📷 Start Camera
                    </button>

                ) : (

                    <button
                        type="button"
                        className="gx-btn-primary"
                        onClick={captureFace}
                        disabled={loading}
                    >
                        📸 Capture Face
                    </button>

                )}

            </div>


            {/* ==========================================
                CAPTURED SAMPLES
            ========================================== */}

            <div
                style={{
                    marginTop: "25px"
                }}
            >

                <h4>
                    Captured Faces
                </h4>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(5, 1fr)",
                        gap: "10px"
                    }}
                >

                    {FACE_POSITIONS.map(
                        (position, index) => (

                            <div
                                key={position.key}
                                onClick={() =>
                                    selectSample(index)
                                }
                                style={{
                                    border:
                                        currentIndex === index
                                            ? "2px solid #2563eb"
                                            : "1px solid #ddd",

                                    borderRadius:
                                        "8px",

                                    padding:
                                        "8px",

                                    textAlign:
                                        "center",

                                    cursor:
                                        "pointer"
                                }}
                            >

                                {images[index] ? (

                                    <img
                                        src={
                                            images[index]
                                        }
                                        alt={
                                            position.title
                                        }
                                        style={{
                                            width:
                                                "100%",

                                            height:
                                                "100px",

                                            objectFit:
                                                "cover",

                                            borderRadius:
                                                "6px"
                                        }}
                                    />

                                ) : (

                                    <div
                                        style={{
                                            height:
                                                "100px",

                                            display:
                                                "flex",

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            background:
                                                "#f5f5f5"
                                        }}
                                    >

                                        Not Captured

                                    </div>

                                )}


                                <small>

                                    {index + 1}.{" "}

                                    {position.title}

                                </small>

                            </div>

                        )
                    )}

                </div>

            </div>


            {/* ==========================================
                MESSAGE
            ========================================== */}

{message && (

    <div
        style={{
            marginTop: "20px",
            padding: "16px 18px",
            borderRadius: "10px",

            background:
                messageType === "success"
                    ? "#ecfdf3"
                    : "#fef2f2",

            border:
                messageType === "success"
                    ? "1px solid #86efac"
                    : "1px solid #fecaca",

            color:
                messageType === "success"
                    ? "#166534"
                    : "#b91c1c",

            fontWeight: "600",

            display: "flex",
            alignItems: "center",
            gap: "10px"
        }}
    >

        <span style={{ fontSize: "20px" }}>
            {messageType === "success" ? "✅" : "⚠️"}
        </span>

        <span>
            {message}
        </span>

    </div>

)}


            {/* ==========================================
                ACTIONS
            ========================================== */}

            <div
                className="gx-form-footer"
                style={{
                    marginTop: "25px"
                }}
            >

                <button
                    type="button"
                    className="gx-btn-light"
                    onClick={() => {

                        stopCamera();

                        if (onCancel) {
                            onCancel();
                        }

                    }}
                    disabled={loading}
                >

                    Skip / Close

                </button>


                {images[currentIndex] && (

                    <button
                        type="button"
                        className="gx-btn-light"
                        onClick={
                            retakeCurrent
                        }
                        disabled={loading}
                    >

                        Retake Current

                    </button>

                )}


                <button
                    type="button"
                    className="gx-btn-success"
                    onClick={
                        submitEnrollment
                    }
                    disabled={
                        loading ||
                        completedCount !== 5
                    }
                >

                    {loading

                        ? (
                            isReEnrollment
                                ? "Updating..."
                                : "Enrolling..."
                        )

                        : (
                            isReEnrollment
                                ? "Update Face Profile"
                                : "Complete Face Enrollment"
                        )

                    }

                </button>

            </div>

        </div>

    );

}