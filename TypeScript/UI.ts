module JC.UI {
    /**
     * 消息框提示
     * @param message 消息文本内容
     */
    export function showMessage(message) {
        if (this.messageDiv) {
            document.body.removeChild(this.messageDiv);
        }
        let div = document.createElement("div");
        div.style.position = "fixed";
        div.style.padding = "10px";
        div.style.borderRadius = "10px";
        div.style.backgroundColor = "rgba(0,0,0,0.8)";
        div.style.left = "50%";
        div.style.top = "50%";
        div.style.transform = "translate(-50%,-50%)";
        div.style.color = "rgb(233,233,233)";
        div.innerText = message;
        document.body.appendChild(div);
        let removeDiv = () => {
            if (div != this.messageDiv) {
                return;
            }
            document.body.removeChild(div);
            this.messageDiv = null;
            this.messageTimerID = null;
        };
        div.addEventListener("click", removeDiv);
        setTimeout(removeDiv, 1500);
        this.messageDiv = div;
    }
}