var JC;
(function (JC) {
    var UI;
    (function (UI) {
        /**
         * 消息框提示
         * @param message 消息文本内容
         */
        function showMessage(message) {
            var _this = this;
            if (this.messageDiv) {
                document.body.removeChild(this.messageDiv);
            }
            var div = document.createElement("div");
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
            var removeDiv = function () {
                if (div != _this.messageDiv) {
                    return;
                }
                document.body.removeChild(div);
                _this.messageDiv = null;
                _this.messageTimerID = null;
            };
            div.addEventListener("click", removeDiv);
            setTimeout(removeDiv, 1500);
            this.messageDiv = div;
        }
        UI.showMessage = showMessage;
    })(UI = JC.UI || (JC.UI = {}));
})(JC || (JC = {}));
