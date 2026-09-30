import { QrReader } from "react-qr-reader";

export default function QRScanner({

    open,

    onClose,

    onSuccess

}){

    if(!open) return null;

    return(

        <div className="gx-qr-modal">

            <div className="gx-qr-card">

                <h2>

                    Scan QR Code

                </h2>

                <QrReader

                    constraints={{

                        facingMode:"environment"

                    }}

                    onResult={(result,error)=>{

                        if(result){

                            onSuccess(

                                result?.text

                            );

                        }

                    }}

                    style={{

                        width:"100%"

                    }}

                />

                <button

                    onClick={onClose}

                >

                    Cancel

                </button>

            </div>

        </div>

    );

}