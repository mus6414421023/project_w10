export const logout = (token) => {
    try {
      fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.log(error));

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };