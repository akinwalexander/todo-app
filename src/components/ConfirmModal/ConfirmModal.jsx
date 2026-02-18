/**
 * ConfirmModal component
 *
 * Displays a centered modal dialog asking the user to confirm a deletion.
 * Clicking the backdrop also cancels the action.
 *
 * Props:
 *  - taskName   : Name of the task about to be deleted (shown in the message)
 *  - onConfirm(): Called when the user confirms deletion
 *  - onCancel() : Called when the user cancels or clicks the backdrop
 */

function ConfirmModal({ taskName, onConfirm, onCancel }) {
  return (
    <div
      className="form-overlay"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="confirm-modal">
        <div className="confirm-icon">🗑</div>
        <h3>Delete Task?</h3>
        <p>
          "<strong>{taskName}</strong>" will be permanently removed.
        </p>
        <div className="form-actions">
          <button className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
