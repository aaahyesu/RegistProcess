import { useState } from "react";
import "../css/Modal.css";

export default function ModalAdd({ onClose, setGroups, groups }) {
  const [newGroup, setNewGroup] = useState("");

  const addGroup = () => {
    if (newGroup) {
      const updatedGroups = [...groups];
      if (!updatedGroups.includes(newGroup)) {
        updatedGroups.push(newGroup);
        setGroups(updatedGroups);
        // 추가된 그룹을 로컬 스토리지에 저장
        localStorage.setItem("groupCategory", JSON.stringify(updatedGroups));
      }
      setNewGroup("");
    }
  };

  const removeGroup = (group) => {
    const updatedGroups = groups.filter((g) => g !== group);
    setGroups(updatedGroups);
    // 삭제된 그룹을 로컬 스토리지에 저장
    localStorage.setItem("groupCategory", JSON.stringify(updatedGroups));
  };

  return (
    <div className="modal">
      <div className="modal_popup">
        <h2>그룹 관리</h2>
        <ul>
          {groups.map((group, index) => (
            <li key={index} className="group-item">
              {group}
              <button onClick={() => removeGroup(group)}>X</button>
            </li>
          ))}
        </ul>
        <div className="addCon">
          <input
            name="newGroup"
            placeholder="새 그룹이름"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
          <button onClick={addGroup}>추가</button>
        </div>
        <div className="closeModal">
          <button type="button" className="close-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
