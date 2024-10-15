"use client";

// import { useRouter } from "next/router";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import react, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  handleFaculty,
  handleProgram,
  handleStudent,
  handleVaccine,
  handleBooks,
} from "@/utils/apiFetchData";
import { facultyAPIShowId, facultyAPIEdit } from "@/utils/apiFetchEdit";
import { bookAPIShowId, bookAPIEdit } from "@/utils/apiFetchEdit";
import { logout } from "@/utils/apiLogout";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [faculty, setFaculty] = useState([]);
  const [program, setProgram] = useState([]);
  const [student, setStudent] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [books, setBooks] = useState([]);

  const [faculty_th, setFaculty_th] = useState("");
  const [faculty_en, setFaculty_en] = useState("");
  const [facultyData, setFacultyData] = useState([]);
  const [facultyShow, setFacultyShow] = useState(false);
  const [facultyCreate, setFacultyCreate] = useState(false);

  const [book, setBook] = useState("");
  const [detail, setDetail] = useState("");
  const [bookData, setBookData] = useState([]);
  const [bookShow, setBookShow] = useState(false);
  const [booksCreate, setBooksCreate] = useState("");

  const [facultyId, setFacultyId] = useState("");
  const [bookId, setBookId] = useState("");

  const searchParams = useSearchParams();
  

  useEffect(() => {
    const myToken = searchParams.get("token");
    setToken(myToken);
  }, [token]);

  if (loading) {
    return (
      <h1
        style={{ display: "flex", fontSize: "100px", justifyContent: "center" }}
      >
        Loading...
      </h1>
    );
  }


  //create data faculty

  const createFaculty = async () => {
    setFacultyCreate(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/faculty', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({faculty_th, faculty_en})
      })
      setFaculty_th('')
      setFaculty_en('')
      setFacultyCreate(false)
    } catch(error) {
      console.log(error)
    }
  }

  const createBooks = async () => {
    setBooksCreate(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/book', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({book, detail})
      })
      setBook('')
      setDetail('')
      setBooksCreate(false)
    } catch(error) {
      console.log(error)
    }
  }

  //section Edit and show data id

  const handleShowFaculty = async (id) => {
    await facultyAPIShowId(id, setFacultyData, setFacultyShow, setFacultyId);
  };
  const handleShowBook = async (id) => {
    await bookAPIShowId(id, setBookData, setBookShow, setBookId);
  }

  const handleEditFaculty = async () => {
    await facultyAPIEdit(facultyId, faculty_th, faculty_en, token);
  };
  const handleEditBook = async () => {
    await bookAPIEdit(bookId, book, detail, token);
  }




  //delete data
  const handleDeleteFaculty = async (id) => {
    // แสดงกล่องยืนยัน
    const confirmed = window.confirm(
      "Are you sure you want to delete this faculty?"
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/faculty/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // ลบข้อมูลสำเร็จ
          alert("Faculty deleted successfully.");
          window.location.reload();
        } else {
          // การลบข้อมูลล้มเหลว
          alert("ลบล้มเหลว เนื่องจากมีการอ้างอิงถึงคีย์หลักจากตารางอื่น.");
        }
      } catch (error) {
        // จัดการข้อผิดพลาด
        console.error("An error occurred while deleting the faculty:", error);
        alert("An error occurred while deleting the faculty.");
      }
    } else {
      // ผู้ใช้เลือกที่จะไม่ลบ
      console.log("Deletion canceled.");
    }
  };

  const handleDeleteBook = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this faculty?"
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/book/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // ลบข้อมูลสำเร็จ
          alert("Faculty deleted successfully.");
          window.location.reload();
        } else {
          // การลบข้อมูลล้มเหลว
          alert("ลบล้มเหลว เนื่องจากมีการอ้างอิงถึงคีย์หลักจากตารางอื่น.");
        }
      } catch (error) {
        // จัดการข้อผิดพลาด
        console.error("An error occurred while deleting the faculty:", error);
        alert("An error occurred while deleting the faculty.");
      }
    } else {
      // ผู้ใช้เลือกที่จะไม่ลบ
      console.log("Deletion canceled.");
    }
  }





  //button close form edit data
  const facultyClose = () => {
    setFacultyCreate(false);
    setFacultyShow(false);
  };

  const booksClose = () => {
    setBooksCreate(false);
    setBookShow(false);
  }



  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1 style={{ fontSize: "40px" }}>Admin</h1>
          <p>Your token : {token ? token : ""}</p>
          <button onClick={logout} className="btn-primary">
            Logout
          </button>
        </div>

        {/* form edit show  */}

        {/* books  */}

        <div>
          {bookShow && bookData && (
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book
                </label>
                <input
                  type="text"
                  placeholder={bookData.book}
                  onChange={(e) => setBook(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Detail
                </label>
                <input
                  type="text"
                  placeholder={bookData.detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleEditBook}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  onClick={booksClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* faculty  */}

        <div>
          {facultyShow && facultyData && (
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Faculty TH
                </label>
                <input
                  type="text"
                  placeholder={facultyData.faculty_th}
                  onChange={(e) => setFaculty_th(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Faculty EN
                </label>
                <input
                  type="text"
                  placeholder={facultyData.faculty_en}
                  onChange={(e) => setFaculty_en(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleEditFaculty}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  onClick={facultyClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* faculty create show */}

        <div>
          {booksCreate && (
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Book
                </label>
                <input
                  type="text"
                  placeholder='...'
                  onChange={(e) => setBook(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Detail
                </label>
                <input
                  type="text"
                  placeholder="..."
                  onChange={(e) => setDetail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={createBooks}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create
                </button>
                <button
                  onClick={booksClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          {facultyCreate && (
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Faculty TH
                </label>
                <input
                  type="text"
                  placeholder='...'
                  onChange={(e) => setFaculty_th(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Faculty EN
                </label>
                <input
                  type="text"
                  placeholder="..."
                  onChange={(e) => setFaculty_en(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={createFaculty}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create
                </button>
                <button
                  onClick={facultyClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>



        {/* section detail all  */}

        <div className="flex">
          {/* Books  */}
          <div style={{ margin: "0 1rem" }} className="border-2 border-sky-500">
            <h1 style={{ fontSize: "30px" }}>
              Books
              <button
                onClick={() => handleBooks(setLoading, setBooks)}
                className="ml-3 text-lg mb-2 btn btn-primary"
              >
                Edit
              </button>
              <button
                onClick={createBooks}
                className="ml-3 text-lg mb-2 btn btn-create"
              >
                Create
              </button>
            </h1>
            <div className="bg-gray-200">
              {loading ? loading : ""}
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Detail</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books
                    ? books.map((val, key) => (
                        <tr key={key}>
                          <td>{val.book}</td>
                          <td>{val.detail}</td>
                          <td>
                            <button
                              onClick={() => handleShowBook(val.id)}
                              className="text-yellow-500 mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBook(val.id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>


          {/* Faculty */}

          <div style={{ margin: "0 1rem" }}>
            <h1 style={{ fontSize: "30px" }}>
              Faculty
              <button
                onClick={() => handleFaculty(setLoading, setFaculty)}
                className="ml-3 text-lg mb-2 btn btn-primary"
              >
                Edit
              </button>
              <button
                onClick={createFaculty}
                className="ml-3 text-lg mb-2 btn btn-create"
              >
                Create
              </button>
            </h1>
            <div className="bg-gray-200">
              {loading ? loading : ""}
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>faculty_th</th>
                    <th>faculty_en</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty
                    ? faculty.map((val, key) => (
                        <tr key={key}>
                          <td>{val.faculty_th}</td>
                          <td>{val.faculty_en}</td>
                          <td>
                            <button
                              onClick={() => handleShowFaculty(val.id)}
                              className="text-yellow-500 mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFaculty(val.id)}
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ margin: "0 1rem" }}>
            <h1 style={{ fontSize: "30px" }}>
              Program{" "}
              <button
                onClick={() => handleProgram(setLoading, setProgram)}
                className="ml-3 text-lg mb-2 btn btn-primary"
              >
                Edit
              </button>
            </h1>
            <div className="bg-gray-200">
              {loading ? loading : ""}
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>faculty_th</th>
                    <th>faculty_en</th>
                    <th>grad_year</th>
                  </tr>
                </thead>
                <tbody>
                  {program
                    ? program.map((val, key) => (
                        <tr key={key}>
                          <td>{val.program_th}</td>
                          <td>{val.program_en}</td>
                          <td>{val.grad_year}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ margin: "0 1rem" }}>
            <h1 style={{ fontSize: "30px" }}>
              Student{" "}
              <button
                onClick={() => handleStudent(setLoading, setStudent)}
                className="ml-3 text-lg mb-2 btn btn-primary"
              >
                Edit
              </button>
            </h1>
            <div className="bg-gray-200">
              {loading ? loading : ""}
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>SID</th>
                    <th>First name</th>
                    <th>Last name</th>
                  </tr>
                </thead>
                <tbody>
                  {student
                    ? student.map((val, key) => (
                        <tr key={key}>
                          <td>{val.sid}</td>
                          <td>{val.fname}</td>
                          <td>{val.lname}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ margin: "0 1rem" }}>
            <h1 style={{ fontSize: "30px" }}>
              Vaccine{" "}
              <button
                onClick={() => handleVaccine(setLoading, setVaccine)}
                className="ml-3 text-lg mb-2 btn btn-primary"
              >
                Edit
              </button>
            </h1>
            <div className="bg-gray-200">
              {loading ? loading : ""}
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Vaccine</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccine
                    ? vaccine.map((val, key) => (
                        <tr key={key}>
                          <td>{val.id}</td>
                          <td>{val.vaccine}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
