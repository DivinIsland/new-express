const inputTitle = el("inputTitle");
const inputContent = el("inputContent");
const writeBtn = el("writeBtn");

writeBtn.addEventListener("click", function (e) {
  const writeFormat = {
    title: inputTitle.value,
    content: inputContent.value,
  };

  axios.post("/board/api/write", writeFormat).then((response) => {
    const data = response.data;
    if (data.result === 1) {
      alert("Write Success!");
      window.location.href = "/board";
    } else {
      alert("Fail...");
    }
  });
});
