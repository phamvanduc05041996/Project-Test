import React, { useState, useEffect } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const LIMIT_USER = 3;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    console.log(res);
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    console.log(res);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleClickBtnDelete = (user) => {
    console.log(user);
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage Users</div>

      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary btn-1"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-user-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
