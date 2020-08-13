const deleteBtn = el("deleteBtn");
const target = el("target");
const updateBtn = el("updateBtn");

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

updateBtn.addEventListener("click", () => {
  const updateInfo = {
    list: [...dataList],
  };

  const contentSeq = updateInfo.list[0];

  console.log(contentSeq, "updateValue");

  if (updateInfo.list.length === 1) {
    window.location.href = `/board/update?contentSeq=${contentSeq}`;
  } else {
    alert("수정은 1개씩 가능합니다.");
  }
});
