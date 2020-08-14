const deleteBtn = el("deleteBtn");
const target = el("target");
const updateBtn = el("updateBtn");

const dataList = new Set();
const authorCheck = new Map();

target.addEventListener("click", (e) => {
  const target = e.target;

  if (target.checked) {
    dataList.add(target.dataset.name);
    authorCheck.set(target.dataset.written, target.dataset.author);
  } else {
    dataList.delete(target.dataset.name);
    authorCheck.delete(target.dataset.written);
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
  const updateList = [...dataList];
  const contentSeq = updateList[0];
  const isTrueAuthor = [...authorCheck][0];

  if (updateList.length === 1) {
    if (isTrueAuthor[0] === isTrueAuthor[1]) {
      window.location.href = `/board/update?contentSeq=${contentSeq}`;
    } else {
      alert("본인의 글만 수정 가능합니다.");
    }
  } else {
    alert("수정은 1개씩 가능합니다.");
  }
});
