const inputName = el("inputName");
const inputEmail = el("inputEmail");
const inputPassword = el("inputPassword");
const signupBtn = el("signupBtn");

signupBtn.addEventListener("click", function (e) {
  if (!!inputName.value && !!inputEmail.value && !!inputPassword.value) {
    const submitFormat = {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };

    axios.post("/auth/api/signup", submitFormat).then((response) => {
      const data = response.data;

      if (data.result === 1) {
        alert("Signup Success!!");
        window.location.href = "/signin";
      } else {
        alert("Signup Failure!!");
      }
    });
  } else {
    alert("Check your Value.");
  }
});
