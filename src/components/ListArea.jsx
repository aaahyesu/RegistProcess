import "../css/App.css";

import Modal from "./ModalDetail";
import { useState } from "react";

export default function ListArea({ list, setList }) {
  const validList = Array.isArray(list) ? list : [];

  const removeItem = (removeIndex) => {
    setList((prev) => {
      const newList = prev.filter((_, i) => i !== removeIndex);
      localStorage.setItem("contactList", JSON.stringify(newList));
      return newList;
    });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="list-area">
      <div className="search-con">
        <input type="text" placeholder="검색어를 입력하세요" />
        <button>전체리스트보기</button>
      </div>
      <ul className="list">
        {validList.map((item, index) => (
          <li key={index}>
            <p className="name">{item.name}</p>
            <p className="phone">{item.phone}</p>
            <p className="group">{item.group}</p>
            <button onClick={() => openModal(item)}>세부사항</button>
            <button onClick={() => removeItem(index)}>삭제</button>
          </li>
        ))}
      </ul>
      {modalOpen && <Modal contact={selectedContact} onClose={closeModal} />}
    </div>
  );
}
