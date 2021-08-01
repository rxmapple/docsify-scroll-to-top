var CONFIG = {
    auto: true,
    title: 'TOP',
    right: 15,
    bottom: 15,
    offset: 500,
    color: '#42B983'
};

var install = function (hook, vm) {
    var opts = vm.config.scrollToTop || CONFIG;
    CONFIG.auto = opts.auto && typeof opts.auto === 'boolean' ? opts.auto : CONFIG.auto;
    CONFIG.title = opts.title && typeof opts.title === 'string' ? opts.title : CONFIG.title;
    CONFIG.right = opts.right && typeof opts.right === 'number' ? opts.right : CONFIG.right;
    CONFIG.bottom = opts.bottom && typeof opts.bottom === 'number' ? opts.bottom : CONFIG.bottom;
    CONFIG.offset = opts.offset && typeof opts.offset === 'number' ? opts.offset : CONFIG.offset;
    CONFIG.color = opts.color && typeof opts.color === 'string' ? opts.color : CONFIG.color;

    var onScroll = function(e) {
        if (!CONFIG.auto) {
            return;
        }
        var offset = window.document.documentElement.scrollTop;
        var $scrollBtn = Docsify.dom.find('span.scroll-to-top');
        $scrollBtn.style.display = offset >= CONFIG.offset ? "block" : "none";
    };

    hook.mounted(function () {
        var scrollBtn = document.createElement("span");
        scrollBtn.className = "scroll-to-top";
        scrollBtn.title = CONFIG.title;
        scrollBtn.style.display = CONFIG.auto ? "none" : "block";
        scrollBtn.style.overflow = "hidden";
        scrollBtn.style.position = "fixed";
        scrollBtn.style.right = CONFIG.right + "px";
        scrollBtn.style.bottom = CONFIG.bottom + "px";
        scrollBtn.style.width = "40px";
        scrollBtn.style.height = "40px";
        scrollBtn.style.color = CONFIG.color;
        scrollBtn.style.borderRadius = "50%";
        scrollBtn.style.lineHeight = "50px";
        scrollBtn.style.textAlign = "center";
        scrollBtn.style.cursor = "pointer";
        var arrowNode = document.createElement("span");
        arrowNode.className = "up-arrow";
        arrowNode.style.display = "inline-block";
        arrowNode.style.width = "15px";
        arrowNode.style.height = "15px";
        arrowNode.style.top = "20px"
        arrowNode.style.borderTop = "2px solid";
        arrowNode.style.borderLeft = "2px solid";
        arrowNode.style.transform = "rotate(45deg)";
        scrollBtn.appendChild(arrowNode);
        document.body.appendChild(scrollBtn);
        window.addEventListener("scroll", onScroll);
        scrollBtn.onclick = function (e) {
            e.stopPropagation();
            var step = window.scrollY / 15;
            var scroll = function() {
                window.scrollTo(0, window.scrollY - step);
                if(window.scrollY > 0) {
                    setTimeout(scroll, 15);
                }
            };
            scroll();
        };
    })
};

$docsify.plugins = [].concat(install, $docsify.plugins);