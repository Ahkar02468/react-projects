import { useEffect } from "react";

export function useKey(inputEl, key, callback) {
  useEffect(() => {
    function handleEnterKeyPress(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.key === key) {
        inputEl.current.focus();
        callback("");
      }
    }
    document.addEventListener("keydown", handleEnterKeyPress);
    return () => document.removeEventListener("keydown", handleEnterKeyPress);
  }, [callback]);
}
