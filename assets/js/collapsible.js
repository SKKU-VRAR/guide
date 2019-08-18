(function () {

    var coll = document.getElementsByClassName("collapsible");

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {

            function findContent (elem) {
                for (; elem != null; elem = elem.parentNode)
                {
                    for (var sibling = elem.nextSibling; sibling != null && sibling != undefined; sibling = sibling.nextSibling)
                    {
                        if (sibling.classList && sibling.classList.contains("collapsible-content"))
                            return sibling;
                    }
                }
                return null;
            }

            var content = findContent(this);

            if (this.classList.contains("active"))
                content.style.maxHeight = null;
            else
                content.style.maxHeight = content.scrollHeight + "px";

            this.classList.toggle("active");
        });
    }
})();