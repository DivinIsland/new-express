const inputTitle = el("inputTitle");
const inputContent = el("inputContent");
const updateBtn = el("updateBtn");

updateBtn.addEventListener("click", () => {
  const updateFormat = {
    contentSeq: updateBtn.dataset.seq,
    title: inputTitle.value,
    content: inputContent.value,
  };

  axios.post("/board/api/update", updateFormat).then((response) => {
    const data = response.data;

    if (data.result === 1) {
      alert("Update Success");
      window.location.href = "/board";
    } else {
      alert("Failed to Update...");
    }
  });
});
