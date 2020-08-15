const deleteBtn = el("deleteBtn");
const target = el("target");
const updateBtn = el("updateBtn");

const dataList = new Set();
const checkWritten = [];
const checkAuthor = [];

target.addEventListener("click", (e) => {
  const target = e.target;

  if (target.checked) {
    dataList.add(target.dataset.name);
    checkWritten.push(target.dataset.written);
    checkAuthor.push(target.dataset.author);
  } else {
    dataList.delete(target.dataset.name);
    checkWritten.pop();
    checkAuthor.pop();
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
  const isAuthorTrue = checkWritten[0] === checkAuthor[0];

  if (updateList.length === 1) {
    if (isAuthorTrue) {
      window.location.href = `/board/update?contentSeq=${contentSeq}`;
    } else {
      alert("본인의 글만 수정 가능합니다.");
    }
  } else {
    alert("수정은 1개만 가능합니다.");
  }
});
