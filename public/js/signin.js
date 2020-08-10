const inputEmail = el("inputEmail");
const inputPassword = el("inputPassword");
const signinBtn = el("signinBtn");

signinBtn.addEventListener("click", function (e) {
  if (!!inputEmail.value && !!inputPassword.value) {
    const submitFormat = {
      email: inputEmail.value,
      password: inputPassword.value,
    };

    axios.post("/auth/api/signin", submitFormat).then((response) => {
      const data = response.data;

      if (data.result === 1) {
        alert(`Welcome ${data.name}`);
        window.location.href = "/mypage";
      } else {
        alert("Please Check your Email AND Password");
      }
    });
  } else {
    alert("Check your Value.");
  }
});
