const deleteBtn = el("deleteBtn");
const target = el("target");

const dataList = new Set();

target.addEventListener("click", (e) => {
  const target = e.target;

  if (target.checked) {
    dataList.add(target.dataset.name);
  } else {
    dataList.delete(target.dataset.name);
  }
});

deleteBtn.addEventListener("click", () => {
  const deleteFormat = {
    list: [...dataList],
  };

  axios.post("/board/api/delete", deleteFormat).then((response) => {
    const data = response.data;
    if (data.result === 1) {
      alert("Delete Posting Success!");
      window.location.reload();
    } else {
      alert("Failed to delete....");
    }
  });
});
