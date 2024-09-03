import { useState, useEffect } from "react";
import "../css/App.css";
import ModalAdd from "./ModalAdd";

export default function InputCon({ setList }) {
  const defaultGroups = ["가족", "친구", "직장", "스터디"];
  const [input, setInput] = useState({
    name: "",
    phone: "",
    add: "",
    group: "가족",
  });
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  // 로컬 스토리지에서 그룹 불러오기
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groupCategory"));
    if (storedGroups && storedGroups.length > 0) {
      setGroups(storedGroups);
    } else {
      setGroups(defaultGroups);
      localStorage.setItem("groupCategory", JSON.stringify(defaultGroups));
    }
  }, []);

  // 그룹이 업데이트될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (groups.length > 0) {
      localStorage.setItem("groupCategory", JSON.stringify(groups));
    }
  }, [groups]);

  const validate = (name, value) => {
    const newErrors = { ...errors };

    if (name === "name" && !/^[가-힣]{2,}$/.test(value)) {
      newErrors.name = "이름은 한글이며 두 글자 이상이어야 합니다.";
    } else if (name === "name") {
      delete newErrors.name;
    }

    if (name === "phone" && !/^010-\d{4}-\d{4}$/.test(value)) {
      newErrors.phone = "전화번호는 010-0000-0000 형식이어야 합니다.";
    } else if (name === "phone") {
      delete newErrors.phone;
    }

    setErrors(newErrors);

    // 오류가 있으면 false 반환, 없으면 true 반환
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });

    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 입력 필드에 대해 유효성 검사 수행
    const isValid = Object.keys(input).every((key) =>
      validate(key, input[key])
    );

    // 유효성 검사를 통과하지 못한 경우 함수 종료
    if (!isValid) {
      return;
    }

    // 유효성 검사를 통과한 경우에만 데이터를 저장
    const existTest = JSON.parse(localStorage.getItem("contactList")) || [];
    const updatedContacts = Array.isArray(existTest)
      ? [...existTest, input]
      : [input];
    localStorage.setItem("contactList", JSON.stringify(updatedContacts));

    setList(updatedContacts);
    setInput({ name: "", phone: "", group: "가족", add: "" });
    setErrors({});
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="input-con">
      <form onSubmit={handleSubmit}>
        <div className="label-con">
          <label htmlFor="name">이름</label>
          <input
            name="name"
            onChange={onChange}
            placeholder="이름"
            value={input.name}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="label-con">
          <label htmlFor="phone">전화번호</label>
          <input
            name="phone"
            onChange={onChange}
            placeholder="전화번호"
            value={input.phone}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="option-con">
          <label htmlFor="group">그룹</label>
          <select name="group" onChange={onChange} value={input.group}>
            {groups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
          <button type="button" onClick={openModal}>
            추가
          </button>
        </div>
        <div className="label-con">
          <label htmlFor="addRecord">간단한 기록</label>
          <input
            name="add"
            onChange={onChange}
            placeholder="간단한 기록"
            value={input.add}
          />
        </div>
        <button type="submit">저장</button>
      </form>
      {modalOpen && (
        <ModalAdd onClose={closeModal} setGroups={setGroups} groups={groups} />
      )}
    </div>
  );
}
