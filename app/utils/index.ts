export function handleEmptyInputs(
  e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  action: "set" | "remove"
) {
  const submitButton = e.target as HTMLInputElement;
  if (action === "remove") {
    const formElements = submitButton.closest("form")?.elements;
    if (formElements) {
      [...formElements].forEach((element) => {
        const elm = element as HTMLInputElement;
        elm.value === "" && elm.setAttribute("form", "fakeForm");
      });
    }
  }
  if (action === "set") {
    const formChildren = submitButton.closest("form")?.children;
    if (formChildren) {
      [...formChildren].forEach((element) => {
        const elm = element as HTMLInputElement;
        elm.removeAttribute("form");
      });
    }
  }
}
