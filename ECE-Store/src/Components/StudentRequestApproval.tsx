import React, { useState } from 'react';

interface ComponentItem {
  productId: {
    name: string;
    model: string;
  };
  quantity: number;
}

interface Request {
  _id: string;
  studentName: string;
  studentId: string;
  department: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  reason: string;
  pickupDate: string;
  approved: boolean;
  components: ComponentItem[];
}

interface StudentRequestApprovalProps {
  requests: Request[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const StudentRequestApproval: React.FC<StudentRequestApprovalProps> = ({
  requests,
  onApprove,
  onReject,
}) => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  return (
    <>
      <h1 style={{ marginBottom: 28 }}>Department Head - Student Requests</h1>
      {!selectedRequest ? (
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 18 }}>Pending Requests</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
            <thead>
              <tr style={{ background: '#F3F6FA' }}>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 700 }}>Student</th>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 700 }}>Course</th>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 700 }}>Pickup Date</th>
                <th style={{ padding: 12, textAlign: 'left', fontWeight: 700 }}>Status</th>
                <th style={{ padding: 12, textAlign: 'center', fontWeight: 700 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} style={{ borderTop: '1px solid #E5E8EB', background: !req.approved ? '#fff' : '#F8FAFC' }}>
                  <td style={{ padding: 12 }}>
                    <div style={{ fontWeight: 600 }}>{req.studentName}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{req.studentId}</div>
                  </td>
                  <td style={{ padding: 12 }}>
                    <div>{req.courseCode} - {req.courseName}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{req.instructor}</div>
                  </td>
                  <td style={{ padding: 12 }}>{req.pickupDate}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{
                      color: req.approved ? '#388E3C' : '#2563eb',
                      fontWeight: 700,
                      borderRadius: 8,
                      background: req.approved ? '#e8f5e9' : '#e0e7ff',
                      padding: '4px 12px',
                      fontSize: 14,
                    }}>
                      {req.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <button
                      style={{
                        background: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 7,
                        padding: '7px 18px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 15,
                        marginRight: 8,
                      }}
                      onClick={() => setSelectedRequest(req)}
                      disabled={req.approved}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#A0AEC0', padding: 40 }}>
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedRequest(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 18,
              cursor: 'pointer',
            }}
          >
            ← Back to Requests
          </button>
          <h2 style={{ fontSize: 20, marginBottom: 18 }}>Request Details</h2>
          <div style={{ marginBottom: 18, padding: 18, background: '#F8FAFC', borderRadius: 10, border: '1px solid #E5E8EB' }}>
            <div style={{ marginBottom: 8 }}><strong>Student:</strong> {selectedRequest.studentName} ({selectedRequest.studentId})</div>
            <div style={{ marginBottom: 8 }}><strong>Department:</strong> {selectedRequest.department}</div>
            <div style={{ marginBottom: 8 }}><strong>Course:</strong> {selectedRequest.courseCode} - {selectedRequest.courseName}</div>
            <div style={{ marginBottom: 8 }}><strong>Instructor:</strong> {selectedRequest.instructor}</div>
            <div style={{ marginBottom: 8 }}><strong>Pickup Date:</strong> {selectedRequest.pickupDate}</div>
            <div style={{ marginBottom: 8 }}><strong>Reason:</strong> {selectedRequest.reason}</div>
            <div style={{ marginBottom: 8 }}>
              <strong>Components:</strong>
              <ul style={{ margin: '8px 0 0 18px' }}>
                {selectedRequest.components.map((c, i) => (
                  <li key={i}>
                    {c.productId.name} ({c.productId.model}) - Qty: {c.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {!selectedRequest.approved ? (
            <div style={{ display: 'flex', gap: 16 }}>
              <button
                onClick={() => {
                  onApprove(selectedRequest._id);
                  setSelectedRequest(null);
                }}
                style={{
                  background: '#388E3C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 7,
                  padding: '10px 28px',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                Approve
              </button>
              <button
                onClick={() => {
                  onReject(selectedRequest._id);
                  setSelectedRequest(null);
                }}
                style={{
                  background: '#E53E3E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 7,
                  padding: '10px 28px',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                Reject
              </button>
            </div>
          ) : (
            <div style={{ color: '#388E3C', fontWeight: 700, fontSize: 18, marginTop: 16 }}>
              This request has been approved.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentRequestApproval;
