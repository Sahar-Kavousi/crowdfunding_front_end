async function postSignUp(username, email, password, firstName, lastName) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;
  const response = await fetch(url, {
    method: "POST",
    // We need to tell the server that we are sending JSON dataso we set the Content-Type header to application/json
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to sign up`;
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await response.json();
}
export default postSignUp;
