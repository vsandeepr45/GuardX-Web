import {
  FaCheckCircle,
  FaTimesCircle,
  FaQrcode,
  FaWifi,
  FaCamera,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function CheckpointTable({ checkpoints }) {
  return (
    <div className="gx-patrol-monitor-checkpoints">
      <div className="gx-patrol-monitor-section-header">
        <h3>Checkpoint Progress</h3>

        <span>{checkpoints.length} Checkpoints</span>
      </div>

      <div className="gx-patrol-monitor-table-wrapper">
        <table className="gx-patrol-monitor-table">
          <thead>
            <tr>
              <th>#</th>

              <th>Checkpoint</th>

              <th>Time</th>

              <th>QR</th>

              <th>NFC</th>

              <th>Photo</th>

              <th>GPS</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {checkpoints.length === 0 ? (
              <tr>
                <td colSpan="8" className="gx-patrol-monitor-empty-row">
                  No checkpoints available.
                </td>
              </tr>
            ) : (
              checkpoints.map((checkpoint) => (
                <tr key={checkpoint.id}>
                  <td>{checkpoint.sequence}</td>

                  <td>
                    <strong>{checkpoint.checkpoint_name}</strong>
                  </td>

                  <td>{checkpoint.scan_time || "-"}</td>

                  <td>
                    {checkpoint.qr_verified ? (
                      <FaCheckCircle className="gx-success" />
                    ) : (
                      <FaTimesCircle className="gx-danger" />
                    )}
                  </td>

                  <td>
                    {checkpoint.nfc_verified ? (
                      <FaWifi className="gx-success" />
                    ) : (
                      <FaTimesCircle className="gx-danger" />
                    )}
                  </td>

                  <td>
                    {checkpoint.photo_path ? (
                      <FaCamera className="gx-success" />
                    ) : (
                      <FaTimesCircle className="gx-danger" />
                    )}
                  </td>

                  <td>
                    {checkpoint.latitude ? (
                      <FaMapMarkerAlt className="gx-success" />
                    ) : (
                      <FaTimesCircle className="gx-danger" />
                    )}
                  </td>

                  <td>
                    <span
                      className={`gx-patrol-status ${(checkpoint.display_status || "Pending").toLowerCase()}`}
                    >
                      {checkpoint.display_status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
