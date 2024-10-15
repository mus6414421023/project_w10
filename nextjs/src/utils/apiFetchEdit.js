//show id

export const facultyAPIShowId = async (
  id,
  setFacultyData,
  setFacultyShow,
  setFacultyId
) => {
  const response = await fetch(`http://127.0.0.1:8000/api/faculty/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  setFacultyData(data);
  setFacultyShow(true);
  setFacultyId(id);
};

export const bookAPIShowId = async (
  id,
  setBookData,
  setBookShow,
  setBookId
) => {
  const response = await fetch(`http://127.0.0.1:8000/api/book/${id}`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });
  const data = await response.json();
  setBookData(data);
  setBookShow(true);
  setBookId(id);
};




//edit id
export const facultyAPIEdit = async (
  facultyId,
  faculty_th,
  faculty_en,
  token
) => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/faculty/${facultyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ faculty_th, faculty_en }),
    }
  );

  const data = await response.json();
  window.location.reload();
};

export const bookAPIEdit = async (bookId, book, detail, token) => {
  const response = await fetch(`http://127.0.0.1:8000/api/book/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ book, detail }),
  });

  const data = await response.json();
  window.location.reload();
};
