import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import API from "../../api";
import { Pagination } from "../components/Pagination";
import TableToolbar from "../../components/TableToolbar";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";
import { showSuccess, showError } from "../../utils/toast";

const ManagersList = () => {
  const [managersData, setmanagerData] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  const GetManagerData = async (page, limit, searchTerm) => {
    setLoading(true);
    try {
      const res = await API.get("/getManagers", {
        params: { page, limit, search: searchTerm },
        headers: {
          "x-access-token": token,
        },
      });
      setmanagerData(res.data.data);
      settCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {
      console.error("Failed to load managers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    GetManagerData(currentPage, entries, search);
  }, [currentPage, entries, search]);

  // Reset to page 1 whenever the search/entries filters change, so the
  // user isn't left on a now-nonexistent page.
  useEffect(() => {
    settCurrentPage(1);
  }, [entries, search]);

  const ActiveAccount = async (id) => {
    await API
      .put(`/activeManager/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        GetManagerData(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to activate manager. Please try again.");
      });
  };

  const InActiveAccount = async (id) => {
    await API
      .put(`/freezeManager/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        showSuccess(res.data.msg);
        GetManagerData(currentPage, entries, search);
      })
      .catch((err) => {
        showError(err.response?.data?.msg || "Failed to deactivate manager. Please try again.");
      });
  };

  return (
    <div className="dt-wrapper">
      <TableToolbar
        entries={entries}
        onEntriesChange={setEntries}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search managers..."
      />
      <div className="table-responsive">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Loader label="Loading managers..." />
                </td>
              </tr>
            ) : managersData && managersData.length > 0 ? (
              managersData.map((manager) => (
                <tr key={manager.id}>
                  <td>{manager.FirstName}</td>
                  <td>
                    <StatusBadge status={manager.status} />
                  </td>
                  <td>{manager.email}</td>
                  <td>{manager.phone}</td>
                  <td>{manager.role}</td>
                  <td>
                    <div className="dt-actions">
                      {manager.status === "Inactive" ? (
                        <button
                          className="dt-icon-btn dt-icon-btn--success"
                          title="Activate"
                          onClick={() => ActiveAccount(manager.id)}
                        >
                          <FaCheckCircle />
                        </button>
                      ) : (
                        <button
                          className="dt-icon-btn dt-icon-btn--danger"
                          title="Deactivate"
                          onClick={() => InActiveAccount(manager.id)}
                        >
                          <FaBan />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="dt-empty">
                  No managers found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ManagersList;
