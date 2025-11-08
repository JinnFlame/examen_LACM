class UserBadge extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name") || "Usuario";
    const small = document.createElement("div");
    small.style.display = "inline-block";
    small.style.padding = "0.25rem 0.5rem";
    small.style.borderRadius = "6px";
    small.style.background = "#f1f5f9";
    small.style.border = "1px solid #e2e8f0";
    small.textContent = name;
    this.appendChild(small);
  }
}

if (!customElements.get("user-badge")) {
  customElements.define("user-badge", UserBadge);
}
export default UserBadge;
