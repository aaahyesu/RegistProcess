import "../css/Modal.css";

export default function ModalDetail({ contact, onClose }) {
  return (
    <div className="modal">
      <div className="modal_popup">
        <h2>연락처 상세 정보</h2>
        <p>
          이름 : <strong>{contact.name}</strong>
        </p>
        <p>
          전화번호 : <strong>{contact.phone}</strong>
        </p>
        <p>
          그룹 : <strong>{contact.group}</strong>
        </p>
        <p>
          메모 : <strong>{contact.add}</strong>
        </p>
        <div className="btnCon">
          <button type="button" className="close-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
