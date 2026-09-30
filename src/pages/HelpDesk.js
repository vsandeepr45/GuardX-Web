import React, { useEffect, useMemo, useState } from "react";

import {
  getHelpdeskCategories,
  getHelpdeskTickets,
  getHelpdeskTicket,
  createHelpdeskTicket,
  addHelpdeskComment,
  updateHelpdeskPriority,
  updateHelpdeskStatus,
  resolveHelpdeskTicket,
  closeHelpdeskTicket,
  getHelpdeskAssignees,
  assignHelpdeskTicket,
} from "../api/helpdeskApi";
import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissions";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  Search,
  Plus,
  RefreshCw,
  Ticket,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  X,
  Send,
  ChevronRight,
  MessageSquare,
  MapPin,
  User,
  Building2,
} from "lucide-react";

import "../styles/HelpDesk.css";

function HelpDesk() {
  // ========================================================
  // CURRENT USER + PERMISSIONS
  // ========================================================

  const { user } = useAuth();

  const canCreateTicket = hasPermission(
    user,
    "helpdesk_create"
  );

  const canComment = hasPermission(
    user,
    "helpdesk_comment"
  );

  const canEditTicket = hasPermission(
    user,
    "helpdesk_edit"
  );

  const canAssignTicket = hasPermission(
    user,
    "helpdesk_assign"
  );

  const canResolveTicket = hasPermission(
    user,
    "helpdesk_resolve"
  );

  const canCloseTicket = hasPermission(
    user,
    "helpdesk_close"
  );

  // ========================================================
  // STATE
  // ========================================================
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [loading, setLoading] = useState(true);
  const [ticketLoading, setTicketLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [assigneeLoading, setAssigneeLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [newTicket, setNewTicket] = useState({
    category_id: "",
    subject: "",
    description: "",
    priority: "Medium",
  });

  const [comment, setComment] = useState("");

  const [resolutionNotes, setResolutionNotes] = useState("");

  // ========================================================
  // LOAD DATA
  // ========================================================

  useEffect(() => {
    loadCategories();
    loadTickets();

    const ticketId = new URLSearchParams(window.location.search).get(
      "ticketId",
    );

    if (ticketId) {
      openTicket(ticketId);
    }
  }, []);

  async function loadCategories() {
    try {
      const response = await getHelpdeskCategories();

      setCategories(response.data?.data || []);
    } catch (err) {
      console.error("Category loading error:", err);

      setError(
        err.response?.data?.message || "Unable to load Help Desk categories.",
      );
    }
  }

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (statusFilter) {
        params.status = statusFilter;
      }

      if (priorityFilter) {
        params.priority = priorityFilter;
      }

      if (categoryFilter) {
        params.category_id = categoryFilter;
      }

      const response = await getHelpdeskTickets(params);

      setTickets(response.data?.data || []);
    } catch (err) {
      console.error("Ticket loading error:", err);

      setError(
        err.response?.data?.message || "Unable to load Help Desk tickets.",
      );
    } finally {
      setLoading(false);
    }
  }

  // ========================================================
  // STATISTICS
  // ========================================================

  const statistics = useMemo(() => {
    return {
      total: tickets.length,

      open: tickets.filter((ticket) => ticket.status === "OPEN").length,

      inProgress: tickets.filter(
        (ticket) =>
          ticket.status === "IN_PROGRESS" || ticket.status === "ASSIGNED",
      ).length,

      resolved: tickets.filter((ticket) => ticket.status === "RESOLVED").length,

      critical: tickets.filter((ticket) => ticket.priority === "Critical")
        .length,
    };
  }, [tickets]);

  // ========================================================
  // CREATE TICKET
  // ========================================================

async function handleCreateTicket(e) {
  e.preventDefault();

  if (!canCreateTicket) {
    return;
  }

  if (!newTicket.category_id) {
      setError("Please select a category.");

      return;
    }

    if (!newTicket.subject.trim()) {
      setError("Please enter a subject.");

      return;
    }

    if (!newTicket.description.trim()) {
      setError("Please describe the issue.");

      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await createHelpdeskTicket(newTicket);

      setSuccess(response.data?.message || "Ticket created successfully.");

      setShowCreateModal(false);

      setNewTicket({
        category_id: "",
        subject: "",
        description: "",
        priority: "Medium",
      });

      await loadTickets();
    } catch (err) {
      console.error("Create ticket error:", err);

      setError(err.response?.data?.message || "Unable to create ticket.");
    } finally {
      setSubmitting(false);
    }
  }

  // ========================================================
  // OPEN TICKET
  // ========================================================

async function openTicket(ticketId) {
  try {
    setTicketLoading(true);
    setError("");

    const response = await getHelpdeskTicket(ticketId);

    const ticketData = response.data?.data;

    setSelectedTicket(ticketData);

    if (ticketData?.id && canAssignTicket) {
      loadAssignees(ticketData.id);
    }
  } catch (err) {
    console.error("Ticket details error:", err);

    setError(
      err.response?.data?.message ||
        "Unable to load ticket details."
    );
  } finally {
    setTicketLoading(false);
  }
}

  async function loadAssignees(ticketId) {
    try {
      setAssigneeLoading(true);

      const response = await getHelpdeskAssignees(ticketId);

      setAssignees(response.data?.data?.assignees || []);
    } catch (err) {
      console.error("Assignee loading error:", err);

      setAssignees([]);
    } finally {
      setAssigneeLoading(false);
    }
  }

    async function handleAssignTicket(userId) {
    if (!canAssignTicket) {
        return;
    }

    if (!selectedTicket || !userId) {
        return;
    }

    try {
      setAssigning(true);
      setError("");

      await assignHelpdeskTicket(selectedTicket.id, userId);

      await openTicket(selectedTicket.id);

      await loadTickets();

      setSuccess("Ticket assigned successfully.");
    } catch (err) {
      console.error("Ticket assignment error:", err);

      setError(err.response?.data?.message || "Unable to assign ticket.");
    } finally {
      setAssigning(false);
    }
  }
  // ========================================================
  // ADD COMMENT
  // ========================================================

async function handleAddComment() {
  if (!canComment) {
    return;
  }

  if (!selectedTicket) {
    return;
  }

    if (!comment.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await addHelpdeskComment(selectedTicket.id, comment.trim());

      setComment("");

      await openTicket(selectedTicket.id);

      await loadTickets();
    } catch (err) {
      console.error("Comment error:", err);

      setError(err.response?.data?.message || "Unable to add comment.");
    } finally {
      setSubmitting(false);
    }
  }

  // ========================================================
  // UPDATE STATUS
  // ========================================================

async function handleStatusChange(status) {
  if (!canEditTicket && !canResolveTicket) {
    return;
  }

  if (!selectedTicket) {
    return;
  }

    try {
      setSubmitting(true);
      setError("");

      await updateHelpdeskStatus(selectedTicket.id, status);

      await openTicket(selectedTicket.id);

      await loadTickets();
    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err.response?.data?.message || "Unable to update ticket status.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ========================================================
  // UPDATE PRIORITY
  // ========================================================

async function handlePriorityChange(priority) {
  if (!canEditTicket) {
    return;
  }

  if (!selectedTicket) {
    return;
  }

    try {
      setSubmitting(true);
      setError("");

      await updateHelpdeskPriority(selectedTicket.id, priority);

      await openTicket(selectedTicket.id);

      await loadTickets();
    } catch (err) {
      console.error("Priority update error:", err);

      setError(err.response?.data?.message || "Unable to update priority.");
    } finally {
      setSubmitting(false);
    }
  }

  // ========================================================
  // RESOLVE
  // ========================================================

async function handleResolve() {
  if (!canResolveTicket) {
    return;
  }

  if (!selectedTicket) {
    return;
  }

    if (!resolutionNotes.trim()) {
      setError("Please enter resolution notes.");

      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await resolveHelpdeskTicket(selectedTicket.id, resolutionNotes.trim());

      setResolutionNotes("");

      await openTicket(selectedTicket.id);

      await loadTickets();

      setSuccess("Ticket resolved successfully.");
    } catch (err) {
      console.error("Resolve error:", err);

      setError(err.response?.data?.message || "Unable to resolve ticket.");
    } finally {
      setSubmitting(false);
    }
  }

  // ========================================================
  // CLOSE
  // ========================================================

async function handleCloseTicket() {
  if (!canCloseTicket) {
    return;
  }

  if (!selectedTicket) {
    return;
  }

    try {
      setSubmitting(true);
      setError("");

      await closeHelpdeskTicket(selectedTicket.id);

      await openTicket(selectedTicket.id);

      await loadTickets();

      setSuccess("Ticket closed successfully.");
    } catch (err) {
      console.error("Close ticket error:", err);

      setError(err.response?.data?.message || "Unable to close ticket.");
    } finally {
      setSubmitting(false);
    }
  }

  // ========================================================
  // FORMATTERS
  // ========================================================

  function formatDate(value) {
    if (!value) {
      return "-";
    }

    return new Date(value).toLocaleString();
  }

  function getPriorityClass(priority) {
    return String(priority || "").toLowerCase();
  }

  function getStatusClass(status) {
    return String(status || "").toLowerCase();
  }

  // ========================================================
  // RENDER
  // ========================================================
const allowedStatusOptions = useMemo(() => {
  if (!selectedTicket) {
    return [];
  }

  if (canEditTicket) {
    switch (selectedTicket.status) {
      case "OPEN":
        return ["OPEN", "ASSIGNED", "IN_PROGRESS", "CANCELLED"];

      case "ASSIGNED":
        return ["ASSIGNED", "IN_PROGRESS", "CANCELLED"];

      case "IN_PROGRESS":
        return ["IN_PROGRESS", "RESOLVED", "CANCELLED"];

      case "RESOLVED":
        return ["RESOLVED", "CLOSED", "IN_PROGRESS"];

      default:
        return [selectedTicket.status];
    }
  }

  if (
    canResolveTicket &&
    (selectedTicket.status === "ASSIGNED" ||
      selectedTicket.status === "IN_PROGRESS")
  ) {
    if (selectedTicket.status === "ASSIGNED") {
      return ["ASSIGNED", "IN_PROGRESS"];
    }

    return ["IN_PROGRESS", "RESOLVED"];
  }

  return [selectedTicket.status];
}, [
  selectedTicket,
  canEditTicket,
  canResolveTicket,
]);
  return (
    <DashboardLayout>
      <div className="helpdesk-page">
        {/* ==================================================
                    HEADER
                ================================================== */}

        <div className="helpdesk-header">
          <div>
            <div className="helpdesk-title-row">
              <Ticket size={28} />

              <h1>Help Desk</h1>
            </div>

            <p>Manage support requests, incidents and operational issues.</p>
          </div>

          <div className="helpdesk-header-actions">
            <button
              className="helpdesk-refresh-btn"
              onClick={loadTickets}
              disabled={loading}
            >
              <RefreshCw size={17} />
              Refresh
            </button>

{canCreateTicket && (
  <button
    className="helpdesk-primary-btn"
    onClick={() => {
      setError("");
      setSuccess("");
      setShowCreateModal(true);
    }}
  >
    <Plus size={18} />
    New Ticket
  </button>
)}
          </div>
        </div>

        {/* ==================================================
                    ALERTS
                ================================================== */}

        {error && (
          <div className="helpdesk-alert error">
            <AlertTriangle size={18} />

            <span>{error}</span>

            <button onClick={() => setError("")}>
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="helpdesk-alert success">
            <CheckCircle2 size={18} />

            <span>{success}</span>

            <button onClick={() => setSuccess("")}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* ==================================================
                    STATISTICS
                ================================================== */}

        <div className="helpdesk-stats">
          <div className="helpdesk-stat-card">
            <div className="stat-icon">
              <Ticket size={20} />
            </div>

            <div>
              <span>Total Tickets</span>

              <strong>{statistics.total}</strong>
            </div>
          </div>

          <div className="helpdesk-stat-card">
            <div className="stat-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <span>Open</span>

              <strong>{statistics.open}</strong>
            </div>
          </div>

          <div className="helpdesk-stat-card">
            <div className="stat-icon">
              <MessageSquare size={20} />
            </div>

            <div>
              <span>In Progress</span>

              <strong>{statistics.inProgress}</strong>
            </div>
          </div>

          <div className="helpdesk-stat-card">
            <div className="stat-icon">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <span>Resolved</span>

              <strong>{statistics.resolved}</strong>
            </div>
          </div>

          <div className="helpdesk-stat-card critical">
            <div className="stat-icon">
              <AlertTriangle size={20} />
            </div>

            <div>
              <span>Critical</span>

              <strong>{statistics.critical}</strong>
            </div>
          </div>
        </div>

        {/* ==================================================
                    FILTER BAR
                ================================================== */}

        <div className="helpdesk-filter-bar">
          <div className="helpdesk-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search ticket, subject, employee or site..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadTickets();
                }
              }}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
            }}
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
            }}
          >
            <option value="">All Priorities</option>

            <option value="Low">Low</option>

            <option value="Medium">Medium</option>

            <option value="High">High</option>

            <option value="Critical">Critical</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
          >
            <option value="">All Status</option>

            <option value="OPEN">Open</option>

            <option value="ASSIGNED">Assigned</option>

            <option value="IN_PROGRESS">In Progress</option>

            <option value="RESOLVED">Resolved</option>

            <option value="CLOSED">Closed</option>
          </select>

          <button className="helpdesk-filter-btn" onClick={loadTickets}>
            Apply
          </button>
        </div>

        {/* ==================================================
                    TICKET TABLE
                ================================================== */}

        <div className="helpdesk-table-card">
          <div className="helpdesk-table-header">
            <div>
              <h2>Support Tickets</h2>

              <span>{tickets.length} ticket(s)</span>
            </div>
          </div>

          {loading ? (
            <div className="helpdesk-loading">Loading tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="helpdesk-empty">
              <Ticket size={42} />

              <h3>No tickets found</h3>

              <p>There are no Help Desk tickets matching your filters.</p>
            </div>
          ) : (
            <div className="helpdesk-table-wrapper">
              <table className="helpdesk-table">
                <thead>
                  <tr>
                    <th>Ticket</th>

                    <th>Subject</th>

                    <th>Category</th>

                    <th>Employee</th>

                    <th>Site</th>

                    <th>Priority</th>

                    <th>Status</th>

                    <th>Created</th>

                    <th />
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} onClick={() => openTicket(ticket.id)}>
                      <td>
                        <strong>{ticket.ticket_number}</strong>
                      </td>

                      <td>
                        <div className="ticket-subject">
                          <strong>{ticket.subject}</strong>

                          <small>{ticket.description}</small>
                        </div>
                      </td>

                      <td>{ticket.category_name || "-"}</td>

                      <td>
                        <div className="table-person">
                          <User size={15} />

                          <span>{ticket.employee_name || "-"}</span>
                        </div>
                      </td>

                      <td>
                        <div className="table-site">
                          <MapPin size={15} />

                          <span>{ticket.site_name || "-"}</span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`priority-badge ${getPriorityClass(
                            ticket.priority,
                          )}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${getStatusClass(
                            ticket.status,
                          )}`}
                        >
                          {ticket.status.replace("_", " ")}
                        </span>
                      </td>

                      <td>{formatDate(ticket.created_at)}</td>

                      <td>
                        <ChevronRight size={18} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ==================================================
                    CREATE TICKET MODAL
                ================================================== */}

        {showCreateModal && (
          <div className="helpdesk-modal-overlay">
            <div className="helpdesk-modal">
              <div className="helpdesk-modal-header">
                <div>
                  <h2>Create New Ticket</h2>

                  <p>Describe the issue so the support team can assist you.</p>
                </div>

                <button onClick={() => setShowCreateModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateTicket}>
                <div className="form-group">
                  <label>Category *</label>

                  <select
                    value={newTicket.category_id}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        category_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>

                  <select
                    value={newTicket.priority}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="Low">Low</option>

                    <option value="Medium">Medium</option>

                    <option value="High">High</option>

                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject *</label>

                  <input
                    type="text"
                    placeholder="Enter issue subject"
                    value={newTicket.subject}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>

                  <textarea
                    rows="6"
                    placeholder="Describe the issue in detail..."
                    value={newTicket.description}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="helpdesk-modal-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-btn"
                    disabled={submitting}
                  >
                    {submitting ? "Creating..." : "Create Ticket"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================
                    TICKET DETAILS
                ================================================== */}

        {selectedTicket && (
          <div className="helpdesk-modal-overlay">
            <div className="helpdesk-ticket-modal">
              <div className="ticket-detail-header">
                <div>
                  <span className="ticket-number">
                    {selectedTicket.ticket_number}
                  </span>

                  <h2>{selectedTicket.subject}</h2>
                </div>

                <button onClick={() => setSelectedTicket(null)}>
                  <X size={22} />
                </button>
              </div>

              <div className="ticket-detail-content">
                {/* SUMMARY */}

                <div className="ticket-summary-grid">
                  <div>
                    <span>Category</span>

                    <strong>{selectedTicket.category_name}</strong>
                  </div>

<div>
  <span>Priority</span>

  {canEditTicket ? (
    <select
      value={selectedTicket.priority}
      onChange={(e) =>
        handlePriorityChange(e.target.value)
      }
      disabled={submitting}
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
      <option value="Critical">Critical</option>
    </select>
  ) : (
    <strong>
      {selectedTicket.priority || "-"}
    </strong>
  )}
</div>
<div>
  <span>Status</span>

{(canEditTicket || canResolveTicket) ? (
  <select
    value={selectedTicket.status}
    onChange={(e) => handleStatusChange(e.target.value)}
    disabled={
      submitting ||
      selectedTicket.status === "CLOSED" ||
      selectedTicket.status === "CANCELLED"
    }
  >
    {allowedStatusOptions.map((status) => (
      <option key={status} value={status}>
        {status.replace("_", " ")}
      </option>
    ))}
  </select>
) : (
  <strong>
    {selectedTicket.status?.replace("_", " ") || "-"}
  </strong>
)}
</div>
                </div>
{/* ==================================================
    ASSIGNMENT
================================================== */}
{canAssignTicket && (
<div className="ticket-assignment">

    <div className="assignment-header">

        <div>

            <h3>
                Assigned To
            </h3>

            <p>
                Site supervisor responsible for this employee
            </p>

        </div>

    </div>


    {assigneeLoading ? (

        <div className="assignment-loading">
            Loading site supervisor...
        </div>

    ) : assignees.length === 0 ? (

        <div className="assignment-empty">

            <AlertTriangle size={17} />

            <span>
                No active site supervisor is available
                for this employee's current deployment.
            </span>

        </div>

    ) : (

        <div className="assignment-options">

            {assignees.map(person => (

                <div
                    key={person.user_id}
                    className={
                        `assignment-person ${
                            selectedTicket.assigned_to ===
                            person.user_id
                                ? "selected"
                                : ""
                        }`
                    }
                >

                    <div className="assignment-person-info">

                        <div className="assignment-avatar">

                            {
                                (
                                    person.employee_name?.[0] ||
                                    person.first_name?.[0] ||
                                    "S"
                                ).toUpperCase()
                            }

                        </div>


                        <div>

                            <strong>
                                {
                                    person.employee_name ||
                                    `${person.first_name || ""} ${person.last_name || ""}`
                                }
                            </strong>

                            <span>
                                {person.role_name ||
                                    "Site Supervisor"}
                            </span>

                        </div>

                    </div>


                    <button
                        onClick={() =>
                            handleAssignTicket(
                                person.user_id
                            )
                        }
                        disabled={
                            assigning ||
                            selectedTicket.assigned_to ===
                                person.user_id
                        }
                    >

                        {
                            selectedTicket.assigned_to ===
                            person.user_id
                                ? "Assigned"
                                : assigning
                                ? "Assigning..."
                                : "Assign"
                        }

                    </button>

                </div>

            ))}

        </div>

    )}
    

</div>
)}
                {/* CONTEXT */}

                <div className="ticket-context">
                  <div>
                    <User size={17} />

                    <div>
                      <span>Employee</span>

                      <strong>{selectedTicket.employee_name || "-"}</strong>
                    </div>
                  </div>

                  <div>
                    <Building2 size={17} />

                    <div>
                      <span>Site</span>

                      <strong>{selectedTicket.site_name || "-"}</strong>
                    </div>
                  </div>

                  <div>
                    <MapPin size={17} />

                    <div>
                      <span>Project</span>

                      <strong>{selectedTicket.project_name || "-"}</strong>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}

                <div className="ticket-section">
                  <h3>Issue Description</h3>

                  <p>{selectedTicket.description}</p>
                </div>

                {/* COMMENTS */}

                <div className="ticket-section">
                  <div className="section-title-row">
                    <h3>Conversation</h3>

                    <MessageSquare size={18} />
                  </div>

                  <div className="ticket-comments">
                    {selectedTicket.comments?.length ? (
                      selectedTicket.comments.map((item) => (
                        <div key={item.id} className="ticket-comment">
                          <div className="comment-avatar">
                            {(item.first_name?.[0] || "U").toUpperCase()}
                          </div>

                          <div className="comment-body">
                            <div className="comment-header">
                              <strong>
                                {item.first_name} {item.last_name}
                              </strong>

                              <small>{formatDate(item.created_at)}</small>
                            </div>

                            <p>{item.comment}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-comments">No comments yet.</div>
                    )}
                  </div>

{canComment &&
  selectedTicket.status !== "CLOSED" &&
  selectedTicket.status !== "CANCELLED" && (
                      <div className="comment-input">
                        <textarea
                          rows="3"
                          placeholder="Write a reply..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                          onClick={handleAddComment}
                          disabled={submitting || !comment.trim()}
                        >
                          <Send size={16} />
                          Send
                        </button>
                      </div>
                    )}
                </div>

                {/* RESOLUTION */}

{canResolveTicket &&
  selectedTicket.status === "IN_PROGRESS" && (
                    <div className="ticket-section">
                      <h3>Resolution</h3>

                      <textarea
                        rows="3"
                        placeholder="Enter resolution notes..."
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                      />

                      <div className="ticket-actions">
                        <button
                          className="resolve-btn"
                          onClick={handleResolve}
                          disabled={submitting}
                        >
                          <CheckCircle2 size={17} />
                          Resolve Ticket
                        </button>

                      </div>
                    </div>
                  )}
{/* ==================================================
    CLOSE TICKET
================================================== */}

{canCloseTicket &&
  selectedTicket.status === "RESOLVED" && (
    <div className="ticket-section">
      <h3>Close Ticket</h3>

      <p>
        This ticket has been resolved and is ready to be closed.
      </p>

      <div className="ticket-actions">
        <button
          className="close-btn"
          onClick={handleCloseTicket}
          disabled={submitting}
        >
          Close Ticket
        </button>
      </div>
    </div>
)}
                {/* RESOLUTION NOTES */}

                {selectedTicket.resolution_notes && (
                  <div className="resolution-display">
                    <h3>Resolution Notes</h3>

                    <p>{selectedTicket.resolution_notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default HelpDesk;
