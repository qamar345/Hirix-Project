import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { FaExternalLinkAlt, FaDownload, FaEllipsisH } from "react-icons/fa";
import axios from "axios";
import { Pagination } from "../components/Pagination";
import { Dropdown } from "react-bootstrap";

// Custom Toggle Component
const CustomToggle = React.forwardRef(({ onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer" }}
  >
    <FaEllipsisH />
  </span>
));
const ManagersList = () => {
  const [managersData, setmanagerData] = useState([]);
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = sessionStorage.getItem("token");

  const GetManagerData = async (page) => {
    // setLoading(true);
    try {
      const res = await axios.get("http://localhost:9000/getManagers", {
        params: {
          page: page,
        },
        headers: {
          "x-access-token": token,
        },
      });
      setmanagerData(res.data.data);
      settCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
      // setLoading(false);
    } catch (error) {}
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    GetManagerData(currentPage);
  }, [currentPage]);
  const ActiveAccount = async (id) => {
    await axios
      .put(`http://localhost:9000/activeManager/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {});
  };

  const InActiveAccount = async (id) => {
    await axios
      .put(`http://localhost:9000/freezeManager/${id}`, null, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {});
  };
  // const applicantsData = [
  //   {
  //     name: "Aslam",
  //     status: "Active",
  //     email: "drkphnx99@gmail.com",
  //     phone: "+8801739761068",
  //     role: "Manager",
  //   },
  //   {
  //     name: "Raza",
  //     status: "Inactive",
  //     email: "leo@yopmail.com",
  //     phone: "+3581234567",
  //     role: "Assistant",
  //   },
  // ];
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {managersData
            ? managersData.map((manager, index) => (
                <tr key={index}>
                  <td className="info">
                    <div className="info-details">
                      <h5>{manager.FirstName}</h5>
                    </div>
                  </td>
                  <td className="status">
                    <div>
                      <span
                        className={`label label-${
                          manager.status === "Active" ? "open" : "close"
                        }`}
                      >
                        {manager.status}
                      </span>
                    </div>
                  </td>
                  <td className="info">
                    <span className="gmail">{manager.email}</span>
                  </td>
                  <td className="info">
                    <span className="phone">{manager.phone}</span>
                  </td>
                  <td className="info">
                    <span className="phone">{manager.role}</span>
                  </td>
                  <td className="info">
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu>
                          {manager.status === "Inactive" ? (
                            <>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => ActiveAccount(manager.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  Active
                                </button>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => InActiveAccount(manager.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  InActive
                                </button>
                              </Dropdown.Item>
                            </>
                          ) : (
                            <>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => InActiveAccount(manager.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  InActive
                                </button>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <button
                                  className="btn btn-light"
                                  onClick={() => ActiveAccount(manager.id)}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    fontSize: "1.5rem",
                                  }}
                                >
                                  Active
                                </button>
                              </Dropdown.Item>
                            </>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ManagersList;
