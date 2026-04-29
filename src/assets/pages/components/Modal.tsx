import { useState } from "react";

// ─── 타입 ───────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean;
  type?: "alert" | "confirm" | "success" | "error" | "warning";
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

// ─── 모달 컴포넌트 ───────────────────────────────────────
export function Modal({
  isOpen,
  type = "alert",
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!isOpen) return null;

  const iconMap = {
    alert: { icon: "ℹ️", color: "#185FA5", bg: "#E6F1FB" },
    confirm: { icon: "❓", color: "#854F0B", bg: "#FAEEDA" },
    success: { icon: "✅", color: "#0F6E56", bg: "#E1F5EE" },
    error: { icon: "❌", color: "#A32D2D", bg: "#FCEBEB" },
    warning: { icon: "⚠️", color: "#854F0B", bg: "#FAEEDA" },
  };

  const { icon, color, bg } = iconMap[type];

  return (
    <>
      {/* 오버레이 */}
      <div
        onClick={onCancel || onConfirm}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.4)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
          animation: "fadeIn 0.15s ease",
        }}
      >
        {/* 모달 */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff", borderRadius: 16, padding: "2rem",
            width: "100%", maxWidth: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            animation: "slideUp 0.2s ease",
          }}
        >
          {/* 아이콘 */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: bg, display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 12px", fontSize: 24,
            }}>
              {icon}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{title}</h3>
          </div>

          {/* 메시지 */}
          <p style={{ fontSize: 14, color: "#888", textAlign: "center", lineHeight: 1.6, marginBottom: 24 }}>
            {message}
          </p>

          {/* 버튼 */}
          <div style={{ display: "grid", gridTemplateColumns: type === "confirm" ? "1fr 1fr" : "1fr", gap: 8 }}>
            {type === "confirm" && (
              <button
                onClick={onCancel}
                style={{
                  padding: "11px", fontSize: 14, background: "#fff",
                  color: "#888", border: "0.5px solid #d0cec8",
                  borderRadius: 8, cursor: "pointer", fontWeight: 500,
                }}
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              style={{
                padding: "11px", fontSize: 14, background: color,
                color: "#fff", border: "none", borderRadius: 8,
                cursor: "pointer", fontWeight: 500,
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </>
  );
}

// ─── 커스텀 훅 ───────────────────────────────────────────
export function useModal() {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "alert" | "confirm" | "success" | "error" | "warning";
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
  }>({
    isOpen: false,
    type: "alert",
    title: "",
    message: "",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const closeModal = () => setModal((m) => ({ ...m, isOpen: false }));

  // alert
  const showAlert = (title: string, message: string, type: "alert" | "success" | "error" | "warning" = "alert") => {
    return new Promise<void>((resolve) => {
      setModal({
        isOpen: true, type, title, message,
        confirmText: "확인", cancelText: "취소",
        onConfirm: () => { closeModal(); resolve(); },
        onCancel: () => { closeModal(); resolve(); },
      });
    });
  };

  // confirm
  const showConfirm = (title: string, message: string) => {
    return new Promise<boolean>((resolve) => {
      setModal({
        isOpen: true, type: "confirm", title, message,
        confirmText: "확인", cancelText: "취소",
        onConfirm: () => { closeModal(); resolve(true); },
        onCancel: () => { closeModal(); resolve(false); },
      });
    });
  };

  return { modal, showAlert, showConfirm };
}
